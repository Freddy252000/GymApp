import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const LoadingScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          gap: theme.semanticSpacing.lg,
        }}
      >
        {/* App Icon */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.colors.primary[500],
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.semanticSpacing.md,
          }}
        >
          <Text style={{ fontSize: 40, color: theme.colors.white }}>💪</Text>
        </View>

        {/* Loading Indicator */}
        <ActivityIndicator
          size="large"
          color={theme.colors.primary[500]}
        />

        {/* Loading Text */}
        <Text
          style={[
            theme.typography.body.large,
            {
              color: theme.colors.textSecondary,
              textAlign: 'center',
            },
          ]}
        >
          Loading your fitness journey...
        </Text>
      </View>
    </View>
  );
};

export default LoadingScreen;
