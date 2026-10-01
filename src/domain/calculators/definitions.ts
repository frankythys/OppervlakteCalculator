// Nette calculator-definities met LEESBARE benoemde variabelen.
// Geen Excel-celnamen, geen losse formule-engine: elke uitkomst is een
// gewone JS-functie met echte namen (radius, diameter, lengte ...).
// Alle maten in mm tenzij anders vermeld; oppervlakte in m², volume in m³.

export type DefSelectOption = { label: string; value: string; description?: string };

export type DefInput = {
  key: string;
  label: string;
  unit?: string;
  placeholder?: string;
  step?: number;
  defaultValue?: string;
  options?: DefSelectOption[];
  // Optionele velden blokkeren het resultaat niet als ze leeg zijn.
  optional?: boolean;
  // Alleen tonen bij deze modi (leeg = altijd tonen).
  modes?: string[];
};

export type Vars = Record<string, number>;

export type DefOutput = {
  label: string;
  unit?: string;
  primary?: boolean;
  compute: (v: Vars) => number | string;
  // Alleen tonen bij deze modi (leeg = altijd tonen).
  modes?: string[];
};

export type CalcDefinition = {
  id: string;
  title: string;
  category: string;
  description?: string;
  resultHint?: string;
  inputs: DefInput[];
  outputs: DefOutput[];
  // Optionele modus-dropdown die bepaalt welke invoer/uitkomsten zichtbaar zijn.
  modeLabel?: string;
  modes?: DefSelectOption[];
};

const PI = Math.PI;
// Oppervlakte van een cirkel uit diameter (mm) -> m²
const circleAreaM2 = (diameterMm: number) => PI * (diameterMm / 2 / 1000) ** 2;
// Omtrek uit diameter (mm) -> m
const circumferenceM = (diameterMm: number) => (PI * diameterMm) / 1000;
// Rond naar boven af op een veelvoud (bv. 10 mm)
const ceilToMultiple = (value: number, step: number) => (step === 0 ? value : Math.ceil(value / step) * step);

