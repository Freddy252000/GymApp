import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { useTheme } from '../../context/ThemeContext';
import { measurementHistory, personalRecords } from '../../data/mockFitnessData';
import { ProgressStackParamList } from '../../navigation/types';
import { Badge, Button, Card, Layout } from '../../components/ui';

type ProgressHistoryNavigationProp = StackNavigationProp<ProgressStackParamList, 'ProgressHistory'>;

const ProgressHistoryScreen: React.FC = () => {
  const navigation = useNavigation<ProgressHistoryNavigationProp>();
  const { theme } = useTheme();

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Progress history</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>
            Review check-ins, personal records, and jump back into focused detail views.
          </Text>
        </View>

        <View>
          <SectionHeader title="History shortcuts" subtitle="Open the category you want to inspect" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            <Button title="Weight details" onPress={() => navigation.navigate('ProgressDetail', { type: 'weight' })} fullWidth />
            <Button
              title="Measurement details"
              onPress={() => navigation.navigate('ProgressDetail', { type: 'measurements' })}
              variant="outline"
              fullWidth
            />
            <Button
              title="Performance details"
              onPress={() => navigation.navigate('ProgressDetail', { type: 'performance' })}
              variant="ghost"
              fullWidth
            />
          </View>
        </View>

        <View>
          <SectionHeader title="Measurement timeline" subtitle="Weekly snapshots from the mock body tracker" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {measurementHistory.slice().reverse().map(entry => (
              <Card key={entry.id} variant="elevated" padding="medium">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{entry.date}</Text>
                    <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>Weight {entry.weightKg} kg</Text>
                  </View>
                  <Badge variant="info">{entry.bodyFatPercent}% BF</Badge>
                </View>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm, marginTop: theme.semanticSpacing.md }}>
                  <Badge variant="neutral" outline>Waist {entry.waistCm} cm</Badge>
                  <Badge variant="neutral" outline>Chest {entry.chestCm} cm</Badge>
                  <Badge variant="neutral" outline>Arm {entry.armCm} cm</Badge>
                  <Badge variant="neutral" outline>Thigh {entry.thighCm} cm</Badge>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="PR timeline" subtitle="Recent strength and conditioning milestones" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {personalRecords.map(record => (
              <Card key={record.id} variant="outlined" padding="medium">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{record.exercise}</Text>
                    <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>{record.date}</Text>
                  </View>
                  <Badge variant="success">{record.improvement}</Badge>
                </View>
                <Text style={[theme.typography.heading.h3, { color: theme.colors.primary[500], marginTop: theme.semanticSpacing.sm }]}>
                  {record.value} {record.unit}
                </Text>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default ProgressHistoryScreen;
