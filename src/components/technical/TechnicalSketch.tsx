import React from 'react';
import {
  BendSketch,
  CircleSketch,
  CladdingSketch,
  ConeSketch,
  InsulationSketch,
  OvalSketch,
  PlateSketch,
  RectangularHoodSketch,
  RoundValveSketch,
  SphereSketch,
  TrapeziumSketch,
} from './CalculatorSketches';
import { TechnicalImageCard } from './TechnicalImageCard';
import { technicalImages } from './technicalImages';

type Props = {
  calculatorId: string;
};

const CONE_IDS = new Set(['conus_verloop_diameter', 'conus_verloop_omtrek']);
const ROUND_IDS = new Set([
  'ronde_afsluiter',
  'ronde_afsluiterkap',
  'omvang_flenskap',
  'flenskap_met_deksels',
  'flenskap_zonder_deksels',
  'flenskast',
]);
const OVAL_IDS = new Set(['ovale_flenskap', 'ovale_afsluiter']);
const RECTANGULAR_IDS = new Set([
  'rechthoek_oppervlakte',
  'rechthoek_omvang',
  'rechthoekige_afsluiterkap_omvang',
  'rechthoekige_afsluiterkap',
  'kast',
  'inzet',
]);
const INSULATION_IDS = new Set(['isolatie_volume', 'gaasdeken_gewicht']);
const BEND_SKETCH_IDS = new Set(['bocht_segmenten', 'bocht_praktische_limiet']);
const CIRCLE_IDS = new Set(['cirkel', 'cirkel_segment']);

export function TechnicalSketch({ calculatorId }: Props) {
  if (calculatorId === 'leiding_met_isolatie') {
    return (
      <TechnicalImageCard
        source={technicalImages.pipes.straightInsulated}
        title="Ronde leiding met isolatie"
        caption="Voer de kale leidingdiameter, isolatiedikte t en lengte L in. ØD toont de resulterende buitendiameter geïsoleerd."
      />
    );
  }

  if (calculatorId === 'leiding_geisoleerd') {
    return (
      <TechnicalImageCard
        source={technicalImages.pipes.straightInsulated}
        title="Ronde geïsoleerde leiding"
        caption="Gebruik de gemeten buitendiameter ØD van de geïsoleerde leiding en de lengte L."
      />
    );
  }

  if (calculatorId === 'bocht_lengte' || calculatorId === 'bocht_oppervlakte') {
    return (
      <TechnicalImageCard
        source={technicalImages.bends.elbowRadius}
        title="Bocht met radius"
        caption="R is de hartlijnradius. ØD is de buitendiameter van de geïsoleerde leiding; t is de isolatiedikte."
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

  if (calculatorId === 'alu_beplating_gewicht') return <CladdingSketch />;
  if (calculatorId === 'plaat_gewicht') return <PlateSketch />;
  if (calculatorId === 'bol') return <SphereSketch />;
  if (calculatorId === 'bolkop') return <SphereSketch half />;
  if (CONE_IDS.has(calculatorId)) return <ConeSketch />;
  if (OVAL_IDS.has(calculatorId)) return <OvalSketch />;
  if (ROUND_IDS.has(calculatorId)) return <RoundValveSketch />;
  if (RECTANGULAR_IDS.has(calculatorId)) return <RectangularHoodSketch />;
  if (INSULATION_IDS.has(calculatorId)) return <InsulationSketch />;
  if (BEND_SKETCH_IDS.has(calculatorId)) return <BendSketch />;
  if (CIRCLE_IDS.has(calculatorId)) return <CircleSketch />;
  if (calculatorId === 'trapezium') return <TrapeziumSketch />;

  return null;
}
