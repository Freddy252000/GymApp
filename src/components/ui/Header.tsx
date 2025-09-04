import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  variant?: 'default' | 'large' | 'transparent';
  showBackButton?: boolean;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  variant = 'default',
  showBackButton = false,
  style,
  titleStyle,
}) => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();

  const getHeaderStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      paddingTop: insets.top,
      paddingHorizontal: theme.semanticSpacing.screenPadding,
      paddingBottom: theme.semanticSpacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    };

    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: theme.colors.surface,
        borderBottomWidth: theme.semanticSpacing.borderWidth[1],
        borderBottomColor: theme.colors.border,
      },
      large: {
        backgroundColor: theme.colors.surface,
        paddingBottom: theme.semanticSpacing.lg,
      },
      transparent: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  const getTitleStyle = (): TextStyle => {
    const variantStyles: Record<string, TextStyle> = {
      default: theme.typography.heading.h4,
      large: theme.typography.heading.h2,
      transparent: theme.typography.heading.h4,
    };

    return {
      ...variantStyles[variant],
      color: theme.colors.text,
      flex: 1,
      textAlign: 'center',
    };
  };

  const getSubtitleStyle = (): TextStyle => {
    return {
      ...theme.typography.body.small,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginTop: theme.semanticSpacing.xs,
    };
  };

  const iconSize = variant === 'large' ? 28 : 24;
  const iconColor = theme.colors.text;

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={variant === 'transparent' ? 'transparent' : theme.colors.surface}
        translucent={variant === 'transparent'}
      />
      <View style={[getHeaderStyle(), style]}>
        {/* Left Side */}
        <View style={{width: 40, alignItems: 'flex-start'}}>
          {(showBackButton || leftIcon) && (
            <TouchableOpacity
              onPress={onLeftPress}
              style={{
                padding: theme.semanticSpacing.xs,
                marginLeft: -theme.semanticSpacing.xs,
              }}>
              <Icon
                name={showBackButton ? 'arrow-back' : leftIcon!}
                size={iconSize}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Center - Title and Subtitle */}
        <View style={{flex: 1, alignItems: 'center'}}>
          {title && (
            <Text style={[getTitleStyle(), titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text style={getSubtitleStyle()} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>

        {/* Right Side */}
        <View style={{width: 40, alignItems: 'flex-end'}}>
          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={{
                padding: theme.semanticSpacing.xs,
                marginRight: -theme.semanticSpacing.xs,
              }}>
              <Icon
                name={rightIcon}
                size={iconSize}
                color={iconColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

export default Header;
