import React from 'react';
import { View, Text, Image, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

interface AvatarProps {
  source?: { uri: string } | number;
  name?: string;
  size?: number | 'small' | 'medium' | 'large' | 'xlarge';
  variant?: 'circular' | 'rounded' | 'square';
  backgroundColor?: string;
  textColor?: string;
  gradient?: boolean;
  gradientColors?: string[];
  icon?: string;
  badge?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  textStyle?: TextStyle;
}

const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'medium',
  variant = 'circular',
  backgroundColor,
  textColor,
  gradient = false,
  gradientColors,
  icon,
  badge,
  onPress,
  style,
  imageStyle,
  textStyle,
}) => {
  const { theme } = useTheme();

  const getSize = (): number => {
    if (typeof size === 'number') return size;
    
    const sizeMap = {
      small: 32,
      medium: 48,
      large: 64,
      xlarge: 96,
    };
    
    return sizeMap[size];
  };

  const avatarSize = getSize();
  const borderRadius = variant === 'circular' ? avatarSize / 2 : 
                     variant === 'rounded' ? theme.semanticSpacing.borderRadius.lg : 
                     theme.semanticSpacing.borderRadius.sm;

  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getAvatarStyle = (): ViewStyle => {
    return {
      width: avatarSize,
      height: avatarSize,
      borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: backgroundColor || theme.colors.primary[500],
      overflow: 'hidden',
    };
  };

  const getTextStyle = (): TextStyle => {
    const fontSize = avatarSize * 0.4;
    return {
      fontSize,
      fontWeight: '600',
      color: textColor || theme.colors.white,
      ...textStyle,
    };
  };

  const getImageStyle = (): ImageStyle => {
    return {
      width: avatarSize,
      height: avatarSize,
      borderRadius,
      ...imageStyle,
    };
  };

  const renderContent = () => {
    if (source) {
      return <Image source={source} style={getImageStyle()} resizeMode="cover" />;
    }

    if (icon) {
      return (
        <Icon
          name={icon}
          size={avatarSize * 0.5}
          color={textColor || theme.colors.white}
        />
      );
    }

    if (name) {
      return <Text style={getTextStyle()}>{getInitials(name)}</Text>;
    }

    return (
      <Icon
        name="person"
        size={avatarSize * 0.5}
        color={textColor || theme.colors.white}
      />
    );
  };

  const AvatarContent = () => {
    if (gradient && !source) {
      const colors = gradientColors || theme.colors.gradients.primary;
      return (
        <LinearGradient
          colors={colors}
          style={getAvatarStyle()}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {renderContent()}
        </LinearGradient>
      );
    }

    return (
      <View style={getAvatarStyle()}>
        {renderContent()}
      </View>
    );
  };

  const AvatarWrapper = () => (
    <View style={[{ position: 'relative' }, style]}>
      <AvatarContent />
      {badge && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            zIndex: 1,
          }}
        >
          {badge}
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <AvatarWrapper />
      </TouchableOpacity>
    );
  }

  return <AvatarWrapper />;
};

export default Avatar;
