import { useState, useEffect, useCallback } from 'react';
import type { Anime, Episode, Donator, SiteSettings } from '@/types';
import DEFAULT_SETTINGS from '@/data/settings';
import DEFAULT_ANIME from '@/data/anime';
import DEFAULT_DONATORS from '@/data/donators';

// ─── Storage keys ─────────────────────────────────────────────
const KEY_SETTINGS  = 'axs_settings';
const KEY_ANIME     = 'axs_anime';
const KEY_DONATORS  = 'axs_donators';
const KEY_DB_VERSION = 'axs_db_version';
const KEY_EPISODES  = (slug: string) => `axs_ep_${slug}`;

// ─── DB Version — bump this whenever DEFAULT_ANIME changes ────
// This triggers a merge of new default anime into stored data.
const DB_VERSION = 2;

// ─── Vite glob — lazy-load tiap file episode secara terpisah ──
const EPISODE_MODULES = import.meta.glob<{ default: Episode[] }>(
  '../data/episodes/*.ts'
);

function slugToModuleKey(slug: string): string {
  return `../data/episodes/${slug}.ts`;
}

// ─── Local storage helpers ────────────────────────────────────
function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('localStorage write failed:', e);
  }
}

/**
 * Merge strategy: for each default anime, if it doesn't exist in the
 * stored list (matched by slug), inject it. This ensures new entries
 * added to DEFAULT_ANIME always appear — even for returning users
 * whose localStorage was populated before the new entry was added.
 */
function mergeAnimeWithDefaults(stored: Anime[]): Anime[] {
  const slugSet = new Set(stored.map(a => a.slug));
  const newEntries = DEFAULT_ANIME.filter(a => !slugSet.has(a.slug));
  if (newEntries.length === 0) return stored;
  return [...stored, ...newEntries];
}

/**
 * Run on first mount. If the stored DB version is behind, merge
 * any missing default anime into the stored list and update the version.
 */
function migrateIfNeeded(storedAnime: Anime[]): Anime[] {
  const storedVersion = parseInt(localStorage.getItem(KEY_DB_VERSION) ?? '0', 10);
  if (storedVersion >= DB_VERSION) return storedAnime;

  const merged = mergeAnimeWithDefaults(storedAnime);
  saveToStorage(KEY_ANIME, merged);
  saveToStorage(KEY_DB_VERSION, DB_VERSION);
  return merged;
}

// ─────────────────────────────────────────────────────────────

