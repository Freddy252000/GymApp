import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ViewStyle, TextStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  color?: string;
  backgroundColor?: string;
  gradient?: boolean;
  gradientColors?: string[];
  style?: ViewStyle;
  labelStyle?: TextStyle;
  rounded?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 8,
  showLabel = false,
  label,
  animated = true,
  color,
  backgroundColor,
  gradient = false,
  gradientColors,
  style,
  labelStyle,
  rounded = true,
}) => {
  const { theme } = useTheme();
  const animatedWidth = useRef(new Animated.Value(0)).current;

  const clampedProgress = Math.max(0, Math.min(100, progress));

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedWidth, {
        toValue: clampedProgress,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      animatedWidth.setValue(clampedProgress);
    }
  }, [clampedProgress, animated]);

  const progressColor = color || theme.colors.primary[500];
  const bgColor = backgroundColor || theme.colors.surface;
  const borderRadius = rounded ? height / 2 : 0;

  const containerStyle: ViewStyle = {
    height,
    backgroundColor: bgColor,
    borderRadius,
    overflow: 'hidden',
    ...style,
  };

  const progressStyle: ViewStyle = {
    height: '100%',
    borderRadius,
  };

  const ProgressFill = () => {
    if (gradient) {
      const colors = gradientColors || theme.colors.gradients.primary;
      return (
        <Animated.View
          style={[
            progressStyle,
            {
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      );
    }

    return (
      <Animated.View
        style={[
          progressStyle,
          {
            backgroundColor: progressColor,
            width: animatedWidth.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />
    );
  };

  return (
    <View>
      {showLabel && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: theme.semanticSpacing.xs }}>
          <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }, labelStyle]}>
            {label || 'Progress'}
          </Text>
          <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }, labelStyle]}>
            {Math.round(clampedProgress)}%
          </Text>
        </View>
      )}
      <View style={containerStyle}>
        <ProgressFill />
      </View>
    </View>
  );
};

export default ProgressBar;
