import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  thickness?: number;
  color?: string;
  length?: number | string;
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
  style?: ViewStyle;
  labelStyle?: TextStyle;
  margin?: number;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 1,
  color,
  length = '100%',
  label,
  labelPosition = 'center',
  style,
  labelStyle,
  margin = 0,
}) => {
  const { theme } = useTheme();

  const dividerColor = color || theme.colors.border;

  const getDividerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      backgroundColor: variant === 'solid' ? dividerColor : 'transparent',
    };

    if (orientation === 'horizontal') {
      return {
        ...baseStyle,
        width: length,
        height: thickness,
        marginVertical: margin,
        ...(variant === 'dashed' && {
          borderTopWidth: thickness,
          borderTopColor: dividerColor,
          borderStyle: 'dashed',
        }),
        ...(variant === 'dotted' && {
          borderTopWidth: thickness,
          borderTopColor: dividerColor,
          borderStyle: 'dotted',
        }),
      };
    } else {
      return {
        ...baseStyle,
        width: thickness,
        height: length,
        marginHorizontal: margin,
        ...(variant === 'dashed' && {
          borderLeftWidth: thickness,
          borderLeftColor: dividerColor,
          borderStyle: 'dashed',
        }),
        ...(variant === 'dotted' && {
          borderLeftWidth: thickness,
          borderLeftColor: dividerColor,
          borderStyle: 'dotted',
        }),
      };
    }
  };

  const getLabelStyle = (): TextStyle => {
    return {
      ...theme.typography.body.small,
      color: theme.colors.textSecondary,
      backgroundColor: theme.colors.card,
      paddingHorizontal: theme.semanticSpacing.sm,
      ...labelStyle,
    };
  };

  if (label && orientation === 'horizontal') {
    const justifyContent = labelPosition === 'left' ? 'flex-start' :
      labelPosition === 'right' ? 'flex-end' : 'center';

    return (
      <View style={[{ flexDirection: 'row', alignItems: 'center', justifyContent }, style]}>
        {labelPosition !== 'left' && <View style={[getDividerStyle(), { flex: 1 }]} />}
        <Text style={getLabelStyle()}>{label}</Text>
        {labelPosition !== 'right' && <View style={[getDividerStyle(), { flex: 1 }]} />}
      </View>
    );
  }

  if (label && orientation === 'vertical') {
    const alignItems = labelPosition === 'left' ? 'flex-start' :
      labelPosition === 'right' ? 'flex-end' : 'center';

    return (
      <View style={[{ flexDirection: 'column', alignItems, justifyContent: 'center' }, style]}>
        {labelPosition !== 'left' && <View style={getDividerStyle()} />}
        <Text style={[getLabelStyle(), { paddingVertical: theme.semanticSpacing.sm, paddingHorizontal: 0 }]}>
          {label}
        </Text>
        {labelPosition !== 'right' && <View style={getDividerStyle()} />}
      </View>
    );
  }

  return <View style={[getDividerStyle(), style]} />;
};

export default Divider;
