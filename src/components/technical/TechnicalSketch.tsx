import React from 'react';
import {
  BendSketch,
  CircleSketch,
  ConeSketch,
  InsulationSketch,
  PipeSketch,
  PlateSketch,
  RectangularHoodSketch,
  RoundValveSketch,
  TrapeziumSketch,
} from './CalculatorSketches';

type Props = {
  calculatorId: string;
};

const PIPE_IDS = new Set(['leiding_geisoleerd']);
const INSULATED_PIPE_IDS = new Set(['leiding_met_isolatie']);
const CONE_IDS = new Set(['conus_verloop_diameter', 'conus_verloop_omtrek']);
const ROUND_IDS = new Set([
  'ronde_afsluiter',
  'ronde_afsluiterkap',
  'omvang_flenskap',
  'flenskap_met_deksels',
  'flenskap_zonder_deksels',
  'flenskast',
  'ovale_flenskap',
  'ovale_afsluiter',
]);
const RECTANGULAR_IDS = new Set([
  'rechthoek_oppervlakte',
  'rechthoek_omvang',
  'rechthoekige_afsluiterkap_omvang',
  'rechthoekige_afsluiterkap',
  'kast',
  'inzet',
]);
const PLATE_IDS = new Set(['plaat_gewicht', 'alu_beplating_gewicht']);
const INSULATION_IDS = new Set(['isolatie_volume', 'gaasdeken_gewicht']);
const BEND_IDS = new Set([
  'bocht_lengte',
  'bocht_oppervlakte',
  'knik_hartmaat',
  'bocht_segmenten',
  'bocht_praktische_limiet',
]);
const CIRCLE_IDS = new Set(['cirkel', 'cirkel_segment', 'bol', 'bolkop']);

export function TechnicalSketch({ calculatorId }: Props) {
  if (INSULATED_PIPE_IDS.has(calculatorId)) return <PipeSketch insulated />;
  if (PIPE_IDS.has(calculatorId)) return <PipeSketch />;
  if (CONE_IDS.has(calculatorId)) return <ConeSketch />;
  if (ROUND_IDS.has(calculatorId)) return <RoundValveSketch />;
  if (RECTANGULAR_IDS.has(calculatorId)) return <RectangularHoodSketch />;
  if (PLATE_IDS.has(calculatorId)) return <PlateSketch />;
  if (INSULATION_IDS.has(calculatorId)) return <InsulationSketch />;
  if (BEND_IDS.has(calculatorId)) return <BendSketch />;
  if (CIRCLE_IDS.has(calculatorId)) return <CircleSketch />;
  if (calculatorId === 'trapezium') return <TrapeziumSketch />;

  return null;
}
