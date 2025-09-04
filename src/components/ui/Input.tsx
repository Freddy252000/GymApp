import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../../context/ThemeContext';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'small' | 'medium' | 'large';
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  onRightIconPress,
  variant = 'outlined',
  size = 'medium',
  containerStyle,
  inputStyle,
  labelStyle,
  secureTextEntry,
  ...textInputProps
}) => {
  const {theme} = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = secureTextEntry;
  const actualSecureTextEntry = isPassword && !isPasswordVisible;

  const getContainerStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.semanticSpacing.borderRadius.lg,
      flexDirection: 'row',
      alignItems: 'center',
    };

    // Size styles
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        minHeight: 36,
        paddingHorizontal: theme.semanticSpacing.sm,
      },
      medium: {
        minHeight: 44,
        paddingHorizontal: theme.semanticSpacing.md,
      },
      large: {
        minHeight: 52,
        paddingHorizontal: theme.semanticSpacing.lg,
      },
    };

    // Variant styles
    const variantStyles: Record<string, ViewStyle> = {
      default: {
        backgroundColor: 'transparent',
        borderBottomWidth: theme.semanticSpacing.borderWidth[1],
        borderBottomColor: isFocused ? theme.colors.primary[500] : theme.colors.border,
        borderRadius: 0,
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: theme.semanticSpacing.borderWidth[1],
        borderColor: error 
          ? theme.colors.error[500] 
          : isFocused 
            ? theme.colors.primary[500] 
            : theme.colors.border,
      },
      filled: {
        backgroundColor: theme.colors.surface,
        borderWidth: theme.semanticSpacing.borderWidth[1],
        borderColor: error 
          ? theme.colors.error[500] 
          : isFocused 
            ? theme.colors.primary[500] 
            : 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getInputStyle = (): TextStyle => {
    const sizeStyles: Record<string, TextStyle> = {
      small: theme.typography.body.small,
      medium: theme.typography.body.medium,
      large: theme.typography.body.large,
    };

    return {
      flex: 1,
      color: theme.colors.text,
      ...sizeStyles[size],
    };
  };

  const getLabelStyle = (): TextStyle => {
    return {
      ...theme.typography.label.medium,
      color: error ? theme.colors.error[500] : theme.colors.textSecondary,
      marginBottom: theme.semanticSpacing.xs,
    };
  };

  const getHelperTextStyle = (): TextStyle => {
    return {
      ...theme.typography.caption,
      color: error ? theme.colors.error[500] : theme.colors.textMuted,
      marginTop: theme.semanticSpacing.xs,
    };
  };

  const iconSize = size === 'small' ? 16 : size === 'large' ? 24 : 20;
  const iconColor = theme.colors.textMuted;

  return (
    <View style={containerStyle}>
      {label && <Text style={[getLabelStyle(), labelStyle]}>{label}</Text>}
      
      <View style={getContainerStyle()}>
        {leftIcon && (
          <Icon 
            name={leftIcon} 
            size={iconSize} 
            color={iconColor} 
            style={{marginRight: theme.semanticSpacing.sm}} 
          />
        )}
        
        <TextInput
          {...textInputProps}
          style={[getInputStyle(), inputStyle]}
          secureTextEntry={actualSecureTextEntry}
          onFocus={(e) => {
            setIsFocused(true);
            textInputProps.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            textInputProps.onBlur?.(e);
          }}
          placeholderTextColor={theme.colors.textMuted}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{marginLeft: theme.semanticSpacing.sm}}>
            <Icon 
              name={isPasswordVisible ? 'visibility-off' : 'visibility'} 
              size={iconSize} 
              color={iconColor} 
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !isPassword && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{marginLeft: theme.semanticSpacing.sm}}>
            <Icon 
              name={rightIcon} 
              size={iconSize} 
              color={iconColor} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={getHelperTextStyle()}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};

export default Input;
