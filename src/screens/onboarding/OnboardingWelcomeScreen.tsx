import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Card } from '../../components/ui';

type OnboardingWelcomeNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OnboardingWelcome'>;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const OnboardingWelcomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<OnboardingWelcomeNavigationProp>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('OnboardingGoals');
  };

  const handleSkip = () => {
    // Skip onboarding and go to main app
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <Layout variant="default" padding={false}>
      <LinearGradient
        colors={theme.colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <Animated.View 
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          {/* Hero Section */}
          <View style={styles.heroContainer}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={[theme.colors.white, theme.colors.neutral[100]]}
                style={styles.logoGradient}
              >
                <Text style={styles.logoEmoji}>🏋️‍♂️</Text>
              </LinearGradient>
            </View>
            
            <Text style={[theme.typography.heading.h1, styles.welcomeText]}>
              Welcome to GymApp
            </Text>
            
            <Text style={[theme.typography.body.large, styles.subText]}>
              Your personal fitness companion that adapts to your goals, tracks your progress, and keeps you motivated every step of the way.
            </Text>

            {/* Features Preview */}
            <View style={styles.featuresContainer}>
              {[
                { icon: 'fitness-center', title: 'Smart Workouts', color: theme.colors.primary[400] },
                { icon: 'trending-up', title: 'Progress Tracking', color: theme.colors.secondary[400] },
                { icon: 'emoji-events', title: 'Achievement System', color: theme.colors.success[400] },
              ].map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureItem,
                    {
                      opacity: fadeAnim,
                      transform: [{
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 50],
                          outputRange: [0, 50 + (index * 15)],
                        }),
                      }],
                    },
                  ]}
                >
                  <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                    <Icon name={feature.icon} size={24} color={theme.colors.white} />
                  </View>
                  <Text style={[theme.typography.label.medium, { color: theme.colors.white }]}>
                    {feature.title}
                  </Text>
                </Animated.View>
              ))}
            </View>
          </View>

          {/* Call to Action */}
          <Animated.View
            style={[
              styles.ctaContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Card variant="elevated" padding="large" style={styles.card}>
              <View style={styles.buttonContainer}>
                <Button
                  title="Let's Get Started"
                  onPress={handleGetStarted}
                  variant="primary"
                  size="large"
                  fullWidth
                  gradient
                  style={styles.button}
                />
                <Button
                  title="Skip for Now"
                  onPress={handleSkip}
                  variant="ghost"
                  size="medium"
                  fullWidth
                  style={styles.skipButton}
                />
              </View>
            </Card>
          </Animated.View>
        </Animated.View>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 70,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 16,
    color: 'white',
  },
  subText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white',
    opacity: 0.9,
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    gap: 20,
    paddingHorizontal: 40,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ctaContainer: {
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 12,
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  skipButton: {
    opacity: 0.8,
  },
});

export default OnboardingWelcomeScreen;
