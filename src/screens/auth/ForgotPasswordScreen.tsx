import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import {
  Layout,
  Button,
  Input,
  Card,
  Header,
  Badge,
} from '../../components/ui';

type ForgotPasswordNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleResetPassword = async () => {
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      Alert.alert(
        'Reset Link Sent',
        'We have sent a password reset link to your email address. Please check your inbox and follow the instructions.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ],
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout variant="keyboard-avoiding" padding={false}>
      <Header
        title="Reset Password"
        showBackButton
        onLeftPress={() => navigation.goBack()}
      />

      <Animated.View
        style={{
          flex: 1,
          padding: theme.semanticSpacing.screenPadding,
          justifyContent: 'center',
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: theme.semanticSpacing['3xl'],
          }}
        >
          <LinearGradient
            colors={[theme.colors.secondary[400], theme.colors.secondary[500]]}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.semanticSpacing.lg,
            }}
          >
            <Text style={{ fontSize: 40, color: theme.colors.white }}>🔐</Text>
          </LinearGradient>

          <Text
            style={[
              theme.typography.heading.h2,
              {
                color: theme.colors.text,
                marginBottom: theme.semanticSpacing.sm,
              },
            ]}
          >
            Forgot Password?
          </Text>

          <Text
            style={[
              theme.typography.body.large,
              { color: theme.colors.textSecondary, textAlign: 'center' },
            ]}
          >
            Don't worry! Enter your email address and we'll send you a link to
            reset your password.
          </Text>

          <Badge
            variant="info"
            size="small"
            style={{ marginTop: theme.semanticSpacing.md }}
          >
            Check your spam folder too
          </Badge>
        </View>

        {/* Reset Form */}
        <Card variant="elevated" padding="large">
          <View style={{ gap: theme.semanticSpacing.lg }}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={value => {
                setEmail(value);
                if (error) setError('');
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              error={error}
            />

            <Button
              title="Send Reset Link"
              onPress={handleResetPassword}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              gradient
            />

            <Button
              title="Back to Login"
              onPress={() => navigation.navigate('Login')}
              variant="ghost"
              size="large"
              fullWidth
            />
          </View>
        </Card>
      </Animated.View>
    </Layout>
  );
};

export default ForgotPasswordScreen;
