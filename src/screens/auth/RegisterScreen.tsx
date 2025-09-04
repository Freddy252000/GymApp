import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useTheme} from '../../context/ThemeContext';
import {Layout, Button, Input, Card, Header} from '../../components/ui';

type RegisterNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

const RegisterScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<RegisterNavigationProp>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

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

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, create account and login
      await AsyncStorage.setItem('@gym_app_user_token', 'demo_token');
      
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to main app (this will be handled by RootNavigator)
            navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          },
        },
      ]);
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
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  return (
    <Layout variant="keyboard-avoiding" padding={false}>
      <Header
        title="Create Account"
        showBackButton
        onLeftPress={() => navigation.goBack()}
      />
      
      <View style={{flex: 1, padding: theme.semanticSpacing.screenPadding}}>
        {/* Header */}
        <View style={{alignItems: 'center', marginBottom: theme.semanticSpacing['2xl']}}>
          <Text style={[
            theme.typography.heading.h2,
            {color: theme.colors.text, marginBottom: theme.semanticSpacing.sm}
          ]}>
            Join GymApp
          </Text>
          
          <Text style={[
            theme.typography.body.large,
            {color: theme.colors.textSecondary, textAlign: 'center'}
          ]}>
            Start your fitness journey today
          </Text>
        </View>

        {/* Registration Form */}
        <Card variant="elevated" padding="large">
          <View style={{gap: theme.semanticSpacing.lg}}>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              leftIcon="person"
              error={errors.name}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon="email"
              error={errors.email}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              value={formData.password}
              onChangeText={(value) => updateFormData('password', value)}
              secureTextEntry
              leftIcon="lock"
              error={errors.password}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry
              leftIcon="lock"
              error={errors.confirmPassword}
            />

            <Button
              title="Create Account"
              onPress={handleRegister}
              variant="primary"
              size="large"
              fullWidth
              loading={loading}
              gradient
            />
          </View>
        </Card>

        {/* Sign In Link */}
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
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={[
              theme.typography.body.medium,
              {color: theme.colors.primary[500], fontWeight: '600'}
            ]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

export default RegisterScreen;
