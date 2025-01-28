import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

interface FunnelGoalsOverviewProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const data = [
  { month: "Jan", meta: 100, realizado: 80 },
  { month: "Fev", meta: 120, realizado: 90 },
  { month: "Mar", meta: 90, realizado: 95 },
  { month: "Abr", meta: 110, realizado: 88 },
  { month: "Mai", meta: 130, realizado: 120 },
  { month: "Jun", meta: 140, realizado: 135 },
];

type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  status: "Em andamento" | "Concluída" | "Atrasada";
  deadline: string;
};

const goals: Goal[] = [
  {
    id: "1",
    name: "Meta de Vendas Q1",
    target: 100000,
    current: 85000,
    status: "Em andamento",
    deadline: "31/03/2024",
  },
  {
    id: "2",
    name: "Novos Clientes Q1",
    target: 50,
    current: 50,
    status: "Concluída",
    deadline: "31/03/2024",
  },
  {
    id: "3",
    name: "Taxa de Conversão",
    target: 30,
    current: 20,
    status: "Atrasada",
    deadline: "31/03/2024",
  },
];

const columns: ColumnDef<Goal>[] = [
  {
    accessorKey: "name",
    header: "Meta",
  },
  {
    accessorKey: "target",
    header: "Objetivo",
    cell: ({ row }) => (
      <span>
        {typeof row.original.target === "number" && row.original.target >= 1000
          ? `R$ ${row.original.target.toLocaleString("pt-BR")}`
          : row.original.target}
      </span>
    ),
  },
  {
    accessorKey: "current",
    header: "Atual",
    cell: ({ row }) => (
      <span>
        {typeof row.original.current === "number" && row.original.current >= 1000
          ? `R$ ${row.original.current.toLocaleString("pt-BR")}`
          : row.original.current}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const colorMap = {
        "Em andamento": "bg-blue-100 text-blue-800",
        "Concluída": "bg-green-100 text-green-800",
        "Atrasada": "bg-red-100 text-red-800",
      };
      return (
        <Badge className={`${colorMap[status]} border-none`}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "deadline",
    header: "Prazo",
  },
];

const FunnelGoalsOverview = ({ isCollapsed, setIsCollapsed }: FunnelGoalsOverviewProps) => {
  const totalGoals = goals.length;
  const completedGoals = goals.filter((g) => g.status === "Concluída").length;
  const inProgressGoals = goals.filter((g) => g.status === "Em andamento").length;

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <PageHeader
        title="Visão Geral das Metas"
        subtitle="Acompanhamento anual das metas do funil de vendas"
        buttonLabel="Nova Meta"
        onAddClick={() => {}}
      />

      <div className="px-6 space-y-6">
        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Total de Metas</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">{totalGoals}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Metas Concluídas</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{completedGoals}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-gray-500">Em Andamento</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressGoals}</p>
          </Card>
        </div>

        {/* Gráfico */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Progresso Mensal</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="meta" fill="#EC6C04" name="Meta" />
                <Bar dataKey="realizado" fill="#B2FC6C" name="Realizado" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Tabela de Metas */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Lista de Metas</h3>
          <DataTable columns={columns} data={goals} />
        </Card>
      </div>
    </Layout>
  );
};

export default FunnelGoalsOverview;