import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useTheme } from '../../context/ThemeContext';
import { MeasurementCard, ReminderCard, SectionHeader } from '../../components/fitness';
import { Badge, Button, Card, Layout, StatCard, WorkoutCard } from '../../components/ui';
import {
  measurementHistory,
  personalRecords,
  userProfile,
  weeklySummary,
  workoutPlans,
  workoutReminders,
} from '../../data/mockFitnessData';
import { MainTabParamList } from '../../navigation/types';

type HomeNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { theme } = useTheme();
  const latestMeasurement = measurementHistory[measurementHistory.length - 1];
  const firstMeasurement = measurementHistory[0];
  const featuredWorkout = workoutPlans[0];

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg }}>
        <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>Welcome back</Text>
        <Text style={[theme.typography.heading.h2, { color: theme.colors.text, marginTop: 4 }]}>
          {userProfile.name}
        </Text>
        <Text
          style={[
            theme.typography.body.medium,
            { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm },
          ]}>
          Stay on track with workout plans, reminders, body measurements, and personal bests.
        </Text>
      </View>

      <View style={{ gap: theme.semanticSpacing.md }}>
        <StatCard
          title="Weekly target"
          value={`${weeklySummary.workoutsCompleted}/${weeklySummary.weeklyTarget}`}
          subtitle="Workout sessions completed"
          icon="flag"
          variant="gradient"
          progress={{ current: weeklySummary.workoutsCompleted, total: weeklySummary.weeklyTarget }}
        />

        {/* <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard
            title="Current streak"
            value={weeklySummary.currentStreak}
            subtitle="Days in a row"
            icon="local-fire-department"
            style={{ flex: 1, alignSelf: 'flex-start' }}
          />
          <StatCard
            title="Minutes trained"
            value={weeklySummary.minutesTrained}
            subtitle="This week"
            icon="schedule"
            style={{ flex: 1, alignSelf: 'flex-start' }}
          />
        </View> */}
        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard
            title="Current streak"
            value={weeklySummary.currentStreak}
            subtitle="Days in a row"
            icon="local-fire-department"
            style={{ flex: 1 }}
          />
          <StatCard
            title="Minutes trained"
            value={weeklySummary.minutesTrained}
            subtitle="This week"
            icon="schedule"
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader
          title="Today's featured workout"
          subtitle="Workout plan management starts here"
          actionLabel="All workouts"
          onActionPress={() => navigation.navigate('Workouts')}
        />
        <WorkoutCard
          workout={featuredWorkout}
          variant="featured"
          onPress={() => navigation.navigate('Workouts')}
          onStart={() => navigation.navigate('Workouts')}
          onFavorite={() => navigation.navigate('Workouts')}
        />
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader
          title="Body composition"
          subtitle="Latest body measurement tracking snapshot"
          actionLabel="Progress"
          onActionPress={() => navigation.navigate('Progress')}
        />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.md }}>
          <MeasurementCard
            label="Weight"
            value={`${latestMeasurement.weightKg} kg`}
            change={`${(latestMeasurement.weightKg - firstMeasurement.weightKg).toFixed(1)} kg since start`}
            positive={latestMeasurement.weightKg <= firstMeasurement.weightKg}
          />
          <MeasurementCard
            label="Body fat"
            value={`${latestMeasurement.bodyFatPercent}%`}
            change={`${(latestMeasurement.bodyFatPercent - firstMeasurement.bodyFatPercent).toFixed(1)}% since start`}
            positive={latestMeasurement.bodyFatPercent <= firstMeasurement.bodyFatPercent}
          />
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader
          title="Workout reminders"
          subtitle="Push-notification reminder models are scaffolded"
          actionLabel="Profile"
          onActionPress={() => navigation.navigate('Profile')}
        />
        <View style={{ gap: theme.semanticSpacing.md }}>
          {workoutReminders.map(reminder => (
            <ReminderCard key={reminder.id} reminder={reminder} />
          ))}
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Recent personal records" subtitle="Strength and performance milestones" />
        <View style={{ gap: theme.semanticSpacing.md }}>
          {personalRecords.slice(0, 2).map(record => (
            <Card key={record.id} variant="elevated" padding="medium">
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{record.exercise}</Text>
                  <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>Achieved {record.date}</Text>
                </View>
                <Badge variant="success">{record.improvement}</Badge>
              </View>
              <Text
                style={[
                  theme.typography.heading.h3,
                  { color: theme.colors.primary[500], marginTop: theme.semanticSpacing.sm },
                ]}>
                {record.value} {record.unit}
              </Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'], marginBottom: theme.semanticSpacing.xl }}>
        <Button
          title="View full progress dashboard"
          onPress={() => navigation.navigate('Progress')}
          fullWidth
          gradient
        />
      </View>
    </Layout>
  );
};

export default HomeScreen;