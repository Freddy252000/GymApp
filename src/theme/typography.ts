import {Platform} from 'react-native';

// Font Families
export const fontFamilies = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    default: 'System',
  }),
  light: Platform.select({
    ios: 'System',
    android: 'Roboto-Light',
    default: 'System',
  }),
};

// Font Sizes
export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
};

// Line Heights
export const lineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 28,
  '2xl': 32,
  '3xl': 36,
  '4xl': 40,
  '5xl': 48,
  '6xl': 60,
  '7xl': 72,
  '8xl': 96,
  '9xl': 128,
};

// Font Weights
export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// Typography Styles
export const typography = {
  // Display Styles
  display: {
    large: {
      fontFamily: fontFamilies.bold,
      fontSize: fontSizes['6xl'],
      lineHeight: lineHeights['6xl'],
      fontWeight: fontWeights.bold,
    },
    medium: {
      fontFamily: fontFamilies.bold,
      fontSize: fontSizes['5xl'],
      lineHeight: lineHeights['5xl'],
      fontWeight: fontWeights.bold,
    },
    small: {
      fontFamily: fontFamilies.bold,
      fontSize: fontSizes['4xl'],
      lineHeight: lineHeights['4xl'],
      fontWeight: fontWeights.bold,
    },
  },

  // Heading Styles
  heading: {
    h1: {
      fontFamily: fontFamilies.bold,
      fontSize: fontSizes['3xl'],
      lineHeight: lineHeights['3xl'],
      fontWeight: fontWeights.bold,
    },
    h2: {
      fontFamily: fontFamilies.bold,
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights['2xl'],
      fontWeight: fontWeights.bold,
    },
    h3: {
      fontFamily: fontFamilies.bold,
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.xl,
      fontWeight: fontWeights.bold,
    },
    h4: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.semibold,
    },
    h5: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.semibold,
    },
    h6: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.semibold,
    },
  },

  // Body Text Styles
  body: {
    large: {
      fontFamily: fontFamilies.regular,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.normal,
    },
    medium: {
      fontFamily: fontFamilies.regular,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.normal,
    },
    small: {
      fontFamily: fontFamilies.regular,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.normal,
    },
  },

  // Label Styles
  label: {
    large: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.medium,
    },
    medium: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.medium,
    },
    small: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: fontWeights.medium,
    },
  },

  // Caption Styles
  caption: {
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.xs,
    lineHeight: lineHeights.xs,
    fontWeight: fontWeights.normal,
  },

  // Button Text Styles
  button: {
    large: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: fontWeights.semibold,
    },
    medium: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: fontWeights.semibold,
    },
    small: {
      fontFamily: fontFamilies.medium,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: fontWeights.semibold,
    },
  },
};

export type Typography = typeof typography;
