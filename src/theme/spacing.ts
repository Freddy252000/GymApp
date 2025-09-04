// Spacing System - Based on 4px grid
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  52: 208,
  56: 224,
  60: 240,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

// Semantic Spacing
export const semanticSpacing = {
  // Component Internal Spacing
  xs: spacing[1], // 4px
  sm: spacing[2], // 8px
  md: spacing[4], // 16px
  lg: spacing[6], // 24px
  xl: spacing[8], // 32px
  '2xl': spacing[12], // 48px
  '3xl': spacing[16], // 64px

  // Layout Spacing
  screenPadding: spacing[4], // 16px
  sectionSpacing: spacing[6], // 24px
  cardPadding: spacing[4], // 16px
  buttonPadding: spacing[3], // 12px

  // Component Specific
  iconSize: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    '2xl': 40,
    '3xl': 48,
  },

  borderRadius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
  },

  borderWidth: {
    0: 0,
    1: 1,
    2: 2,
    4: 4,
    8: 8,
  },

  // Shadow/Elevation
  elevation: {
    none: 0,
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
    '2xl': 16,
  },
};

export type Spacing = typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
