import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Card, Header, ProgressBar } from '../../components/ui';

type OnboardingGoalsNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OnboardingGoals'>;

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const OnboardingGoalsScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<OnboardingGoalsNavigationProp>();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  
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

  const goals: Goal[] = [
    {
      id: 'lose_weight',
      title: 'Lose Weight',
      description: 'Burn calories and shed pounds',
      icon: 'trending-down',
      color: theme.colors.error[500],
    },
    {
      id: 'build_muscle',
      title: 'Build Muscle',
      description: 'Gain strength and muscle mass',
      icon: 'fitness-center',
      color: theme.colors.primary[500],
    },
    {
      id: 'stay_fit',
      title: 'Stay Fit',
      description: 'Maintain current fitness level',
      icon: 'favorite',
      color: theme.colors.success[500],
    },
    {
      id: 'improve_endurance',
      title: 'Improve Endurance',
      description: 'Build cardiovascular fitness',
      icon: 'directions-run',
      color: theme.colors.secondary[500],
    },
    {
      id: 'flexibility',
      title: 'Increase Flexibility',
      description: 'Improve mobility and range of motion',
      icon: 'self-improvement',
      color: theme.colors.warning[500],
    },
    {
      id: 'general_health',
      title: 'General Health',
      description: 'Overall wellness and health',
      icon: 'health-and-safety',
      color: theme.colors.info[500],
    },
  ];

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleContinue = () => {
    if (selectedGoals.length === 0) {
      return;
    }
    // Save selected goals to storage or context
    navigation.navigate('OnboardingFitnessLevel');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingFitnessLevel');
  };

  return (
    <Layout variant="default" padding={false}>
      <Header
        title="Your Goals"
        showBackButton
        onLeftPress={() => navigation.goBack()}
      />

      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <ProgressBar progress={25} height={4} color={theme.colors.primary[500]} rounded />
          <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginTop: 8 }]}>
            Step 1 of 4
          </Text>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>
            What are your fitness goals?
          </Text>
          <Text style={[theme.typography.body.large, { color: theme.colors.textSecondary }]}>
            Select all that apply. We'll personalize your experience based on your goals.
          </Text>
        </View>

        {/* Goals Grid */}
        <View style={styles.goalsContainer}>
          {goals.map((goal, index) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <Animated.View
                key={goal.id}
                style={[
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 + (index * 5)],
                      }),
                    }],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleGoalToggle(goal.id)}
                  style={[
                    styles.goalCard,
                    {
                      backgroundColor: isSelected ? goal.color + '20' : theme.colors.surface,
                      borderColor: isSelected ? goal.color : theme.colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  <View style={[styles.goalIcon, { backgroundColor: goal.color }]}>
                    <Icon name={goal.icon} size={24} color={theme.colors.white} />
                  </View>
                  <Text style={[theme.typography.label.large, { color: theme.colors.text }]}>
                    {goal.title}
                  </Text>
                  <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
                    {goal.description}
                  </Text>
                  {isSelected && (
                    <View style={styles.checkmark}>
                      <Icon name="check-circle" size={20} color={goal.color} />
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            title={`Continue${selectedGoals.length > 0 ? ` (${selectedGoals.length} selected)` : ''}`}
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
            disabled={selectedGoals.length === 0}
            gradient
          />
          <Button
            title="Skip for Now"
            onPress={handleSkip}
            variant="ghost"
            size="medium"
            fullWidth
            style={{ marginTop: 12 }}
          />
        </View>
      </Animated.View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  headerContainer: {
    marginBottom: 32,
  },
  goalsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  goalCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    position: 'relative',
    minHeight: 140,
    justifyContent: 'center',
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  actionContainer: {
    paddingTop: 24,
  },
});

export default OnboardingGoalsScreen;
