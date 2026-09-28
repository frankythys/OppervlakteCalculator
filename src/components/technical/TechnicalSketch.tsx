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

type Props = {
  calculatorId: string;
};

const ROUND_PIPE_IMAGE = require('../../../assets/technical/round-pipe.jpg');
const INSULATED_PIPE_IMAGE = require('../../../assets/technical/insulated-pipe.jpg');
const CLAD_PIPE_IMAGE = require('../../../assets/technical/clad-insulated-pipe.jpg');

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
const BEND_IDS = new Set([
  'bocht_lengte',
  'bocht_oppervlakte',
  'knik_hartmaat',
  'bocht_segmenten',
  'bocht_praktische_limiet',
]);
const CIRCLE_IDS = new Set(['cirkel', 'cirkel_segment']);

export function TechnicalSketch({ calculatorId }: Props) {
  if (calculatorId === 'leiding_met_isolatie') {
    return (
      <TechnicalImageCard
        source={INSULATED_PIPE_IMAGE}
        title="Ronde leiding met isolatie"
        caption="Doorsnede en zijaanzicht met leidingdiameter, isolatiedikte en lengte."
      />
    );
  }

  if (calculatorId === 'leiding_geisoleerd') {
    return (
      <TechnicalImageCard
        source={ROUND_PIPE_IMAGE}
        title="Ronde geïsoleerde leiding"
        caption="Gebruik de gemeten buitendiameter van de geïsoleerde ronde leiding en de lengte."
      />
    );
  }

  if (calculatorId === 'alu_beplating_gewicht') {
    return <TechnicalImageCard source={CLAD_PIPE_IMAGE} title="Beplating rond ronde leiding" />;
  }
  if (calculatorId === 'plaat_gewicht') return <PlateSketch />;
  if (calculatorId === 'bol') return <SphereSketch />;
  if (calculatorId === 'bolkop') return <SphereSketch half />;
  if (CONE_IDS.has(calculatorId)) return <ConeSketch />;
  if (OVAL_IDS.has(calculatorId)) return <OvalSketch />;
  if (ROUND_IDS.has(calculatorId)) return <RoundValveSketch />;
  if (RECTANGULAR_IDS.has(calculatorId)) return <RectangularHoodSketch />;
  if (INSULATION_IDS.has(calculatorId)) return <InsulationSketch />;
  if (BEND_IDS.has(calculatorId)) return <BendSketch />;
  if (CIRCLE_IDS.has(calculatorId)) return <CircleSketch />;
  if (calculatorId === 'trapezium') return <TrapeziumSketch />;

  return null;
}
