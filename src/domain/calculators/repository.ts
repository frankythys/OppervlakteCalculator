import rawData from '@/data/calculators.json';
import type { Calculator, CalculatorDataset, CalculatorFormula } from './types';

const data = rawData as CalculatorDataset;

type OutputSpec = [formulaId: string, label: string];

type DeriveOptions = {
  id: string;
  title: string;
  inputIds: string[];
  formulaIds: string[];
  outputs: OutputSpec[];
  rowRange?: [number, number];
  notes?: string[];
};

function getRawCalculator(id: string): Calculator {
  const calculator = data.calculators.find((item) => item.id === id);
  if (!calculator) throw new Error(`Calculatorconfig ontbreekt: ${id}`);
  return calculator;
}

function deriveCalculator(base: Calculator, options: DeriveOptions): Calculator {
  return {
    ...base,
    id: options.id,
    title: options.title,
    row_range: options.rowRange ?? base.row_range,
    inputs: base.inputs
      .filter((input) => options.inputIds.includes(input.id))
      .map((input, index) => ({ ...input, label: `Invoer ${index + 1}` })),
    formulas: base.formulas.filter((formula) => options.formulaIds.includes(formula.id)),
    outputs: options.outputs.map(([formula_id, label]) => ({ formula_id, label })),
    notes: options.notes ?? base.notes,
  };
}

function genericizeInputLabels(calculator: Calculator): Calculator {
  return {
    ...calculator,
    inputs: calculator.inputs.map((input, index) => ({
      ...input,
      label: `Invoer ${index + 1}`,
    })),
    outputs: calculator.outputs.map((output) => ({
      ...output,
      label: output.label === output.formula_id ? 'Resultaat' : output.label,
    })),
  };
}

