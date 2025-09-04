// Modern Gym App Color Palette
export const colors = {
  // Primary Colors - Energetic and Motivating
  primary: {
    50: '#FFF7ED',
    100: '#FFEDD5',
    200: '#FED7AA',
    300: '#FDBA74',
    400: '#FB923C',
    500: '#F97316', // Main Orange
    600: '#EA580C',
    700: '#C2410C',
    800: '#9A3412',
    900: '#7C2D12',
  },

  // Secondary Colors - Cool and Professional
  secondary: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9', // Main Blue
    600: '#0284C7',
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Accent Colors - Success, Warning, Error
  success: {
    50: '#F0FDF4',
    100: '#DCFCE7',
    200: '#BBF7D0',
    300: '#86EFAC',
    400: '#4ADE80',
    500: '#22C55E', // Main Green
    600: '#16A34A',
    700: '#15803D',
    800: '#166534',
    900: '#14532D',
  },

  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Main Yellow
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Main Red
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Neutral Colors - Modern Dark/Light Theme
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },

  // Dark Theme Colors
  dark: {
    background: '#0F0F0F',
    surface: '#1A1A1A',
    card: '#262626',
    border: '#404040',
    text: '#FAFAFA',
    textSecondary: '#A3A3A3',
    textMuted: '#737373',
  },

  // Light Theme Colors
  light: {
    background: '#FFFFFF',
    surface: '#FAFAFA',
    card: '#FFFFFF',
    border: '#E5E5E5',
    text: '#171717',
    textSecondary: '#525252',
    textMuted: '#737373',
  },

  // Gradient Colors
  gradients: {
    primary: ['#F97316', '#EA580C'],
    secondary: ['#0EA5E9', '#0284C7'],
    success: ['#22C55E', '#16A34A'],
    sunset: ['#F97316', '#EF4444'],
    ocean: ['#0EA5E9', '#22C55E'],
    night: ['#171717', '#404040'],
  },

  // Semantic Colors
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',

  // Dynamic theme colors (will be overridden by theme)
  background: '#FFFFFF',
  surface: '#FAFAFA',
  card: '#FFFFFF',
  border: '#E5E5E5',
  text: '#171717',
  textSecondary: '#525252',
  textMuted: '#737373',
};

export type ColorPalette = typeof colors;
