import type { CalculatorMeta } from './types';

export const calculatorMeta: Record<string, CalculatorMeta> = {
  percentage_verschil: {
    description: 'Bereken het verschil en het procentuele verschil tussen twee bedragen.',
    inputs: {
      B3: { label: 'Bedrag 1 (grootste)', unit: '€' },
      C3: { label: 'Bedrag 2', unit: '€' },
    },
    outputs: {
      D3: { label: 'Verschil', unit: '€' },
      E3: { label: 'Procent verschil', unit: '%' },
    },
  },
  percentage_van_basis: {
    description: 'Bereken welk percentage een bedrag van een basisbedrag vormt.',
    inputs: {
      F1: { label: 'Basisbedrag', unit: '€' },
      F3: { label: 'Bedrag', unit: '€' },
    },
    outputs: { G3: { label: 'Percentage', unit: '%' } },
  },
  leiding_met_isolatie: {
    description: 'Bereken afwikkeling en oppervlakte van een leiding inclusief isolatiedikte.',
    resultHint: 'Afmetingen in mm. Oppervlakte wordt weergegeven in m².',
    inputs: {
      B7: { label: 'Diameter leiding kaal', unit: 'mm', placeholder: '300' },
      C5: { label: 'Isolatiedikte', unit: 'mm', placeholder: '50' },
      D7: { label: 'Lengte', unit: 'mm', placeholder: '10000' },
    },
    outputs: {
      C7: { label: 'Afwikkeling', unit: 'm' },
      E7: { label: 'Oppervlakte', unit: 'm²' },
    },
  },
  leiding_geisoleerd: {
    description: 'Bereken afwikkeling en oppervlakte van een reeds geïsoleerde leiding.',
    inputs: {
      B13: { label: 'Diameter geïsoleerde leiding', unit: 'mm' },
      D13: { label: 'Lengte', unit: 'mm' },
    },
    outputs: {
      C13: { label: 'Afwikkeling', unit: 'm' },
      E13: { label: 'Oppervlakte', unit: 'm²' },
    },
  },
  cirkel: {
    description: 'Bereken omtrek en oppervlakte van een cirkel op basis van de diameter.',
    inputs: { B19: { label: 'Diameter', unit: 'mm' } },
    outputs: {
      C19: { label: 'Omtrek', unit: 'm' },
      E19: { label: 'Oppervlakte', unit: 'm²' },
    },
  },
  cirkel_segment: {
    description: 'Bereken het ringoppervlak tussen een buiten- en binnendiameter.',
    inputs: {
      B25: { label: 'Buitendiameter', unit: 'mm' },
      B26: { label: 'Binnendiameter', unit: 'mm' },
    },
    outputs: {
      C25: { label: 'Omtrek buiten', unit: 'm' },
      E25: { label: 'Oppervlakte buiten', unit: 'm²' },
      C26: { label: 'Omtrek binnen', unit: 'm' },
      E26: { label: 'Oppervlakte binnen', unit: 'm²' },
      E27: { label: 'Ringoppervlakte', unit: 'm²' },
    },
  },
  flenskast: {
    description: 'Bereken ringsegmenten, mantel en totale oppervlakte van een flenskast.',
    inputs: {
      B31: { label: 'Buitendiameter', unit: 'mm' },
      B32: { label: 'Binnendiameter', unit: 'mm' },
      B34: { label: 'Manteldiameter', unit: 'mm' },
      D34: { label: 'Mantellengte', unit: 'mm' },
    },
    outputs: {
      C31: { label: 'Omtrek buiten', unit: 'm' },
      E31: { label: 'Oppervlakte buiten', unit: 'm²' },
      C32: { label: 'Omtrek binnen', unit: 'm' },
      E32: { label: 'Oppervlakte binnen', unit: 'm²' },
      E33: { label: '2 ringsegmenten', unit: 'm²' },
      C34: { label: 'Mantelafwikkeling', unit: 'm' },
      E34: { label: 'Manteloppervlakte', unit: 'm²' },
      F34: { label: 'Totale oppervlakte', unit: 'm²' },
    },
  },
  rechthoek_oppervlakte: {
    description: 'Bereken de totale oppervlakte van één of meerdere rechthoeken.',
    inputs: {
      B38: { label: 'Aantal', unit: 'st' },
      C38: { label: 'Zijde A', unit: 'mm' },
      D38: { label: 'Zijde B', unit: 'mm' },
    },
    outputs: { E38: { label: 'Oppervlakte', unit: 'm²' } },
  },
  rechthoek_omvang: {
    description: 'Bereken de omvang van een rechthoek.',
    inputs: {
      C40: { label: 'Zijde A', unit: 'mm' },
      D40: { label: 'Zijde B', unit: 'mm' },
    },
    outputs: { E40: { label: 'Omvang', unit: 'mm' } },
  },
  kast: {
    description: 'Bereken kastoppervlakte en varianten zonder bodem of wand.',
    inputs: {
      B45: { label: 'Hoogte', unit: 'mm' },
      C45: { label: 'Zijde A', unit: 'mm' },
      D45: { label: 'Zijde B', unit: 'mm' },
      C46: { label: 'Bodem zijde A', unit: 'mm' },
      D46: { label: 'Bodem zijde B', unit: 'mm' },
      C47: { label: 'Wand zijde A', unit: 'mm' },
      D47: { label: 'Wand zijde B', unit: 'mm' },
    },
    outputs: {
      E45: { label: 'Totale oppervlakte', unit: 'm²' },
      F45: { label: 'Zonder bodem', unit: 'm²' },
      G45: { label: 'Zonder wand', unit: 'm²' },
      E46: { label: 'Bodemoppervlakte', unit: 'm²' },
      E47: { label: 'Wandoppervlakte', unit: 'm²' },
    },
  },
  trapezium: {
    description: 'Bereken de oppervlakte van een trapezium.',
    inputs: {
      B51: { label: 'Hoogte', unit: 'mm' },
      C51: { label: 'Zijde A', unit: 'mm' },
      D51: { label: 'Zijde B', unit: 'mm' },
    },
    outputs: { E51: { label: 'Oppervlakte', unit: 'm²' } },
  },
  conus_verloop_diameter: {
    description: 'Bereken de oppervlakte van een conus/verloop op basis van lengte en twee diameters.',
    resultHint: 'Lengte en diameters in mm. Resultaat in m².',
    inputs: {
      B57: { label: 'Lengte', unit: 'mm', placeholder: '600' },
      C57: { label: 'Kleine diameter', unit: 'mm', placeholder: '300' },
      D57: { label: 'Grote diameter', unit: 'mm', placeholder: '900' },
    },
    outputs: { E57: { label: 'Oppervlakte', unit: 'm²' } },
  },
  conus_verloop_omtrek: {
    description: 'Bereken een conus/verloop wanneer de kleine en grote omtrek al bekend zijn.',
    inputs: {
      B59: { label: 'Hoogte', unit: 'm' },
      C59: { label: 'Kleine omtrek', unit: 'm' },
      D59: { label: 'Grote omtrek', unit: 'm' },
    },
    outputs: {
      E59: { label: 'Gemiddelde omtrek', unit: 'm' },
      F59: { label: 'Oppervlakte', unit: 'm²' },
    },
  },
  omvang_flenskap: {
    description: 'Bereken de afwikkeling/omvang van een ronde flenskap.',
    inputs: { D62: { label: 'Diameter flenskap', unit: 'mm' } },
    outputs: {
      B62: { label: 'Omvang', unit: 'mm' },
      C62: { label: 'Afwikkeling', unit: 'mm' },
    },
  },
  flenskap_met_deksels: {
    description: 'Bereken afwikkeling en totale oppervlakte van een flenskap met twee deksels.',
    inputs: {
      B65: { label: 'Diameter flenskap', unit: 'mm', placeholder: '450' },
      D65: { label: 'Lengte', unit: 'mm', placeholder: '600' },
    },
    outputs: {
      C65: { label: 'Afwikkeling', unit: 'm' },
      E65: { label: 'Totale oppervlakte', unit: 'm²' },
    },
  },
  flenskap_zonder_deksels: {
    description: 'Bereken afwikkeling en manteloppervlakte van een flenskap zonder deksels.',
    inputs: {
      B68: { label: 'Diameter flenskap', unit: 'mm' },
      D68: { label: 'Lengte', unit: 'mm' },
    },
    outputs: {
      C68: { label: 'Afwikkeling', unit: 'm' },
      E68: { label: 'Manteloppervlakte', unit: 'm²' },
    },
  },
  ronde_afsluiter: {
    description: 'Bereken de omvang van een ronde afsluiter en rond af op 10 mm.',
    inputs: {
      D74: { label: 'Diameter', unit: 'mm' },
      E74: { label: 'Totale maat B', unit: 'mm' },
    },
    outputs: {
      C74: { label: 'Afwikkeling halve diameter', unit: 'mm' },
      B74: { label: 'Omvang', unit: 'mm' },
      B75: { label: 'Omvang afgerond', unit: 'mm' },
    },
  },
  ronde_afsluiterkap: {
    description: 'Bereken de oppervlakte van een ronde afsluiterkap met twee deksels.',
    inputs: {
      B81: { label: 'Lengte', unit: 'mm' },
      C81: { label: 'Maat C', unit: 'mm' },
      D81: { label: 'Diameter', unit: 'mm' },
    },
    outputs: { E81: { label: 'Oppervlakte', unit: 'm²' } },
  },
  inzet: {
    description: 'Bereken de totale omvang uit breedte, lengte en hoogte.',
    inputs: {
      B84: { label: 'Breedte', unit: 'mm' },
      C84: { label: 'Lengte', unit: 'mm' },
      D84: { label: 'Hoogte', unit: 'mm' },
    },
    outputs: { E84: { label: 'Omvang', unit: 'mm' } },
  },
  rechthoekige_afsluiterkap_omvang: {
    description: 'Bereken de omvang van een rechthoekige afsluiterkap.',
    inputs: {
      C87: { label: 'Zijde A', unit: 'mm' },
      D87: { label: 'Zijde C', unit: 'mm' },
    },
    outputs: { B87: { label: 'Omvang', unit: 'mm' } },
  },
  rechthoekige_afsluiterkap: {
    description: 'Bereken de oppervlakte van een rechthoekige afsluiterkap met twee deksels.',
    inputs: {
      B90: { label: 'Lengte', unit: 'mm', placeholder: '600' },
      C90: { label: 'Breedte', unit: 'mm', placeholder: '500' },
      D90: { label: 'Hoogte', unit: 'mm', placeholder: '600' },
    },
    outputs: { E90: { label: 'Oppervlakte', unit: 'm²' } },
  },
  ovale_flenskap: {
    description: 'Bereken de omvang van een ovale flenskap.',
    inputs: {
      D95: { label: 'Diameter ronde uiteinden', unit: 'mm' },
      E95: { label: 'Totale ovale maat', unit: 'mm' },
    },
    outputs: {
      C95: { label: 'Afwikkeling ronde delen', unit: 'mm' },
      B95: { label: 'Omvang', unit: 'mm' },
      B96: { label: 'Omvang afgerond', unit: 'mm' },
    },
  },
  ovale_afsluiter: {
    description: 'Bereken afwikkeling en oppervlakte van een ovale afsluiter met deksels.',
    inputs: {
      B99: { label: 'Maat A', unit: 'mm' },
      C99: { label: 'Maat C', unit: 'mm' },
      D99: { label: 'Lengte', unit: 'mm' },
    },
    outputs: {
      B101: { label: 'Fictieve diameter', unit: 'mm' },
      C101: { label: 'Afwikkeling', unit: 'm' },
      E99: { label: 'Oppervlakte', unit: 'm²' },
    },
  },
  bocht_lengte: {
    description: 'Bereken de buitenlengte van een bocht voor 90° en 45°.',
    inputs: {
      B104: { label: 'Radius', unit: 'mm' },
      C104: { label: 'Diameter', unit: 'mm' },
    },
    outputs: {
      F104: { label: 'Buitenlengte 90°', unit: 'mm' },
      D104: { label: 'Buitenlengte 45°', unit: 'mm' },
    },
  },
  bocht_oppervlakte: {
    description: 'Bereken de oppervlakte van een bocht op basis van radius en diameter.',
    inputs: {
      B108: { label: 'Radius', unit: 'mm' },
      C108: { label: 'Diameter', unit: 'mm' },
    },
    outputs: {
      B109: { label: 'Bochtlengte 90°', unit: 'm' },
      D108: { label: 'Oppervlakte 90°', unit: 'm²' },
      E108: { label: 'Oppervlakte 45°', unit: 'm²' },
    },
  },
  knik_hartmaat: {
    description: 'Bereken de halve hartmaat van een knik.',
    inputs: {
      C112: { label: 'Hoek', unit: '°' },
      D112: { label: 'Radius', unit: 'mm' },
    },
    outputs: { E112: { label: 'Lengte halve hartmaat', unit: 'mm' } },
  },
  bocht_segmenten: {
    description: 'Bereken hoeken en segmentradius voor een gesegmenteerde bocht.',
    inputs: {
      B119: { label: 'Hoogte C', unit: 'mm' },
      C119: { label: 'Aantal segmenten', unit: 'st' },
    },
    outputs: {
      C120: { label: 'Hoek 1', unit: '°' },
      C121: { label: 'Hoek 2', unit: '°' },
      E119: { label: 'Radius', unit: 'mm' },
    },
  },
  bolkop: {
    description: 'Bereken de oppervlakte van een geïsoleerde bolkop.',
    inputs: {
      B126: { label: 'Straal', unit: 'mm' },
      C126: { label: 'Isolatiedikte', unit: 'mm' },
    },
    outputs: { E126: { label: 'Oppervlakte', unit: 'm²' } },
  },
  bol: {
    description: 'Bereken de oppervlakte van een geïsoleerde bol.',
    inputs: {
      B129: { label: 'Straal', unit: 'mm' },
      C129: { label: 'Isolatiedikte', unit: 'mm' },
    },
    outputs: { E129: { label: 'Oppervlakte', unit: 'm²' } },
  },
  uren_100_stelsel: {
    description: 'Zet minuten om naar uren in 100-stelsel.',
    inputs: { A133: { label: 'Minuten', unit: 'min' } },
    outputs: { B133: { label: '100-stelsel', unit: 'uur' } },
  },
  gaasdekens_rollen: {
    description: 'Bereken totale m² en subtotaal op basis van m² per rol, aantal rollen en prijs.',
    inputs: {
      B136: { label: 'M² per rol', unit: 'm²' },
      C136: { label: 'Aantal rollen', unit: 'st' },
      E136: { label: 'Prijs per m²', unit: '€' },
    },
    outputs: {
      D136: { label: 'Totaal', unit: 'm²' },
      F136: { label: 'Subtotaal', unit: '€' },
    },
  },
  plaat_gewicht: {
    description: 'Bereken gewicht en oppervlakte van plaatmateriaal met een opgegeven soortelijk gewicht.',
    inputs: {
      B143: { label: 'Plaatlengte', unit: 'mm', placeholder: '2000' },
      C143: { label: 'Plaatbreedte', unit: 'mm', placeholder: '1000' },
      D143: { label: 'Plaatdikte', unit: 'mm', placeholder: '2' },
      E143: { label: 'Soortelijk gewicht', unit: 'kg/dm³', placeholder: '2,70' },
    },
    outputs: {
      G143: { label: 'Oppervlakte', unit: 'm²' },
      F143: { label: 'Gewicht', unit: 'kg' },
    },
  },
  aluminium_bedrag: {
    description: 'Bereken aluminiumprijs op basis van gewicht en prijs per kilogram.',
    inputs: {
      B148: { label: 'Gewicht', unit: 'kg' },
      C148: { label: 'Prijs per kg', unit: '€' },
    },
    outputs: { E148: { label: 'Prijs aluminium', unit: '€' } },
  },
  dia_omvang_lookup: { description: 'Technische lookup voor diameter, omvang en radius.' },
  pu_flenskap: {
    description: 'Bereken isolatiedikte voor een PU-schuim flenskap.',
    inputs: {
      D158: { label: 'Diameter flenskap', unit: 'mm' },
      D160: { label: 'Diameter leiding', unit: 'mm' },
      E158: { label: 'Isolatiedikte leiding', unit: 'mm' },
    },
    outputs: {
      B158: { label: 'Omvang flenskap', unit: 'mm' },
      C158: { label: 'Afwikkeling flenskap', unit: 'mm' },
      B160: { label: 'Omvang leiding', unit: 'mm' },
      C160: { label: 'Afwikkeling leiding', unit: 'mm' },
      E160: { label: 'PU-isolatiedikte', unit: 'mm' },
    },
  },
  pu_rechthoekige_kap: {
    description: 'Bereken geometrie en PU-isolatiedikte voor een rechthoekige afsluiterkap.',
    inputs: {
      C165: { label: 'Zijde C', unit: 'mm' },
      D165: { label: 'Zijde B', unit: 'mm' },
      C170: { label: 'Geïsoleerde leidingdiameter', unit: 'mm' },
      E165: { label: 'Isolatiedikte leiding', unit: 'mm' },
      C167: { label: 'Driehoek zijde 1', unit: 'mm' },
      C168: { label: 'Driehoek zijde 2', unit: 'mm' },
    },
    outputs: {
      B165: { label: 'Omvang kap', unit: 'mm' },
      C166: { label: 'PU-isolatiedikte', unit: 'mm' },
      E167: { label: 'Zijde C berekend', unit: 'mm' },
      C169: { label: 'Zijde A', unit: 'mm' },
      D170: { label: 'Geïsoleerde leidingradius', unit: 'mm' },
    },
  },
  pu_hondenhok_kap: {
    description: 'Bereken geometrie en PU-isolatiedikte voor een hondenhok-afsluiterkap.',
    inputs: {
      C173: { label: 'Diameter', unit: 'mm' },
      D173: { label: 'Totale maat', unit: 'mm' },
      E173: { label: 'Isolatiedikte', unit: 'mm' },
      C175: { label: 'Geïsoleerde leidingdiameter', unit: 'mm' },
      C176: { label: 'Driehoek zijde 1', unit: 'mm' },
      C177: { label: 'Driehoek zijde 2', unit: 'mm' },
    },
    outputs: {
      B173: { label: 'Omvang kap', unit: 'mm' },
      C174: { label: 'Afwikkeling halve diameter', unit: 'mm' },
      E175: { label: 'Diameter geïsoleerde leiding', unit: 'mm' },
      D177: { label: 'Zijde B', unit: 'mm' },
      C178: { label: 'Zijde A', unit: 'mm' },
      D178: { label: 'Zijde A gecorrigeerd', unit: 'mm' },
    },
  },
  isolatie_volume: {
    description: 'Bereken oppervlak, volume en gewicht van isolatie rond een cilindrische vorm.',
    inputs: {
      A185: { label: 'Hoogte / lengte', unit: 'mm' },
      B185: { label: 'Radius', unit: 'mm' },
      C185: { label: 'Isolatiedikte', unit: 'mm' },
      A187: { label: 'Densiteit', unit: 'kg/m³' },
    },
    outputs: {
      F185: { label: 'Oppervlakte', unit: 'm²' },
      E185: { label: 'Volume', unit: 'm³' },
      E187: { label: 'Gewicht', unit: 'kg' },
    },
  },
  gaasdeken_gewicht: {
    description: 'Bereken omvang, oppervlak, volume en gewicht van een gaasdeken.',
    inputs: {
      A192: { label: 'Hoogte / lengte', unit: 'mm' },
      B192: { label: 'Diameter', unit: 'mm' },
      C192: { label: 'Isolatiedikte', unit: 'mm' },
      A194: { label: 'Densiteit', unit: 'kg/m³' },
    },
    outputs: {
      E190: { label: 'Omvang', unit: 'mm' },
      F192: { label: 'Oppervlakte', unit: 'm²' },
      E192: { label: 'Volume', unit: 'm³' },
      E194: { label: 'Gewicht', unit: 'kg' },
    },
  },
  alu_beplating_gewicht: {
    description: 'Bereken omvang, oppervlakte en gewicht van aluminium beplating.',
    inputs: {
      A199: { label: 'Hoogte / lengte', unit: 'mm' },
      B199: { label: 'Diameter', unit: 'mm' },
      C199: { label: 'Isolatiedikte', unit: 'mm' },
      A201: { label: 'Gewicht per m²', unit: 'kg/m²' },
    },
    outputs: {
      E197: { label: 'Omvang', unit: 'mm' },
      E199: { label: 'Oppervlakte', unit: 'm²' },
      E201: { label: 'Gewicht', unit: 'kg' },
    },
  },
  norton_band: {
    description: 'Bereken benodigde uren en prijs voor Norton band.',
    inputs: {
      A206: { label: 'Aantal meters', unit: 'm' },
      B206: { label: 'Tijd per meter', unit: 'min' },
      D206: { label: 'Eenheidsprijs per meter', unit: '€' },
    },
    outputs: {
      C206: { label: 'Benodigde uren', unit: 'uur' },
      E206: { label: 'Totale prijs', unit: '€' },
    },
  },
  bedrag_verschil_percentage: {
    description: 'Bereken verschil en percentage tussen een hoog en laag bedrag.',
    inputs: {
      A209: { label: 'Hoogste bedrag', unit: '€' },
      B209: { label: 'Laagste bedrag', unit: '€' },
    },
    outputs: {
      C209: { label: 'Verschil', unit: '€' },
      D209: { label: 'Percentage', unit: '%' },
    },
  },
  bedrag_factor: {
    description: 'Vermenigvuldig een bedrag met een factor.',
    inputs: {
      A211: { label: 'Bedrag', unit: '€' },
      B211: { label: 'Factor' },
    },
    outputs: { C211: { label: 'Uitkomst', unit: '€' } },
  },
  bedrag_factor_omrekening: {
    description: 'Reken een bedrag om van de ene factor naar een andere factor.',
    inputs: {
      B212: { label: 'Bedrag', unit: '€' },
      C212: { label: 'Huidige factor' },
      A213: { label: 'Nieuwe factor' },
    },
    outputs: { D213: { label: 'Omgerekend bedrag', unit: '€' } },
  },
  bocht_praktische_limiet: {
    description: 'Controleer of een bocht praktisch uitvoerbaar is met de opgegeven diameter, isolatie en radius.',
    inputs: {
      J215: { label: 'Extra marge per zijde', unit: 'mm' },
      B216: { label: 'Pijpdiameter', unit: 'mm' },
      C216: { label: 'Isolatiedikte', unit: 'mm' },
      D216: { label: 'Beschikbare radius', unit: 'mm' },
    },
    outputs: {
      E216: { label: 'Buitendiameter beplating', unit: 'mm' },
      F216: { label: 'Praktische limiet', unit: 'mm' },
      H216: { label: 'Conclusie' },
    },
  },
};

export function getCalculatorMeta(id: string): CalculatorMeta {
  return calculatorMeta[id] ?? {
    description: 'Voer de gevraagde maten in om de technische berekening uit te voeren.',
  };
}

export function getSafeInputLabel(
  calculatorId: string,
  inputId: string,
  index: number
): string {
  const label = calculatorMeta[calculatorId]?.inputs?.[inputId]?.label?.trim();
  return label || `Invoer ${index + 1}`;
}

export function getOutputPresentation(
  calculatorId: string,
  formulaId: string,
  fallbackLabel: string
): { label: string; unit?: string } {
  return calculatorMeta[calculatorId]?.outputs?.[formulaId] ?? {
    label: fallbackLabel || 'Resultaat',
  };
}