function buildCalculators(): Calculator[] {
  const replacements = new Map<string, Calculator[]>();

  const percentage = getRawCalculator('algemeen_percentage');
  replacements.set('algemeen_percentage', [
    deriveCalculator(percentage, {
      id: 'percentage_verschil',
      title: 'Procent tussen 2 getallen',
      inputIds: ['B3', 'C3'],
      formulaIds: ['D3', 'E3'],
      outputs: [['D3', 'Verschil'], ['E3', 'Procent verschil']],
      rowRange: [3, 3],
    }),
    deriveCalculator(percentage, {
      id: 'percentage_van_basis',
      title: 'Percentage van basisbedrag',
      inputIds: ['F1', 'F3'],
      formulaIds: ['G3'],
      outputs: [['G3', 'Percentage']],
      rowRange: [3, 3],
    }),
  ]);

  const rechthoek = getRawCalculator('rechthoek');
  replacements.set('rechthoek', [
    deriveCalculator(rechthoek, {
      id: 'rechthoek_oppervlakte',
      title: 'Rechthoek - oppervlakte',
      inputIds: ['B38', 'C38', 'D38'],
      formulaIds: ['E38'],
      outputs: [['E38', 'Oppervlakte']],
      rowRange: [38, 38],
    }),
    deriveCalculator(rechthoek, {
      id: 'rechthoek_omvang',
      title: 'Rechthoek - omvang',
      inputIds: ['C40', 'D40'],
      formulaIds: ['E40'],
      outputs: [['E40', 'Omvang']],
      rowRange: [40, 40],
    }),
  ]);

  const verloop = getRawCalculator('verloop');
  replacements.set('verloop', [
    deriveCalculator(verloop, {
      id: 'conus_verloop_diameter',
      title: 'Conus / verloop',
      inputIds: ['B57', 'C57', 'D57'],
      formulaIds: ['E57'],
      outputs: [['E57', 'Oppervlakte']],
      rowRange: [57, 57],
    }),
    deriveCalculator(verloop, {
      id: 'conus_verloop_omtrek',
      title: 'Conus / verloop op omtrek',
      inputIds: ['C59', 'D59', 'B59'],
      formulaIds: ['E59', 'F59'],
      outputs: [['E59', 'Gemiddelde omtrek'], ['F59', 'Oppervlakte']],
      rowRange: [59, 59],
    }),
  ]);

  const rondeAfsluiter = getRawCalculator('ronde_afsluiter');
  replacements.set('ronde_afsluiter', [
    deriveCalculator(rondeAfsluiter, {
      id: 'ronde_afsluiter',
      title: 'Ronde afsluiter',
      inputIds: ['D74', 'E74'],
      formulaIds: ['B74', 'C74', 'B75'],
      outputs: [['C74', 'Afwikkeling halve diameter'], ['B74', 'Omvang'], ['B75', 'Omvang afgerond']],
      rowRange: [74, 75],
      notes: ['Tweede voorbeeldblok uit Excel is niet als extra gebruikersinvoer opgenomen.'],
    }),
  ]);

  const rechthoekigeKap = getRawCalculator('rechthoekige_afsluiterkap');
  replacements.set('rechthoekige_afsluiterkap', [
    deriveCalculator(rechthoekigeKap, {
      id: 'rechthoekige_afsluiterkap_omvang',
      title: 'Rechthoekige afsluiterkap - omvang',
      inputIds: ['C87', 'D87'],
      formulaIds: ['B87'],
      outputs: [['B87', 'Omvang']],
      rowRange: [87, 87],
    }),
    deriveCalculator(rechthoekigeKap, {
      id: 'rechthoekige_afsluiterkap',
      title: 'Rechthoekige afsluiterkap + 2 deksels',
      inputIds: ['B90', 'C90', 'D90'],
      formulaIds: ['E90'],
      outputs: [['E90', 'Oppervlakte']],
      rowRange: [90, 90],
    }),
  ]);

  const bochtLengte = getRawCalculator('bocht_lengte');
  replacements.set('bocht_lengte', [
    deriveCalculator(bochtLengte, {
      id: 'bocht_lengte',
      title: 'Bocht - buitenlengte 90° / 45°',
      inputIds: ['B104', 'C104'],
      formulaIds: ['D104', 'F104'],
      outputs: [['F104', 'Buitenlengte 90°'], ['D104', 'Buitenlengte 45°']],
      rowRange: [104, 104],
      notes: ['Dubbel voorbeeldblok uit Excel is niet als extra gebruikersinvoer opgenomen.'],
    }),
  ]);

  const gaasdekens = getRawCalculator('gaasdekens_rollen');
  replacements.set('gaasdekens_rollen', [
    deriveCalculator(gaasdekens, {
      id: 'gaasdekens_rollen',
      title: 'Gaasdekens - rollen en prijs',
      inputIds: ['B136', 'C136', 'E136'],
      formulaIds: ['D136', 'F136'],
      outputs: [['D136', 'Totaal m²'], ['F136', 'Subtotaal']],
      rowRange: [136, 136],
      notes: ['Herhaalde Excel-voorbeeldregels 137-140 zijn niet als extra invoervelden opgenomen.'],
    }),
  ]);

  const plaat = getRawCalculator('plaat_gewicht');
  replacements.set('plaat_gewicht', [
    deriveCalculator(plaat, {
      id: 'plaat_gewicht',
      title: 'Plaat - gewicht en m²',
      inputIds: ['B143', 'C143', 'D143', 'E143'],
      formulaIds: ['F143', 'G143'],
      outputs: [['G143', 'Oppervlakte'], ['F143', 'Gewicht']],
      rowRange: [143, 143],
      notes: ['Materiaal wordt bepaald via het ingevoerde soortelijk gewicht.'],
    }),
  ]);

  const bedragen = getRawCalculator('bedragen_percentage');
  replacements.set('bedragen_percentage', [
    deriveCalculator(bedragen, {
      id: 'bedrag_verschil_percentage',
      title: 'Bedrag - verschil en percentage',
      inputIds: ['A209', 'B209'],
      formulaIds: ['C209', 'D209'],
      outputs: [['C209', 'Verschil'], ['D209', 'Percentage']],
      rowRange: [209, 209],
    }),
    deriveCalculator(bedragen, {
      id: 'bedrag_factor',
      title: 'Bedrag × factor',
      inputIds: ['A211', 'B211'],
      formulaIds: ['C211'],
      outputs: [['C211', 'Uitkomst']],
      rowRange: [211, 211],
    }),
    deriveCalculator(bedragen, {
      id: 'bedrag_factor_omrekening',
      title: 'Bedrag - factoromrekening',
      inputIds: ['A213', 'B212', 'C212'],
      formulaIds: ['D213'],
      outputs: [['D213', 'Omgerekend bedrag']],
      rowRange: [212, 213],
    }),
  ]);

  const bochtLimiet = getRawCalculator('bocht_praktische_limiet');
  replacements.set('bocht_praktische_limiet', [
    deriveCalculator(bochtLimiet, {
      id: 'bocht_praktische_limiet',
      title: 'Bocht - praktische limiet',
      inputIds: ['J215', 'B216', 'C216', 'D216'],
      formulaIds: ['E216', 'F216', 'H216'],
      outputs: [['E216', 'Buitendiameter beplating'], ['F216', 'Praktische limiet'], ['H216', 'Conclusie']],
      rowRange: [215, 216],
      notes: ['Herhaalde maatvoorbeelden uit Excel zijn niet als extra invoervelden opgenomen.'],
    }),
  ]);

  return data.calculators.flatMap((calculator) =>
    (replacements.get(calculator.id) ?? [genericizeInputLabels(calculator)]).map(genericizeInputLabels)
  );
}

export const categories = data.categories;
export const calculators = buildCalculators();

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
      ...calculator.formulas.flatMap((formula: CalculatorFormula) => formula.context_labels),
    ]
      .join(' ')
      .toLocaleLowerCase('nl-BE');

    return haystack.includes(normalized);
  });
}
