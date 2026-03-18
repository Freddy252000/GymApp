import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Card} from '../ui';

interface MeasurementCardProps {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
}

const MeasurementCard: React.FC<MeasurementCardProps> = ({
  label,
  value,
  change,
  positive = true,
}) => {
  const {theme} = useTheme();
  const changeColor = positive ? theme.colors.success[500] : theme.colors.warning[500];

  return (
    <Card variant="outlined" padding="medium" style={{flex: 1, minWidth: '47%'}}>
      <Text style={[theme.typography.body.small, {color: theme.colors.textSecondary}]}>{label}</Text>
      <Text style={[theme.typography.heading.h3, {color: theme.colors.text, marginTop: 4}]}>{value}</Text>
      <Text style={[theme.typography.caption, {color: changeColor, marginTop: 4}]}>{change}</Text>
    </Card>
  );
};

export default MeasurementCard;