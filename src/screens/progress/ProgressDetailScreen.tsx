import React from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { useTheme } from '../../context/ThemeContext';
import { measurementHistory, personalRecords } from '../../data/mockFitnessData';
import { ProgressStackParamList } from '../../navigation/types';
import { Badge, Button, Card, Chart, Layout, StatCard } from '../../components/ui';

type ProgressDetailRouteProp = RouteProp<ProgressStackParamList, 'ProgressDetail'>;
type ProgressDetailNavigationProp = StackNavigationProp<ProgressStackParamList, 'ProgressDetail'>;

const ProgressDetailScreen: React.FC = () => {
  const route = useRoute<ProgressDetailRouteProp>();
  const navigation = useNavigation<ProgressDetailNavigationProp>();
  const { theme } = useTheme();

  const latest = measurementHistory[measurementHistory.length - 1];
  const first = measurementHistory[0];

  const configs = {
    weight: {
      title: 'Weight trend',
      subtitle: 'Track weekly body-weight changes and the pace of your cut or bulk.',
      statA: { title: 'Current', value: `${latest.weightKg} kg`, subtitle: 'Latest weigh-in', icon: 'monitor-weight' },
      statB: { title: 'Change', value: `${(latest.weightKg - first.weightKg).toFixed(1)} kg`, subtitle: 'Since first entry', icon: 'show-chart' },
      chart: {
        type: 'line' as const,
        data: {
          labels: measurementHistory.map(entry => entry.date.slice(5)),
          datasets: [{ data: measurementHistory.map(entry => entry.weightKg) }],
        },
      },
      insight: 'Weight is trending down steadily while lean-mass indicators remain stable.',
    },
    measurements: {
      title: 'Body measurements',
      subtitle: 'Compare key body metrics to see where size is increasing or dropping.',
      statA: { title: 'Waist', value: `${latest.waistCm} cm`, subtitle: 'Current', icon: 'straighten' },
      statB: { title: 'Chest', value: `${latest.chestCm} cm`, subtitle: 'Current', icon: 'accessibility-new' },
      chart: {
        type: 'bar' as const,
        data: {
          labels: ['Waist', 'Chest', 'Arms', 'Thigh'],
          datasets: [{ data: [latest.waistCm, latest.chestCm, latest.armCm, latest.thighCm] }],
        },
      },
      insight: 'Waist is moving down while upper-body measurements continue to trend upward.',
    },
    performance: {
      title: 'Performance records',
      subtitle: 'Review strength and conditioning PRs across your key movements.',
      statA: { title: 'PR count', value: personalRecords.length, subtitle: 'Tracked lifts', icon: 'emoji-events' },
      statB: { title: 'Latest', value: personalRecords[0].improvement, subtitle: personalRecords[0].exercise, icon: 'bolt' },
      chart: {
        type: 'bar' as const,
        data: {
          labels: personalRecords.map(record => record.exercise.split(' ')[0]),
          datasets: [{ data: personalRecords.map(record => record.value) }],
        },
      },
      insight: 'Recent PRs show strength momentum in both compound lifts and conditioning work.',
    },
  };

  const current = configs[route.params.type];

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>{current.title}</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>
            {current.subtitle}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard {...current.statA} style={{ flex: 1 }} />
          <StatCard {...current.statB} style={{ flex: 1 }} />
        </View>

        <Card variant="elevated" padding="medium">
          <Chart type={current.chart.type} data={current.chart.data} height={240} />
        </Card>

        <View>
          <SectionHeader title="Highlights" subtitle="Quick notes from the current dataset" />
          <Card variant="outlined" padding="large">
            <Badge variant="info">Live mock analytics</Badge>
            <Text style={[theme.typography.body.medium, { color: theme.colors.text, marginTop: theme.semanticSpacing.md }]}>
              {current.insight}
            </Text>
          </Card>
        </View>

        <View>
          <SectionHeader title="Recent entries" subtitle="Last three check-ins from the training log" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            {measurementHistory.slice(-3).reverse().map(entry => (
              <Card key={entry.id} variant="outlined" padding="medium">
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{entry.date}</Text>
                    <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
                      {entry.weightKg} kg • {entry.bodyFatPercent}% body fat
                    </Text>
                  </View>
                  <Badge variant="secondary">Check-in</Badge>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button title="History" onPress={() => navigation.navigate('ProgressHistory')} style={{ flex: 1 }} />
          <Button
            title="Overview"
            onPress={() => navigation.navigate('ProgressOverview')}
            variant="outline"
            style={{ flex: 1 }}
          />
        </View>
      </View>
    </Layout>
  );
};

export default ProgressDetailScreen;
