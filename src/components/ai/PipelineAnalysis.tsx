import React, { useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { Deal } from "@/types/deals";

interface PipelineAnalysisProps {
  deals: {
    lead: Deal[];
    qualification: Deal[];
    meet: Deal[];
    negotiation: Deal[];
    closed: Deal[];
    won: Deal[];
  };
  chartType?: 'bar' | 'funnel' | 'trend' | 'distribution';
}

const PipelineAnalysis = ({ deals, chartType = 'bar' }: PipelineAnalysisProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Color scheme constants - usando uma progressão mais clara de cores
  const COLORS = {
    lead: '#E2E8F0',        // Slate-200
    qualification: '#CBD5E1', // Slate-300
    meet: '#94A3B8',        // Slate-400
    negotiation: '#64748B',  // Slate-500
    closed: '#475569',      // Slate-600
    won: '#22C55E',         // Success Green
    count: '#F1F5F9',       // Lighter shade for count bars
  };

  const calculateStageMetrics = () => {
    const stages = Object.entries(deals).map(([stage, dealsInStage]) => {
      const totalValue = dealsInStage.reduce((sum, deal) => {
        const value = parseFloat(deal.value.replace(/[^0-9.-]+/g, ""));
        return sum + value;
      }, 0);

      return {
        stage: stage.charAt(0).toUpperCase() + stage.slice(1),
        count: dealsInStage.length,
        value: totalValue,
        fill: COLORS[stage as keyof typeof COLORS] || COLORS.lead
      };
    });

    return stages;
  };

  const handleDownload = () => {
    if (!chartRef.current) return;

    import('html-to-image').then(htmlToImage => {
      htmlToImage.toPng(chartRef.current!, { quality: 1.0 })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = `pipeline-analysis-${chartType}.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error('Error generating chart image:', error);
        });
    });
  };

  const renderHorizontalFunnel = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={calculateStageMetrics()}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis 
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1A1A1A', fontSize: 12 }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <YAxis 
          type="category"
          dataKey="stage"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1A1A1A', fontSize: 12 }}
          width={90}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
          contentStyle={{
            background: 'white',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
        />
        <Bar 
          dataKey="value" 
          radius={[0, 4, 4, 0]}
          maxBarSize={35}
        >
          {calculateStageMetrics().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={calculateStageMetrics()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="stage" 
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1A1A1A', fontSize: 12 }}
        />
        <YAxis 
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1A1A1A', fontSize: 12 }}
          tickFormatter={(value) => `$${value}`}
        />
        <YAxis 
          yAxisId="right"
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1A1A1A', fontSize: 12 }}
          tickFormatter={(value) => `${value} deals`}
        />
        <Tooltip 
          cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
          contentStyle={{
            background: 'white',
            border: '1px solid #f0f0f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Bar 
          dataKey="value" 
          yAxisId="left"
          radius={[4, 4, 0, 0]}
          name="Value ($)"
        >
          {calculateStageMetrics().map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
        <Bar 
          dataKey="count" 
          yAxisId="right"
          radius={[4, 4, 0, 0]}
          name="Number of Deals"
          fill={COLORS.count}
        />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderTrendChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={calculateStageMetrics()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={calculateStageMetrics()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="stage" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="value" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    switch (chartType) {
      case 'funnel':
        return renderHorizontalFunnel();
      case 'trend':
        return renderTrendChart();
      case 'distribution':
        return renderDistributionChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <Card className="p-6 bg-white shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-secondary/60">Pipeline Analysis</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      <div ref={chartRef} className="h-[300px]">
        {renderChart()}
      </div>
    </Card>
  );
};

export default PipelineAnalysis;
