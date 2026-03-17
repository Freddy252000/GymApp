import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import Card from './Card';
import Badge from './Badge';
import ProgressBar from './ProgressBar';

interface WorkoutCardProps {
  workout: {
    id: string;
    name: string;
    description?: string;
    duration: number;
    exercises: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    category: string;
    calories?: number;
    muscleGroups: string[];
    lastPerformed?: Date;
    completionRate?: number;
    isCompleted?: boolean;
    isFavorite?: boolean;
  };
  variant?: 'default' | 'compact' | 'featured';
  onPress?: () => void;
  onStart?: () => void;
  onFavorite?: () => void;
  showActions?: boolean;
  style?: ViewStyle;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({
  workout,
  variant = 'default',
  onPress,
  onStart,
  onFavorite,
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

  const formatLastPerformed = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const renderCompactCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" padding="medium" style={style}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>
              {workout.name}
            </Text>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
              {formatDuration(workout.duration)} • {workout.exercises} exercises
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.semanticSpacing.sm }}>
            {workout.isCompleted && (
              <Icon name="check-circle" size={20} color={theme.colors.success[500]} />
            )}
            {showActions && onStart && (
              <TouchableOpacity
                onPress={onStart}
                style={{
                  backgroundColor: theme.colors.primary[500],
                  paddingHorizontal: theme.semanticSpacing.sm,
                  paddingVertical: theme.semanticSpacing.xs,
                  borderRadius: theme.semanticSpacing.borderRadius.md,
                }}
              >
                <Text style={[theme.typography.button.small, { color: theme.colors.white }]}>
                  Start
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const renderFeaturedCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" padding="none" style={style}>
        <LinearGradient
          colors={theme.colors.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: theme.semanticSpacing.lg,
            borderRadius: theme.semanticSpacing.borderRadius.xl,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.semanticSpacing.md }}>
            <View style={{ flex: 1 }}>
              <Text style={[theme.typography.heading.h3, { color: theme.colors.white }]}>
                {workout.name}
              </Text>
              <Text style={[theme.typography.body.medium, { color: theme.colors.white, opacity: 0.9 }]}>
                {workout.category}
              </Text>
            </View>
            
            {showActions && onFavorite && (
              <TouchableOpacity onPress={onFavorite}>
                <Icon
                  name={workout.isFavorite ? 'favorite' : 'favorite-border'}
                  size={24}
                  color={theme.colors.white}
                />
              </TouchableOpacity>
            )}
          </View>

          {workout.description && (
            <Text style={[theme.typography.body.medium, { color: theme.colors.white, opacity: 0.8, marginBottom: theme.semanticSpacing.md }]}>
              {workout.description}
            </Text>
          )}

          <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="schedule" size={16} color={theme.colors.white} />
              <Text style={[theme.typography.body.small, { color: theme.colors.white, marginLeft: 4 }]}>
                {formatDuration(workout.duration)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="fitness-center" size={16} color={theme.colors.white} />
              <Text style={[theme.typography.body.small, { color: theme.colors.white, marginLeft: 4 }]}>
                {workout.exercises} exercises
              </Text>
            </View>
            {workout.calories && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="local-fire-department" size={16} color={theme.colors.white} />
                <Text style={[theme.typography.body.small, { color: theme.colors.white, marginLeft: 4 }]}>
                  {workout.calories} cal
                </Text>
              </View>
            )}
          </View>

          {showActions && onStart && (
            <TouchableOpacity
              onPress={onStart}
              style={{
                backgroundColor: theme.colors.white,
                paddingHorizontal: theme.semanticSpacing.lg,
                paddingVertical: theme.semanticSpacing.md,
                borderRadius: theme.semanticSpacing.borderRadius.lg,
                alignItems: 'center',
              }}
            >
              <Text style={[theme.typography.button.medium, { color: theme.colors.primary[500] }]}>
                Start Workout
              </Text>
            </TouchableOpacity>
          )}
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  const renderDefaultCard = () => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card variant="elevated" padding="large" style={style}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: theme.semanticSpacing.md }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.heading.h4, { color: theme.colors.text }]}>
              {workout.name}
            </Text>
            <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>
              {workout.category}
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.semanticSpacing.sm }}>
            <Badge 
              variant={workout.difficulty === 'Beginner' ? 'success' : workout.difficulty === 'Intermediate' ? 'warning' : 'error'}
              size="small"
            >
              {workout.difficulty}
            </Badge>
            {showActions && onFavorite && (
              <TouchableOpacity onPress={onFavorite}>
                <Icon
                  name={workout.isFavorite ? 'favorite' : 'favorite-border'}
                  size={20}
                  color={workout.isFavorite ? theme.colors.error[500] : theme.colors.textMuted}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {workout.description && (
          <Text style={[theme.typography.body.medium, { color: theme.colors.text, marginBottom: theme.semanticSpacing.md }]}>
            {workout.description}
          </Text>
        )}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.xs, marginBottom: theme.semanticSpacing.md }}>
          {workout.muscleGroups.slice(0, 3).map((muscle, index) => (
            <Badge key={index} variant="neutral" size="small" outline>
              {muscle}
            </Badge>
          ))}
          {workout.muscleGroups.length > 3 && (
            <Badge variant="primary" size="small">
              +{workout.muscleGroups.length - 3}
            </Badge>
          )}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.semanticSpacing.md }}>
          <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.lg }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="schedule" size={16} color={theme.colors.textMuted} />
              <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginLeft: 4 }]}>
                {formatDuration(workout.duration)}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="fitness-center" size={16} color={theme.colors.textMuted} />
              <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginLeft: 4 }]}>
                {workout.exercises} exercises
              </Text>
            </View>
            {workout.calories && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="local-fire-department" size={16} color={theme.colors.warning[500]} />
                <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginLeft: 4 }]}>
                  {workout.calories} cal
                </Text>
              </View>
            )}
          </View>
        </View>

        {workout.completionRate !== undefined && (
          <View style={{ marginBottom: theme.semanticSpacing.md }}>
            <ProgressBar
              progress={workout.completionRate}
              showLabel
              label="Completion Rate"
              height={6}
              gradient
            />
          </View>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            {workout.lastPerformed && (
              <Text style={[theme.typography.caption, { color: theme.colors.textMuted }]}>
                Last performed: {formatLastPerformed(workout.lastPerformed)}
              </Text>
            )}
            {workout.isCompleted && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                <Icon name="check-circle" size={16} color={theme.colors.success[500]} />
                <Text style={[theme.typography.caption, { color: theme.colors.success[500], marginLeft: 4 }]}>
                  Completed
                </Text>
              </View>
            )}
          </View>

          {showActions && onStart && (
            <TouchableOpacity
              onPress={onStart}
              style={{
                backgroundColor: theme.colors.primary[500],
                paddingHorizontal: theme.semanticSpacing.md,
                paddingVertical: theme.semanticSpacing.sm,
                borderRadius: theme.semanticSpacing.borderRadius.lg,
              }}
            >
              <Text style={[theme.typography.button.medium, { color: theme.colors.white }]}>
                Start
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );

  switch (variant) {
    case 'compact':
      return renderCompactCard();
    case 'featured':
      return renderFeaturedCard();
    default:
      return renderDefaultCard();
  }
};

export default WorkoutCard;
