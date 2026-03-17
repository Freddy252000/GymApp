import React from 'react';
import { View, Text, TouchableOpacity, Image, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import Card from './Card';
import Badge from './Badge';
import Chip from './Chip';

interface ExerciseCardProps {
  exercise: {
    id: string;
    name: string;
    category: string;
    muscleGroups: string[];
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    equipment?: string;
    duration?: number;
    calories?: number;
    image?: string;
    description?: string;
    sets?: number;
    reps?: number;
    weight?: number;
    restTime?: number;
  };
  variant?: 'default' | 'compact' | 'detailed';
  onPress?: () => void;
  onFavorite?: () => void;
  onAddToWorkout?: () => void;
  isFavorite?: boolean;
  showActions?: boolean;
  style?: ViewStyle;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  variant = 'default',
  onPress,
  onFavorite,
  onAddToWorkout,
  isFavorite = false,
  showActions = true,
  style,
}) => {
  const { theme } = useTheme();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return theme.colors.success[500];
      case 'Intermediate':
        return theme.colors.warning[500];
      case 'Advanced':
        return theme.colors.error[500];
      default:
        return theme.colors.neutral[500];
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
  };

  const renderCompactCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" padding="medium" style={style}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {exercise.image && (
            <Image
              source={{ uri: exercise.image }}
              style={{
                width: 60,
                height: 60,
                borderRadius: theme.semanticSpacing.borderRadius.lg,
                marginRight: theme.semanticSpacing.md,
              }}
              resizeMode="cover"
            />
          )}
          
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>
              {exercise.name}
            </Text>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
              {exercise.category}
            </Text>
            
            {(exercise.sets || exercise.reps) && (
              <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginTop: 4 }]}>
                {exercise.sets && `${exercise.sets} sets`}
                {exercise.sets && exercise.reps && ' • '}
                {exercise.reps && `${exercise.reps} reps`}
              </Text>
            )}
          </View>

          {showActions && (
            <TouchableOpacity
              onPress={onFavorite}
              style={{ padding: theme.semanticSpacing.sm }}
            >
              <Icon
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={20}
                color={isFavorite ? theme.colors.error[500] : theme.colors.textMuted}
              />
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderDefaultCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" padding="none" style={style}>
        {exercise.image && (
          <Image
            source={{ uri: exercise.image }}
            style={{
              width: '100%',
              height: 160,
              borderTopLeftRadius: theme.semanticSpacing.borderRadius.xl,
              borderTopRightRadius: theme.semanticSpacing.borderRadius.xl,
            }}
            resizeMode="cover"
          />
        )}
        
        <View style={{ padding: theme.semanticSpacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.semanticSpacing.sm }}>
            <View style={{ flex: 1 }}>
              <Text style={[theme.typography.heading.h4, { color: theme.colors.text }]}>
                {exercise.name}
              </Text>
              <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>
                {exercise.category}
              </Text>
            </View>
            
            {showActions && (
              <TouchableOpacity onPress={onFavorite}>
                <Icon
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  size={24}
                  color={isFavorite ? theme.colors.error[500] : theme.colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.xs, marginBottom: theme.semanticSpacing.md }}>
            <Badge variant="primary" size="small">
              {exercise.difficulty}
            </Badge>
            {exercise.equipment && (
              <Badge variant="neutral" size="small" outline>
                {exercise.equipment}
              </Badge>
            )}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.xs, marginBottom: theme.semanticSpacing.md }}>
            {exercise.muscleGroups.slice(0, 3).map((muscle, index) => (
              <Chip
                key={index}
                label={muscle}
                size="small"
                variant="outlined"
              />
            ))}
            {exercise.muscleGroups.length > 3 && (
              <Chip
                label={`+${exercise.muscleGroups.length - 3}`}
                size="small"
                variant="filled"
              />
            )}
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.lg }}>
              {exercise.duration && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="schedule" size={16} color={theme.colors.textMuted} />
                  <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginLeft: 4 }]}>
                    {formatDuration(exercise.duration)}
                  </Text>
                </View>
              )}
              {exercise.calories && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon name="local-fire-department" size={16} color={theme.colors.warning[500]} />
                  <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginLeft: 4 }]}>
                    {exercise.calories} cal
                  </Text>
                </View>
              )}
            </View>

            {showActions && onAddToWorkout && (
              <TouchableOpacity
                onPress={onAddToWorkout}
                style={{
                  backgroundColor: theme.colors.primary[500],
                  paddingHorizontal: theme.semanticSpacing.md,
                  paddingVertical: theme.semanticSpacing.sm,
                  borderRadius: theme.semanticSpacing.borderRadius.lg,
                }}
              >
                <Text style={[theme.typography.button.small, { color: theme.colors.white }]}>
                  Add
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderDetailedCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" padding="large" style={style}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.semanticSpacing.md }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.heading.h3, { color: theme.colors.text }]}>
              {exercise.name}
            </Text>
            <Text style={[theme.typography.body.large, { color: theme.colors.textSecondary }]}>
              {exercise.category}
            </Text>
          </View>
          
          <Badge 
            variant={exercise.difficulty === 'Beginner' ? 'success' : exercise.difficulty === 'Intermediate' ? 'warning' : 'error'}
          >
            {exercise.difficulty}
          </Badge>
        </View>

        {exercise.description && (
          <Text style={[theme.typography.body.medium, { color: theme.colors.text, marginBottom: theme.semanticSpacing.md }]}>
            {exercise.description}
          </Text>
        )}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm, marginBottom: theme.semanticSpacing.lg }}>
          {exercise.muscleGroups.map((muscle, index) => (
            <Chip
              key={index}
              label={muscle}
              variant="filled"
              size="medium"
            />
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.xl }}>
            {exercise.sets && (
              <View style={{ alignItems: 'center' }}>
                <Text style={[theme.typography.heading.h4, { color: theme.colors.primary[500] }]}>
                  {exercise.sets}
                </Text>
                <Text style={[theme.typography.caption, { color: theme.colors.textMuted }]}>
                  Sets
                </Text>
              </View>
            )}
            {exercise.reps && (
              <View style={{ alignItems: 'center' }}>
                <Text style={[theme.typography.heading.h4, { color: theme.colors.primary[500] }]}>
                  {exercise.reps}
                </Text>
                <Text style={[theme.typography.caption, { color: theme.colors.textMuted }]}>
                  Reps
                </Text>
              </View>
            )}
            {exercise.weight && (
              <View style={{ alignItems: 'center' }}>
                <Text style={[theme.typography.heading.h4, { color: theme.colors.primary[500] }]}>
                  {exercise.weight}kg
                </Text>
                <Text style={[theme.typography.caption, { color: theme.colors.textMuted }]}>
                  Weight
                </Text>
              </View>
            )}
          </View>

          {showActions && (
            <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.sm }}>
              <TouchableOpacity onPress={onFavorite}>
                <Icon
                  name={isFavorite ? 'favorite' : 'favorite-border'}
                  size={24}
                  color={isFavorite ? theme.colors.error[500] : theme.colors.textMuted}
                />
              </TouchableOpacity>
              {onAddToWorkout && (
                <TouchableOpacity onPress={onAddToWorkout}>
                  <Icon name="add-circle" size={24} color={theme.colors.primary[500]} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  switch (variant) {
    case 'compact':
      return renderCompactCard();
    case 'detailed':
      return renderDetailedCard();
    default:
      return renderDefaultCard();
  }
};

export default ExerciseCard;
