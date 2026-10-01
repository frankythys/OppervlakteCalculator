import React from 'react';
import {
  CircleSketch,
  CladdingSketch,
  InsulationSketch,
  OvalSketch,
  PlateSketch,
  RectangularHoodSketch,
  RoundValveSketch,
  TrapeziumSketch,
} from './CalculatorSketches';
import { TechnicalImageCard } from './TechnicalImageCard';
import { technicalImages } from './technicalImages';

type Props = {
  calculatorId: string;
};

const FLANGE_PHOTO_IDS = new Set([
  'flenskast',
  'omvang_flenskap',
  'flenskap_met_deksels',
  'flenskap_zonder_deksels',
  'ovale_flenskap',
  'pu_flenskap',
]);
const ROUND_IDS = new Set(['ronde_afsluiter', 'ronde_afsluiterkap']);
const OVAL_IDS = new Set(['ovale_afsluiter']);
const RECTANGULAR_IDS = new Set([
  'rechthoek_oppervlakte',
  'rechthoek_omvang',
  'kast',
  'inzet',
]);
const INSULATION_IDS = new Set(['isolatie_volume', 'gaasdeken_gewicht']);
const CIRCLE_IDS = new Set(['cirkel', 'cirkel_segment']);

export function TechnicalSketch({ calculatorId }: Props) {
  if (calculatorId === 'leiding_met_isolatie') {
    return (
      <TechnicalImageCard
        source={technicalImages.pipes.straightPipe}
        title="Ronde leiding met isolatie"
        caption="Voer de kale leidingdiameter, isolatiedikte t en lengte L in. ØD toont de resulterende buitendiameter geïsoleerd."
      />
    );
  }

  if (
    calculatorId === 'bocht_lengte' ||
    calculatorId === 'bocht_oppervlakte' ||
    calculatorId === 'bocht_praktische_limiet'
  ) {
    return (
      <TechnicalImageCard
        source={technicalImages.bends.bend90}
        title="Bocht met radius"
        caption="R is de hartlijnradius. ØD is de buitendiameter van de geïsoleerde leiding; t is de isolatiedikte."
      />
    );
  }

  if (calculatorId === 'bocht_segmenten') {
    return (
      <TechnicalImageCard
        source={technicalImages.bends.segments}
        title="Segmenten bocht (Duitse bocht)"
        caption="Hoogte C en het aantal segmenten bepalen de hoeken en de segmentradius."
      />
    );
  }

  if (calculatorId === 'knik_hartmaat') {
    return (
      <TechnicalImageCard
        source={technicalImages.bends.kink}
        title="Knik / verstekbocht"
        caption="Technisch zijaanzicht van een knik. Gebruik de gevraagde hoek en radius uit de calculator."
      />
    );
  }

  if (FLANGE_PHOTO_IDS.has(calculatorId)) {
    return (
      <TechnicalImageCard
        source={technicalImages.caps.flange}
        title="Flenskap"
        caption="Meet de diameter van de flenskap. Bij deksels telt de app de twee ronde deksels mee bij de manteloppervlakte."
      />
    );
  }

  if (calculatorId === 'pu_hondenhok_kap') {
    return (
      <TechnicalImageCard
        source={technicalImages.caps.doghouse}
        title="Hondenhok-afsluiterkap"
        caption="Rechthoekige afsluiterkap in hondenhokvorm. Voer de gevraagde maten en de PU-isolatiedikte in."
      />
    );
  }

  if (calculatorId === 'rechthoekige_afsluiterkap' || calculatorId === 'rechthoekige_afsluiterkap_omvang') {
    return (
      <TechnicalImageCard
        source={technicalImages.caps.rectangular}
        title="Rechthoekige afsluiterkap"
        caption="Lengte × breedte × hoogte. De app telt de twee deksels mee bij de oppervlakte."
      />
    );
  }

  if (calculatorId === 'conus_verloop_diameter') {
    return (
      <TechnicalImageCard
        source={technicalImages.pipes.cone}
        title="Conus / verloop"
        caption="Ø D1 = kleine diameter · Ø D2 = grote diameter · L = lengte van het verloop."
      />
    );
  }

  if (calculatorId === 'bol') {
    return (
      <TechnicalImageCard
        source={technicalImages.tanks.sphere}
        title="Bol / bolkop"
        caption="Straal r en isolatiedikte t. Kies hele bol of halve bol (bolkop)."
      />
    );
  }

  if (calculatorId === 'alu_beplating_gewicht') return <CladdingSketch />;
  if (calculatorId === 'plaat_gewicht') return <PlateSketch />;
  if (OVAL_IDS.has(calculatorId)) return <OvalSketch />;
  if (ROUND_IDS.has(calculatorId)) return <RoundValveSketch />;
  if (RECTANGULAR_IDS.has(calculatorId)) return <RectangularHoodSketch />;
  if (INSULATION_IDS.has(calculatorId)) return <InsulationSketch />;
  if (CIRCLE_IDS.has(calculatorId)) return <CircleSketch />;
  if (calculatorId === 'trapezium') return <TrapeziumSketch />;

  return null;
}
