import { Card } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RelationshipChartProps {
  data: Array<{
    x: number;
    y: number;
    z?: number;
    name?: string;
  }>;
  type?: 'scatter' | 'bubble';
  title?: string;
}

const RelationshipChart = ({ data, type = 'scatter', title = "Relationship Analysis" }: RelationshipChartProps) => {
  return (
    <Card className="p-6 border-none shadow-lg bg-white">
      <h3 className="text-lg font-medium text-secondary/60 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="X" 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Y" 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter 
              name="Data Points" 
              data={data} 
              fill="#EC6C04"
              shape={type === 'bubble' ? "circle" : "square"}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RelationshipChart;