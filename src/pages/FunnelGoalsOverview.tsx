import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface FunnelGoalsOverviewProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const MonthCard = ({ month }: { month: string }) => (
  <Card className="bg-white">
    <div className="p-3 space-y-3">
      <h3 className="font-medium text-sm text-neutral-900">{month}</h3>
      <div className="space-y-3">
        <div>
          <p className="text-xs text-neutral-500 mb-1">Meta</p>
          <p className="text-sm font-medium text-right">R$ 50.000,00</p>
        </div>
        <div>
          <p className="text-xs text-neutral-500 mb-1">Realizado</p>
          <p className="text-sm font-medium text-right">R$ 45.000,00</p>
        </div>
      </div>
    </div>
  </Card>
);

const QuarterSection = ({ quarter, months }: { quarter: string, months: string[] }) => (
  <div className="space-y-3">
    <h2 className="text-sm font-medium text-neutral-800">{quarter}</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      {months.map((month) => (
        <MonthCard key={month} month={month} />
      ))}
      <Card className="bg-white">
        <div className="p-3 flex flex-col items-center justify-center h-full">
          <h3 className="font-medium text-sm mb-3">Total {quarter}</h3>
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
      name: "1º trimestre",
      months: ["Janeiro", "Fevereiro", "Março"]
    },
    {
      name: "2º trimestre",
      months: ["Abril", "Maio", "Junho"]
    },
    {
      name: "3º trimestre",
      months: ["Julho", "Agosto", "Setembro"]
    },
    {
      name: "4º trimestre",
      months: ["Outubro", "Novembro", "Dezembro"]
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
              <span>Atingidas: <strong>1</strong></span>
              <span>Não atingidas: <strong>11</strong></span>
            </div>
            <div className="flex gap-4">
              <span>Meta: <strong>R$ 600.000,00</strong></span>
              <span>Atingido: <strong className="text-[#00C48C]">R$ 540.000,00</strong></span>
              <span className="text-red-500">90.00%</span>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default FunnelGoalsOverview;