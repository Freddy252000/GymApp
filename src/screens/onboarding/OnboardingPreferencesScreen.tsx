import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { OnboardingStackParamList } from '../../navigation/types';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Button, Header, ProgressBar, Card, Switch, Slider } from '../../components/ui';

type OnboardingPreferencesNavigationProp = StackNavigationProp<OnboardingStackParamList, 'OnboardingPreferences'>;

const OnboardingPreferencesScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<OnboardingPreferencesNavigationProp>();
  
  // Preferences state
  const [workoutDuration, setWorkoutDuration] = useState(30);
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(3);
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [progressTracking, setProgressTracking] = useState(true);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>(['bodyweight']);
  
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

  const equipmentOptions = [
    { id: 'bodyweight', title: 'Bodyweight', icon: 'accessibility' },
    { id: 'dumbbells', title: 'Dumbbells', icon: 'fitness-center' },
    { id: 'barbell', title: 'Barbell', icon: 'fitness-center' },
    { id: 'resistance_bands', title: 'Resistance Bands', icon: 'linear-scale' },
    { id: 'kettlebells', title: 'Kettlebells', icon: 'sports-gymnastics' },
    { id: 'gym_access', title: 'Full Gym Access', icon: 'business' },
  ];

  const handleEquipmentToggle = (equipmentId: string) => {
    setSelectedEquipment(prev => 
      prev.includes(equipmentId) 
        ? prev.filter(id => id !== equipmentId)
        : [...prev, equipmentId]
    );
  };

  const handleContinue = () => {
    // Save preferences to storage or context
    const preferences = {
      workoutDuration,
      workoutsPerWeek,
      notifications,
      reminders,
      progressTracking,
      equipment: selectedEquipment,
    };
    console.log('Saving preferences:', preferences);
    navigation.navigate('OnboardingComplete');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingComplete');
  };

  return (
    <Layout variant="default" padding={false}>
      <Header
        title="Preferences"
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
          <ProgressBar progress={75} height={4} color={theme.colors.primary[500]} rounded />
          <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginTop: 8 }]}>
            Step 3 of 4
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>
              Customize Your Experience
            </Text>
            <Text style={[theme.typography.body.large, { color: theme.colors.textSecondary }]}>
              Set your preferences to get the most out of GymApp.
            </Text>
          </View>

          {/* Workout Settings */}
          <Card variant="elevated" padding="large" style={styles.sectionCard}>
            <Text style={[theme.typography.label.large, { color: theme.colors.text, marginBottom: 16 }]}>
              Workout Settings
            </Text>
            
            <View style={styles.settingItem}>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>
                Preferred Workout Duration
              </Text>
              <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
                {workoutDuration} minutes
              </Text>
              <Slider
                value={workoutDuration}
                onValueChange={setWorkoutDuration}
                minimumValue={15}
                maximumValue={90}
                step={15}
                label="Duration"
              />
            </View>

            <View style={styles.settingItem}>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>
                Workouts Per Week
              </Text>
              <Text style={[theme.typography.caption, { color: theme.colors.textSecondary, marginBottom: 12 }]}>
                {workoutsPerWeek} times per week
              </Text>
              <Slider
                value={workoutsPerWeek}
                onValueChange={setWorkoutsPerWeek}
                minimumValue={1}
                maximumValue={7}
                step={1}
                label="Frequency"
              />
            </View>
          </Card>

          {/* Equipment */}
          <Card variant="elevated" padding="large" style={styles.sectionCard}>
            <Text style={[theme.typography.label.large, { color: theme.colors.text, marginBottom: 16 }]}>
              Available Equipment
            </Text>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginBottom: 16 }]}>
              Select all equipment you have access to
            </Text>
            
            <View style={styles.equipmentGrid}>
              {equipmentOptions.map((equipment) => {
                const isSelected = selectedEquipment.includes(equipment.id);
                return (
                  <TouchableOpacity
                    key={equipment.id}
                    onPress={() => handleEquipmentToggle(equipment.id)}
                    style={[
                      styles.equipmentCard,
                      {
                        backgroundColor: isSelected ? theme.colors.primary[100] : theme.colors.surface,
                        borderColor: isSelected ? theme.colors.primary[500] : theme.colors.border,
                        borderWidth: isSelected ? 2 : 1,
                      },
                    ]}
                  >
                    <Icon 
                      name={equipment.icon} 
                      size={24} 
                      color={isSelected ? theme.colors.primary[500] : theme.colors.textSecondary} 
                    />
                    <Text style={[
                      theme.typography.body.small, 
                      { 
                        color: isSelected ? theme.colors.primary[500] : theme.colors.text,
                        textAlign: 'center',
                        marginTop: 8,
                      }
                    ]}>
                      {equipment.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Card>

          {/* Notifications */}
          <Card variant="elevated" padding="large" style={styles.sectionCard}>
            <Text style={[theme.typography.label.large, { color: theme.colors.text, marginBottom: 16 }]}>
              Notifications & Reminders
            </Text>
            
            <View style={styles.switchItem}>
              <View style={styles.switchContent}>
                <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>
                  Push Notifications
                </Text>
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
                  Get notified about workouts and achievements
                </Text>
              </View>
              <Switch value={notifications} onValueChange={setNotifications} />
            </View>

            <View style={styles.switchItem}>
              <View style={styles.switchContent}>
                <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>
                  Workout Reminders
                </Text>
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
                  Daily reminders to stay on track
                </Text>
              </View>
              <Switch value={reminders} onValueChange={setReminders} />
            </View>

            <View style={styles.switchItem}>
              <View style={styles.switchContent}>
                <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>
                  Progress Tracking
                </Text>
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
                  Track and analyze your fitness progress
                </Text>
              </View>
              <Switch value={progressTracking} onValueChange={setProgressTracking} />
            </View>
          </Card>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <Button
            title="Continue"
            onPress={handleContinue}
            variant="primary"
            size="large"
            fullWidth
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
  scrollContainer: {
    flex: 1,
  },
  headerContainer: {
    marginBottom: 24,
  },
  sectionCard: {
    marginBottom: 20,
  },
  settingItem: {
    marginBottom: 24,
  },
  equipmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  equipmentCard: {
    width: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  switchContent: {
    flex: 1,
    marginRight: 16,
  },
  actionContainer: {
    paddingTop: 20,
  },
});

export default OnboardingPreferencesScreen;
