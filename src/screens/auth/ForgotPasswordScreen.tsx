import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/types';
import {useTheme} from '../../context/ThemeContext';
import {Layout, Button, Input, Card, Header} from '../../components/ui';

type ForgotPasswordNavigationProp = StackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert(
        'Reset Link Sent',
        'We have sent a password reset link to your email address. Please check your inbox and follow the instructions.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
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
      
      <View style={{flex: 1, padding: theme.semanticSpacing.screenPadding, justifyContent: 'center'}}>
        {/* Header */}
        <View style={{alignItems: 'center', marginBottom: theme.semanticSpacing['3xl']}}>
          <View style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.colors.secondary[100],
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.semanticSpacing.lg,
          }}>
            <Text style={{fontSize: 40}}>🔐</Text>
          </View>
          
          <Text style={[
            theme.typography.heading.h2,
            {color: theme.colors.text, marginBottom: theme.semanticSpacing.sm}
          ]}>
            Forgot Password?
          </Text>
          
          <Text style={[
            theme.typography.body.large,
            {color: theme.colors.textSecondary, textAlign: 'center'}
          ]}>
            Don't worry! Enter your email address and we'll send you a link to reset your password.
          </Text>
        </View>

        {/* Reset Form */}
        <Card variant="elevated" padding="large">
          <View style={{gap: theme.semanticSpacing.lg}}>
            <Input
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={(value) => {
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
      </View>
    </Layout>
  );
};

export default ForgotPasswordScreen;
