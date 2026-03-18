import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {WorkoutReminder} from '../../types/fitness';
import {Badge, Card, Chip} from '../ui';

interface ReminderCardProps {
  reminder: WorkoutReminder;
}

const ReminderCard: React.FC<ReminderCardProps> = ({reminder}) => {
  const {theme} = useTheme();

  return (
    <Card variant="elevated" padding="medium">
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={[theme.typography.heading.h5, {color: theme.colors.text}]}>{reminder.title}</Text>
          <Text style={[theme.typography.body.small, {color: theme.colors.textSecondary}]}> 
            {reminder.time} • {reminder.days.join(' • ')}
          </Text>
        </View>
        <Badge variant={reminder.enabled ? 'success' : 'neutral'} size="small">
          {reminder.enabled ? 'Active' : 'Paused'}
        </Badge>
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.xs, marginTop: theme.semanticSpacing.sm}}>
        {reminder.days.map(day => (
          <Chip key={day} label={day} size="small" variant="outlined" />
        ))}
      </View>
    </Card>
  );
};

export default ReminderCard;