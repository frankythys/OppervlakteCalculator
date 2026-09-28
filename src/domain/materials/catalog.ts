export type MaterialDefinition = {
  id: string;
  label: string;
  densityKgM3: number;
  description: string;
};

export const metalMaterials: MaterialDefinition[] = [
  {
    id: 'aluminium',
    label: 'Aluminium',
    densityKgM3: 2700,
    description: '2.700 kg/m³',
  },
  {
    id: 'steel',
    label: 'Staal',
    densityKgM3: 7850,
    description: '7.850 kg/m³',
  },
  {
    id: 'rvs304',
    label: 'RVS 304 / 304L',
    densityKgM3: 7900,
    description: '7.900 kg/m³',
  },
  {
    id: 'rvs316',
    label: 'RVS 316 / 316L',
    densityKgM3: 8000,
    description: '8.000 kg/m³',
  },
];

export const insulationMaterials: MaterialDefinition[] = [
  {
    id: 'prorox-wm950',
    label: 'Steenwol gaasdeken — ProRox WM 950',
    densityKgM3: 80,
    description: '80 kg/m³',
  },
  {
    id: 'prorox-ps960',
    label: 'Steenwol pijpschaal — ProRox PS 960',
    densityKgM3: 100,
    description: '100 kg/m³',
  },
  {
    id: 'prorox-ps970',
    label: 'Steenwol pijpschaal — ProRox PS 970',
    densityKgM3: 140,
    description: '140 kg/m³',
  },
  {
    id: 'foamglas-t4',
    label: 'Cellulair glas — FOAMGLAS T4+',
    densityKgM3: 110,
    description: '110 kg/m³',
  },
  {
    id: 'armaflex-af-evo',
    label: 'Elastomeerschuim — AF/ArmaFlex Evo',
    densityKgM3: 52.5,
    description: '52,5 kg/m³',
  },
  {
    id: 'promasil-1000',
    label: 'Calciumsilicaat — PROMASIL 1000',
    densityKgM3: 245,
    description: '245 kg/m³',
  },
];

export const customMaterial: MaterialDefinition = {
  id: 'custom',
  label: 'Aangepast materiaal',
  densityKgM3: 0,
  description: 'Densiteit zelf invullen',
};

export const plateThicknessesMm = [0.4, 0.5, 0.6, 0.7, 0.8, 1, 1.2, 1.5, 2, 2.5, 3];
export const insulationThicknessesMm = [20, 25, 30, 40, 50, 60, 80, 100, 120, 140, 160, 180, 200];
