import React from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { ReminderCard, SectionHeader } from '../../components/fitness';
import { userProfile, workoutReminders } from '../../data/mockFitnessData';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ProfileStackParamList } from '../../navigation/types';
import { Badge, Button, Card, Layout, StatCard } from '../../components/ui';

type ProfileNavigationProp = StackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

const ProfileMainScreen: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const { theme } = useTheme();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('@gym_app_user_token');
          } catch (error) {
            console.error('Error during logout:', error);
          }
        },
      },
    ]);
  };

  return (
    <Layout variant="scroll">
      <Card variant="elevated" padding="large" style={{ marginTop: theme.semanticSpacing.lg }}>
        <View style={{ alignItems: 'center' }}>
          <View
            style={{
              width: 88,
              height: 88,
              borderRadius: 44,
              backgroundColor: theme.colors.primary[500],
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={[theme.typography.heading.h2, { color: theme.colors.white }]}>FV</Text>
          </View>

          <Text
            style={[
              theme.typography.heading.h3,
              { color: theme.colors.text, textAlign: 'center', marginTop: theme.semanticSpacing.md },
            ]}>
            {userProfile.name}
          </Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>
            {userProfile.email}
          </Text>
          <Text
            style={[
              theme.typography.body.small,
              {
                color: theme.colors.textSecondary,
                textAlign: 'center',
                marginTop: theme.semanticSpacing.sm,
              },
            ]}>
            {userProfile.fitnessGoal}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.semanticSpacing.sm,
              justifyContent: 'center',
              marginTop: theme.semanticSpacing.md,
            }}>
            <Badge variant="info">{userProfile.level}</Badge>
            <Badge variant="neutral">{userProfile.preferredWorkoutTime}</Badge>
            <Badge variant={userProfile.offlineModeEnabled ? 'success' : 'warning'}>
              {userProfile.offlineModeEnabled ? 'Offline ready' : 'Online only'}
            </Badge>
          </View>
        </View>
      </Card>

      <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginTop: theme.semanticSpacing.lg }}>
        <StatCard
          title="Weekly target"
          value={userProfile.weeklyTarget}
          subtitle="Sessions planned"
          icon="calendar-month"
          style={{ flex: 1 }}
        />
        <StatCard
          title="Reminders"
          value={workoutReminders.filter(item => item.enabled).length}
          subtitle="Active schedules"
          icon="notifications-active"
          style={{ flex: 1 }}
        />
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Architecture summary" subtitle="Requested platform features scaffolded" />
        <View style={{ gap: theme.semanticSpacing.md }}>
          <Card variant="outlined" padding="medium">
            <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Redux Toolkit store</Text>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>
              Workout, progress, and profile slices are generated in `src/store`.
            </Text>
          </Card>
          <Card variant="outlined" padding="medium">
            <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>SQLite offline schema</Text>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>
              SQL bootstrap statements live in `src/database/schema.ts` with an offline initializer service.
            </Text>
          </Card>
          <Card variant="outlined" padding="medium">
            <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Workout reminders</Text>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>
              Notification scheduling is abstracted behind `src/services/notifications/reminderService.ts`.
            </Text>
          </Card>
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Reminder schedule" subtitle="Preview of reminder card UI" />
        <View style={{ gap: theme.semanticSpacing.md }}>
          {workoutReminders.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </View>
      </View>

      <View style={{ gap: theme.semanticSpacing.md, marginTop: theme.semanticSpacing['2xl'], marginBottom: theme.semanticSpacing.xl }}>
        <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')} fullWidth />
        <Button title="Settings" onPress={() => navigation.navigate('Settings')} variant="outline" fullWidth />
        <Button title="Help & Support" onPress={() => navigation.navigate('Help')} variant="outline" fullWidth />
        <Button title="About App" onPress={() => navigation.navigate('About')} variant="ghost" fullWidth />
        <Button title="Logout" onPress={handleLogout} variant="danger" fullWidth />
      </View>
    </Layout>
  );
};

export default ProfileMainScreen;
