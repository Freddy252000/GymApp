import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Header, ProgressBar, Badge } from '../../components/ui';

type OnboardingFitnessLevelNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OnboardingFitnessLevel'>;

interface FitnessLevel {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
}

const OnboardingFitnessLevelScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<OnboardingFitnessLevelNavigationProp>();
  const [selectedLevel, setSelectedLevel] = useState<string>('');
  
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

  const fitnessLevels: FitnessLevel[] = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'New to fitness or getting back into it',
      icon: 'child-care',
      color: theme.colors.success[500],
      badge: 'Start Here',
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: 'Regular exercise routine, comfortable with basics',
      icon: 'directions-walk',
      color: theme.colors.warning[500],
      badge: 'Most Popular',
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: 'Experienced with complex movements and training',
      icon: 'fitness-center',
      color: theme.colors.primary[500],
      badge: 'Challenge Mode',
    },
    {
      id: 'expert',
      title: 'Expert',
      description: 'Athlete level, looking for peak performance',
      icon: 'emoji-events',
      color: theme.colors.error[500],
      badge: 'Elite',
    },
  ];

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleContinue = () => {
    if (!selectedLevel) {
      return;
    }
    // Save selected fitness level to storage or context
    navigation.navigate('OnboardingPreferences');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingPreferences');
  };

  return (
    <Layout variant="default" padding={false}>
      <Header
        title="Fitness Level"
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
          <ProgressBar progress={50} height={4} color={theme.colors.primary[500]} rounded />
          <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginTop: 8 }]}>
            Step 2 of 4
          </Text>
        </View>

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>
            What's your fitness level?
          </Text>
          <Text style={[theme.typography.body.large, { color: theme.colors.textSecondary }]}>
            This helps us recommend the right workouts and intensity for you.
          </Text>
        </View>

        {/* Fitness Levels */}
        <View style={styles.levelsContainer}>
          {fitnessLevels.map((level, index) => {
            const isSelected = selectedLevel === level.id;
            return (
              <Animated.View
                key={level.id}
                style={[
                  {
                    opacity: fadeAnim,
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 30],
                        outputRange: [0, 30 + (index * 8)],
                      }),
                    }],
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => handleLevelSelect(level.id)}
                  style={[
                    styles.levelCard,
                    {
                      backgroundColor: isSelected ? level.color + '15' : theme.colors.surface,
                      borderColor: isSelected ? level.color : theme.colors.border,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                >
                  <View style={styles.levelHeader}>
                    <View style={[styles.levelIcon, { backgroundColor: level.color }]}>
                      <Icon name={level.icon} size={28} color={theme.colors.white} />
                    </View>
                    <View style={styles.levelInfo}>
                      <View style={styles.titleRow}>
                        <Text style={[theme.typography.label.large, { color: theme.colors.text }]}>
                          {level.title}
                        </Text>
                        <Badge 
                          variant={level.id === 'intermediate' ? 'warning' : level.id === 'beginner' ? 'success' : 'primary'} 
                          size="small"
                        >
                          {level.badge}
                        </Badge>
                      </View>
                      <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>
                        {level.description}
                      </Text>
                    </View>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <Icon name="check-circle" size={24} color={level.color} />
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
            disabled={!selectedLevel}
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
  levelsContainer: {
    flex: 1,
    gap: 16,
  },
  levelCard: {
    padding: 20,
    borderRadius: 16,
    position: 'relative',
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  levelInfo: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  checkmark: {
    marginLeft: 12,
  },
  actionContainer: {
    paddingTop: 24,
  },
});

export default OnboardingFitnessLevelScreen;
