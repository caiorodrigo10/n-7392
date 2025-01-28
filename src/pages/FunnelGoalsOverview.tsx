import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FunnelGoalsOverviewProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const MonthCard = ({ month }: { month: string }) => {
  if (month === "January") {
    return (
      <Card className="bg-white">
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm text-neutral-900">{month}</h3>
            <span className="text-sm text-blue-500">In Progress</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-neutral-500">Achieved</p>
              <p className="text-sm font-medium">$0.00</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">Goal</p>
              <p className="text-sm font-medium">$1,000.00</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm text-neutral-500">0%</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white">
      <div className="p-4">
        <h3 className="font-medium text-sm text-neutral-900 mb-4">{month}</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z" stroke="#C8C8C9" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Goal</p>
              <p className="text-sm font-medium">$50,000.00</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" stroke="#C8C8C9" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Achieved</p>
              <p className="text-sm font-medium">$45,000.00</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

const QuarterSection = ({ quarter, months }: { quarter: string, months: string[] }) => (
  <div className="space-y-3">
    <h2 className="text-sm font-medium text-neutral-800">{quarter}</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {months.map((month) => (
        <MonthCard key={month} month={month} />
      ))}
      <Card className="bg-white">
        <div className="p-4 flex flex-col items-center justify-center h-full">
          <h3 className="font-medium text-sm mb-4">Total {quarter}</h3>
          <div className="w-16 h-16 relative">
            <Progress 
              value={90} 
              className="h-16 w-16 rounded-full [&>div]:bg-[#00C48C]" 
            />
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-medium">
              90%
            </span>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const FunnelGoalsOverview = ({ isCollapsed, setIsCollapsed }: FunnelGoalsOverviewProps) => {
  const quarters = [
    {
      name: "Q1",
      months: ["January", "February", "March"]
    },
    {
      name: "Q2",
      months: ["April", "May", "June"]
    },
    {
      name: "Q3",
      months: ["July", "August", "September"]
    },
    {
      name: "Q4",
      months: ["October", "November", "December"]
    }
  ];

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <PageHeader
        title="Funnel Goals Overview"
        subtitle="Yearly overview of your funnel goals"
        buttonLabel="Back to Goals"
        onAddClick={() => window.history.back()}
      />
      
      <div className="px-6 space-y-6 pb-6">
        {quarters.map((quarter) => (
          <QuarterSection
            key={quarter.name}
            quarter={quarter.name}
            months={quarter.months}
          />
        ))}
        
        <Card className="bg-white">
          <div className="p-3 flex justify-between items-center text-xs">
            <div className="flex gap-6">
              <span>Achieved: <strong>1</strong></span>
              <span>Not achieved: <strong>11</strong></span>
            </div>
            <div className="flex gap-4">
              <span>Goal: <strong>$600,000.00</strong></span>
              <span>Achieved: <strong className="text-[#00C48C]">$540,000.00</strong></span>
              <span className="text-red-500">90.00%</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default FunnelGoalsOverview;
