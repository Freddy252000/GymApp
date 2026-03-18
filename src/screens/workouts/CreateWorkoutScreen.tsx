import React, { useMemo, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { Button, Chip, ExerciseCard, Input, Layout, StatCard } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { exerciseLibrary, workoutPlans } from '../../data/mockFitnessData';
import { WorkoutStackParamList } from '../../navigation/types';

type CreateWorkoutNavigationProp = StackNavigationProp<WorkoutStackParamList, 'CreateWorkout'>;

const CreateWorkoutScreen: React.FC = () => {
  const navigation = useNavigation<CreateWorkoutNavigationProp>();
  const { theme } = useTheme();
  const [name, setName] = useState('Upper Body Hypertrophy');
  const [goal, setGoal] = useState('Build chest and shoulder volume while keeping the session under 50 minutes.');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState('45 min');

  const focusAreas = useMemo(() => Array.from(new Set(exerciseLibrary.flatMap(item => item.muscleGroups))).slice(0, 6), []);

  return (
    <Layout variant="keyboard-avoiding">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Create workout plan</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>
            Build a polished custom plan with structure, focus areas, and exercise picks.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard title="Templates" value={workoutPlans.length} subtitle="Starting points" icon="dashboard" style={{ flex: 1 }} />
          <StatCard title="Library" value={exerciseLibrary.length} subtitle="Exercise options" icon="menu-book" style={{ flex: 1 }} />
        </View>

        <View style={{ gap: theme.semanticSpacing.lg }}>
          <Input label="Workout name" value={name} onChangeText={setName} variant="filled" leftIcon="edit" />
          <Input
            label="Goal / notes"
            value={goal}
            onChangeText={setGoal}
            variant="filled"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={{ minHeight: 120 }}
          />
        </View>

        <View>
          <SectionHeader title="Difficulty" subtitle="Choose the training intensity" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            {['Beginner', 'Intermediate', 'Advanced'].map(level => (
              <Chip key={level} label={level} variant="filter" selected={difficulty === level} onPress={() => setDifficulty(level)} />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Duration target" subtitle="Keep the session realistic and repeatable" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            {['30 min', '45 min', '60 min'].map(option => (
              <Chip key={option} label={option} variant="filter" selected={duration === option} onPress={() => setDuration(option)} />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Suggested focus areas" subtitle="Use these to shape the plan" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            {focusAreas.map(area => (
              <Chip key={area} label={area} variant="outlined" />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Exercise picks" subtitle="Recommended starting exercises for your program" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {exerciseLibrary.slice(0, 3).map(exercise => (
              <ExerciseCard key={exercise.id} exercise={exercise} variant="compact" showActions={false} onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: exercise.id })} />
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button
            title="Save draft"
            onPress={() => Alert.alert('Workout saved', 'This screen is now fully designed and ready for real form wiring.')}
            gradient
            style={{ flex: 1 }}
          />
          <Button title="Preview plan" onPress={() => navigation.navigate('WorkoutDetail', { workoutId: workoutPlans[0].id })} variant="outline" style={{ flex: 1 }} />
        </View>
      </View>
    </Layout>
  );
};

export default CreateWorkoutScreen;
