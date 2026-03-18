import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import Card from './Card';
import CircularProgress from './CircularProgress';
import ProgressBar from './ProgressBar';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    period: string;
  };
  progress?: {
    current: number;
    total: number;
    showPercentage?: boolean;
  };
  variant?: 'default' | 'gradient' | 'minimal' | 'circular';
  color?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  progress,
  variant = 'default',
  color,
  onPress,
  style,
}) => {
  const { theme } = useTheme();

  const primaryColor = color || theme.colors.primary[500];
  const progressPercentage = progress ? (progress.current / progress.total) * 100 : 0;

  const renderTrend = () => {
    if (!trend) return null;

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <Icon
          name={trend.isPositive ? 'trending-up' : 'trending-down'}
          size={16}
          color={trend.isPositive ? theme.colors.success[500] : theme.colors.error[500]}
        />
        <Text
          style={[
            theme.typography.caption,
            {
              color: trend.isPositive ? theme.colors.success[500] : theme.colors.error[500],
              marginLeft: 4,
            },
          ]}
        >
          {trend.isPositive ? '+' : ''}{trend.value}% {trend.period}
        </Text>
      </View>
    );
  };

  const renderMinimalCard = () => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
      style={{ alignSelf: 'flex-start', ...style }}
    >
      <View style={{ padding: theme.semanticSpacing.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary }]}>
              {title}
            </Text>
            <Text style={[theme.typography.heading.h3, { color: theme.colors.text, marginTop: 4 }]}>
              {value}
            </Text>
            {subtitle && (
              <Text style={[theme.typography.caption, { color: theme.colors.textMuted, marginTop: 2 }]}>
                {subtitle}
              </Text>
            )}
            {renderTrend()}
          </View>

          {icon && (
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: `${primaryColor}20`,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name={icon} size={20} color={primaryColor} />
            </View>
          )}
        </View>

        {progress && (
          <View style={{ marginTop: theme.semanticSpacing.md }}>
            <ProgressBar
              progress={progressPercentage}
              height={4}
              color={primaryColor}
              rounded
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderCircularCard = () => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
      style={{ alignSelf: 'flex-start' }}
    >
      <Card variant="elevated" padding="large" style={{ alignItems: 'center', ...style }}>
        <CircularProgress
          progress={progressPercentage}
          size={100}
          strokeWidth={8}
          color={primaryColor}
          showPercentage={progress?.showPercentage !== false}
        />

        <Text style={[theme.typography.heading.h4, { color: theme.colors.text, marginTop: theme.semanticSpacing.md, textAlign: 'center' }]}>
          {title}
        </Text>

        <Text style={[theme.typography.heading.h2, { color: primaryColor, marginTop: theme.semanticSpacing.sm, textAlign: 'center' }]}>
          {value}
        </Text>

        {subtitle && (
          <Text style={[theme.typography.body.small, { color: theme.colors.textSecondary, marginTop: 4, textAlign: 'center' }]}>
            {subtitle}
          </Text>
        )}

        {renderTrend()}
      </Card>
    </TouchableOpacity>
  );

  const renderGradientCard = () => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
      style={[{ alignSelf: 'stretch' }, style]}  // stretch, not flex-start
    >
      <Card variant="elevated" padding="none">
        <LinearGradient
          colors={[primaryColor, `${primaryColor}CC`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            padding: theme.semanticSpacing.lg,
            borderRadius: theme.semanticSpacing.borderRadius.xl,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={[theme.typography.body.medium, { color: theme.colors.white, opacity: 0.9 }]}>
                {title}
              </Text>
              <Text style={[theme.typography.heading.h2, { color: theme.colors.white, marginTop: 4 }]}>
                {value}
              </Text>
              {subtitle && (
                <Text style={[theme.typography.body.small, { color: theme.colors.white, opacity: 0.8, marginTop: 4 }]}>
                  {subtitle}
                </Text>
              )}
            </View>

            {icon && (
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name={icon} size={24} color={theme.colors.white} />
              </View>
            )}
          </View>

          {progress && (
            <View style={{ marginTop: theme.semanticSpacing.lg }}>
              <ProgressBar
                progress={progressPercentage}
                height={6}
                color={theme.colors.white}
                backgroundColor="rgba(255, 255, 255, 0.3)"
                rounded
              />
              <Text style={[theme.typography.caption, { color: theme.colors.white, opacity: 0.8, marginTop: 4 }]}>
                {progress.current} of {progress.total}
              </Text>
            </View>
          )}

          {trend && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: theme.semanticSpacing.md }}>
              <Icon
                name={trend.isPositive ? 'trending-up' : 'trending-down'}
                size={16}
                color={theme.colors.white}
              />
              <Text style={[theme.typography.caption, { color: theme.colors.white, opacity: 0.9, marginLeft: 4 }]}>
                {trend.isPositive ? '+' : ''}{trend.value}% {trend.period}
              </Text>
            </View>
          )}
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  const renderDefaultCard = () => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
      style={{ alignSelf: 'flex-start', flex: (style as any)?.flex }}
    >
      <Card variant="elevated" padding="large" style={{ width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>
              {title}
            </Text>
            <Text style={[theme.typography.heading.h2, { color: theme.colors.text, marginTop: 4 }]}>
              {value}
            </Text>
            {subtitle && (
              <Text style={[theme.typography.body.small, { color: theme.colors.textMuted, marginTop: 4 }]}>
                {subtitle}
              </Text>
            )}
            {renderTrend()}
          </View>

          {icon && (
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: `${primaryColor}20`,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon name={icon} size={24} color={primaryColor} />
            </View>
          )}
        </View>

        {progress && (
          <View style={{ marginTop: theme.semanticSpacing.lg }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
                Progress
              </Text>
              <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
                {progress.current} / {progress.total}
              </Text>
            </View>
            <ProgressBar
              progress={progressPercentage}
              height={6}
              color={primaryColor}
              rounded
            />
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );

  // const renderDefaultCard = () => (
  //   <TouchableOpacity
  //     onPress={onPress}
  //     activeOpacity={onPress ? 0.7 : 1}
  //     disabled={!onPress}
  //     style={{ alignSelf: 'flex-start', flex: (style as any)?.flex }}
  //   >
  //     <Card variant="elevated" padding="large" style={style}>
  //       <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
  //         <View style={{ flex: 1 }}>
  //           <Text style={[theme.typography.body.medium, { color: theme.colors.textSecondary }]}>
  //             {title}
  //           </Text>
  //           <Text style={[theme.typography.heading.h2, { color: theme.colors.text, marginTop: 4 }]}>
  //             {value}
  //           </Text>
  //           {subtitle && (
  //             <Text style={[theme.typography.body.small, { color: theme.colors.textMuted, marginTop: 4 }]}>
  //               {subtitle}
  //             </Text>
  //           )}
  //           {renderTrend()}
  //         </View>

  //         {icon && (
  //           <View
  //             style={{
  //               width: 48,
  //               height: 48,
  //               borderRadius: 24,
  //               backgroundColor: `${primaryColor}20`,
  //               justifyContent: 'center',
  //               alignItems: 'center',
  //             }}
  //           >
  //             <Icon name={icon} size={24} color={primaryColor} />
  //           </View>
  //         )}
  //       </View>

  //       {progress && (
  //         <View style={{ marginTop: theme.semanticSpacing.lg }}>
  //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
  //             <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
  //               Progress
  //             </Text>
  //             <Text style={[theme.typography.caption, { color: theme.colors.textSecondary }]}>
  //               {progress.current} / {progress.total}
  //             </Text>
  //           </View>
  //           <ProgressBar
  //             progress={progressPercentage}
  //             height={6}
  //             color={primaryColor}
  //             rounded
  //           />
  //         </View>
  //       )}
  //     </Card>
  //   </TouchableOpacity>
  // );

  switch (variant) {
    case 'minimal':
      return renderMinimalCard();
    case 'circular':
      return renderCircularCard();
    case 'gradient':
      return renderGradientCard();
    default:
      return renderDefaultCard();
  }
};

export default StatCard;