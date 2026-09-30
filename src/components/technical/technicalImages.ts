import type { ImageSourcePropType } from 'react-native';

// Keep all technical illustrations as local bundled PNG assets.
// Metro requires static literal require() paths for reliable Android bundling.
export const technicalImages = {
  pipes: {
    straightPipe: require('../../../assets/technical/pipes/rechte-geisoleerde-leiding.png') as ImageSourcePropType,
    cone: require('../../../assets/technical/pipes/Conus.png') as ImageSourcePropType,
  },
  bends: {
    bend90: require('../../../assets/technical/bends/bocht-90-radius.png') as ImageSourcePropType,
    kink: require('../../../assets/technical/bends/knik.png') as ImageSourcePropType,
  },
  caps: {
    flange: require('../../../assets/technical/Kappen/Flenskap.png') as ImageSourcePropType,
    doghouse: require('../../../assets/technical/Kappen/Hondehok_ventiel.png') as ImageSourcePropType,
    rectangular: require('../../../assets/technical/Kappen/rechthoekige-kap.png') as ImageSourcePropType,
  },
  materials: {
    metalPlate: require('../../../assets/technical/metaal/Plaat_alu.png') as ImageSourcePropType,
    // Isolatiematerialen, per catalogus-id, met buis- en vlakke vorm.
    insulation: {
      'prorox-wm950': {
        pipe: require('../../../assets/technical/isolatie-materialen/Gaasdeken.png') as ImageSourcePropType,
        flat: require('../../../assets/technical/isolatie-materialen/Gaasdeken.png') as ImageSourcePropType,
      },
      'prorox-ps960': {
        pipe: require('../../../assets/technical/isolatie-materialen/rockwool-schaal.png') as ImageSourcePropType,
        flat: require('../../../assets/technical/isolatie-materialen/rockwool-plaat.png') as ImageSourcePropType,
      },
      'prorox-ps970': {
        pipe: require('../../../assets/technical/isolatie-materialen/rockwool-schaal.png') as ImageSourcePropType,
        flat: require('../../../assets/technical/isolatie-materialen/rockwool-plaat.png') as ImageSourcePropType,
      },
      'foamglas-t4': {
        pipe: require('../../../assets/technical/isolatie-materialen/foamglas-pipe.png') as ImageSourcePropType,
        flat: require('../../../assets/technical/isolatie-materialen/Foamglas.png') as ImageSourcePropType,
      },
      'armaflex-af-evo': {
        pipe: require('../../../assets/technical/isolatie-materialen/armaflex-pipe.png') as ImageSourcePropType,
        flat: require('../../../assets/technical/isolatie-materialen/af-armaflex.png') as ImageSourcePropType,
      },
      'promasil-1000': {
        pipe: require('../../../assets/technical/isolatie-materialen/calcium-pipe.png') as ImageSourcePropType,
        flat: require('../../../assets/technical/isolatie-materialen/calcium-promasil.png') as ImageSourcePropType,
      },
    } as Record<string, { pipe: ImageSourcePropType; flat: ImageSourcePropType }>,
  },
} as const;
