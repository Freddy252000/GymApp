import React, { useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { SectionHeader } from '../../components/fitness';
import { exerciseLibrary, workoutPlans } from '../../data/mockFitnessData';
import { WorkoutStackParamList } from '../../navigation/types';
import { Button, Chip, ExerciseCard, Layout, StatCard, Timer, WorkoutCard } from '../../components/ui';

type WorkoutListNavigationProp = StackNavigationProp<WorkoutStackParamList, 'WorkoutList'>;

const WorkoutListScreen: React.FC = () => {
  const navigation = useNavigation<WorkoutListNavigationProp>();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(workoutPlans.map(plan => plan.category)))],
    [],
  );

  const filteredPlans = useMemo(
    () =>
      selectedCategory === 'All'
        ? workoutPlans
        : workoutPlans.filter(plan => plan.category === selectedCategory),
    [selectedCategory],
  );

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg }}>
        <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Workout planner</Text>
        <Text
          style={[
            theme.typography.body.medium,
            { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm },
          ]}>
          Manage plans, browse exercises, and use the built-in workout timer.
        </Text>
      </View>

      <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
        <StatCard
          title="Plans"
          value={workoutPlans.length}
          subtitle="Saved workout plans"
          icon="fitness-center"
          style={{ flex: 1 }}
        />
        <StatCard
          title="Exercises"
          value={exerciseLibrary.length}
          subtitle="Library items"
          icon="menu-book"
          style={{ flex: 1 }}
        />
      </View>

      <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginTop: theme.semanticSpacing.lg }}>
        <Button
          title="Create Plan"
          onPress={() => navigation.navigate('CreateWorkout')}
          style={{ flex: 1 }}
        />
        <Button
          title="Last Session"
          onPress={() => navigation.navigate('WorkoutDetail', { workoutId: workoutPlans[0].id })}
          variant="outline"
          style={{ flex: 1 }}
        />
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Workout timer" subtitle="Quick 60-second interval ready to use" />
        <View
          style={{
            backgroundColor: theme.colors.card,
            borderRadius: theme.semanticSpacing.borderRadius.xl,
            padding: theme.semanticSpacing.lg,
            ...theme.shadows.md,
          }}>
          <Timer initialTime={60} countDown showControls showProgress />
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Workout plans" subtitle="Filter by training focus" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
          {categories.map(category => (
            <Chip
              key={category}
              label={category}
              variant="filter"
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </View>

        <View style={{ gap: theme.semanticSpacing.md, marginTop: theme.semanticSpacing.lg }}>
          {filteredPlans.map(plan => (
            <WorkoutCard
              key={plan.id}
              workout={plan}
              onPress={() => navigation.navigate('WorkoutDetail', { workoutId: plan.id })}
              onStart={() => navigation.navigate('WorkoutDetail', { workoutId: plan.id })}
              onFavorite={() => navigation.navigate('EditWorkout', { workoutId: plan.id })}
            />
          ))}
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'], marginBottom: theme.semanticSpacing.xl }}>
        <SectionHeader
          title="Exercise library"
          subtitle="Examples of reusable exercise components"
        />
        <View style={{ gap: theme.semanticSpacing.md }}>
          {exerciseLibrary.slice(0, 3).map(exercise => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              variant="compact"
              onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: exercise.id })}
              onFavorite={() => navigation.navigate('ExerciseDetail', { exerciseId: exercise.id })}
            />
          ))}
        </View>
      </View>
    </Layout>
  );
};

export default WorkoutListScreen;
