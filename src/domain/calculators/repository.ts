import rawData from '@/data/calculators.json';
import type { Calculator, CalculatorDataset } from './types';

const data = rawData as CalculatorDataset;

export const categories = data.categories;
export const calculators = data.calculators;

export function getCalculatorById(id: string): Calculator | undefined {
  return calculators.find((calculator) => calculator.id === id);
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
      ...calculator.formulas.flatMap((formula) => formula.context_labels),
    ]
      .join(' ')
      .toLocaleLowerCase('nl-BE');

    return haystack.includes(normalized);
  });
}
