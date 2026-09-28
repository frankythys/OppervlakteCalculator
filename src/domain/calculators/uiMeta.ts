import type { CalculatorMeta } from './types';

export const calculatorMeta: Record<string, CalculatorMeta> = {
  leiding_met_isolatie: {
    description: 'Bereken afwikkeling en oppervlakte van een leiding inclusief isolatiedikte.',
    resultHint: 'Afmetingen in mm. Oppervlakte wordt weergegeven in m².',
    inputs: {
      B7: { label: 'Diameter leiding kaal', unit: 'mm', placeholder: '300' },
      C5: { label: 'Isolatiedikte', unit: 'mm', placeholder: '50' },
      D7: { label: 'Lengte', unit: 'mm', placeholder: '10000' },
    },
  },
  leiding_geisoleerd: {
    description: 'Bereken afwikkeling en oppervlakte van een reeds geïsoleerde leiding.',
    inputs: {
      B13: { label: 'Diameter geïsoleerde leiding', unit: 'mm' },
      D13: { label: 'Lengte', unit: 'mm' },
    },
  },
  verloop: {
    description: 'Bereken de oppervlakte van een rond verloop.',
    inputs: {
      B57: { label: 'Hoogte', unit: 'mm' },
      C57: { label: 'Kleine diameter', unit: 'mm' },
      D57: { label: 'Grote diameter', unit: 'mm' },
    },
  },
  flenskap_met_deksels: {
    description: 'Bereken mantel en twee ronde deksels van een flenskap.',
    inputs: {
      B65: { label: 'Diameter flenskap', unit: 'mm', placeholder: '450' },
      D65: { label: 'Lengte', unit: 'mm', placeholder: '600' },
    },
  },
  flenskap_zonder_deksels: {
    description: 'Bereken de manteloppervlakte van een flenskap zonder deksels.',
    inputs: {
      B68: { label: 'Diameter flenskap', unit: 'mm' },
      D68: { label: 'Lengte', unit: 'mm' },
    },
  },
  rechthoekige_afsluiterkap: {
    description: 'Bereken de oppervlakte van een rechthoekige afsluiterkap met twee deksels.',
    inputs: {
      B90: { label: 'Lengte', unit: 'mm', placeholder: '600' },
      C90: { label: 'Breedte', unit: 'mm', placeholder: '500' },
      D90: { label: 'Hoogte', unit: 'mm', placeholder: '600' },
    },
  },
  plaat_gewicht: {
    description: 'Bereken gewicht en oppervlakte van plaatmateriaal.',
    inputs: {
      B143: { label: 'Plaatlengte', unit: 'mm', placeholder: '2000' },
      C143: { label: 'Plaatbreedte', unit: 'mm', placeholder: '1000' },
      D143: { label: 'Plaatdikte', unit: 'mm', placeholder: '2' },
      E143: { label: 'Soortelijk gewicht', unit: 'kg/dm³', placeholder: '2.70' },
    },
  },
  bocht_lengte: {
    description: 'Bereken de buitenlengte van een bocht voor 90° en 45°.',
    inputs: {
      B104: { label: 'Radius', unit: 'mm' },
      C104: { label: 'Diameter', unit: 'mm' },
      B105: { label: 'Radius (tweede invoer)', unit: 'mm' },
      C105: { label: 'Diameter (tweede invoer)', unit: 'mm' },
    },
  },
  bocht_oppervlakte: {
    description: 'Bereken de oppervlakte van een bocht op basis van radius en diameter.',
    inputs: {
      B108: { label: 'Radius', unit: 'mm' },
      C108: { label: 'Diameter', unit: 'mm' },
    },
  },
  bolkop: {
    description: 'Bereken de oppervlakte van een geïsoleerde bolkop.',
    inputs: {
      B126: { label: 'Straal', unit: 'mm' },
      C126: { label: 'Isolatiedikte', unit: 'mm' },
    },
  },
  bol: {
    description: 'Bereken de oppervlakte van een geïsoleerde bol.',
    inputs: {
      B129: { label: 'Straal', unit: 'mm' },
      C129: { label: 'Isolatiedikte', unit: 'mm' },
    },
  },
};

export function getCalculatorMeta(id: string): CalculatorMeta {
  return calculatorMeta[id] ?? {
    description: 'Voer de gevraagde maten in om de technische berekening uit te voeren.',
  };
}
