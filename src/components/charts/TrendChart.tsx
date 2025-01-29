import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

interface TrendChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  type?: 'line' | 'area';
  title?: string;
}

const TrendChart = ({ data, type = 'line', title = "Trend Analysis" }: TrendChartProps) => {
  const renderChart = () => {
    if (type === 'area') {
      return (
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EC6C04" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#EC6C04" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#EC6C04" 
            fillOpacity={1} 
            fill="url(#colorValue)" 
          />
        </AreaChart>
      );
    }

    return (
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
          dataKey="name" 
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke="#EC6C04" 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    );
  };

  return (
    <Card className="p-6 border-none shadow-lg bg-white">
      <h3 className="text-lg font-medium text-secondary/60 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TrendChart;