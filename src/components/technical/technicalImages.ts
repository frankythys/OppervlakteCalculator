import type { ImageSourcePropType } from 'react-native';

export const technicalImages = {
  pipes: {
    round: require('../../../assets/technical/pipes/round-pipe.jpg') as ImageSourcePropType,
    insulated: require('../../../assets/technical/pipes/insulated-pipe.jpg') as ImageSourcePropType,
    cladInsulated: require('../../../assets/technical/pipes/clad-insulated-pipe.jpg') as ImageSourcePropType,
    straightInsulated: require('../../../assets/technical/pipes/straight-insulated-pipe.jpg') as ImageSourcePropType,
  },
  bends: {
    elbowRadius: require('../../../assets/technical/bends/bocht-90-radius.jpg') as ImageSourcePropType,
    kink: require('../../../assets/technical/bends/knik/knik.jpg') as ImageSourcePropType,
  },
  plates: {},
  flanges: {},
  valves: {},
  cones: {},
} as const;
