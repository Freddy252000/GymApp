import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  gradient = false,
}) => {
  const {theme} = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.semanticSpacing.borderRadius.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: theme.semanticSpacing.md,
        paddingVertical: theme.semanticSpacing.sm,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: theme.semanticSpacing.lg,
        paddingVertical: theme.semanticSpacing.md,
        minHeight: 44,
      },
      large: {
        paddingHorizontal: theme.semanticSpacing.xl,
        paddingVertical: theme.semanticSpacing.lg,
        minHeight: 52,
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: theme.colors.primary[500],
      },
      secondary: {
        backgroundColor: theme.colors.secondary[500],
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: theme.semanticSpacing.borderWidth[2],
        borderColor: theme.colors.primary[500],
      },
      ghost: {
        backgroundColor: 'transparent',
      },
      danger: {
        backgroundColor: theme.colors.error[500],
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(fullWidth && {width: '100%'}),
      ...(disabled && {opacity: 0.6}),
    };
  };

  const getTextStyle = (): TextStyle => {
    const sizeStyles: Record<string, TextStyle> = {
      small: theme.typography.button.small,
      medium: theme.typography.button.medium,
      large: theme.typography.button.large,
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: {color: theme.colors.white},
      secondary: {color: theme.colors.white},
      outline: {color: theme.colors.primary[500]},
      ghost: {color: theme.colors.primary[500]},
      danger: {color: theme.colors.white},
    };

    return {
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const buttonStyle = getButtonStyle();
  const buttonTextStyle = getTextStyle();

  const ButtonContent = () => (
    <>
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.primary[500] : theme.colors.white}
          style={{marginRight: theme.semanticSpacing.sm}}
        />
      )}
      <Text style={[buttonTextStyle, textStyle]}>{title}</Text>
    </>
  );

  if (gradient && (variant === 'primary' || variant === 'secondary')) {
    const gradientColors = variant === 'primary' 
      ? theme.colors.gradients.primary 
      : theme.colors.gradients.secondary;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[{borderRadius: theme.semanticSpacing.borderRadius.lg}, style]}
        activeOpacity={0.8}>
        <LinearGradient
          colors={gradientColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[buttonStyle, {backgroundColor: 'transparent'}]}>
          <ButtonContent />
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[buttonStyle, style]}
      activeOpacity={0.8}>
      <ButtonContent />
    </TouchableOpacity>
  );
};

export default Button;
