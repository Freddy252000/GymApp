import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from './types';
import {useTheme} from '../context/ThemeContext';

// Import navigators
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';

const Stack = createStackNavigator<RootStackParamList>();

const ONBOARDING_KEY = '@gym_app_onboarding_completed';
const AUTH_KEY = '@gym_app_user_token';

const RootNavigator: React.FC = () => {
  const {theme} = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAppState = async () => {
      try {
        // Check if onboarding is completed
        const onboardingStatus = await AsyncStorage.getItem(ONBOARDING_KEY);
        setIsOnboardingCompleted(onboardingStatus === 'true');

        // Check if user is authenticated
        const userToken = await AsyncStorage.getItem(AUTH_KEY);
        setIsAuthenticated(!!userToken);
      } catch (error) {
        console.error('Error checking app state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAppState();
  }, []);

  // Show loading screen while checking app state
  if (isLoading) {
    return null; // You can replace this with a proper loading screen component
  }

  const getInitialRouteName = (): keyof RootStackParamList => {
    if (!isOnboardingCompleted) {
      return 'Onboarding';
    }
    if (!isAuthenticated) {
      return 'Auth';
    }
    return 'Main';
  };

  return (
    <NavigationContainer
      theme={{
        dark: theme.isDark,
        colors: {
          primary: theme.colors.primary[500],
          background: theme.colors.background,
          card: theme.colors.surface,
          text: theme.colors.text,
          border: theme.colors.border,
          notification: theme.colors.primary[500],
        },
      }}>
      <Stack.Navigator
        initialRouteName={getInitialRouteName()}
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: theme.colors.background},
        }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
