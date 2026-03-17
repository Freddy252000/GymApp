import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  disabled?: boolean;
  trackHeight?: number;
  thumbSize?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  showLabels?: boolean;
  formatLabel?: (value: number) => string;
  style?: ViewStyle;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 100,
  step = 1,
  disabled = false,
  trackHeight = 4,
  thumbSize = 24,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  showLabels = false,
  formatLabel,
  style,
}) => {
  const { theme } = useTheme();

  const minTrackColor = minimumTrackTintColor || theme.colors.primary[500];
  const maxTrackColor = maximumTrackTintColor || theme.colors.neutral[300];
  const thumbColor = thumbTintColor || theme.colors.white;

  const clampedValue = Math.max(minimumValue, Math.min(maximumValue, value));
  const valueRange = maximumValue - minimumValue;
  const progressPercentage = ((clampedValue - minimumValue) / valueRange) * 100;

  const formatValue = (val: number) => {
    if (formatLabel) return formatLabel(val);
    return val.toString();
  };

  const handleStepPress = (direction: 'increase' | 'decrease') => {
    if (disabled) return;

    const newValue =
      direction === 'increase'
        ? Math.min(maximumValue, clampedValue + step)
        : Math.max(minimumValue, clampedValue - step);

    onValueChange(newValue);
  };

  return (
    <View style={[{ paddingVertical: thumbSize / 2 }, style]}>
      {showLabels && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <Text
            style={[
              theme.typography.body.small,
              { color: theme.colors.textSecondary },
            ]}
          >
            {formatValue(minimumValue)}
          </Text>
          <Text
            style={[
              theme.typography.body.small,
              { color: theme.colors.text, fontWeight: '600' },
            ]}
          >
            {formatValue(clampedValue)}
          </Text>
          <Text
            style={[
              theme.typography.body.small,
              { color: theme.colors.textSecondary },
            ]}
          >
            {formatValue(maximumValue)}
          </Text>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.semanticSpacing.sm,
        }}
      >
        <TouchableOpacity
          onPress={() => handleStepPress('decrease')}
          disabled={disabled || clampedValue <= minimumValue}
          style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: theme.colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: disabled || clampedValue <= minimumValue ? 0.5 : 1,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            -
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            height: trackHeight,
            backgroundColor: maxTrackColor,
            borderRadius: trackHeight / 2,
          }}
        >
          <View
            style={{
              height: trackHeight,
              backgroundColor: minTrackColor,
              borderRadius: trackHeight / 2,
              width: `${progressPercentage}%`,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => handleStepPress('increase')}
          disabled={disabled || clampedValue >= maximumValue}
          style={{
            width: thumbSize,
            height: thumbSize,
            borderRadius: thumbSize / 2,
            backgroundColor: theme.colors.surface,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: disabled || clampedValue >= maximumValue ? 0.5 : 1,
          }}
        >
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Slider;
