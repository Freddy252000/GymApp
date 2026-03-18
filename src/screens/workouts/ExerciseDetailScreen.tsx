import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { Badge, Button, Card, Chip, ExerciseCard, Layout, StatCard } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { exerciseLibrary, personalRecords } from '../../data/mockFitnessData';
import { WorkoutStackParamList } from '../../navigation/types';

type ExerciseDetailRouteProp = RouteProp<WorkoutStackParamList, 'ExerciseDetail'>;
type ExerciseDetailNavigationProp = StackNavigationProp<WorkoutStackParamList, 'ExerciseDetail'>;

const ExerciseDetailScreen: React.FC = () => {
  const navigation = useNavigation<ExerciseDetailNavigationProp>();
  const route = useRoute<ExerciseDetailRouteProp>();
  const { theme } = useTheme();

  const exercise = exerciseLibrary.find(item => item.id === route.params.exerciseId) ?? exerciseLibrary[0];
  const records = personalRecords.filter(record => record.exerciseId === exercise.id);

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <ExerciseCard exercise={exercise} variant="detailed" showActions={false} />

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard title="Sets" value={exercise.sets ?? '-'} subtitle="Target volume" icon="layers" style={{ flex: 1 }} />
          <StatCard title="Reps" value={exercise.reps ?? '-'} subtitle="Per set" icon="repeat" style={{ flex: 1 }} />
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard title="Rest" value={`${exercise.restTime ?? 0}s`} subtitle="Recovery" icon="timer" style={{ flex: 1 }} />
          <StatCard title="Load" value={exercise.weight ? `${exercise.weight} kg` : 'Bodyweight'} subtitle="Working weight" icon="fitness-center" style={{ flex: 1 }} />
        </View>

        <View>
          <SectionHeader title="Movement focus" subtitle="Where this exercise fits in your training" />
          <Card variant="outlined" padding="medium">
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
              <Badge variant={exercise.difficulty === 'Beginner' ? 'success' : exercise.difficulty === 'Intermediate' ? 'warning' : 'error'}>
                {exercise.difficulty}
              </Badge>
              <Badge variant="neutral">{exercise.equipment}</Badge>
              {exercise.muscleGroups.map(group => (
                <Chip key={group} label={group} variant="outlined" />
              ))}
            </View>
          </Card>
        </View>

        <View>
          <SectionHeader title="How to perform" subtitle="Step-by-step coaching cues" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {exercise.instructions.map((step, index) => (
              <Card key={step} variant="elevated" padding="medium">
                <Text style={[theme.typography.label.medium, { color: theme.colors.primary[500] }]}>Step {index + 1}</Text>
                <Text style={[theme.typography.body.medium, { color: theme.colors.text, marginTop: theme.semanticSpacing.xs }]}>{step}</Text>
              </Card>
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Performance history" subtitle="Recent tracked performance for this movement" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {records.length ? records.map(record => (
              <Card key={record.id} variant="outlined" padding="medium">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{record.exercise}</Text>
                    <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>{record.date}</Text>
                  </View>
                  <Badge variant="success">{record.improvement}</Badge>
                </View>
                <Text style={[theme.typography.heading.h3, { color: theme.colors.primary[500], marginTop: theme.semanticSpacing.sm }]}>
                  {record.value} {record.unit}
                </Text>
              </Card>
            )) : (
              <Card variant="outlined" padding="medium">
                <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>No PR logged yet for this exercise. Complete a session to start tracking it here.</Text>
              </Card>
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button title="Add to workout" onPress={() => navigation.navigate('CreateWorkout')} style={{ flex: 1 }} />
          <Button title="Back to plan" onPress={() => navigation.navigate('WorkoutList')} variant="outline" style={{ flex: 1 }} />
        </View>
      </View>
    </Layout>
  );
};

export default ExerciseDetailScreen;
