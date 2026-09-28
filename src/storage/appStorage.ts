import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@oppervlakte/favorites';
const HISTORY_KEY = '@oppervlakte/history';

export type HistoryItem = {
  id: string;
  calculatorId: string;
  calculatorTitle: string;
  createdAt: string;
  inputs: Record<string, number | string>;
  primaryResult: string;
};

async function readJson<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const appStorage = {
  loadFavorites: () => readJson<string[]>(FAVORITES_KEY, []),
  saveFavorites: (favorites: string[]) =>
    AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)),

  loadHistory: () => readJson<HistoryItem[]>(HISTORY_KEY, []),
  saveHistory: (history: HistoryItem[]) =>
    AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history)),
};