export function useDatabase() {
  const [settings, setSettings] = useState<SiteSettings>(() =>
    loadFromStorage(KEY_SETTINGS, DEFAULT_SETTINGS)
  );

  const [anime, setAnime] = useState<Anime[]>(() => {
    const stored = loadFromStorage(KEY_ANIME, DEFAULT_ANIME);
    return migrateIfNeeded(stored);
  });

  const [donators, setDonators] = useState<Donator[]>(() =>
    loadFromStorage(KEY_DONATORS, DEFAULT_DONATORS)
  );
  const [episodeCache, setEpisodeCache] = useState<Record<string, Episode[]>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { setIsLoaded(true); }, []);

  // ── Load episode untuk 1 slug (lazy) ──────────────────────
  const loadEpisodes = useCallback(async (slug: string): Promise<Episode[]> => {
    // 1. Cek localStorage (user edits override file statis)
    const local = localStorage.getItem(KEY_EPISODES(slug));
    if (local) {
      try {
        const parsed = JSON.parse(local) as Episode[];
        setEpisodeCache(prev => ({ ...prev, [slug]: parsed }));
        return parsed;
      } catch {
        // corrupted data — fall through to module load
        localStorage.removeItem(KEY_EPISODES(slug));
      }
    }

    // 2. Lazy import dari file episode-nya
    const moduleKey = slugToModuleKey(slug);
    const loader = EPISODE_MODULES[moduleKey];
    if (!loader) {
      setEpisodeCache(prev => ({ ...prev, [slug]: [] }));
      return [];
    }

    try {
      const mod = await loader();
      const eps = mod.default ?? [];
      setEpisodeCache(prev => ({ ...prev, [slug]: eps }));
      return eps;
    } catch {
      setEpisodeCache(prev => ({ ...prev, [slug]: [] }));
      return [];
    }
  }, []);

  const getEpisodes = useCallback((slug: string): Episode[] => {
    return episodeCache[slug] ?? [];
  }, [episodeCache]);

  const getEpisode = useCallback((slug: string, number: number): Episode | undefined => {
    return episodeCache[slug]?.find(e => e.number === number);
  }, [episodeCache]);

  const getAnimeBySlug = useCallback((slug: string): Anime | undefined => {
    return anime.find(a => a.slug === slug);
  }, [anime]);

  // ── Settings ──────────────────────────────────────────────
  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...newSettings };
      saveToStorage(KEY_SETTINGS, next);
      return next;
    });
  }, []);

  // ── Anime ─────────────────────────────────────────────────
  const addAnime = useCallback((data: Omit<Anime, 'id'>) => {
    const newAnime: Anime = { ...data, id: Date.now() };
    setAnime(prev => {
      const next = [...prev, newAnime];
      saveToStorage(KEY_ANIME, next);
      return next;
    });
    saveToStorage(KEY_EPISODES(data.slug), []);
    setEpisodeCache(prev => ({ ...prev, [data.slug]: [] }));
    return newAnime;
  }, []);

  const updateAnime = useCallback((id: number, data: Partial<Anime>) => {
    setAnime(prev => {
      const next = prev.map(a => (a.id === id ? { ...a, ...data } : a));
      saveToStorage(KEY_ANIME, next);
      return next;
    });
  }, []);

  const deleteAnime = useCallback((id: number) => {
    setAnime(prev => {
      const target = prev.find(a => a.id === id);
      if (target) {
        localStorage.removeItem(KEY_EPISODES(target.slug));
        setEpisodeCache(c => {
          const copy = { ...c };
          delete copy[target.slug];
          return copy;
        });
      }
      const next = prev.filter(a => a.id !== id);
      saveToStorage(KEY_ANIME, next);
      return next;
    });
  }, []);

  // ── Episodes ──────────────────────────────────────────────
  const addEpisode = useCallback((slug: string, episode: Omit<Episode, 'number'>, number?: number) => {
    setEpisodeCache(prev => {
      const current = prev[slug] ?? [];
      const newNum = number ?? (current.length > 0
        ? Math.max(...current.map(e => e.number)) + 1
        : 1);
      const newEp: Episode = { ...episode, number: newNum };
      const next = [...current, newEp].sort((a, b) => a.number - b.number);
      saveToStorage(KEY_EPISODES(slug), next);
      return { ...prev, [slug]: next };
    });
  }, []);

  const updateEpisode = useCallback((slug: string, number: number, episode: Partial<Episode>) => {
    setEpisodeCache(prev => {
      const current = prev[slug] ?? [];
      const next = current.map(e => (e.number === number ? { ...e, ...episode } : e));
      saveToStorage(KEY_EPISODES(slug), next);
      return { ...prev, [slug]: next };
    });
  }, []);

  const deleteEpisode = useCallback((slug: string, number: number) => {
    setEpisodeCache(prev => {
      const current = prev[slug] ?? [];
      const next = current.filter(e => e.number !== number);
      saveToStorage(KEY_EPISODES(slug), next);
      return { ...prev, [slug]: next };
    });
  }, []);

  // ── Donators ──────────────────────────────────────────────
  const addDonator = useCallback((data: Omit<Donator, 'id' | 'date'>) => {
    const newDonator: Donator = {
      ...data,
      id: Date.now(),
      amount: Number(data.amount) || 0,
      date: new Date().toISOString().slice(0, 10),
    };
    setDonators(prev => {
      const next = [newDonator, ...prev];
      saveToStorage(KEY_DONATORS, next);
      return next;
    });
    return newDonator;
  }, []);

  const deleteDonator = useCallback((id: number) => {
    setDonators(prev => {
      const next = prev.filter(d => d.id !== id);
      saveToStorage(KEY_DONATORS, next);
      return next;
    });
  }, []);

  // ── Reset ─────────────────────────────────────────────────
  const resetToDefault = useCallback(() => {
    [KEY_SETTINGS, KEY_ANIME, KEY_DONATORS, KEY_DB_VERSION].forEach(k =>
      localStorage.removeItem(k)
    );
    Object.keys(localStorage)
      .filter(k => k.startsWith('axs_ep_'))
      .forEach(k => localStorage.removeItem(k));
    setSettings(DEFAULT_SETTINGS);
    setAnime(DEFAULT_ANIME);
    setDonators(DEFAULT_DONATORS);
    setEpisodeCache({});
    // Write fresh version after reset
    saveToStorage(KEY_DB_VERSION, DB_VERSION);
  }, []);

  // ── Computed ──────────────────────────────────────────────
  const getTotalEpisodes = useCallback(() => {
    return Object.values(episodeCache).reduce((sum, eps) => sum + eps.length, 0);
  }, [episodeCache]);

  const getTotalDonations = useCallback(() => {
    return donators.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  }, [donators]);

  return {
    isLoaded,
    settings,
    anime,
    donators,
    episodeCache,
    loadEpisodes,
    getEpisodes,
    getEpisode,
    getAnimeBySlug,
    updateSettings,
    addAnime,
    updateAnime,
    deleteAnime,
    addEpisode,
    updateEpisode,
    deleteEpisode,
    addDonator,
    deleteDonator,
    resetToDefault,
    getTotalEpisodes,
    getTotalDonations,
  };
}
