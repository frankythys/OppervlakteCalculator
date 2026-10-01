import {
  calculators as sourceCalculators,
  categories,
  getCalculatorById as getSourceCalculatorById,
} from './repository';
import type { Calculator, CalculatorFormula } from './types';

const HIDDEN_SOURCE_IDS = new Set([
  'plaat_gewicht',
  'isolatie_volume',
  'gaasdeken_gewicht',
  'alu_beplating_gewicht',
  'leiding_geisoleerd',
  'conus_verloop_omtrek',
  'knik_hartmaat',
  'bolkop',
  'cirkel_segment',
  'rechthoek_omvang',
  'inzet',
]);

const materialWeightCalculator: Calculator = {
  id: 'materiaal_gewicht',
  title: 'Materiaalgewicht',
  category: 'Materiaal',
  row_range: [143, 201],
  inputs: [],
  formulas: [],
  outputs: [],
  state: 'ready',
  notes: [
    'Professionele samengevoegde calculator voor metaalplaat, isolatie en beplating.',
    'Bronformules uit Excel blijven intern beschikbaar voor controle.',
  ],
};

const pythagorasCalculator: Calculator = {
  id: 'pythagoras',
  title: 'Stelling van Pythagoras',
  category: 'Vormen',
  row_range: [0, 0],
  inputs: [],
  formulas: [],
  outputs: [],
  state: 'ready',
  notes: ['Rechthoekige driehoek: bereken zijden en hoeken uit twee bekende waarden.'],
};

const visibleSourceCalculators = sourceCalculators.filter(
  (calculator) => !HIDDEN_SOURCE_IDS.has(calculator.id)
);

export { categories };
export const calculators: Calculator[] = [
  materialWeightCalculator,
  pythagorasCalculator,
  ...visibleSourceCalculators,
];

export function getCalculatorById(id: string): Calculator | undefined {
  if (id === materialWeightCalculator.id) return materialWeightCalculator;
  if (id === pythagorasCalculator.id) return pythagorasCalculator;
  return getSourceCalculatorById(id);
}

export function getCalculatorsByCategory(category: string): Calculator[] {
  return calculators.filter((calculator) => calculator.category === category);
}

export function searchCalculators(query: string): Calculator[] {
  const normalized = query.trim().toLocaleLowerCase('nl-BE');
  if (!normalized) return calculators;

  return calculators.filter((calculator) => {
    const haystack = [
      calculator.title,
      calculator.category,
      calculator.id === 'materiaal_gewicht'
        ? 'gewicht plaat staal rvs aluminium isolatie steenwol foamglas armaflex beplating densiteit'
        : '',
      ...calculator.formulas.flatMap((formula: CalculatorFormula) => formula.context_labels),
    ]
      .join(' ')
      .toLocaleLowerCase('nl-BE');

    return haystack.includes(normalized);
  });
}
