import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {Layout, Card} from '../../components/ui';

const HelpScreen: React.FC = () => {
  const {theme} = useTheme();
  return (
    <Layout variant="default">
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Card variant="elevated" padding="large">
          <Text style={[theme.typography.heading.h3, {color: theme.colors.text, textAlign: 'center'}]}>
            Help & Support
          </Text>
          <Text style={[theme.typography.body.medium, {color: theme.colors.textSecondary, textAlign: 'center', marginTop: theme.semanticSpacing.md}]}>
            Coming soon...
          </Text>
        </Card>
      </View>
    </Layout>
  );
};

export default HelpScreen;
