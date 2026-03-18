import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ViewStyle, TextStyle } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';

interface CircularProgressProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  gradient?: boolean;
  gradientColors?: string[];
  showPercentage?: boolean;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children?: React.ReactNode;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<CircularProgressProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color,
  backgroundColor,
  gradient = false,
  gradientColors,
  showPercentage = true,
  showLabel = false,
  label,
  animated = true,
  style,
  textStyle,
  children,
}) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(0)).current;

  const clampedProgress = Math.max(0, Math.min(100, progress));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (animated) {
      Animated.timing(animatedValue, {
        toValue: clampedProgress,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      animatedValue.setValue(clampedProgress);
    }
  }, [clampedProgress, animated]);

  const progressColor = color || theme.colors.primary[500];
  const bgColor = backgroundColor || theme.colors.surface;

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={[{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }, style]}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Defs>
          {gradient && (
            <SvgLinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {(gradientColors || theme.colors.gradients.primary).map((color, index) => (
                <Stop
                  key={index}
                  offset={`${(index / ((gradientColors || theme.colors.gradients.primary).length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </SvgLinearGradient>
          )}
        </Defs>
        
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress Circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={gradient ? 'url(#gradient)' : progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>

      {/* Content */}
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        {children || (
          <>
            {showPercentage && (
              <Text
                style={[
                  theme.typography.heading.h3,
                  { color: theme.colors.text, fontWeight: 'bold' },
                  textStyle,
                ]}
              >
                {Math.round(clampedProgress)}%
              </Text>
            )}
            {showLabel && label && (
              <Text
                style={[
                  theme.typography.body.small,
                  { color: theme.colors.textSecondary, textAlign: 'center', marginTop: 4 },
                  textStyle,
                ]}
              >
                {label}
              </Text>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default CircularProgress;
