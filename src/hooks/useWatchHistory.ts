import { useState, useEffect, useCallback } from 'react';

const LAST_WATCHED_KEY = 'axs_last_';
const WATCHED_KEY = 'axs_watched_';
const SERVER_KEY = 'axs_server';

export function useWatchHistory() {
  const [preferredServer, setPreferredServer] = useState<number>(0);

  useEffect(() => {
    const server = localStorage.getItem(SERVER_KEY);
    if (server) setPreferredServer(parseInt(server));
  }, []);

  const setLastWatchedEpisode = useCallback((slug: string, episode: number) => {
    localStorage.setItem(`${LAST_WATCHED_KEY}${slug}`, episode.toString());
  }, []);

  const getLastWatchedEpisode = useCallback((slug: string) => {
    const stored = localStorage.getItem(`${LAST_WATCHED_KEY}${slug}`);
    return stored ? parseInt(stored) : null;
  }, []);

  const markAsWatched = useCallback((slug: string, episode: number) => {
    const key = `${WATCHED_KEY}${slug}`;
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    if (!current.includes(episode)) {
      const updated = [...current, episode];
      localStorage.setItem(key, JSON.stringify(updated));
    }
  }, []);

  const isWatched = useCallback((slug: string, episode: number) => {
    const key = `${WATCHED_KEY}${slug}`;
    const current = JSON.parse(localStorage.getItem(key) || '[]');
    return current.includes(episode);
  }, []);

  const getWatchedEpisodes = useCallback((slug: string) => {
    const key = `${WATCHED_KEY}${slug}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  }, []);

  const setServerPreference = useCallback((serverIndex: number) => {
    localStorage.setItem(SERVER_KEY, serverIndex.toString());
    setPreferredServer(serverIndex);
  }, []);

  return {
    preferredServer,
    setLastWatchedEpisode,
    getLastWatchedEpisode,
    markAsWatched,
    isWatched,
    getWatchedEpisodes,
    setServerPreference
  };
}
