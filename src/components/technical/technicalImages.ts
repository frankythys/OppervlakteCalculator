import type { ImageSourcePropType } from 'react-native';

// Keep all technical illustrations as local bundled PNG assets.
// Metro requires static literal require() paths for reliable Android bundling.
export const technicalImages = {
  pipes: {
    straightPipe: require('../../../assets/technical/pipes/rechte-geisoleerde-leiding.png') as ImageSourcePropType,
  },
  bends: {
    bend90: require('../../../assets/technical/bends/bocht-90-radius.png') as ImageSourcePropType,
    kink: require('../../../assets/technical/bends/knik.png') as ImageSourcePropType,
  },
} as const;
