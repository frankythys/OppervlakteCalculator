import type { Scalar } from '@/domain/calculators/types';

export function parseNumericInput(value: string): number | null {
  const normalized = value.replace(',', '.').trim();
  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatScalar(value: Scalar, decimals = 2): string {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('nl-BE', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    }).format(value);
  }

  if (typeof value === 'boolean') return value ? 'Ja' : 'Nee';
  return String(value);
}
