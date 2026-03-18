import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SectionHeader } from '../../components/fitness';
import { useTheme } from '../../context/ThemeContext';
import { userProfile, workoutReminders } from '../../data/mockFitnessData';
import { Badge, Button, Card, Layout, StatCard, Switch } from '../../components/ui';

const SettingsScreen: React.FC = () => {
  const { theme, isDark, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(userProfile.notificationsEnabled);
  const [offlineModeEnabled, setOfflineModeEnabled] = useState(userProfile.offlineModeEnabled);
  const [remindersEnabled, setRemindersEnabled] = useState(workoutReminders.some(item => item.enabled));

  const SettingRow = ({ title, subtitle, value, onChange }: { title: string; subtitle: string; value: boolean; onChange: (next: boolean) => void; }) => (
    <Card variant="outlined" padding="medium">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flex: 1, paddingRight: theme.semanticSpacing.md }}>
          <Text style={[theme.typography.heading.h5, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4 }]}>{subtitle}</Text>
        </View>
        <Switch value={value} onValueChange={onChange} />
      </View>
    </Card>
  );

  return (
    <Layout variant="scroll">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Settings</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>
            Tune theme, reminders, and offline behavior from one place.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard title="Theme" value={isDark ? 'Dark' : 'Light'} subtitle="Current mode" icon="dark-mode" style={{ flex: 1 }} />
          <StatCard title="Schedules" value={workoutReminders.length} subtitle="Reminder plans" icon="notifications" style={{ flex: 1 }} />
        </View>

        <View>
          <SectionHeader title="Preferences" subtitle="Core experience controls" />
          <View style={{ gap: theme.semanticSpacing.md }}>
            <SettingRow
              title="Dark theme"
              subtitle="Switch the interface between light and dark appearance."
              value={isDark}
              onChange={setTheme}
            />
            <SettingRow
              title="Workout reminders"
              subtitle="Enable scheduled nudges for your preferred workout times."
              value={remindersEnabled}
              onChange={setRemindersEnabled}
            />
            <SettingRow
              title="Push notifications"
              subtitle="Allow motivation, recovery, and plan reminder messages."
              value={notificationsEnabled}
              onChange={setNotificationsEnabled}
            />
            <SettingRow
              title="Offline mode"
              subtitle="Keep workout and measurement data available without a network."
              value={offlineModeEnabled}
              onChange={setOfflineModeEnabled}
            />
          </View>
        </View>

        <View>
          <SectionHeader title="Current status" subtitle="Quick summary of active configuration" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            <Badge variant={isDark ? 'info' : 'secondary'}>{isDark ? 'Dark mode' : 'Light mode'}</Badge>
            <Badge variant={notificationsEnabled ? 'success' : 'warning'}>{notificationsEnabled ? 'Notifications on' : 'Notifications off'}</Badge>
            <Badge variant={offlineModeEnabled ? 'success' : 'warning'}>{offlineModeEnabled ? 'Offline ready' : 'Online only'}</Badge>
          </View>
        </View>

        <View style={{ gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button
            title="Reset reminder schedule"
            onPress={() => Alert.alert('Reminder preview', 'Reminder settings screen is fully designed and ready for service wiring.')}
            fullWidth
          />
          <Button title="Save preferences" onPress={() => Alert.alert('Preferences saved')} variant="outline" fullWidth />
        </View>
      </View>
    </Layout>
  );
};

export default SettingsScreen;
