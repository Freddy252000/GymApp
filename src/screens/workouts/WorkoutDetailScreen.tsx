import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { Badge, Button, Card, Chip, ExerciseCard, Layout, StatCard, WorkoutCard } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { exerciseLibrary, workoutPlans } from '../../data/mockFitnessData';
import { WorkoutStackParamList } from '../../navigation/types';

type WorkoutDetailRouteProp = RouteProp<WorkoutStackParamList, 'WorkoutDetail'>;
type WorkoutDetailNavigationProp = StackNavigationProp<WorkoutStackParamList, 'WorkoutDetail'>;

const WorkoutDetailScreen: React.FC = () => {
  const navigation = useNavigation<WorkoutDetailNavigationProp>();
  const route = useRoute<WorkoutDetailRouteProp>();
  const { theme } = useTheme();

  const workout = workoutPlans.find(item => item.id === route.params.workoutId) ?? workoutPlans[0];
  const matchingExercises = exerciseLibrary.filter(exercise =>
    exercise.muscleGroups.some(group => workout.muscleGroups.includes(group) || workout.category === exercise.category),
  );
  const workoutExercises = (matchingExercises.length ? matchingExercises : exerciseLibrary).slice(0, workout.exercises);

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <WorkoutCard
          workout={workout}
          variant="featured"
          showActions
          onPress={() => undefined}
          onStart={() => navigation.navigate('ExerciseDetail', { exerciseId: workoutExercises[0].id })}
          onFavorite={() => navigation.navigate('EditWorkout', { workoutId: workout.id })}
        />

        <View style={{ gap: theme.semanticSpacing.md }}>
          <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
            <StatCard title="Duration" value={`${workout.duration} min`} subtitle="Planned session" icon="schedule" style={{ flex: 1 }} />
            <StatCard title="Exercises" value={workout.exercises} subtitle="In this plan" icon="format-list-numbered" style={{ flex: 1 }} />
          </View>
          <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
            <StatCard title="Calories" value={workout.calories ?? 0} subtitle="Estimated burn" icon="local-fire-department" style={{ flex: 1 }} />
            <StatCard title="Completion" value={`${workout.completionRate}%`} subtitle="Program adherence" icon="insights" style={{ flex: 1 }} />
          </View>
        </View>

        <View>
          <SectionHeader title="Focus muscles" subtitle="Primary training targets for this session" />
          <Card variant="outlined" padding="medium">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
              <Badge variant={workout.difficulty === 'Beginner' ? 'success' : workout.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                {workout.difficulty}
              </Badge>
              <Badge variant="info">{workout.category}</Badge>
              {workout.muscleGroups.map(group => (
                <Chip key={group} label={group} variant="outlined" />
              ))}
            </View>
          </Card>
        </View>

        <View>
          <SectionHeader title="Exercise flow" subtitle="Suggested order based on the current mock program" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {workoutExercises.map(exercise => (
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

        <View>
          <SectionHeader title="Coach notes" subtitle="What to focus on during the session" />
          <Card variant="elevated" padding="large">
            <View style={{ gap: theme.semanticSpacing.md }}>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>• Start with 5 minutes of mobility and warm-up sets.</Text>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>• Keep rest periods controlled to stay within the planned workout duration.</Text>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>• Log top sets and note energy levels after the final working block.</Text>
            </View>
          </Card>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button
            title="Start workout"
            onPress={() => navigation.navigate('ExerciseDetail', { exerciseId: workoutExercises[0].id })}
            gradient
            style={{ flex: 1 }}
          />
          <Button
            title="Edit plan"
            onPress={() => navigation.navigate('EditWorkout', { workoutId: workout.id })}
            variant="outline"
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default WorkoutDetailScreen;
