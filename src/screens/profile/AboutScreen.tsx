import React from 'react';
import { Text, View } from 'react-native';
import { SectionHeader } from '../../components/fitness';
import { useTheme } from '../../context/ThemeContext';
import { Badge, Card, Layout } from '../../components/ui';

const AboutScreen: React.FC = () => {
  const { theme, isDark } = useTheme();

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <Card variant="elevated" padding="large">
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text, textAlign: 'center' }]}>GymApp</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, textAlign: 'center', marginTop: theme.semanticSpacing.sm }]}>A polished React Native fitness tracking experience built with TypeScript.</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: theme.semanticSpacing.sm, marginTop: theme.semanticSpacing.md }}>
            <Badge variant="info">v1.0 design pass</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant={isDark ? 'success' : 'neutral'}>{isDark ? 'Dark ready' : 'Light ready'}</Badge>
          </View>
        </Card>

        <View>
          <SectionHeader title="What’s included" subtitle="Core areas already scaffolded in this app" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            <Card variant="outlined" padding="medium">
              <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Workout planning</Text>
              <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>Workout lists, detail pages, and editable plan screens with fitness-focused mock data.</Text>
            </Card>
            <Card variant="outlined" padding="medium">
              <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Progress tracking</Text>
              <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>Charts, body measurements, and personal records dashboards across the progress stack.</Text>
            </Card>
            <Card variant="outlined" padding="medium">
              <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>Offline-ready architecture</Text>
              <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>Redux slices, SQLite schema scaffolding, and reminder services prepared for runtime wiring.</Text>
            </Card>
          </View>
        </View>

        <View>
          <SectionHeader title="Design language" subtitle="Visual decisions used throughout the interface" />
          <Card variant="elevated" padding="large">
            <Text style={[theme.typography.body.medium, { color: theme.colors.text }]}>The app uses an indigo primary palette, teal secondary accents, rounded cards, bold metric tiles, and compact chips to keep the fitness UI consistent across screens.</Text>
          </Card>
        </View>
      </View>
    </Layout>
  );
};

export default AboutScreen;
