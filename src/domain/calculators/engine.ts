import type { Calculator, CalculatorFormula, Scalar, Values } from './types';

const degToRad = (degrees: number) => (degrees * Math.PI) / 180;

const ceilToMultiple = (value: number, significance: number) => {
  if (significance === 0) return value;
  return Math.ceil(value / significance) * significance;
};

const SAFE_CHARS = /^[A-Za-z0-9_.$+\-*/%<>=!?:(),\s"'²✅❌]+$/;
const ALLOWED_GLOBALS = new Set(['Math', 'PI', 'tan', 'sqrt', 'degToRad', 'ceilToMultiple']);

function assertTrustedExpression(expression: string, values: Values) {
  const withoutStrings = expression
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''");

  if (!SAFE_CHARS.test(withoutStrings)) {
    throw new Error('De formule bevat niet-toegestane tekens.');
  }

  const identifiers = withoutStrings.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [];
  for (const identifier of identifiers) {
    if (identifier === 'return') continue;
    if (identifier in values) continue;
    if (ALLOWED_GLOBALS.has(identifier)) continue;
    if (['Mogelijk', 'Onmogelijk'].includes(identifier)) continue;
    throw new Error(`Onbekend element in formule: ${identifier}`);
  }
}

export function evaluateExpression(expression: string, values: Values): Scalar {
  assertTrustedExpression(expression, values);

  const names = Object.keys(values);
  const args = names.map((name) => values[name]);

  // Expressions komen uitsluitend uit de gebundelde, gecontroleerde app-config.
  // Gebruikers kunnen zelf geen formulecode invoeren.
  const fn = new Function(
    ...names,
    'Math',
    'degToRad',
    'ceilToMultiple',
    `return (${expression});`
  );

  return fn(...args, Math, degToRad, ceilToMultiple) as Scalar;
}

function calculateFormula(formula: CalculatorFormula, values: Values): Scalar {
  if (formula.state !== 'ready' || !formula.expression) {
    throw new Error(`Formule ${formula.id} is nog niet beschikbaar.`);
  }

  const missing = formula.dependencies.filter((id) => !(id in values));
  if (missing.length > 0) {
    throw new Error(`Ontbrekende invoer: ${missing.join(', ')}`);
  }

  return evaluateExpression(formula.expression, values);
}

export function calculateCalculator(calculator: Calculator, inputValues: Values): Values {
  const values: Values = { ...inputValues };
  const pending = [...calculator.formulas];

  let progressed = true;
  while (pending.length > 0 && progressed) {
    progressed = false;

    for (let i = pending.length - 1; i >= 0; i -= 1) {
      const formula = pending[i];
      if (formula.state !== 'ready') {
        pending.splice(i, 1);
        continue;
      }

      if (formula.dependencies.every((id) => id in values)) {
        values[formula.id] = calculateFormula(formula, values);
        pending.splice(i, 1);
        progressed = true;
      }
    }
  }

  const unresolved = pending.filter((formula) => formula.state === 'ready');
  if (unresolved.length > 0) {
    throw new Error(
      `Niet-oplosbare afhankelijkheden: ${unresolved.map((formula) => formula.id).join(', ')}`
    );
  }

  return values;
}
