import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {MainTabParamList, WorkoutStackParamList, ProgressStackParamList, ProfileStackParamList} from './types';
import {useTheme} from '../context/ThemeContext';

// Import screens (we'll create these later)
import HomeScreen from '../screens/main/HomeScreen';
import WorkoutListScreen from '../screens/workouts/WorkoutListScreen';
import WorkoutDetailScreen from '../screens/workouts/WorkoutDetailScreen';
import ExerciseDetailScreen from '../screens/workouts/ExerciseDetailScreen';
import CreateWorkoutScreen from '../screens/workouts/CreateWorkoutScreen';
import EditWorkoutScreen from '../screens/workouts/EditWorkoutScreen';
import ProgressOverviewScreen from '../screens/progress/ProgressOverviewScreen';
import ProgressDetailScreen from '../screens/progress/ProgressDetailScreen';
import ProgressHistoryScreen from '../screens/progress/ProgressHistoryScreen';
import ProfileMainScreen from '../screens/profile/ProfileMainScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import AboutScreen from '../screens/profile/AboutScreen';
import HelpScreen from '../screens/profile/HelpScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();
const WorkoutStack = createStackNavigator<WorkoutStackParamList>();
const ProgressStack = createStackNavigator<ProgressStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

// Workout Stack Navigator
const WorkoutStackNavigator: React.FC = () => {
  const {theme} = useTheme();

  return (
    <WorkoutStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontFamily: theme.fontFamilies.medium,
          fontSize: theme.fontSizes.lg,
        },
        cardStyle: {backgroundColor: theme.colors.background},
      }}>
      <WorkoutStack.Screen 
        name="WorkoutList" 
        component={WorkoutListScreen}
        options={{title: 'Workouts'}}
      />
      <WorkoutStack.Screen 
        name="WorkoutDetail" 
        component={WorkoutDetailScreen}
        options={{title: 'Workout Details'}}
      />
      <WorkoutStack.Screen 
        name="ExerciseDetail" 
        component={ExerciseDetailScreen}
        options={{title: 'Exercise Details'}}
      />
      <WorkoutStack.Screen 
        name="CreateWorkout" 
        component={CreateWorkoutScreen}
        options={{title: 'Create Workout'}}
      />
      <WorkoutStack.Screen 
        name="EditWorkout" 
        component={EditWorkoutScreen}
        options={{title: 'Edit Workout'}}
      />
    </WorkoutStack.Navigator>
  );
};

// Progress Stack Navigator
const ProgressStackNavigator: React.FC = () => {
  const {theme} = useTheme();

  return (
    <ProgressStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontFamily: theme.fontFamilies.medium,
          fontSize: theme.fontSizes.lg,
        },
        cardStyle: {backgroundColor: theme.colors.background},
      }}>
      <ProgressStack.Screen 
        name="ProgressOverview" 
        component={ProgressOverviewScreen}
        options={{title: 'Progress'}}
      />
      <ProgressStack.Screen 
        name="ProgressDetail" 
        component={ProgressDetailScreen}
        options={{title: 'Progress Details'}}
      />
      <ProgressStack.Screen 
        name="ProgressHistory" 
        component={ProgressHistoryScreen}
        options={{title: 'Progress History'}}
      />
    </ProgressStack.Navigator>
  );
};

// Profile Stack Navigator
const ProfileStackNavigator: React.FC = () => {
  const {theme} = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          fontFamily: theme.fontFamilies.medium,
          fontSize: theme.fontSizes.lg,
        },
        cardStyle: {backgroundColor: theme.colors.background},
      }}>
      <ProfileStack.Screen 
        name="ProfileMain" 
        component={ProfileMainScreen}
        options={{title: 'Profile'}}
      />
      <ProfileStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
      <ProfileStack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
      <ProfileStack.Screen 
        name="About" 
        component={AboutScreen}
        options={{title: 'About'}}
      />
      <ProfileStack.Screen 
        name="Help" 
        component={HelpScreen}
        options={{title: 'Help & Support'}}
      />
    </ProfileStack.Navigator>
  );
};

// Main Tab Navigator
const MainTabs: React.FC = () => {
  const {theme} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Workouts':
              iconName = 'fitness-center';
              break;
            case 'Progress':
              iconName = 'trending-up';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary[500],
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
          paddingBottom: theme.semanticSpacing.xs,
          paddingTop: theme.semanticSpacing.xs,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: theme.fontFamilies.medium,
          fontSize: theme.fontSizes.xs,
          marginTop: 2,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Workouts" component={WorkoutStackNavigator} />
      <Tab.Screen name="Progress" component={ProgressStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainTabs;
