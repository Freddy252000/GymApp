import React from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'scroll' | 'keyboard-avoiding';
  padding?: boolean;
  safeArea?: boolean;
  style?: ViewStyle;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  variant = 'default',
  padding = true,
  safeArea = true,
  style,
}) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flex: 1,
      backgroundColor: theme.colors.background,
    };

    const paddingStyle: ViewStyle = padding
      ? {
          paddingHorizontal: theme.semanticSpacing.screenPadding,
        }
      : {};

    const safeAreaStyle: ViewStyle = safeArea
      ? {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }
      : {};

    return {
      ...baseStyle,
      ...paddingStyle,
      ...safeAreaStyle,
    };
  };

  const containerStyle = getContainerStyle();

  switch (variant) {
    case 'scroll':
      return (
        <ScrollView
          style={[containerStyle, style]}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      );

    case 'keyboard-avoiding':
      return (
        <KeyboardAvoidingView
          style={[containerStyle, style]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      );

    default:
      return <View style={[containerStyle, style]}>{children}</View>;
  }
};

export default Layout;
