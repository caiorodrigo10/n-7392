import { Card } from "@/components/ui/card";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

interface TreemapChartProps {
  data: Array<{
    name: string;
    value: number;
    children?: Array<{
      name: string;
      value: number;
    }>;
  }>;
  title?: string;
}

const TreemapChart = ({ data, title = "Hierarchy Analysis" }: TreemapChartProps) => {
  return (
    <Card className="p-6 border-none shadow-lg bg-white">
      <h3 className="text-lg font-medium text-secondary/60 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={data}
            dataKey="value"
            aspectRatio={4/3}
            stroke="#fff"
            fill="#EC6C04"
          >
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default TreemapChart;