export const definitions: CalcDefinition[] = [
  {
    id: 'cirkel',
    title: 'Cirkel',
    category: 'Vormen',
    description: 'Bereken een volledige cirkel of een cirkelsegment (ring).',
    modeLabel: 'Type',
    modes: [
      { label: 'Volledige cirkel', value: 'vol' },
      { label: 'Cirkelsegment (ring)', value: 'segment' },
    ],
    inputs: [
      { key: 'diameter', label: 'Diameter', unit: 'mm', modes: ['vol'] },
      { key: 'buitendiameter', label: 'Buitendiameter', unit: 'mm', modes: ['segment'] },
      { key: 'binnendiameter', label: 'Binnendiameter', unit: 'mm', modes: ['segment'] },
    ],
    outputs: [
      { label: 'Omtrek', unit: 'm', modes: ['vol'], compute: ({ diameter }) => circumferenceM(diameter) },
      { label: 'Oppervlakte', unit: 'm²', primary: true, modes: ['vol'], compute: ({ diameter }) => circleAreaM2(diameter) },
      { label: 'Omtrek buiten', unit: 'm', modes: ['segment'], compute: ({ buitendiameter }) => circumferenceM(buitendiameter) },
      { label: 'Oppervlakte buiten', unit: 'm²', modes: ['segment'], compute: ({ buitendiameter }) => circleAreaM2(buitendiameter) },
      { label: 'Omtrek binnen', unit: 'm', modes: ['segment'], compute: ({ binnendiameter }) => circumferenceM(binnendiameter) },
      { label: 'Oppervlakte binnen', unit: 'm²', modes: ['segment'], compute: ({ binnendiameter }) => circleAreaM2(binnendiameter) },
      {
        label: 'Ringoppervlakte',
        unit: 'm²',
        primary: true,
        modes: ['segment'],
        compute: ({ buitendiameter, binnendiameter }) => circleAreaM2(buitendiameter) - circleAreaM2(binnendiameter),
      },
    ],
  },
  {
    id: 'flenskast',
    title: 'Flenskast',
    category: 'Flenskappen',
    description: 'Bereken ringsegmenten, mantel en totale oppervlakte van een flenskast.',
    inputs: [
      { key: 'buitendiameter', label: 'Buitendiameter', unit: 'mm' },
      { key: 'binnendiameter', label: 'Binnendiameter', unit: 'mm' },
      { key: 'manteldiameter', label: 'Manteldiameter', unit: 'mm' },
      { key: 'mantellengte', label: 'Mantellengte', unit: 'mm' },
    ],
    outputs: [
      { label: 'Omtrek buiten', unit: 'm', compute: ({ buitendiameter }) => circumferenceM(buitendiameter) },
      { label: 'Omtrek binnen', unit: 'm', compute: ({ binnendiameter }) => circumferenceM(binnendiameter) },
      {
        label: '2 ringsegmenten',
        unit: 'm²',
        compute: ({ buitendiameter, binnendiameter }) => (circleAreaM2(buitendiameter) - circleAreaM2(binnendiameter)) * 2,
      },
      {
        label: 'Manteloppervlakte',
        unit: 'm²',
        compute: ({ manteldiameter, mantellengte }) => (circumferenceM(manteldiameter) * mantellengte) / 1000,
      },
      {
        label: 'Totale oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ buitendiameter, binnendiameter, manteldiameter, mantellengte }) =>
          (circleAreaM2(buitendiameter) - circleAreaM2(binnendiameter)) * 2 +
          (circumferenceM(manteldiameter) * mantellengte) / 1000,
      },
    ],
  },
  {
    id: 'rechthoek_oppervlakte',
    title: 'Rechthoek',
    category: 'Vormen',
    description: 'Bereken de oppervlakte of de omvang van een rechthoek.',
    modeLabel: 'Berekening',
    modes: [
      { label: 'Oppervlakte', value: 'opp' },
      { label: 'Omvang', value: 'omv' },
    ],
    inputs: [
      { key: 'aantal', label: 'Aantal', unit: 'st', defaultValue: '1', modes: ['opp'] },
      { key: 'zijdeA', label: 'Zijde A', unit: 'mm' },
      { key: 'zijdeB', label: 'Zijde B', unit: 'mm' },
    ],
    outputs: [
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        modes: ['opp'],
        compute: ({ aantal, zijdeA, zijdeB }) => (aantal * zijdeA * zijdeB) / 1_000_000,
      },
      {
        label: 'Omvang',
        unit: 'mm',
        primary: true,
        modes: ['omv'],
        compute: ({ zijdeA, zijdeB }) => zijdeA * 2 + zijdeB * 2,
      },
    ],
  },
  {
    id: 'kast',
    title: 'Kast',
    category: 'Kappen en kasten',
    description: 'Bereken kastoppervlakte en varianten zonder bodem of wand.',
    inputs: [
      { key: 'hoogte', label: 'Hoogte', unit: 'mm' },
      { key: 'zijdeA', label: 'Zijde A', unit: 'mm' },
      { key: 'zijdeB', label: 'Zijde B', unit: 'mm' },
      { key: 'bodemA', label: 'Bodem zijde A', unit: 'mm' },
      { key: 'bodemB', label: 'Bodem zijde B', unit: 'mm' },
      { key: 'wandA', label: 'Wand zijde A', unit: 'mm' },
      { key: 'wandB', label: 'Wand zijde B', unit: 'mm' },
    ],
    outputs: [
      {
        label: 'Totale oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ hoogte, zijdeA, zijdeB }) =>
          (2 * (zijdeA * zijdeB + zijdeA * hoogte + zijdeB * hoogte)) / 1_000_000,
      },
      {
        label: 'Zonder bodem',
        unit: 'm²',
        compute: ({ hoogte, zijdeA, zijdeB, bodemA, bodemB }) =>
          (2 * (zijdeA * zijdeB + zijdeA * hoogte + zijdeB * hoogte)) / 1_000_000 - (bodemA * bodemB) / 1_000_000,
      },
      {
        label: 'Zonder wand',
        unit: 'm²',
        compute: ({ hoogte, zijdeA, zijdeB, wandA, wandB }) =>
          (2 * (zijdeA * zijdeB + zijdeA * hoogte + zijdeB * hoogte)) / 1_000_000 - (wandA * wandB) / 1_000_000,
      },
      { label: 'Bodemoppervlakte', unit: 'm²', compute: ({ bodemA, bodemB }) => (bodemA * bodemB) / 1_000_000 },
      { label: 'Wandoppervlakte', unit: 'm²', compute: ({ wandA, wandB }) => (wandA * wandB) / 1_000_000 },
    ],
  },
  {
    id: 'trapezium',
    title: 'Trapezium',
    category: 'Vormen',
    description: 'Bereken de oppervlakte van een trapezium.',
    inputs: [
      { key: 'hoogte', label: 'Hoogte', unit: 'mm' },
      { key: 'zijdeA', label: 'Zijde A', unit: 'mm' },
      { key: 'zijdeB', label: 'Zijde B', unit: 'mm' },
    ],
    outputs: [
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ hoogte, zijdeA, zijdeB }) => ((zijdeA + zijdeB) / 2 * hoogte) / 1_000_000,
      },
    ],
  },
  {
    id: 'bol',
    title: 'Bol / bolkop - oppervlakte',
    category: 'Tanks en bollen',
    description: 'Bereken de geïsoleerde oppervlakte van een bol of bolkop (halve bol).',
    resultHint: 'Maten in mm. Oppervlakte in m², gemeten over de isolatie.',
    inputs: [
      {
        key: 'vorm',
        label: 'Vorm',
        defaultValue: '1',
        options: [
          { label: 'Hele bol', value: '1', description: 'Volledige bol · 4·π·r²' },
          { label: 'Halve bol (bolkop)', value: '0.5', description: 'Bolkop · 2·π·r²' },
        ],
      },
      { key: 'straal', label: 'Straal', unit: 'mm' },
      { key: 'isolatiedikte', label: 'Isolatiedikte', unit: 'mm', defaultValue: '0' },
    ],
    outputs: [
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ vorm, straal, isolatiedikte }) =>
          ((4 * PI * (straal + isolatiedikte) ** 2) / 1_000_000) * vorm,
      },
    ],
  },

  // ---------------- Leidingen ----------------
  {
    id: 'leiding_met_isolatie',
    title: 'Leidingwerk',
    category: 'Leidingen',
    description: 'Bereken afwikkeling en oppervlakte van een leiding inclusief isolatiedikte.',
    resultHint: 'Afmetingen in mm. Oppervlakte wordt weergegeven in m².',
    inputs: [
      { key: 'diameterKaal', label: 'Diameter leiding kaal', unit: 'mm', placeholder: '300' },
      { key: 'isolatiedikte', label: 'Isolatiedikte', unit: 'mm', placeholder: '50' },
      { key: 'lengte', label: 'Lengte', unit: 'mm', placeholder: '10000' },
    ],
    outputs: [
      { label: 'Afwikkeling', unit: 'm', compute: ({ diameterKaal, isolatiedikte }) => circumferenceM(diameterKaal + isolatiedikte * 2) },
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ diameterKaal, isolatiedikte, lengte }) => (circumferenceM(diameterKaal + isolatiedikte * 2) * lengte) / 1000,
      },
    ],
  },
  {
    id: 'conus_verloop_diameter',
    title: 'Conus / verloop',
    category: 'Leidingen',
    description: 'Bereken de oppervlakte van een conus/verloop op basis van lengte en twee diameters.',
    resultHint: 'Lengte en diameters in mm. Resultaat in m².',
    inputs: [
      { key: 'lengte', label: 'Lengte', unit: 'mm', placeholder: '600' },
      { key: 'kleineDiameter', label: 'Kleine diameter', unit: 'mm', placeholder: '300' },
      { key: 'groteDiameter', label: 'Grote diameter', unit: 'mm', placeholder: '900' },
    ],
    outputs: [
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ lengte, kleineDiameter, groteDiameter }) => (((kleineDiameter + groteDiameter) / 2) * PI * lengte) / 1_000_000,
      },
    ],
  },

  // ---------------- Bochten ----------------
  {
    id: 'bocht_oppervlakte',
    title: 'Bocht - oppervlakte',
    category: 'Bochten',
    description: 'Bereken de oppervlakte van een bocht op basis van radius en diameter.',
    inputs: [
      { key: 'radius', label: 'Radius', unit: 'mm' },
      { key: 'diameter', label: 'Diameter', unit: 'mm' },
    ],
    outputs: [
      { label: 'Bochtlengte 90°', unit: 'm', compute: ({ radius }) => (radius * (PI / 2)) / 1000 },
      {
        label: 'Oppervlakte 90°',
        unit: 'm²',
        primary: true,
        compute: ({ radius, diameter }) => (PI * diameter * ((radius * (PI / 2)) / 1000)) / 1000,
      },
      {
        label: 'Oppervlakte 45°',
        unit: 'm²',
        compute: ({ radius, diameter }) => (PI * diameter * ((radius * (PI / 2)) / 1000)) / 1000 / 2,
      },
    ],
  },
  {
    id: 'bocht_segmenten',
    title: 'Segmenten bocht (Duitse bocht)',
    category: 'Bochten',
    description: 'Bereken hoeken en segmentradius voor een gesegmenteerde bocht.',
    inputs: [
      { key: 'hoogteC', label: 'Hoogte C', unit: 'mm' },
      { key: 'aantalSegmenten', label: 'Aantal segmenten', unit: 'st' },
      { key: 'kaleDiameter', label: 'Kale leidingdiameter', unit: 'mm', placeholder: '1230', optional: true },
      { key: 'isolatiedikte', label: 'Isolatiedikte', unit: 'mm', placeholder: '80', optional: true },
    ],
    outputs: [
      { label: 'Hoek 1', unit: '°', compute: ({ aantalSegmenten }) => 90 / aantalSegmenten },
      { label: 'Hoek 2', unit: '°', compute: ({ aantalSegmenten }) => 90 - 90 / aantalSegmenten },
      {
        label: 'DIA (buitendiameter geïsoleerd)',
        unit: 'mm',
        compute: ({ kaleDiameter, isolatiedikte }) => kaleDiameter + 2 * isolatiedikte,
      },
      {
        label: 'Radius',
        unit: 'mm',
        primary: true,
        compute: ({ hoogteC, aantalSegmenten }) => hoogteC * Math.tan(((90 - 90 / aantalSegmenten) * PI) / 180),
      },
    ],
  },
  {
    id: 'bocht_praktische_limiet',
    title: 'Bocht - praktische limiet',
    category: 'Bochten',
    description: 'Controleer of een bocht praktisch uitvoerbaar is met de opgegeven diameter, isolatie en radius.',
    inputs: [
      { key: 'marge', label: 'Extra marge per zijde', unit: 'mm' },
      { key: 'pijpdiameter', label: 'Pijpdiameter', unit: 'mm' },
      { key: 'isolatiedikte', label: 'Isolatiedikte', unit: 'mm' },
      { key: 'radius', label: 'Beschikbare radius', unit: 'mm' },
    ],
    outputs: [
      {
        label: 'Buitendiameter beplating',
        unit: 'mm',
        compute: ({ pijpdiameter, isolatiedikte, marge }) => pijpdiameter + 2 * isolatiedikte + 2 * (marge * 2),
      },
      {
        label: 'Praktische limiet',
        unit: 'mm',
        compute: ({ pijpdiameter, isolatiedikte, marge }) => (pijpdiameter + 2 * isolatiedikte + 2 * (marge * 2)) / 2 + 20,
      },
      {
        label: 'Conclusie',
        primary: true,
        compute: ({ radius, pijpdiameter, isolatiedikte, marge }) =>
          radius > (pijpdiameter + 2 * isolatiedikte + 2 * (marge * 2)) / 2 + 20 ? '✅ Mogelijk' : '❌ Onmogelijk',
      },
    ],
  },

  // ---------------- Flenskappen ----------------
  {
    id: 'omvang_flenskap',
    title: 'Omvang flenskap',
    category: 'Flenskappen',
    description: 'Bereken de afwikkeling/omvang van een ronde flenskap.',
    inputs: [{ key: 'diameter', label: 'Diameter flenskap', unit: 'mm' }],
    outputs: [
      { label: 'Omvang', unit: 'mm', primary: true, compute: ({ diameter }) => PI * diameter },
      { label: 'Afwikkeling', unit: 'mm', compute: ({ diameter }) => PI * diameter },
    ],
  },
  {
    id: 'flenskap_met_deksels',
    title: 'Flenskap + 2 deksels',
    category: 'Flenskappen',
    description: 'Bereken afwikkeling en totale oppervlakte van een flenskap met twee deksels.',
    inputs: [
      { key: 'diameter', label: 'Diameter flenskap', unit: 'mm', placeholder: '450' },
      { key: 'lengte', label: 'Lengte', unit: 'mm', placeholder: '600' },
    ],
    outputs: [
      { label: 'Afwikkeling', unit: 'm', compute: ({ diameter }) => circumferenceM(diameter) },
      {
        label: 'Totale oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ diameter, lengte }) => (circumferenceM(diameter) * lengte) / 1000 + circleAreaM2(diameter) * 2,
      },
    ],
  },
  {
    id: 'flenskap_zonder_deksels',
    title: 'Flenskap zonder deksels',
    category: 'Flenskappen',
    description: 'Bereken afwikkeling en manteloppervlakte van een flenskap zonder deksels.',
    inputs: [
      { key: 'diameter', label: 'Diameter flenskap', unit: 'mm' },
      { key: 'lengte', label: 'Lengte', unit: 'mm' },
    ],
    outputs: [
      { label: 'Afwikkeling', unit: 'm', compute: ({ diameter }) => circumferenceM(diameter) },
      { label: 'Manteloppervlakte', unit: 'm²', primary: true, compute: ({ diameter, lengte }) => (circumferenceM(diameter) * lengte) / 1000 },
    ],
  },
  {
    id: 'ovale_flenskap',
    title: 'Ovale flenskap',
    category: 'Flenskappen',
    description: 'Bereken de omvang van een ovale flenskap.',
    inputs: [
      { key: 'diameterRond', label: 'Diameter ronde uiteinden', unit: 'mm' },
      { key: 'totaleOvaleMaat', label: 'Totale ovale maat', unit: 'mm' },
    ],
    outputs: [
      { label: 'Afwikkeling ronde delen', unit: 'mm', compute: ({ diameterRond }) => diameterRond * PI },
      {
        label: 'Omvang',
        unit: 'mm',
        compute: ({ diameterRond, totaleOvaleMaat }) => (totaleOvaleMaat - diameterRond) * 2 + diameterRond * PI,
      },
      {
        label: 'Omvang afgerond',
        unit: 'mm',
        primary: true,
        compute: ({ diameterRond, totaleOvaleMaat }) => ceilToMultiple((totaleOvaleMaat - diameterRond) * 2 + diameterRond * PI, 10),
      },
    ],
  },

  // ---------------- Afsluiters ----------------
  {
    id: 'ronde_afsluiter',
    title: 'Ronde afsluiter',
    category: 'Afsluiters',
    description: 'Bereken de omvang van een ronde afsluiter en rond af op 10 mm.',
    inputs: [
      { key: 'diameter', label: 'Diameter', unit: 'mm' },
      { key: 'totaleMaatB', label: 'Totale maat B', unit: 'mm' },
    ],
    outputs: [
      { label: 'Afwikkeling halve diameter', unit: 'mm', compute: ({ diameter }) => (diameter * PI) / 2 },
      {
        label: 'Omvang',
        unit: 'mm',
        compute: ({ diameter, totaleMaatB }) => (diameter * PI) / 2 + diameter + (totaleMaatB * 2 - diameter),
      },
      {
        label: 'Omvang afgerond',
        unit: 'mm',
        primary: true,
        compute: ({ diameter, totaleMaatB }) => ceilToMultiple((diameter * PI) / 2 + diameter + (totaleMaatB * 2 - diameter), 10),
      },
    ],
  },
  {
    id: 'ronde_afsluiterkap',
    title: 'Ronde afsluiterkap + deksels',
    category: 'Afsluiters',
    description: 'Bereken de oppervlakte van een ronde afsluiterkap met twee deksels.',
    inputs: [
      { key: 'lengte', label: 'Lengte', unit: 'mm' },
      { key: 'maatC', label: 'Maat C', unit: 'mm' },
      { key: 'diameter', label: 'Diameter', unit: 'mm' },
    ],
    outputs: [
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ lengte, maatC, diameter }) =>
          (((diameter * PI) / 2 + maatC + maatC) * lengte) / 1_000_000 + 2 * ((maatC * diameter) / 1_000_000),
      },
    ],
  },
  {
    id: 'rechthoekige_afsluiterkap_omvang',
    title: 'Rechthoekige afsluiterkap - omvang',
    category: 'Afsluiters',
    description: 'Bereken de omvang van een rechthoekige afsluiterkap.',
    inputs: [
      { key: 'zijdeA', label: 'Zijde A', unit: 'mm' },
      { key: 'zijdeC', label: 'Zijde C', unit: 'mm' },
    ],
    outputs: [{ label: 'Omvang', unit: 'mm', primary: true, compute: ({ zijdeA, zijdeC }) => zijdeA * 2 + zijdeC * 2 }],
  },
  {
    id: 'rechthoekige_afsluiterkap',
    title: 'Rechthoekige afsluiterkap + 2 deksels',
    category: 'Afsluiters',
    description: 'Bereken de oppervlakte van een rechthoekige afsluiterkap met twee deksels.',
    inputs: [
      { key: 'lengte', label: 'Lengte', unit: 'mm', placeholder: '600' },
      { key: 'breedte', label: 'Breedte', unit: 'mm', placeholder: '500' },
      { key: 'hoogte', label: 'Hoogte', unit: 'mm', placeholder: '600' },
    ],
    outputs: [
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ lengte, breedte, hoogte }) => (breedte * lengte * 2 + hoogte * lengte * 2 + breedte * hoogte * 2) / 1_000_000,
      },
    ],
  },
  {
    id: 'ovale_afsluiter',
    title: 'Ovale afsluiter + deksels',
    category: 'Afsluiters',
    description: 'Bereken afwikkeling en oppervlakte van een ovale afsluiter met deksels.',
    inputs: [
      { key: 'maatA', label: 'Maat A', unit: 'mm' },
      { key: 'maatC', label: 'Maat C', unit: 'mm' },
      { key: 'lengte', label: 'Lengte', unit: 'mm' },
    ],
    outputs: [
      { label: 'Fictieve diameter', unit: 'mm', compute: ({ maatA, maatC }) => maatC / 2 + maatA / 2 },
      { label: 'Afwikkeling', unit: 'm', compute: ({ maatA }) => (maatA / 1000) * PI },
      {
        label: 'Oppervlakte',
        unit: 'm²',
        primary: true,
        compute: ({ maatA, maatC, lengte }) =>
          (((maatA / 1000) * PI) * lengte) / 1000 + ((maatC / 2 + maatA / 2) / 2 / 1000) ** 2 * PI * 2,
      },
    ],
  },

  // ---------------- PU-schuim ----------------
  {
    id: 'pu_flenskap',
    title: 'PU-schuim - flenskap isolatiedikte',
    category: 'PU-schuim',
    description: 'Bereken isolatiedikte voor een PU-schuim flenskap.',
    inputs: [
      { key: 'diameterFlenskap', label: 'Diameter flenskap', unit: 'mm' },
      { key: 'diameterLeiding', label: 'Diameter leiding', unit: 'mm' },
      { key: 'isolatieLeiding', label: 'Isolatiedikte leiding', unit: 'mm' },
    ],
    outputs: [
      { label: 'Omvang flenskap', unit: 'mm', compute: ({ diameterFlenskap }) => diameterFlenskap * PI },
      { label: 'Afwikkeling flenskap', unit: 'mm', compute: ({ diameterFlenskap }) => diameterFlenskap * PI },
      { label: 'Omvang leiding', unit: 'mm', compute: ({ diameterLeiding }) => diameterLeiding * PI },
      { label: 'Afwikkeling leiding', unit: 'mm', compute: ({ diameterLeiding }) => diameterLeiding * PI },
      {
        label: 'PU-isolatiedikte',
        unit: 'mm',
        primary: true,
        compute: ({ diameterFlenskap, diameterLeiding, isolatieLeiding }) => (diameterFlenskap - diameterLeiding) / 2 + isolatieLeiding / 2,
      },
    ],
  },
  {
    id: 'pu_rechthoekige_kap',
    title: 'PU-schuim - rechthoekige afsluiterkap',
    category: 'PU-schuim',
    description: 'Bereken geometrie en PU-isolatiedikte voor een rechthoekige afsluiterkap.',
    inputs: [
      { key: 'zijdeC', label: 'Zijde C', unit: 'mm' },
      { key: 'zijdeB', label: 'Zijde B', unit: 'mm' },
      { key: 'isoLeidingDiameter', label: 'Geïsoleerde leidingdiameter', unit: 'mm' },
      { key: 'isolatieLeiding', label: 'Isolatiedikte leiding', unit: 'mm' },
      { key: 'driehoek1', label: 'Driehoek zijde 1', unit: 'mm' },
      { key: 'driehoek2', label: 'Driehoek zijde 2', unit: 'mm' },
    ],
    outputs: [
      { label: 'Omvang kap', unit: 'mm', compute: ({ zijdeC, zijdeB }) => zijdeC * 2 + zijdeB * 2 },
      { label: 'Zijde A', unit: 'mm', compute: ({ driehoek1, driehoek2 }) => Math.sqrt(driehoek1 ** 2 + driehoek2 ** 2) / 2 },
      { label: 'Geïsoleerde leidingradius', unit: 'mm', compute: ({ zijdeB, isoLeidingDiameter }) => zijdeB / 2 - isoLeidingDiameter / 2 },
      {
        label: 'PU-isolatiedikte',
        unit: 'mm',
        primary: true,
        compute: ({ driehoek1, driehoek2, isoLeidingDiameter }) => Math.sqrt(driehoek1 ** 2 + driehoek2 ** 2) / 2 - isoLeidingDiameter / 2,
      },
      {
        label: 'Zijde C berekend',
        unit: 'mm',
        compute: ({ driehoek1, driehoek2, isoLeidingDiameter, zijdeB, isolatieLeiding }) =>
          (Math.sqrt(driehoek1 ** 2 + driehoek2 ** 2) / 2 - isoLeidingDiameter / 2 + (zijdeB / 2 - isoLeidingDiameter / 2)) / 2 + isolatieLeiding / 2,
      },
    ],
  },
  {
    id: 'pu_hondenhok_kap',
    title: 'PU-schuim - hondenhok afsluiterkap',
    category: 'PU-schuim',
    description: 'Bereken geometrie en PU-isolatiedikte voor een hondenhok-afsluiterkap.',
    inputs: [
      { key: 'diameter', label: 'Diameter', unit: 'mm' },
      { key: 'totaleMaat', label: 'Totale maat', unit: 'mm' },
      { key: 'isolatiedikte', label: 'Isolatiedikte', unit: 'mm' },
      { key: 'isoLeidingDiameter', label: 'Geïsoleerde leidingdiameter', unit: 'mm' },
      { key: 'driehoek1', label: 'Driehoek zijde 1', unit: 'mm' },
      { key: 'driehoek2', label: 'Driehoek zijde 2', unit: 'mm' },
    ],
    outputs: [
      { label: 'Afwikkeling halve diameter', unit: 'mm', compute: ({ diameter }) => (diameter * PI) / 2 },
      {
        label: 'Omvang kap',
        unit: 'mm',
        compute: ({ diameter, totaleMaat }) => (diameter * PI) / 2 + diameter + (totaleMaat * 2 - diameter),
      },
      { label: 'Zijde B', unit: 'mm', compute: ({ totaleMaat, isoLeidingDiameter }) => (totaleMaat - isoLeidingDiameter) / 2 },
      { label: 'Zijde A', unit: 'mm', compute: ({ driehoek1, driehoek2 }) => Math.sqrt(driehoek1 ** 2 + driehoek2 ** 2) / 2 },
      {
        label: 'Zijde A gecorrigeerd',
        unit: 'mm',
        compute: ({ driehoek1, driehoek2, isoLeidingDiameter }) => Math.sqrt(driehoek1 ** 2 + driehoek2 ** 2) / 2 - isoLeidingDiameter / 2,
      },
      {
        label: 'Diameter geïsoleerde leiding',
        unit: 'mm',
        primary: true,
        compute: ({ driehoek1, driehoek2, isoLeidingDiameter, totaleMaat, isolatiedikte }) =>
          (Math.sqrt(driehoek1 ** 2 + driehoek2 ** 2) / 2 - isoLeidingDiameter / 2 + (totaleMaat - isoLeidingDiameter) / 2) / 2 + isolatiedikte / 2,
      },
    ],
  },

  // ---------------- Tijd en prijs / Materiaal / Algemeen ----------------
  {
    id: 'uren_100_stelsel',
    title: 'Minuten naar 100-stelsel',
    category: 'Tijd en prijs',
    description: 'Zet minuten om naar uren in 100-stelsel.',
    inputs: [{ key: 'minuten', label: 'Minuten', unit: 'min' }],
    outputs: [{ label: '100-stelsel', unit: 'uur', primary: true, compute: ({ minuten }) => minuten / 60 }],
  },
  {
    id: 'gaasdekens_rollen',
    title: 'Gaasdekens - rollen en prijs',
    category: 'Materiaal',
    description: 'Bereken totale m² en subtotaal op basis van m² per rol, aantal rollen en prijs.',
    inputs: [
      { key: 'm2PerRol', label: 'M² per rol', unit: 'm²' },
      { key: 'aantalRollen', label: 'Aantal rollen', unit: 'st' },
      { key: 'prijsPerM2', label: 'Prijs per m²', unit: '€' },
    ],
    outputs: [
      { label: 'Totaal', unit: 'm²', compute: ({ aantalRollen, m2PerRol }) => aantalRollen * m2PerRol },
      { label: 'Subtotaal', unit: '€', primary: true, compute: ({ aantalRollen, m2PerRol, prijsPerM2 }) => aantalRollen * m2PerRol * prijsPerM2 },
    ],
  },
  {
    id: 'aluminium_bedrag',
    title: 'Aluminium - bedrag',
    category: 'Materiaal',
    description: 'Bereken aluminiumprijs op basis van gewicht en prijs per kilogram.',
    inputs: [
      { key: 'gewicht', label: 'Gewicht', unit: 'kg' },
      { key: 'prijsPerKg', label: 'Prijs per kg', unit: '€' },
    ],
    outputs: [{ label: 'Prijs aluminium', unit: '€', primary: true, compute: ({ gewicht, prijsPerKg }) => gewicht * prijsPerKg }],
  },
  {
    id: 'norton_band',
    title: 'Norton band - tijd en prijs',
    category: 'Tijd en prijs',
    description: 'Bereken benodigde uren en prijs voor Norton band.',
    inputs: [
      { key: 'meters', label: 'Aantal meters', unit: 'm' },
      { key: 'tijdPerMeter', label: 'Tijd per meter', unit: 'min' },
      { key: 'eenheidsprijs', label: 'Eenheidsprijs per meter', unit: '€' },
    ],
    outputs: [
      { label: 'Benodigde uren', unit: 'uur', compute: ({ meters, tijdPerMeter }) => (meters * tijdPerMeter) / 60 },
      { label: 'Totale prijs', unit: '€', primary: true, compute: ({ meters, eenheidsprijs }) => meters * eenheidsprijs },
    ],
  },
  {
    id: 'percentage_verschil',
    title: 'Procent tussen 2 getallen',
    category: 'Algemeen',
    description: 'Bereken het verschil en het procentuele verschil tussen twee bedragen.',
    inputs: [
      { key: 'bedrag1', label: 'Bedrag 1 (grootste)', unit: '€' },
      { key: 'bedrag2', label: 'Bedrag 2', unit: '€' },
    ],
    outputs: [
      { label: 'Verschil', unit: '€', compute: ({ bedrag1, bedrag2 }) => bedrag1 - bedrag2 },
      { label: 'Procent verschil', unit: '%', primary: true, compute: ({ bedrag1, bedrag2 }) => ((bedrag1 - bedrag2) / bedrag1) * 100 },
    ],
  },
  {
    id: 'percentage_van_basis',
    title: 'Percentage van basisbedrag',
    category: 'Algemeen',
    description: 'Bereken welk percentage een bedrag van een basisbedrag vormt.',
    inputs: [
      { key: 'basisbedrag', label: 'Basisbedrag', unit: '€' },
      { key: 'bedrag', label: 'Bedrag', unit: '€' },
    ],
    outputs: [{ label: 'Percentage', unit: '%', primary: true, compute: ({ basisbedrag, bedrag }) => (bedrag / basisbedrag) * 100 }],
  },
  {
    id: 'bedrag_verschil_percentage',
    title: 'Bedrag - verschil en percentage',
    category: 'Tijd en prijs',
    description: 'Bereken verschil en percentage tussen een hoog en laag bedrag.',
    inputs: [
      { key: 'hoogsteBedrag', label: 'Hoogste bedrag', unit: '€' },
      { key: 'laagsteBedrag', label: 'Laagste bedrag', unit: '€' },
    ],
    outputs: [
      { label: 'Verschil', unit: '€', compute: ({ hoogsteBedrag, laagsteBedrag }) => hoogsteBedrag - laagsteBedrag },
      {
        label: 'Percentage',
        unit: '%',
        primary: true,
        compute: ({ hoogsteBedrag, laagsteBedrag }) => ((hoogsteBedrag - laagsteBedrag) / hoogsteBedrag) * 100,
      },
    ],
  },
  {
    id: 'bedrag_factor',
    title: 'Bedrag × factor',
    category: 'Tijd en prijs',
    description: 'Vermenigvuldig een bedrag met een factor.',
    inputs: [
      { key: 'bedrag', label: 'Bedrag', unit: '€' },
      { key: 'factor', label: 'Factor' },
    ],
    outputs: [{ label: 'Uitkomst', unit: '€', primary: true, compute: ({ bedrag, factor }) => bedrag * factor }],
  },
  {
    id: 'bedrag_factor_omrekening',
    title: 'Bedrag - factoromrekening',
    category: 'Tijd en prijs',
    description: 'Reken een bedrag om van de ene factor naar een andere factor.',
    inputs: [
      { key: 'bedrag', label: 'Bedrag', unit: '€' },
      { key: 'huidigeFactor', label: 'Huidige factor' },
      { key: 'nieuweFactor', label: 'Nieuwe factor' },
    ],
    outputs: [
      { label: 'Omgerekend bedrag', unit: '€', primary: true, compute: ({ bedrag, huidigeFactor, nieuweFactor }) => (bedrag / huidigeFactor) * nieuweFactor },
    ],
  },
];

const byId = new Map(definitions.map((d) => [d.id, d]));

export function getDefinitionById(id: string): CalcDefinition | undefined {
  return byId.get(id);
}

export function hasDefinition(id: string): boolean {
  return byId.has(id);
}
