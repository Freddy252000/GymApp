import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '../../context/ThemeContext';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionLabel,
  onActionPress,
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: theme.semanticSpacing.md,
      }}>
      <View style={{flex: 1, paddingRight: theme.semanticSpacing.md}}>
        <Text style={[theme.typography.heading.h4, {color: theme.colors.text}]}>{title}</Text>
        {subtitle ? (
          <Text style={[theme.typography.body.small, {color: theme.colors.textSecondary}]}> 
            {subtitle}
          </Text>
        ) : null}
      </View>
      {actionLabel && onActionPress ? (
        <TouchableOpacity onPress={onActionPress}>
          <Text style={[theme.typography.label.medium, {color: theme.colors.primary[500]}]}>
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SectionHeader;