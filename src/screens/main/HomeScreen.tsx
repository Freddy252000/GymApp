import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';
import { Layout, Card } from '../../components/ui';

const HomeScreen: React.FC = () => {
  const { theme } = useTheme();
  const colors = theme.colors as any;

  const quickActions = [
    {
      id: 1,
      title: 'Start Workout',
      icon: 'play-arrow',
      color: theme.colors.primary[500],
    },
    {
      id: 2,
      title: 'Log Exercise',
      icon: 'add',
      color: theme.colors.secondary[500],
    },
    {
      id: 3,
      title: 'View Progress',
      icon: 'trending-up',
      color: theme.colors.success[500],
    },
    {
      id: 4,
      title: 'Set Goals',
      icon: 'flag',
      color: theme.colors.warning[500],
    },
  ];

  const stats = [
    { label: 'Workouts This Week', value: '4', icon: 'fitness-center' },
    { label: 'Total Exercises', value: '127', icon: 'list' },
    {
      label: 'Current Streak',
      value: '12 days',
      icon: 'local-fire-department',
    },
    { label: 'Personal Records', value: '8', icon: 'emoji-events' },
  ];

  return (
    <Layout variant="scroll" padding={false}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={theme.colors.gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: 60,
          paddingBottom: theme.semanticSpacing['2xl'],
          paddingHorizontal: theme.semanticSpacing.screenPadding,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: theme.semanticSpacing.lg,
          }}
        >
          <View>
            <Text
              style={[
                theme.typography.body.medium,
                { color: theme.colors.white, opacity: 0.9 },
              ]}
            >
              Good morning,
            </Text>
            <Text
              style={[
                theme.typography.heading.h2,
                { color: theme.colors.white },
              ]}
            >
              John Doe
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon name="notifications" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        {/* Today's Goal Card */}
        <Card
          variant="default"
          padding="medium"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={[
                  theme.typography.label.medium,
                  { color: theme.colors.white, opacity: 0.9 },
                ]}
              >
                Today's Goal
              </Text>
              <Text
                style={[
                  theme.typography.heading.h4,
                  { color: theme.colors.white },
                ]}
              >
                Upper Body Strength
              </Text>
              <Text
                style={[
                  theme.typography.body.small,
                  { color: theme.colors.white, opacity: 0.8 },
                ]}
              >
                45 minutes • 6 exercises
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: theme.colors.white,
                paddingHorizontal: theme.semanticSpacing.md,
                paddingVertical: theme.semanticSpacing.sm,
                borderRadius: theme.semanticSpacing.borderRadius.lg,
              }}
            >
              <Text
                style={[
                  theme.typography.button.medium,
                  { color: theme.colors.primary[500] },
                ]}
              >
                Start
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </LinearGradient>

      <View style={{ padding: theme.semanticSpacing.screenPadding }}>
        {/* Quick Actions */}
        <View style={{ marginBottom: theme.semanticSpacing['2xl'] }}>
          <Text
            style={[
              theme.typography.heading.h4,
              {
                color: theme.colors.text,
                marginBottom: theme.semanticSpacing.lg,
              },
            ]}
          >
            Quick Actions
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.semanticSpacing.md,
            }}
          >
            {quickActions.map(action => (
              <TouchableOpacity
                key={action.id}
                style={{
                  flex: 1,
                  minWidth: '45%',
                  backgroundColor: theme.colors.card,
                  padding: theme.semanticSpacing.md,
                  borderRadius: theme.semanticSpacing.borderRadius.xl,
                  alignItems: 'center',
                  ...theme.shadows.sm,
                }}
              >
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    backgroundColor: `${action.color}20`,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: theme.semanticSpacing.sm,
                  }}
                >
                  <Icon name={action.icon} size={24} color={action.color} />
                </View>
                <Text
                  style={[
                    theme.typography.label.medium,
                    { color: theme.colors.text, textAlign: 'center' },
                  ]}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Stats Overview */}
        <View style={{ marginBottom: theme.semanticSpacing['2xl'] }}>
          <Text
            style={[
              theme.typography.heading.h4,
              {
                color: theme.colors.text,
                marginBottom: theme.semanticSpacing.lg,
              },
            ]}
          >
            Your Stats
          </Text>
          <View style={{ gap: theme.semanticSpacing.md }}>
            {stats.map((stat, index) => (
              <Card key={index} variant="elevated" padding="medium">
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: theme.colors.primary[100],
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: theme.semanticSpacing.md,
                      }}
                    >
                      <Icon
                        name={stat.icon}
                        size={20}
                        color={theme.colors.primary[500]}
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text
                        style={[
                          theme.typography.body.medium,
                          { color: theme.colors.textSecondary },
                        ]}
                      >
                        {stat.label}
                      </Text>
                      <Text
                        style={[
                          theme.typography.heading.h4,
                          { color: theme.colors.text },
                        ]}
                      >
                        {stat.value}
                      </Text>
                    </View>
                  </View>
                  <Icon
                    name="chevron-right"
                    size={24}
                    color={theme.colors.textMuted}
                  />
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Recent Workouts */}
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.semanticSpacing.lg,
            }}
          >
            <Text
              style={[
                theme.typography.heading.h4,
                { color: theme.colors.text },
              ]}
            >
              Recent Workouts
            </Text>
            <TouchableOpacity>
              <Text
                style={[
                  theme.typography.body.medium,
                  { color: theme.colors.primary[500] },
                ]}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ gap: theme.semanticSpacing.md }}>
            {[1, 2, 3].map(item => (
              <Card key={item} variant="elevated" padding="medium">
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        theme.typography.heading.h5,
                        { color: theme.colors.text },
                      ]}
                    >
                      Push Day Workout
                    </Text>
                    <Text
                      style={[
                        theme.typography.body.small,
                        { color: theme.colors.textSecondary },
                      ]}
                    >
                      Yesterday • 45 minutes • 8 exercises
                    </Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text
                      style={[
                        theme.typography.label.small,
                        { color: theme.colors.success[500] },
                      ]}
                    >
                      Completed
                    </Text>
                    <Text
                      style={[
                        theme.typography.body.small,
                        { color: theme.colors.textMuted },
                      ]}
                    >
                      285 calories
                    </Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default HomeScreen;
