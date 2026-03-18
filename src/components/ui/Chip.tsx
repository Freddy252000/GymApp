import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onDelete?: () => void;
  variant?: 'filled' | 'outlined' | 'filter';
  size?: 'small' | 'medium' | 'large';
  color?: string;
  icon?: string;
  avatar?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  onDelete,
  variant = 'filled',
  size = 'medium',
  color,
  icon,
  avatar,
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getChipStyle = (): ViewStyle => {
    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        paddingHorizontal: theme.semanticSpacing.sm,
        paddingVertical: theme.semanticSpacing.xs,
        minHeight: 28,
      },
      medium: {
        paddingHorizontal: theme.semanticSpacing.md,
        paddingVertical: theme.semanticSpacing.sm,
        minHeight: 36,
      },
      large: {
        paddingHorizontal: theme.semanticSpacing.lg,
        paddingVertical: theme.semanticSpacing.md,
        minHeight: 44,
      },
    };

    const baseColor = color || theme.colors.primary[500];

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      filled: {
        backgroundColor: selected ? baseColor : theme.colors.surface,
        borderWidth: 0,
      },
      outlined: {
        backgroundColor: selected ? `${baseColor}20` : 'transparent',
        borderWidth: 1,
        borderColor: selected ? baseColor : theme.colors.border,
      },
      filter: {
        backgroundColor: selected ? baseColor : theme.colors.surface,
        borderWidth: selected ? 0 : 1,
        borderColor: theme.colors.border,
      },
    };

    return {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 100,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...(disabled && { opacity: 0.6 }),
    };
  };

  const getTextStyle = (): TextStyle => {
    // Size styles
    const sizeStyles: Record<string, TextStyle> = {
      small: theme.typography.label.small,
      medium: theme.typography.label.medium,
      large: theme.typography.body.medium,
    };

    const baseColor = color || theme.colors.primary[500];

    let textColor = theme.colors.text;
    if (variant === 'filled' && selected) {
      textColor = theme.colors.white;
    } else if (variant === 'outlined' && selected) {
      textColor = baseColor;
    } else if (variant === 'filter' && selected) {
      textColor = theme.colors.white;
    }

    return {
      ...sizeStyles[size],
      color: textColor,
      fontWeight: selected ? '600' : '500',
    };
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 20 : 18;
  const iconColor = variant === 'filled' && selected ? theme.colors.white : theme.colors.textSecondary;

  const ChipContent = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {avatar && (
        <View style={{ marginRight: theme.semanticSpacing.xs }}>
          {avatar}
        </View>
      )}
      
      {icon && !avatar && (
        <Icon
          name={icon}
          size={iconSize}
          color={iconColor}
          style={{ marginRight: theme.semanticSpacing.xs }}
        />
      )}
      
      <Text style={[getTextStyle(), textStyle]}>{label}</Text>
      
      {onDelete && (
        <TouchableOpacity
          onPress={onDelete}
          style={{
            marginLeft: theme.semanticSpacing.xs,
            padding: 2,
          }}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Icon
            name="close"
            size={iconSize}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[getChipStyle(), style]}
        activeOpacity={0.7}
      >
        <ChipContent />
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getChipStyle(), style]}>
      <ChipContent />
    </View>
  );
};

export default Chip;
