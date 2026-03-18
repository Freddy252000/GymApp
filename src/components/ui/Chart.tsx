import React from 'react';
import { View, Text, Dimensions, ViewStyle } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { useTheme } from '../../context/ThemeContext';

interface ChartData {
  labels?: string[];
  datasets?: Array<{
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }>;
  data?: Array<{
    name: string;
    population: number;
    color: string;
    legendFontColor?: string;
    legendFontSize?: number;
  }>;
}

interface ChartProps {
  type: 'line' | 'bar' | 'pie';
  data: ChartData;
  width?: number;
  height?: number;
  title?: string;
  showGrid?: boolean;
  showLabels?: boolean;
  animated?: boolean;
  style?: ViewStyle;
}

const screenWidth = Dimensions.get('window').width;

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  width = screenWidth - 32,
  height = 220,
  title,
  showGrid = true,
  showLabels = true,
  animated = true,
  style,
}) => {
  const { theme } = useTheme();

  const chartConfig = {
    backgroundColor: theme.colors.card,
    backgroundGradientFrom: theme.colors.card,
    backgroundGradientTo: theme.colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(${theme.isDark ? '255, 255, 255' : '0, 0, 0'}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(${theme.isDark ? '255, 255, 255' : '0, 0, 0'}, ${opacity * 0.7})`,
    style: {
      borderRadius: theme.semanticSpacing.borderRadius.lg,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: theme.colors.primary[500],
    },
    propsForBackgroundLines: {
      strokeDasharray: showGrid ? '' : '0',
      stroke: theme.colors.border,
      strokeOpacity: 0.3,
    },
    propsForLabels: {
      fontSize: 12,
      fontFamily: theme.fontFamilies.regular,
    },
  };

  const renderLineChart = () => {
    if (!data.datasets || !data.labels) return null;

    return (
      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets.map(dataset => ({
            ...dataset,
            color: dataset.color || ((opacity = 1) => theme.colors.primary[500]),
            strokeWidth: dataset.strokeWidth || 2,
          })),
        }}
        width={width}
        height={height}
        chartConfig={chartConfig}
        bezier={animated}
        style={{
          borderRadius: theme.semanticSpacing.borderRadius.lg,
        }}
        withDots={true}
        withShadow={false}
        withScrollableDot={false}
        withInnerLines={showGrid}
        withOuterLines={showGrid}
        withVerticalLines={showGrid}
        withHorizontalLines={showGrid}
        withVerticalLabels={showLabels}
        withHorizontalLabels={showLabels}
      />
    );
  };

  const renderBarChart = () => {
    if (!data.datasets || !data.labels) return null;

    return (
      <BarChart
        data={{
          labels: data.labels,
          datasets: data.datasets,
        }}
        width={width}
        height={height}
        chartConfig={chartConfig}
        style={{
          borderRadius: theme.semanticSpacing.borderRadius.lg,
        }}
        showValuesOnTopOfBars={true}
        withInnerLines={showGrid}
        withVerticalLabels={showLabels}
        withHorizontalLabels={showLabels}
      />
    );
  };

  const renderPieChart = () => {
    if (!data.data) return null;

    return (
      <PieChart
        data={data.data.map(item => ({
          ...item,
          legendFontColor: item.legendFontColor || theme.colors.textSecondary,
          legendFontSize: item.legendFontSize || 12,
        }))}
        width={width}
        height={height}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 10]}
        absolute={false}
        hasLegend={showLabels}
      />
    );
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'bar':
        return renderBarChart();
      case 'pie':
        return renderPieChart();
      default:
        return null;
    }
  };

  return (
    <View style={[{ alignItems: 'center' }, style]}>
      {title && (
        <Text
          style={[
            theme.typography.heading.h4,
            {
              color: theme.colors.text,
              marginBottom: theme.semanticSpacing.md,
              textAlign: 'center',
            },
          ]}
        >
          {title}
        </Text>
      )}
      {renderChart()}
    </View>
  );
};

export default Chart;
