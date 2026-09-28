import type { ImageSourcePropType } from 'react-native';

export const technicalImages = {
  pipes: {
    round: require('../../../assets/technical/pipes/round-pipe.jpg') as ImageSourcePropType,
    insulated: require('../../../assets/technical/pipes/insulated-pipe.jpg') as ImageSourcePropType,
    cladInsulated: require('../../../assets/technical/pipes/clad-insulated-pipe.jpg') as ImageSourcePropType,
  },
  // Add future technical assets here only; calculator screens should import from this registry.
  bends: {},
  plates: {},
  flanges: {},
  valves: {},
  cones: {},
} as const;
