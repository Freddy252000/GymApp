import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AuthStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Card, Badge } from '../../components/ui';

type WelcomeNavigationProp = StackNavigationProp<AuthStackParamList>;

const { width: screenWidth } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<WelcomeNavigationProp>();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
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

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleSignUpPress = () => {
    navigation.navigate('Register');
  };

  const features = [
    {
      icon: 'fitness-center',
      title: 'Track Workouts',
      description: 'Log your exercises and monitor progress',
    },
    {
      icon: 'trending-up',
      title: 'View Progress',
      description: 'Visualize your fitness journey with charts',
    },
    {
      icon: 'emoji-events',
      title: 'Achieve Goals',
      description: 'Set and reach your fitness milestones',
    },
  ];

  return (
    <Layout variant="default" padding={false}>
      <LinearGradient
        colors={[theme.colors.primary[500], theme.colors.primary[600]]}
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
                <Text style={styles.logoEmoji}>🏋️</Text>
              </LinearGradient>
            </View>

            <Badge
              variant="success"
              style={{ marginBottom: theme.semanticSpacing.md }}
            >
              #1 Fitness App
            </Badge>

            <Text style={[theme.typography.heading.h1, styles.welcomeText]}>
              Your Fitness Journey Starts Here
            </Text>

            <Text style={[theme.typography.body.large, styles.subText]}>
              Transform your body and mind with personalized workouts, progress
              tracking, and expert guidance
            </Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <Animated.View
                  key={index}
                  style={[
                    styles.featureItem,
                    {
                      opacity: fadeAnim,
                      transform: [
                        {
                          translateY: slideAnim.interpolate({
                            inputRange: [0, 50],
                            outputRange: [0, 50 + index * 10],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <View style={styles.featureIcon}>
                    <Icon
                      name={feature.icon}
                      size={20}
                      color={theme.colors.primary[500]}
                    />
                  </View>
                  <View style={styles.featureContent}>
                    <Text
                      style={[
                        theme.typography.label.medium,
                        { color: theme.colors.white },
                      ]}
                    >
                      {feature.title}
                    </Text>
                    <Text
                      style={[
                        theme.typography.caption,
                        { color: theme.colors.white, opacity: 0.8 },
                      ]}
                    >
                      {feature.description}
                    </Text>
                  </View>
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
                  title="Get Started Free"
                  onPress={handleSignUpPress}
                  variant="primary"
                  size="large"
                  fullWidth
                  gradient
                  style={styles.button}
                />
                <TouchableOpacity
                  onPress={handleLoginPress}
                  style={styles.loginButton}
                >
                  <Text
                    style={[theme.typography.body.medium, styles.loginText]}
                  >
                    Already have an account?{' '}
                    <Text style={{ fontWeight: '600' }}>Log In</Text>
                  </Text>
                </TouchableOpacity>
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
    paddingVertical: 40,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoEmoji: {
    fontSize: 60,
  },
  welcomeText: {
    textAlign: 'center',
    marginBottom: 12,
    color: 'white',
  },
  subText: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'white',
    opacity: 0.9,
    marginBottom: 32,
  },
  featuresContainer: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  ctaContainer: {
    paddingHorizontal: 16,
  },
  card: {
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
  loginButton: {
    paddingVertical: 8,
  },
  loginText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default WelcomeScreen;
