import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SectionHeader } from '../../components/fitness';
import { useTheme } from '../../context/ThemeContext';
import { userProfile } from '../../data/mockFitnessData';
import { ProfileStackParamList } from '../../navigation/types';
import { Badge, Button, Chip, Input, Layout, StatCard } from '../../components/ui';

type EditProfileNavigationProp = StackNavigationProp<ProfileStackParamList, 'EditProfile'>;

const EditProfileScreen: React.FC = () => {
  const navigation = useNavigation<EditProfileNavigationProp>();
  const { theme } = useTheme();
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [goal, setGoal] = useState(userProfile.fitnessGoal);
  const [level, setLevel] = useState(userProfile.level);
  const [time, setTime] = useState(userProfile.preferredWorkoutTime);

  return (
    <Layout variant="keyboard-avoiding">
      <View style={{ paddingVertical: theme.semanticSpacing.lg, gap: theme.semanticSpacing['2xl'] }}>
        <View>
          <Text style={[theme.typography.heading.h2, { color: theme.colors.text }]}>Edit profile</Text>
          <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary, marginTop: theme.semanticSpacing.sm }]}>
            Update your training identity, weekly goals, and preferences.
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md }}>
          <StatCard title="Weekly target" value={userProfile.weeklyTarget} subtitle="Sessions" icon="calendar-month" style={{ flex: 1 }} />
          <StatCard title="Mode" value={userProfile.offlineModeEnabled ? 'Offline' : 'Online'} subtitle="Sync profile" icon="cloud-done" style={{ flex: 1 }} />
        </View>

        <View style={{ gap: theme.semanticSpacing.lg }}>
          <Input label="Full name" value={name} onChangeText={setName} variant="filled" leftIcon="person" />
          <Input label="Email address" value={email} onChangeText={setEmail} variant="filled" leftIcon="mail" keyboardType="email-address" autoCapitalize="none" />
          <Input
            label="Fitness goal"
            value={goal}
            onChangeText={setGoal}
            variant="filled"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            inputStyle={{ minHeight: 110 }}
          />
        </View>

        <View>
          <SectionHeader title="Training level" subtitle="Used to tailor recommendations across the app" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            {['Beginner', 'Intermediate', 'Advanced'].map(item => (
              <Chip key={item} label={item} variant="filter" selected={level === item} onPress={() => setLevel(item)} />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Preferred workout time" subtitle="Helps organize reminders and suggested sessions" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            {['Morning', 'Afternoon', 'Evening'].map(item => (
              <Chip key={item} label={item} variant="filter" selected={time === item} onPress={() => setTime(item)} />
            ))}
          </View>
        </View>

        <View>
          <SectionHeader title="Profile status" subtitle="Preview tags shown on the profile summary screen" />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.semanticSpacing.sm }}>
            <Badge variant="info">{level}</Badge>
            <Badge variant="neutral">{time}</Badge>
            <Badge variant={userProfile.notificationsEnabled ? 'success' : 'warning'}>
              {userProfile.notificationsEnabled ? 'Notifications on' : 'Notifications off'}
            </Badge>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: theme.semanticSpacing.md, marginBottom: theme.semanticSpacing.xl }}>
          <Button
            title="Save changes"
            onPress={() => Alert.alert('Profile updated', 'Your profile editor is now fully designed and ready for data wiring.')}
            style={{ flex: 1 }}
          />
          <Button title="Back" onPress={() => navigation.navigate('ProfileMain')} variant="outline" style={{ flex: 1 }} />
        </View>
      </View>
    </Layout>
  );
};

export default EditProfileScreen;
