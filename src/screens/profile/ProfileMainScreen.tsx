import React from 'react';
import { View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Card, Button } from '../../components/ui';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/types';

type LoginNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
const ProfileMainScreen: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const { theme } = useTheme();

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            await AsyncStorage.removeItem('@gym_app_user_token');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }], // Assuming 'Main' is the name of the main navigator
            });
            // The RootNavigator will automatically detect the token removal and navigate to Auth
          } catch (error) {
            console.error('Error during logout:', error);
          }
        },
      },
    ]);
  };

  return (
    <Layout variant="default">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card
          variant="elevated"
          padding="large"
          style={{ width: '100%', maxWidth: 400 }}
        >
          <View
            style={{
              alignItems: 'center',
              marginBottom: theme.semanticSpacing.xl,
            }}
          >
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: theme.colors.primary[500],
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: theme.semanticSpacing.lg,
              }}
            >
              <Text style={{ fontSize: 40, color: theme.colors.white }}>
                👤
              </Text>
            </View>

            <Text
              style={[
                theme.typography.heading.h3,
                { color: theme.colors.text, textAlign: 'center' },
              ]}
            >
              John Doe
            </Text>
            <Text
              style={[
                theme.typography.body.medium,
                { color: theme.colors.textSecondary, textAlign: 'center' },
              ]}
            >
              john.doe@example.com
            </Text>
          </View>

          <View style={{ gap: theme.semanticSpacing.md }}>
            <Button
              title="Edit Profile"
              onPress={() => {}}
              variant="outline"
              size="large"
              fullWidth
            />

            <Button
              title="Settings"
              onPress={() => {}}
              variant="outline"
              size="large"
              fullWidth
            />

            <Button
              title="Logout"
              onPress={handleLogout}
              variant="danger"
              size="large"
              fullWidth
            />
          </View>
        </Card>
      </View>
    </Layout>
  );
};

export default ProfileMainScreen;
