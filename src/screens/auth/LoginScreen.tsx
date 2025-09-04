import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useTheme} from '../../context/ThemeContext';
import {Layout, Button, Input, Card} from '../../components/ui';

type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<LoginNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, accept any valid email/password
      await AsyncStorage.setItem('@gym_app_user_token', 'demo_token');
      
      // Navigate to main app (this will be handled by RootNavigator)
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}], // This will trigger a re-render in RootNavigator
      });
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
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
      <View style={{flex: 1, justifyContent: 'center'}}>
        {/* Header */}
        <View style={{alignItems: 'center', marginBottom: theme.semanticSpacing['3xl']}}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.colors.primary[500],
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.semanticSpacing.lg,
          }}>
            <Text style={{fontSize: 40, color: theme.colors.white}}>💪</Text>
          </View>
          
          <Text style={[
            theme.typography.heading.h1,
            {color: theme.colors.text, marginBottom: theme.semanticSpacing.sm}
          ]}>
            Welcome Back
          </Text>
          
          <Text style={[
            theme.typography.body.large,
            {color: theme.colors.textSecondary, textAlign: 'center'}
          ]}>
            Sign in to continue your fitness journey
          </Text>
        </View>

        {/* Login Form */}
        <Card variant="elevated" padding="large">
          <View style={{gap: theme.semanticSpacing.lg}}>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              leftIcon="lock"
              error={errors.password}
            />

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={[
                theme.typography.body.medium,
                {color: theme.colors.primary[500], textAlign: 'right'}
              ]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <Button
              title="Sign In"
              onPress={handleLogin}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              gradient
            />
          </View>
        </Card>

        {/* Sign Up Link */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: theme.semanticSpacing['2xl'],
        }}>
          <Text style={[
            theme.typography.body.medium,
            {color: theme.colors.textSecondary}
          ]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[
              theme.typography.body.medium,
              {color: theme.colors.primary[500], fontWeight: '600'}
            ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default LoginScreen;
