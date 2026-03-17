import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTheme } from '../../context/ThemeContext';
import { MeasurementCard, SectionHeader } from '../../components/fitness';
import { measurementHistory, personalRecords } from '../../data/mockFitnessData';
import { ProgressStackParamList } from '../../navigation/types';
import { Badge, Button, Card, Chart, Layout, StatCard } from '../../components/ui';

type ProgressNavigationProp = StackNavigationProp<ProgressStackParamList, 'ProgressOverview'>;

const ProgressOverviewScreen: React.FC = () => {
  const navigation = useNavigation<ProgressNavigationProp>();
  const { theme } = useTheme();
  const latestMeasurement = measurementHistory[measurementHistory.length - 1];
  const firstMeasurement = measurementHistory[0];

  const weightData = {
    labels: measurementHistory.map(entry => entry.date.slice(5)),
    datasets: [{ data: measurementHistory.map(entry => entry.weightKg) }],
  };

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg }}>
        <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Progress dashboard</Text>
        <Text
          style={[
            theme.typography.body.medium,
            { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm },
          ]}>
          Track body metrics, performance trends, and personal records with charts.
        </Text>
      </View>

      <View style={{ gap: theme.semanticSpacing.md }}>
        <StatCard
          title="Weight trend"
          value={`${latestMeasurement.weightKg} kg`}
          subtitle="Latest weigh-in"
          icon="monitor-weight"
          trend={{ value: 2.1, isPositive: false, period: 'since month start' }}
        />
        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard
            title="Body fat"
            value={`${latestMeasurement.bodyFatPercent}%`}
            subtitle="Current"
            icon="insights"
            style={{ flex: 1 }}
          />
          <StatCard
            title="PRs"
            value={personalRecords.length}
            subtitle="Tracked records"
            icon="emoji-events"
            style={{ flex: 1 }}
          />
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader
          title="Weight history"
          subtitle="Example progress chart"
          actionLabel="Details"
          onActionPress={() => navigation.navigate('ProgressDetail', { type: 'weight' })}
        />
        <Card variant="elevated" padding="medium">
          <Chart type="line" data={weightData} height={220} showGrid showLabels />
        </Card>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Body measurements" subtitle="Compare current values vs starting point" />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.md }}>
          <MeasurementCard
            label="Waist"
            value={`${latestMeasurement.waistCm} cm`}
            change={`${(latestMeasurement.waistCm - firstMeasurement.waistCm).toFixed(1)} cm since start`}
            positive={latestMeasurement.waistCm <= firstMeasurement.waistCm}
          />
          <MeasurementCard
            label="Chest"
            value={`${latestMeasurement.chestCm} cm`}
            change={`+${(latestMeasurement.chestCm - firstMeasurement.chestCm).toFixed(1)} cm since start`}
          />
          <MeasurementCard
            label="Arms"
            value={`${latestMeasurement.armCm} cm`}
            change={`+${(latestMeasurement.armCm - firstMeasurement.armCm).toFixed(1)} cm since start`}
          />
          <MeasurementCard
            label="Thighs"
            value={`${latestMeasurement.thighCm} cm`}
            change={`+${(latestMeasurement.thighCm - firstMeasurement.thighCm).toFixed(1)} cm since start`}
          />
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'] }}>
        <SectionHeader title="Personal records" subtitle="Recent strength and conditioning wins" />
        <View style={{ gap: theme.semanticSpacing.md }}>
          {personalRecords.map(record => (
            <Card key={record.id} variant="elevated" padding="medium">
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{record.exercise}</Text>
                  <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>{record.date}</Text>
                </View>
                <Badge variant="success">{record.improvement}</Badge>
              </View>
              <Text
                style={[
                  theme.typography.heading.h3,
                  { color: theme.colors.primary[500], marginTop: theme.semanticSpacing.sm },
                ]}>
                {record.value} {record.unit}
              </Text>
            </Card>
          ))}
        </View>
      </View>

      <View style={{ marginTop: theme.semanticSpacing['2xl'], marginBottom: theme.semanticSpacing.xl }}>
        <Button
          title="View progress history"
          onPress={() => navigation.navigate('ProgressHistory')}
          fullWidth
          gradient
        />
      </View>
    </Layout>
  );
};

export default ProgressOverviewScreen;
