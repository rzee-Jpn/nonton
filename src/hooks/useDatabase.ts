import { useState, useEffect, useCallback } from 'react';
import type { Database, Anime, Episode, Donator, SiteSettings } from '@/types';
import { DEFAULT_DB } from '@/data/default';

const STORAGE_KEY = 'axs_database';

export function useDatabase() {
  const [data, setData] = useState<Database>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_DB, ...JSON.parse(stored) };
      }
    }
    return DEFAULT_DB;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const saveData = useCallback((newData: Database) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    setData(newData);
  }, []);

  const updateSettings = useCallback((settings: Partial<SiteSettings>) => {
    const newData = { ...data, settings: { ...data.settings, ...settings } };
    saveData(newData);
  }, [data, saveData]);

  const addAnime = useCallback((anime: Omit<Anime, 'id'>) => {
    const newAnime: Anime = { ...anime, id: Date.now() };
    const newData = { 
      ...data, 
      anime: [...data.anime, newAnime],
      episodes: { ...data.episodes, [anime.slug]: [] }
    };
    saveData(newData);
    return newAnime;
  }, [data, saveData]);

  const updateAnime = useCallback((id: number, anime: Partial<Anime>) => {
    const newData = {
      ...data,
      anime: data.anime.map(a => a.id === id ? { ...a, ...anime } : a)
    };
    saveData(newData);
  }, [data, saveData]);

  const deleteAnime = useCallback((id: number) => {
    const anime = data.anime.find(a => a.id === id);
    if (anime) {
      const { [anime.slug]: _, ...remainingEpisodes } = data.episodes;
      const newData = {
        ...data,
        anime: data.anime.filter(a => a.id !== id),
        episodes: remainingEpisodes
      };
      saveData(newData);
    }
  }, [data, saveData]);

  const addEpisode = useCallback((slug: string, episode: Omit<Episode, 'number'>, number?: number) => {
    const episodes = data.episodes[slug] || [];
    const newEpisode: Episode = {
      ...episode,
      number: number || (episodes.length > 0 ? Math.max(...episodes.map(e => e.number)) + 1 : 1)
    };
    const newEpisodes = [...episodes, newEpisode].sort((a, b) => a.number - b.number);
    const newData = {
      ...data,
      episodes: { ...data.episodes, [slug]: newEpisodes }
    };
    saveData(newData);
    return newEpisode;
  }, [data, saveData]);

  const updateEpisode = useCallback((slug: string, number: number, episode: Partial<Episode>) => {
    const episodes = data.episodes[slug] || [];
    const newData = {
      ...data,
      episodes: {
        ...data.episodes,
        [slug]: episodes.map(e => e.number === number ? { ...e, ...episode } : e)
      }
    };
    saveData(newData);
  }, [data, saveData]);

  const deleteEpisode = useCallback((slug: string, number: number) => {
    const episodes = data.episodes[slug] || [];
    const newData = {
      ...data,
      episodes: {
        ...data.episodes,
        [slug]: episodes.filter(e => e.number !== number)
      }
    };
    saveData(newData);
  }, [data, saveData]);

  const addDonator = useCallback((donator: Omit<Donator, 'id' | 'date'>) => {
    const newDonator: Donator = {
      ...donator,
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10)
    };
    const newData = {
      ...data,
      donators: [newDonator, ...data.donators]
    };
    saveData(newData);
    return newDonator;
  }, [data, saveData]);

  const deleteDonator = useCallback((id: number) => {
    const newData = {
      ...data,
      donators: data.donators.filter(d => d.id !== id)
    };
    saveData(newData);
  }, [data, saveData]);

  const resetToDefault = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_DB);
  }, []);

  const getAnimeBySlug = useCallback((slug: string) => {
    return data.anime.find(a => a.slug === slug);
  }, [data.anime]);

  const getEpisodes = useCallback((slug: string) => {
    return data.episodes[slug] || [];
  }, [data.episodes]);

  const getEpisode = useCallback((slug: string, number: number) => {
    return data.episodes[slug]?.find(e => e.number === number);
  }, [data.episodes]);

  const getAllGenres = useCallback(() => {
    const genres = new Set<string>();
    data.anime.forEach(a => a.genres.forEach(g => genres.add(g)));
    return Array.from(genres).sort();
  }, [data.anime]);

  const searchAnime = useCallback((query: string) => {
    const q = query.toLowerCase();
    return data.anime.filter(a => 
      a.title.toLowerCase().includes(q) ||
      a.genres.some(g => g.toLowerCase().includes(q))
    );
  }, [data.anime]);

  const getTotalEpisodes = useCallback(() => {
    return Object.values(data.episodes).reduce((sum, eps) => sum + eps.length, 0);
  }, [data.episodes]);

  const getTotalDonations = useCallback(() => {
    return data.donators.reduce((sum, d) => sum + d.amount, 0);
  }, [data.donators]);

  return {
    data,
    isLoaded,
    settings: data.settings,
    anime: data.anime,
    donators: data.donators,
    saveData,
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
    getAnimeBySlug,
    getEpisodes,
    getEpisode,
    getAllGenres,
    searchAnime,
    getTotalEpisodes,
    getTotalDonations
  };
}
