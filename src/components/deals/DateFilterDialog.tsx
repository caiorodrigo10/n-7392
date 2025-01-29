import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown } from "lucide-react";

interface DateFilterDialogProps {
  children: React.ReactNode;
}

const DateFilterDialog = ({ children }: DateFilterDialogProps) => {
  const timeFrames = {
    quick: [
      { label: "Todo período", value: "all" },
      { label: "Hoje", value: "today" },
      { label: "Esta semana", value: "this_week" },
      { label: "Este mês", value: "this_month" },
      { label: "Este trimestre", value: "this_quarter" },
      { label: "Este ano", value: "this_year" },
    ],
    past: [
      { label: "Ontem", value: "yesterday" },
      { label: "Semana passada", value: "last_week" },
      { label: "Mês passado", value: "last_month" },
      { label: "Últimos 7 dias", value: "last_7_days" },
      { label: "Últimos 30 dias", value: "last_30_days" },
      { label: "Últimos 60 dias", value: "last_60_days" },
      { label: "Últimos 90 dias", value: "last_90_days" },
      { label: "Trimestre passado", value: "last_quarter" },
      { label: "Semestre passado", value: "last_semester" },
      { label: "Ano passado", value: "last_year" },
      { label: "Últimos 6 meses", value: "last_6_months" },
      { label: "Últimos 365 dias", value: "last_365_days" },
    ],
    future: [
      { label: "Amanhã", value: "tomorrow" },
      { label: "Próxima semana", value: "next_week" },
      { label: "Próximo mês", value: "next_month" },
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2">
          {children}
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto hover:bg-transparent"
          >
            <ChevronDown className="h-4 w-4 text-secondary/60" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Acesso rápido</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeFrames.quick.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">PASSADO</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeFrames.past.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">FUTURO</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeFrames.future.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full justify-start font-normal"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full justify-start font-normal">
            Limpar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateFilterDialog;