import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
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
  Divider,
  ProgressBar,
} from '../../components/ui';

type RegisterNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Register'
>;

const RegisterScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<RegisterNavigationProp>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);

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

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    if (!acceptTerms) {
      Alert.alert(
        'Terms Required',
        'Please accept the terms and conditions to continue.',
      );
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      // For demo purposes, create account and login
      await AsyncStorage.setItem('@gym_app_user_token', 'demo_token');

      Alert.alert(
        'Success',
        'Account created successfully! Welcome to GymApp!',
        [
          {
            text: 'Get Started',
            onPress: () => {
              // Navigate to main app
              navigation.getParent()?.reset({
                index: 0,
                routes: [{ name: 'Main' }],
              });
            },
          },
        ],
      );
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigation.navigate('Login');
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Update password strength when password changes
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return theme.colors.error[500];
    if (passwordStrength < 50) return theme.colors.warning[500];
    if (passwordStrength < 75) return theme.colors.secondary[500];
    return theme.colors.success[500];
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <Layout variant="keyboard-avoiding" padding={false}>
      <Header
        title="Create Account"
        showBackButton
        onLeftPress={() => navigation.goBack()}
      />

      <Animated.View
        style={{
          flex: 1,
          padding: theme.semanticSpacing.screenPadding,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        {/* Header */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: theme.semanticSpacing['2xl'],
          }}
        >
          <LinearGradient
            colors={theme.colors.gradients.primary}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.semanticSpacing.md,
            }}
          >
            <Text style={{ fontSize: 30, color: theme.colors.white }}>🚀</Text>
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
            Join GymApp
          </Text>

          <Text
            style={[
              theme.typography.body.large,
              { color: theme.colors.textSecondary, textAlign: 'center' },
            ]}
          >
            Start your fitness journey today
          </Text>

          <Badge
            variant="success"
            size="small"
            style={{ marginTop: theme.semanticSpacing.sm }}
          >
            Free to join • No credit card required
          </Badge>
        </View>

        {/* Registration Form */}
        <Card variant="elevated" padding="large">
          <View style={{ gap: theme.semanticSpacing.lg }}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={value => updateFormData('name', value)}
              leftIcon="person"
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={value => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              error={errors.email}
            />

            <View>
              <Input
                label="Password"
                placeholder="Create a password"
                value={formData.password}
                onChangeText={value => updateFormData('password', value)}
                secureTextEntry
                leftIcon="lock"
                error={errors.password}
              />

              {formData.password.length > 0 && (
                <View style={{ marginTop: theme.semanticSpacing.sm }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={[
                        theme.typography.caption,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Password Strength
                    </Text>
                    <Text
                      style={[
                        theme.typography.caption,
                        {
                          color: getPasswordStrengthColor(),
                          fontWeight: '600',
                        },
                      ]}
                    >
                      {getPasswordStrengthLabel()}
                    </Text>
                  </View>
                  <ProgressBar
                    progress={passwordStrength}
                    height={4}
                    color={getPasswordStrengthColor()}
                    rounded
                  />
                </View>
              )}
            </View>

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={value => updateFormData('confirmPassword', value)}
              secureTextEntry
              leftIcon="lock"
              error={errors.confirmPassword}
            />

            {/* Terms and Conditions */}
            <TouchableOpacity
              onPress={() => setAcceptTerms(!acceptTerms)}
              style={{ flexDirection: 'row', alignItems: 'flex-start' }}
            >
              <Icon
                name={acceptTerms ? 'check-box' : 'check-box-outline-blank'}
                size={20}
                color={
                  acceptTerms
                    ? theme.colors.primary[500]
                    : theme.colors.textMuted
                }
                style={{ marginRight: 8, marginTop: 2 }}
              />
              <Text
                style={[
                  theme.typography.body.small,
                  { color: theme.colors.textSecondary, flex: 1 },
                ]}
              >
                I agree to the{' '}
                <Text
                  style={{
                    color: theme.colors.primary[500],
                    fontWeight: '600',
                  }}
                >
                  Terms of Service
                </Text>{' '}
                and{' '}
                <Text
                  style={{
                    color: theme.colors.primary[500],
                    fontWeight: '600',
                  }}
                >
                  Privacy Policy
                </Text>
              </Text>
            </TouchableOpacity>

            <Button
              title="Create Account"
              onPress={handleRegister}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              gradient
            />

            <Divider label="or" />

            <Button
              title="Continue with Google"
              onPress={() =>
                Alert.alert('Info', 'Google sign-up would be implemented here')
              }
              variant="outline"
              size="large"
              fullWidth
            />
          </View>
        </Card>

        {/* Sign In Link */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.semanticSpacing['2xl'],
          }}
        >
          <Text
            style={[
              theme.typography.body.medium,
              { color: theme.colors.textSecondary },
            ]}
          >
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text
              style={[
                theme.typography.body.medium,
                { color: theme.colors.primary[500], fontWeight: '600' },
              ]}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Layout>
  );
};

export default RegisterScreen;
