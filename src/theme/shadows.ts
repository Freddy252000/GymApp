import {Platform} from 'react-native';

// Shadow Styles for iOS and Android
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  xs: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
    android: {
      elevation: 1,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 1,
    },
  }),

  sm: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    android: {
      elevation: 2,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
  }),

  md: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 6,
    },
  }),

  lg: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.1,
      shadowRadius: 15,
    },
    android: {
      elevation: 8,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: 0.1,
      shadowRadius: 15,
    },
  }),

  xl: Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 20},
      shadowOpacity: 0.15,
      shadowRadius: 25,
    },
    android: {
      elevation: 12,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 20},
      shadowOpacity: 0.15,
      shadowRadius: 25,
    },
  }),

  '2xl': Platform.select({
    ios: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 25},
      shadowOpacity: 0.2,
      shadowRadius: 50,
    },
    android: {
      elevation: 16,
    },
    default: {
      shadowColor: '#000000',
      shadowOffset: {width: 0, height: 25},
      shadowOpacity: 0.2,
      shadowRadius: 50,
    },
  }),
};

// Colored Shadows
export const coloredShadows = {
  primary: Platform.select({
    ios: {
      shadowColor: '#F97316',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#F97316',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  }),

  secondary: Platform.select({
    ios: {
      shadowColor: '#0EA5E9',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#0EA5E9',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  }),

  success: Platform.select({
    ios: {
      shadowColor: '#22C55E',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
    android: {
      elevation: 4,
    },
    default: {
      shadowColor: '#22C55E',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 8,
    },
  }),
};

export type Shadows = typeof shadows;
export type ColoredShadows = typeof coloredShadows;
