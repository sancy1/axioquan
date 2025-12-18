
// /src/components/assessments/quiz-performance-chart.tsx

'use client';

import * as React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Bar, BarChart, Cell } from 'recharts';

interface ChartProps {
  data: any[];
  type: 'line' | 'bar';
  height?: number;
  showLegend?: boolean;
}

const scoreRanges = ['90-100', '80-89', '70-79', '60-69', '0-59'];

const rangeColors = {
  '90-100': 'hsl(var(--chart-1))',
  '80-89': 'hsl(var(--chart-2))',
  '70-79': 'hsl(var(--chart-3))',
  '60-69': 'hsl(var(--chart-4))',
  '0-59': 'hsl(var(--chart-5))',
};

export function QuizPerformanceChart({ data, type, height = 300, showLegend = true }: ChartProps) {
  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
    attempts: {
      label: "Attempts",
      color: "hsl(var(--chart-2))",
    },
    newStudents: {
      label: "New Students",
      color: "hsl(var(--chart-3))",
    },
    count: {
      label: "Students",
      color: "hsl(var(--chart-4))",
    },
  };

  // For line charts (time series)
  if (type === 'line') {
    return (
      <ChartContainer config={chartConfig} className="h-[300px]">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-[200px]"
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="averageScore"
            stroke="var(--color-score)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="attempts"
            stroke="var(--color-attempts)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
          />
        </LineChart>
      </ChartContainer>
    );
  }

  // For bar charts (score distribution)
  if (type === 'bar') {
    const chartData = scoreRanges.map(range => ({
      range,
      count: data.find(d => d.range === range)?.count || 0,
      color: rangeColors[range as keyof typeof rangeColors]
    }));

    return (
      <ChartContainer config={chartConfig} className="h-[250px]">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="range"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [`${value} students`, 'Count']}
              />
            }
          />
          <Bar
            dataKey="count"
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    );
  }

  return null;
}