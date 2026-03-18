import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { Badge, Button, Chip, Input, Layout, StatCard, Switch } from '../../components/ui';
import { useTheme } from '../../context/ThemeContext';
import { workoutPlans } from '../../data/mockFitnessData';
import { WorkoutStackParamList } from '../../navigation/types';

type EditWorkoutRouteProp = RouteProp<WorkoutStackParamList, 'EditWorkout'>;
type EditWorkoutNavigationProp = StackNavigationProp<WorkoutStackParamList, 'EditWorkout'>;

const EditWorkoutScreen: React.FC = () => {
  const navigation = useNavigation<EditWorkoutNavigationProp>();
  const route = useRoute<EditWorkoutRouteProp>();
  const { theme } = useTheme();

  const workout = workoutPlans.find(item => item.id === route.params.workoutId) ?? workoutPlans[0];
  const [name, setName] = useState(workout.name);
  const [description, setDescription] = useState(workout.description);
  const [autoProgression, setAutoProgression] = useState(true);
  const [deloadMode, setDeloadMode] = useState(false);

  return (
    <Layout variant="keyboard-avoiding">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Edit workout plan</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>
            Refine structure, recovery, and progression settings for this program.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard title="Focus" value={workout.category} subtitle="Program type" icon="tune" style={{ flex: 1 }} />
          <StatCard title="Last done" value={workout.lastPerformed ? workout.lastPerformed.toLocaleDateString() : '—'} subtitle="Latest session" icon="event" style={{ flex: 1 }} />
        </View>

        <View style={{ gap: theme.semanticSpacing.lg }}>
          <Input label="Plan name" value={name} onChangeText={setName} variant="filled" leftIcon="fitness-center" />
          <Input
            label="Description"
            value={description}
            onChangeText={setDescription}
            variant="filled"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={{ minHeight: 120 }}
          />
        </View>

        <View>
          <SectionHeader title="Current focus" subtitle="Primary muscles trained in this plan" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            <Badge variant="info">{workout.difficulty}</Badge>
            {workout.muscleGroups.map(group => (
              <Chip key={group} label={group} variant="outlined" />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Smart settings" subtitle="Preview of deeper workout configuration" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1, paddingRight: theme.semanticSpacing.md }}>
                <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Auto progression</Text>
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>Increase load or reps based on completion consistency.</Text>
              </View>
              <Switch value={autoProgression} onValueChange={setAutoProgression} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1, paddingRight: theme.semanticSpacing.md }}>
                <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Deload mode</Text>
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>Lower intensity temporarily for recovery and technique work.</Text>
              </View>
              <Switch value={deloadMode} onValueChange={setDeloadMode} />
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button
            title="Update plan"
            onPress={() => Alert.alert('Workout updated', 'Your workout editor is now designed and ready for backend wiring.')}
            style={{ flex: 1 }}
          />
          <Button title="Open details" onPress={() => navigation.navigate('WorkoutDetail', { workoutId: workout.id })} variant="outline" style={{ flex: 1 }} />
        </View>
      </View>
    </Layout>
  );
};

export default EditWorkoutScreen;
