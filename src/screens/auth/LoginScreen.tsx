import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
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
  Divider,
  Badge,
} from '../../components/ui';

type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<LoginNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

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

    // Load saved email if remember me was checked
    loadSavedCredentials();
  }, []);

  const loadSavedCredentials = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem('@gym_app_saved_email');
      const savedRememberMe = await AsyncStorage.getItem(
        '@gym_app_remember_me',
      );

      if (savedEmail && savedRememberMe === 'true') {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch (error) {
      console.log('Error loading saved credentials:', error);
    }
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise<void>(resolve => setTimeout(resolve, 1500));

      // For demo purposes, accept any valid email/password combination
      // In a real app, this would be an API call
      if (email && password && password.length >= 6) {
        // Save credentials if remember me is checked
        if (rememberMe) {
          await AsyncStorage.setItem('@gym_app_saved_email', email);
          await AsyncStorage.setItem('@gym_app_remember_me', 'true');
        } else {
          await AsyncStorage.removeItem('@gym_app_saved_email');
          await AsyncStorage.removeItem('@gym_app_remember_me');
        }

        await AsyncStorage.setItem('@gym_app_user_token', 'demo_token');

        // Navigate to main app - we need to navigate to the root navigator
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Login failed. Please check your credentials and try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <Layout variant="keyboard-avoiding">
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          width: '100%',
          maxWidth: 440,
          alignSelf: 'center',
          paddingVertical: theme.semanticSpacing.xl,
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
            colors={theme.colors.gradients.primary}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.semanticSpacing.lg,
            }}
          >
            <Text style={{ fontSize: 40, color: theme.colors.white }}>💪</Text>
          </LinearGradient>

          <Text
            style={[
              theme.typography.heading.h1,
              {
                color: theme.colors.text,
                marginBottom: theme.semanticSpacing.sm,
                textAlign: 'center',
              },
            ]}
          >
            Welcome Back
          </Text>

          <Text
            style={[
              theme.typography.body.large,
              { color: theme.colors.textSecondary, textAlign: 'center' },
            ]}
          >
            Sign in to continue your fitness journey
          </Text>

          <Badge
            variant="info"
            size="small"
            style={{ marginTop: theme.semanticSpacing.md, alignSelf: 'center' }}
          >
            Demo: Use any valid email & password (6+ chars)
          </Badge>
        </View>

        {/* Login Form */}
        <Card
          variant="elevated"
          padding="large"
          style={{
            width: '100%',
            borderWidth: theme.semanticSpacing.borderWidth[1],
            borderColor: theme.colors.border,
          }}
        >
          <View style={{ gap: theme.semanticSpacing.lg }}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              variant="filled"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              leftIcon="lock"
              rightIcon={showPassword ? 'visibility-off' : 'visibility'}
              onRightIconPress={() => setShowPassword(!showPassword)}
              variant="filled"
              error={errors.password}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                rowGap: theme.semanticSpacing.sm,
              }}
            >
              <TouchableOpacity
                onPress={() => setRememberMe(!rememberMe)}
                style={{ flexDirection: 'row', alignItems: 'center', flexShrink: 1 }}
              >
                <Icon
                  name={rememberMe ? 'check-box' : 'check-box-outline-blank'}
                  size={20}
                  color={
                    rememberMe
                      ? theme.colors.primary[500]
                      : theme.colors.textMuted
                  }
                />
                <Text
                  style={[
                    theme.typography.body.small,
                    { color: theme.colors.textSecondary, marginLeft: 8 },
                  ]}
                >
                  Remember me
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleForgotPassword}>
                <Text
                  style={[
                    theme.typography.body.medium,
                    { color: theme.colors.primary[500] },
                  ]}
                >
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              title="Sign In"
              onPress={handleLogin}
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
                Alert.alert('Info', 'Google sign-in would be implemented here')
              }
              variant="outline"
              size="large"
              fullWidth
              style={{ justifyContent: 'center' }}
            />
          </View>
        </Card>

        {/* Sign Up Link */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: theme.semanticSpacing['2xl'],
          }}
        >
          <Text
            style={[
              theme.typography.body.medium,
              { color: theme.colors.textSecondary },
            ]}
          >
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text
              style={[
                theme.typography.body.medium,
                { color: theme.colors.primary[500], fontWeight: '600' },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Layout>
  );
};

export default LoginScreen;
