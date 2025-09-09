import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Card } from '../../components/ui';

type WelcomeNavigationProp = StackNavigationProp<AuthStackParamList>;

const WelcomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<WelcomeNavigationProp>();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <Layout variant="keyboard-avoiding">
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <View
            style={[
              styles.logoContainer,
              { backgroundColor: theme.colors.primary[500] },
            ]}
          >
            <Text style={styles.logoEmoji}>🏋️</Text>
          </View>
          <Text
            style={[
              theme.typography.heading.h1,
              styles.welcomeText,
              { color: theme.colors.text },
            ]}
          >
            Your Fitness Journey Starts Here
          </Text>
          <Text
            style={[
              theme.typography.body.large,
              styles.subText,
              { color: theme.colors.textSecondary },
            ]}
          >
            Transform your body and mind with our gym app
          </Text>
        </View>

        {/* Call to Action */}
        <Card variant="elevated" padding="large" style={styles.card}>
          <View style={styles.buttonContainer}>
            <Button
              title="Get Started"
              onPress={handleSignUpPress}
              variant="primary"
              size="large"
              fullWidth
              gradient
              style={styles.button}
            />
            <TouchableOpacity onPress={handleLoginPress}>
              <Text
                style={[
                  theme.typography.body.medium,
                  styles.loginText,
                  { color: theme.colors.primary[500] },
                ]}
              >
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoEmoji: {
    fontSize: 60,
    color: 'white',
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
  },
  button: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  loginText: {
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WelcomeScreen;
