import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  type?: 'pie' | 'donut';
  title?: string;
}

const COLORS = ['#EC6C04', '#B2FC6C', '#4CAF50', '#2196F3', '#9C27B0'];

const DistributionChart = ({ data, type = 'pie', title = "Distribution" }: DistributionChartProps) => {
  return (
    <Card className="p-6 border-none shadow-lg bg-white">
      <h3 className="text-lg font-medium text-secondary/60 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={type === 'donut' ? 60 : 0}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DistributionChart;