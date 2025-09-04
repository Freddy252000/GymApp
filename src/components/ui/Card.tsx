import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  style,
}) => {
  const {theme} = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.semanticSpacing.borderRadius.xl,
      backgroundColor: theme.colors.card,
    };

    // Padding styles
    const paddingStyles: Record<string, ViewStyle> = {
      none: {},
      small: {padding: theme.semanticSpacing.sm},
      medium: {padding: theme.semanticSpacing.md},
      large: {padding: theme.semanticSpacing.lg},
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      default: {},
      elevated: {
        ...theme.shadows.md,
      },
      outlined: {
        borderWidth: theme.semanticSpacing.borderWidth[1],
        borderColor: theme.colors.border,
      },
    };

    return {
      ...baseStyle,
      ...paddingStyles[padding],
      ...variantStyles[variant],
    };
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};

export default Card;
