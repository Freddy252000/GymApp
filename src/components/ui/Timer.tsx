import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import CircularProgress from './CircularProgress';

interface TimerProps {
  initialTime?: number; // in seconds
  countDown?: boolean;
  autoStart?: boolean;
  onComplete?: () => void;
  onTick?: (time: number) => void;
  showControls?: boolean;
  showProgress?: boolean;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  format?: 'mm:ss' | 'hh:mm:ss' | 'ss';
}

const Timer: React.FC<TimerProps> = ({
  initialTime = 0,
  countDown = false,
  autoStart = false,
  onComplete,
  onTick,
  showControls = true,
  showProgress = false,
  size = 'medium',
  style,
  textStyle,
  format = 'mm:ss',
}) => {
  const { theme } = useTheme();
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = countDown ? prevTime - 1 : prevTime + 1;
          
          if (onTick) {
            onTick(newTime);
          }
          
          if (countDown && newTime <= 0) {
            setIsRunning(false);
            if (onComplete) {
              onComplete();
            }
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, countDown, onComplete, onTick]);

  const formatTime = (seconds: number): string => {
    const absSeconds = Math.abs(seconds);
    const hours = Math.floor(absSeconds / 3600);
    const minutes = Math.floor((absSeconds % 3600) / 60);
    const secs = absSeconds % 60;

    switch (format) {
      case 'hh:mm:ss':
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      case 'mm:ss':
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      case 'ss':
        return secs.toString();
      default:
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  };

  const handlePlayPause = () => {
    if (isRunning) {
      setIsPaused(!isPaused);
    } else {
      setIsRunning(true);
      setIsPaused(false);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTime(initialTime);
  };

  const handleReset = () => {
    setTime(initialTime);
  };

  const getSizeStyles = () => {
    const sizes = {
      small: { fontSize: 16, iconSize: 20, padding: 8 },
      medium: { fontSize: 24, iconSize: 24, padding: 12 },
      large: { fontSize: 32, iconSize: 28, padding: 16 },
    };
    return sizes[size];
  };

  const { fontSize, iconSize, padding } = getSizeStyles();

  const progress = countDown && initialTime > 0 
    ? ((initialTime - time) / initialTime) * 100 
    : 0;

  const TimerDisplay = () => (
    <Text
      style={[
        {
          fontSize,
          fontWeight: 'bold',
          color: theme.colors.text,
          fontFamily: 'monospace',
        },
        textStyle,
      ]}
    >
      {formatTime(time)}
    </Text>
  );

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      {showProgress && countDown ? (
        <CircularProgress
          progress={progress}
          size={120}
          showPercentage={false}
        >
          <TimerDisplay />
        </CircularProgress>
      ) : (
        <View style={{ padding }}>
          <TimerDisplay />
        </View>
      )}

      {showControls && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.semanticSpacing.md,
            marginTop: theme.semanticSpacing.md,
          }}
        >
          <TouchableOpacity
            onPress={handlePlayPause}
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: theme.colors.primary[500],
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              name={isRunning && !isPaused ? 'pause' : 'play-arrow'}
              size={iconSize}
              color={theme.colors.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleStop}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              name="stop"
              size={iconSize - 4}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleReset}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: theme.colors.surface,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon
              name="refresh"
              size={iconSize - 4}
              color={theme.colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Timer;
