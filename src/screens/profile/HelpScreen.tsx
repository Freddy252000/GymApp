import React from 'react';
import { Alert, Text, View } from 'react-native';
import { SectionHeader } from '../../components/fitness';
import { useTheme } from '../../context/ThemeContext';
import { Badge, Button, Card, Layout } from '../../components/ui';

const HelpScreen: React.FC = () => {
  const { theme } = useTheme();

  const faqs = [
    {
      question: 'How do I edit my workout plans?',
      answer: 'Open the Workouts tab, choose a plan, and use the Edit action to update the session structure.',
    },
    {
      question: 'Where can I see my progress charts?',
      answer: 'Open the Progress tab to view the dashboard, then drill into weight, measurements, or performance.',
    },
    {
      question: 'Does the app support offline usage?',
      answer: 'Yes. The project includes SQLite and offline-mode scaffolding so workouts and progress can be available without network access.',
    },
  ];

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Help & support</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>Find quick answers, support actions, and common usage tips.</Text>
        </View>

        <View style={{ gap: theme.semanticSpacing.md }}>
          <Button title="Contact support" onPress={() => Alert.alert('Support', 'Email: support@gymapp.dev')} fullWidth />
          <Button title="Report a UI issue" onPress={() => Alert.alert('Issue reported', 'Thanks for sharing feedback on the new page designs.')} variant="outline" fullWidth />
        </View>

        <View>
          <SectionHeader title="Support channels" subtitle="Primary ways users can get help" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            <Card variant="outlined" padding="medium">
              <Badge variant="info">Email</Badge>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text, marginTop: theme.semanticSpacing.sm }]}>support@gymapp.dev</Text>
            </Card>
            <Card variant="outlined" padding="medium">
              <Badge variant="secondary">Response time</Badge>
              <Text style={[theme.typography.body.medium, { color: theme.colors.text, marginTop: theme.semanticSpacing.sm }]}>Within 24 hours for design, account, and progress tracking questions.</Text>
            </Card>
          </View>
        </View>

        <View>
          <SectionHeader title="Frequently asked questions" subtitle="Common guidance for using the app" />
          <View style={{ gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
            {faqs.map(item => (
              <Card key={item.question} variant="elevated" padding="medium">
                <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{item.question}</Text>
                <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>{item.answer}</Text>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default HelpScreen;
