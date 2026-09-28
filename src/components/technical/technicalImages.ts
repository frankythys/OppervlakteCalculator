import type { ImageSourcePropType } from 'react-native';

export const technicalImages = {
  pipes: {
    straightInsulated: require('../../../assets/technical/pipes/rechte-geisoleerde-leiding.png') as ImageSourcePropType,
  },
  bends: {
    elbowRadius: require('../../../assets/technical/bends/bocht-90-radius.png') as ImageSourcePropType,
    kink: require('../../../assets/technical/bends/knik.png') as ImageSourcePropType,
  },
  plates: {},
  flanges: {},
  valves: {},
  cones: {},
} as const;
