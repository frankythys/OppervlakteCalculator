import type { SelectOption } from './types';

const PLATE_THICKNESSES: SelectOption[] = [
  '0.4', '0.5', '0.6', '0.7', '0.8', '1', '1.2', '1.5', '2', '2.5', '3',
].map((value) => ({ label: `${value.replace('.', ',')} mm`, value }));

const METAL_DENSITIES: SelectOption[] = [
  {
    label: 'Aluminium',
    value: '2.7',
    description: '2,70 kg/dm³',
  },
  {
    label: 'Staal',
    value: '7.85',
    description: '7,85 kg/dm³',
  },
  {
    label: 'RVS 304 / 304L',
    value: '7.9',
    description: '7,90 kg/dm³',
  },
  {
    label: 'RVS 316 / 316L',
    value: '8.0',
    description: '8,00 kg/dm³',
  },
];

const INSULATION_DENSITIES: SelectOption[] = [
  {
    label: 'Steenwol gaasdeken — ProRox WM 950',
    value: '80',
    description: 'Nominale densiteit 80 kg/m³',
  },
  {
    label: 'Steenwol pijpschaal — ProRox PS 960',
    value: '100',
    description: 'Nominale densiteit 100 kg/m³',
  },
  {
    label: 'Steenwol pijpschaal — ProRox PS 960 (125)',
    value: '125',
    description: 'Alternatieve product-/marktvariant 125 kg/m³',
  },
  {
    label: 'Steenwol pijpschaal — ProRox PS 970',
    value: '140',
    description: 'Nominale densiteit 140 kg/m³',
  },
  {
    label: 'Cellulair glas — FOAMGLAS T4+',
    value: '110',
    description: 'Densiteit 110 kg/m³',
  },
  {
    label: 'Elastomeerschuim — AF/ArmaFlex Evo',
    value: '52.5',
    description: 'Brutodensiteit 52,5 kg/m³',
  },
  {
    label: 'Calciumsilicaat — PROMASIL 1000',
    value: '245',
    description: 'Bulkdensiteit 245 kg/m³',
  },
];

export function getInputPresetOptions(calculatorId: string, inputId: string): SelectOption[] | undefined {
  if (calculatorId === 'plaat_gewicht' && inputId === 'D143') return PLATE_THICKNESSES;
  if (calculatorId === 'plaat_gewicht' && inputId === 'E143') return METAL_DENSITIES;

  if (calculatorId === 'isolatie_volume' && inputId === 'A187') return INSULATION_DENSITIES;
  if (calculatorId === 'gaasdeken_gewicht' && inputId === 'A194') return INSULATION_DENSITIES;

  return undefined;
}

export function getPresetInputLabel(calculatorId: string, inputId: string): string | undefined {
  if (calculatorId === 'plaat_gewicht' && inputId === 'D143') return 'Plaatdikte';
  if (calculatorId === 'plaat_gewicht' && inputId === 'E143') return 'Materiaal';
  if (calculatorId === 'isolatie_volume' && inputId === 'A187') return 'Isolatiemateriaal / densiteit';
  if (calculatorId === 'gaasdeken_gewicht' && inputId === 'A194') return 'Isolatiemateriaal / densiteit';
  return undefined;
}
