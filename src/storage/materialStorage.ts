import AsyncStorage from '@react-native-async-storage/async-storage';

const CUSTOM_MATERIALS_KEY = '@oppervlakte/custom-materials-v1';

export type MaterialKind = 'metal' | 'insulation';

export type StoredMaterial = {
  id: string;
  name: string;
  kind: MaterialKind;
  densityKgM3: number;
};

function isStoredMaterial(value: unknown): value is StoredMaterial {
  if (!value || typeof value !== 'object') return false;
  const item = value as Partial<StoredMaterial>;
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    (item.kind === 'metal' || item.kind === 'insulation') &&
    typeof item.densityKgM3 === 'number' &&
    Number.isFinite(item.densityKgM3) &&
    item.densityKgM3 > 0
  );
}

async function load(): Promise<StoredMaterial[]> {
  const raw = await AsyncStorage.getItem(CUSTOM_MATERIALS_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter(isStoredMaterial) : [];
  } catch {
    return [];
  }
}

async function save(materials: StoredMaterial[]): Promise<void> {
  await AsyncStorage.setItem(CUSTOM_MATERIALS_KEY, JSON.stringify(materials));
}

export const materialStorage = { load, save };
