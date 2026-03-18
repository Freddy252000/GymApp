import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Card, ProgressBar, Badge } from '../../components/ui';

type OnboardingCompleteNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OnboardingComplete'>;

const { width: screenWidth } = Dimensions.get('window');

const OnboardingCompleteScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<OnboardingCompleteNavigationProp>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start animations when component mounts
    Animated.sequence([
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
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(progressAnim, {
        toValue: 100,
        duration: 1500,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  const handleGetStarted = async () => {
    try {
      // Mark onboarding as completed
      await AsyncStorage.setItem('@gym_app_onboarding_completed', 'true');
      
      // Navigate to main app
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } catch (error) {
      console.error('Error saving onboarding completion:', error);
      // Still navigate to main app even if storage fails
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    }
  };

  const achievements = [
    {
      icon: 'check-circle',
      title: 'Profile Setup',
      description: 'Goals and fitness level configured',
      color: theme.colors.success[500],
    },
    {
      icon: 'settings',
      title: 'Preferences Set',
      description: 'Workout preferences customized',
      color: theme.colors.primary[500],
    },
    {
      icon: 'notifications-active',
      title: 'Notifications Ready',
      description: 'Stay motivated with reminders',
      color: theme.colors.secondary[500],
    },
  ];

  return (
    <Layout variant="default" padding={false}>
      <LinearGradient
        colors={theme.colors.gradients.success}
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
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <Animated.View style={{ opacity: fadeAnim }}>
              <ProgressBar 
                progress={progressAnim} 
                height={6} 
                color={theme.colors.white} 
                backgroundColor="rgba(255,255,255,0.3)"
                rounded 
              />
              <Text style={[theme.typography.caption, { color: theme.colors.white, marginTop: 8, textAlign: 'center' }]}>
                Setup Complete!
              </Text>
            </Animated.View>
          </View>

          {/* Success Icon */}
          <View style={styles.heroContainer}>
            <Animated.View
              style={[
                styles.successIconContainer,
                {
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <LinearGradient
                colors={[theme.colors.white, theme.colors.neutral[100]]}
                style={styles.successIcon}
              >
                <Icon name="check" size={60} color={theme.colors.success[500]} />
              </LinearGradient>
            </Animated.View>
            
            <Text style={[theme.typography.heading.h1, styles.welcomeText]}>
              You're All Set!
            </Text>
            
            <Text style={[theme.typography.body.large, styles.subText]}>
              Welcome to your personalized fitness journey. We've customized GymApp based on your preferences and goals.
            </Text>

            <Badge variant="success" style={{ marginTop: 16 }}>
              🎉 Ready to Start Training
            </Badge>
          </View>

          {/* Achievements */}
          <View style={styles.achievementsContainer}>
            <Text style={[theme.typography.label.large, { color: theme.colors.white, marginBottom: 16, textAlign: 'center' }]}>
              What You've Accomplished
            </Text>
            
            {achievements.map((achievement, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.achievementItem,
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 50],
                        outputRange: [0, 50 + (index * 10)],
                      }),
                    }],
                  },
                ]}
              >
                <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                  <Icon name={achievement.icon} size={20} color={theme.colors.white} />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={[theme.typography.label.medium, { color: theme.colors.white }]}>
                    {achievement.title}
                  </Text>
                  <Text style={[theme.typography.body.small, { color: theme.colors.white, opacity: 0.8 }]}>
                    {achievement.description}
                  </Text>
                </View>
              </Animated.View>
            ))}
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
                  title="Start Your First Workout"
                  onPress={handleGetStarted}
                  variant="primary"
                  size="large"
                  fullWidth
                  gradient
                  style={styles.button}
                />
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, textAlign: 'center', marginTop: 12 }]}>
                  You can always change your preferences later in settings
                </Text>
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
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 20,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  successIconContainer: {
    marginBottom: 32,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
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
    lineHeight: 24,
  },
  achievementsContainer: {
    marginBottom: 32,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  ctaContainer: {
    paddingHorizontal: 0,
  },
  card: {
    marginBottom: 20,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default OnboardingCompleteScreen;
