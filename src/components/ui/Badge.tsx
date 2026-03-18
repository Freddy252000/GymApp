import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'small' | 'medium' | 'large';
  rounded?: boolean;
  outline?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = true,
  outline = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getVariantColor = (): string => {
    switch (variant) {
      case 'primary':
        return theme.colors.primary[500];
      case 'secondary':
        return theme.colors.secondary[500];
      case 'success':
        return theme.colors.success[500];
      case 'warning':
        return theme.colors.warning[600];
      case 'error':
        return theme.colors.error[500];
      case 'info':
        return theme.colors.info[500];
      case 'neutral':
      default:
        return theme.isDark ? theme.colors.neutral[300] : theme.colors.neutral[700];
    }
  };

  const getBadgeStyle = (): ViewStyle => {
    const variantColor = getVariantColor();

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: theme.semanticSpacing.xs,
        paddingVertical: theme.semanticSpacing.xs / 2,
        minHeight: 20,
      },
      medium: {
        paddingHorizontal: theme.semanticSpacing.sm,
        paddingVertical: theme.semanticSpacing.xs,
        minHeight: 24,
      },
      large: {
        paddingHorizontal: theme.semanticSpacing.md,
        paddingVertical: theme.semanticSpacing.sm,
        minHeight: 32,
      },
    };

    return {
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-start',
      borderRadius: rounded ? 100 : theme.semanticSpacing.borderRadius.sm,
      borderWidth: outline ? 1 : 0,
      backgroundColor:
        outline
          ? 'transparent'
          : variant === 'neutral'
            ? theme.isDark
              ? theme.colors.neutral[800]
              : theme.colors.neutral[100]
            : `${variantColor}18`,
      borderColor: variant === 'neutral' ? theme.colors.border : variantColor,
      ...sizeStyles[size],
    };
  };

  const getTextStyle = (): TextStyle => {
    const variantColor = getVariantColor();

    // Size styles
    const sizeStyles: Record<string, TextStyle> = {
      small: theme.typography.caption,
      medium: theme.typography.label.small,
      large: theme.typography.label.medium,
    };

    return {
      fontWeight: '600',
      color: variant === 'neutral' ? theme.colors.textSecondary : variantColor,
      ...sizeStyles[size],
    };
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      {typeof children === 'string' ? (
        <Text style={[getTextStyle(), textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

export default Badge;
