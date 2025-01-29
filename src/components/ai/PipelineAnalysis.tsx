import React from 'react';
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
}

const PipelineAnalysis = ({ deals }: PipelineAnalysisProps) => {
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
      };
    });

    return stages;
  };

  const data = calculateStageMetrics();

  return (
    <Card className="p-6 bg-white shadow-lg">
      <h3 className="text-lg font-medium mb-4 text-secondary/60">Pipeline Analysis</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              fill="#EC6C04"
              yAxisId="left"
              radius={[4, 4, 0, 0]}
              name="Value ($)"
            />
            <Bar 
              dataKey="count" 
              fill="#B2FC6C"
              yAxisId="right"
              radius={[4, 4, 0, 0]}
              name="Number of Deals"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default PipelineAnalysis;