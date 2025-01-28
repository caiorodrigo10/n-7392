import { Card } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const DashboardCard = ({ title, value, icon, trend }: DashboardCardProps) => {
  return (
    <Card className="p-6 border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="text-primary">{icon}</div>
        {trend && (
          <div
            className={`text-sm ${
              trend.isPositive ? "text-tertiary" : "text-red-500"
            }`}
          >
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium text-secondary/60">{title}</h3>
        <p className="text-2xl font-bold mt-1 text-secondary">{value}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;