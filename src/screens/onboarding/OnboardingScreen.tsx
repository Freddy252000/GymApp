import React, {useState} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import {useTheme} from '../../context/ThemeContext';
import {Layout, Button, Card} from '../../components/ui';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const {width} = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Track Your Workouts',
    subtitle: 'Log your exercises, sets, and reps with ease',
    description: 'Keep track of your fitness journey with our comprehensive workout logging system.',
    icon: '💪',
  },
  {
    id: 2,
    title: 'Monitor Progress',
    subtitle: 'See your improvements over time',
    description: 'Visualize your progress with detailed charts and statistics to stay motivated.',
    icon: '📈',
  },
  {
    id: 3,
    title: 'Achieve Your Goals',
    subtitle: 'Set and reach your fitness targets',
    description: 'Set personalized goals and get insights to help you achieve your fitness dreams.',
    icon: '🎯',
  },
];

const OnboardingScreen: React.FC = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<OnboardingNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('@gym_app_onboarding_completed', 'true');
      navigation.replace('Auth');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
    }
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <Layout variant="default" padding={false}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.semanticSpacing.screenPadding}}>
        {/* Icon */}
        <View style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: theme.colors.primary[100],
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.semanticSpacing['2xl'],
        }}>
          <Text style={{fontSize: 60}}>{currentItem.icon}</Text>
        </View>

        {/* Content */}
        <Card variant="default" padding="large" style={{width: '100%', alignItems: 'center'}}>
          <Text style={[
            theme.typography.heading.h1,
            {color: theme.colors.text, textAlign: 'center', marginBottom: theme.semanticSpacing.md}
          ]}>
            {currentItem.title}
          </Text>
          
          <Text style={[
            theme.typography.heading.h5,
            {color: theme.colors.primary[500], textAlign: 'center', marginBottom: theme.semanticSpacing.lg}
          ]}>
            {currentItem.subtitle}
          </Text>
          
          <Text style={[
            theme.typography.body.large,
            {color: theme.colors.textSecondary, textAlign: 'center', marginBottom: theme.semanticSpacing['2xl']}
          ]}>
            {currentItem.description}
          </Text>

          {/* Pagination Dots */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: theme.semanticSpacing['2xl'],
          }}>
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === currentIndex ? theme.colors.primary[500] : theme.colors.neutral[300],
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          {/* Buttons */}
          <View style={{width: '100%', gap: theme.semanticSpacing.md}}>
            <Button
              title={currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
              onPress={handleNext}
              variant="primary"
              size="large"
              fullWidth
              gradient
            />
            
            {currentIndex < onboardingData.length - 1 && (
              <Button
                title="Skip"
                onPress={handleSkip}
                variant="ghost"
                size="large"
                fullWidth
              />
            )}
          </View>
        </Card>
      </View>
    </Layout>
  );
};

export default OnboardingScreen;
