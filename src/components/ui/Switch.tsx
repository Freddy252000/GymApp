import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, ViewStyle } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  activeColor?: string;
  inactiveColor?: string;
  thumbColor?: string;
  style?: ViewStyle;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  disabled = false,
  size = 'medium',
  activeColor,
  inactiveColor,
  thumbColor,
  style,
}) => {
  const { theme } = useTheme();
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const getSwitchDimensions = () => {
    const dimensions = {
      small: { width: 40, height: 24, thumbSize: 18 },
      medium: { width: 48, height: 28, thumbSize: 22 },
      large: { width: 56, height: 32, thumbSize: 26 },
    };
    return dimensions[size];
  };

  const { width, height, thumbSize } = getSwitchDimensions();
  const trackPadding = 2;
  const thumbOffset = trackPadding;
  const maxThumbOffset = width - thumbSize - trackPadding;

  const trackColor = value 
    ? (activeColor || theme.colors.primary[500])
    : (inactiveColor || theme.colors.neutral[300]);

  const thumbBgColor = thumbColor || theme.colors.white;

  const trackStyle: ViewStyle = {
    width,
    height,
    borderRadius: height / 2,
    backgroundColor: trackColor,
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
  };

  const thumbStyle: ViewStyle = {
    width: thumbSize,
    height: thumbSize,
    borderRadius: thumbSize / 2,
    backgroundColor: thumbBgColor,
    position: 'absolute',
    ...theme.shadows.sm,
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [thumbOffset, maxThumbOffset],
        }),
      },
    ],
  };

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[trackStyle, style]}
    >
      <Animated.View style={thumbStyle} />
    </TouchableOpacity>
  );
};

export default Switch;
