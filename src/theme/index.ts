import { colors, ColorPalette } from './colors';
import {
  typography,
  Typography,
  fontFamilies,
  fontSizes,
  fontWeights,
} from './typography';
import { spacing, semanticSpacing, Spacing, SemanticSpacing } from './spacing';
import { shadows, coloredShadows, Shadows, ColoredShadows } from './shadows';

// Extended Color Palette Interface
export interface ExtendedColorPalette extends ColorPalette {
  background: string;
  surface: string;
  card: string;
  border: string;
  text: string;
  textSecondary: string;
  textMuted: string;
}

// Theme Interface
export interface Theme {
  colors: ExtendedColorPalette;
  typography: Typography;
  spacing: Spacing;
  semanticSpacing: SemanticSpacing;
  shadows: Shadows;
  coloredShadows: ColoredShadows;
  fontFamilies: typeof fontFamilies;
  fontSizes: typeof fontSizes;
  fontWeights: typeof fontWeights;
  isDark: boolean;
}

// Light Theme
export const lightTheme: Theme = {
  colors: {
    ...colors,
    background: colors.light.background,
    surface: colors.light.surface,
    card: colors.light.card,
    border: colors.light.border,
    text: colors.light.text,
    textSecondary: colors.light.textSecondary,
    textMuted: colors.light.textMuted,
  },
  typography,
  spacing,
  semanticSpacing,
  shadows,
  coloredShadows,
  fontFamilies,
  fontSizes,
  fontWeights,
  isDark: false,
};

// Dark Theme
export const darkTheme: Theme = {
  colors: {
    ...colors,
    background: colors.dark.background,
    surface: colors.dark.surface,
    card: colors.dark.card,
    border: colors.dark.border,
    text: colors.dark.text,
    textSecondary: colors.dark.textSecondary,
    textMuted: colors.dark.textMuted,
  },
  typography,
  spacing,
  semanticSpacing,
  shadows,
  coloredShadows,
  fontFamilies,
  fontSizes,
  fontWeights,
  isDark: true,
};

// Default theme (light)
export const theme = lightTheme;

// Export all theme parts
export {
  colors,
  typography,
  spacing,
  semanticSpacing,
  shadows,
  coloredShadows,
};
export type {
  ColorPalette,
  Typography,
  Spacing,
  SemanticSpacing,
  Shadows,
  ColoredShadows,
};
