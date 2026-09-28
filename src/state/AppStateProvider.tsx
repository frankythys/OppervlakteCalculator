import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { appStorage, type HistoryItem } from '@/storage/appStorage';

type AppState = {
  favorites: string[];
  history: HistoryItem[];
  isFavorite: (calculatorId: string) => boolean;
  toggleFavorite: (calculatorId: string) => void;
  addHistory: (item: Omit<HistoryItem, 'id' | 'createdAt'>) => void;
  clearHistory: () => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: React.PropsWithChildren) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    Promise.all([appStorage.loadFavorites(), appStorage.loadHistory()]).then(
      ([storedFavorites, storedHistory]) => {
        setFavorites(storedFavorites);
        setHistory(storedHistory);
      }
    );
  }, []);

  const toggleFavorite = useCallback((calculatorId: string) => {
    setFavorites((current) => {
      const next = current.includes(calculatorId)
        ? current.filter((id) => id !== calculatorId)
        : [...current, calculatorId];

      void appStorage.saveFavorites(next);
      return next;
    });
  }, []);

  const addHistory = useCallback((item: Omit<HistoryItem, 'id' | 'createdAt'>) => {
    setHistory((current) => {
      const next: HistoryItem[] = [
        {
          ...item,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ].slice(0, 100);

      void appStorage.saveHistory(next);
      return next;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    void appStorage.saveHistory([]);
  }, []);

  const value = useMemo<AppState>(
    () => ({
      favorites,
      history,
      isFavorite: (calculatorId) => favorites.includes(calculatorId),
      toggleFavorite,
      addHistory,
      clearHistory,
    }),
    [favorites, history, toggleFavorite, addHistory, clearHistory]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const value = useContext(AppStateContext);
  if (!value) throw new Error('useAppState moet binnen AppStateProvider gebruikt worden.');
  return value;
}
