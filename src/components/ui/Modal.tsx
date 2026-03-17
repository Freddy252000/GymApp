import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext';
import Button from './Button';

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  actions?: Array<{
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    loading?: boolean;
  }>;
  style?: ViewStyle;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnBackdrop = true,
  actions,
  style,
}) => {
  const { theme } = useTheme();

  const getModalStyle = (): ViewStyle => {
    const sizeStyles: Record<string, ViewStyle> = {
      small: {
        width: screenWidth * 0.8,
        maxHeight: screenHeight * 0.4,
      },
      medium: {
        width: screenWidth * 0.9,
        maxHeight: screenHeight * 0.6,
      },
      large: {
        width: screenWidth * 0.95,
        maxHeight: screenHeight * 0.8,
      },
      fullscreen: {
        width: screenWidth,
        height: screenHeight,
        margin: 0,
        borderRadius: 0,
      },
    };

    return {
      backgroundColor: theme.colors.card,
      borderRadius: theme.semanticSpacing.borderRadius.xl,
      ...theme.shadows.lg,
      ...sizeStyles[size],
    };
  };

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={[getModalStyle(), style]}>
              {/* Header */}
              {(title || showCloseButton) && (
                <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
                  {title && (
                    <Text style={[theme.typography.heading.h4, { color: theme.colors.text, flex: 1 }]}>
                      {title}
                    </Text>
                  )}
                  {showCloseButton && (
                    <TouchableOpacity
                      onPress={onClose}
                      style={[styles.closeButton, { backgroundColor: theme.colors.surface }]}
                    >
                      <Icon name="close" size={20} color={theme.colors.textSecondary} />
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Content */}
              <View style={[styles.content, { padding: theme.semanticSpacing.lg }]}>
                {children}
              </View>

              {/* Actions */}
              {actions && actions.length > 0 && (
                <View style={[styles.actions, { borderTopColor: theme.colors.border, padding: theme.semanticSpacing.lg }]}>
                  <View style={styles.actionButtons}>
                    {actions.map((action, index) => (
                      <Button
                        key={index}
                        title={action.title}
                        onPress={action.onPress}
                        variant={action.variant || 'primary'}
                        loading={action.loading}
                        style={{ flex: 1, marginLeft: index > 0 ? theme.semanticSpacing.sm : 0 }}
                      />
                    ))}
                  </View>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  actions: {
    borderTopWidth: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
});

export default Modal;
