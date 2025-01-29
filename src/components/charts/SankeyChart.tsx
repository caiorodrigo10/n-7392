import { Card } from "@/components/ui/card";
import { ResponsiveContainer, Sankey, Tooltip } from "recharts";

interface SankeyChartProps {
  data: {
    nodes: Array<{
      name: string;
    }>;
    links: Array<{
      source: number;
      target: number;
      value: number;
    }>;
  };
  title?: string;
}

const SankeyChart = ({ data, title = "Flow Analysis" }: SankeyChartProps) => {
  return (
    <Card className="p-6 border-none shadow-lg bg-white">
      <h3 className="text-lg font-medium text-secondary/60 mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={data}
            nodeWidth={20}
            nodePadding={50}
            link={{ stroke: "#EC6C04" }}
          >
            <Tooltip 
              contentStyle={{ 
                background: 'white',
                border: '1px solid #f0f0f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
            />
          </Sankey>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default SankeyChart;