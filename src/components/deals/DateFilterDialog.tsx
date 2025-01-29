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
      { label: "All time", value: "all" },
      { label: "Today", value: "today" },
      { label: "This week", value: "this_week" },
      { label: "This month", value: "this_month" },
      { label: "This quarter", value: "this_quarter" },
      { label: "This year", value: "this_year" },
    ],
    past: [
      { label: "Yesterday", value: "yesterday" },
      { label: "Last week", value: "last_week" },
      { label: "Last month", value: "last_month" },
      { label: "Last 7 days", value: "last_7_days" },
      { label: "Last 30 days", value: "last_30_days" },
      { label: "Last 60 days", value: "last_60_days" },
      { label: "Last 90 days", value: "last_90_days" },
      { label: "Last quarter", value: "last_quarter" },
      { label: "Last semester", value: "last_semester" },
      { label: "Last year", value: "last_year" },
      { label: "Last 6 months", value: "last_6_months" },
      { label: "Last 365 days", value: "last_365_days" },
    ],
    future: [
      { label: "Tomorrow", value: "tomorrow" },
      { label: "Next week", value: "next_week" },
      { label: "Next month", value: "next_month" },
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
      <DialogContent className="max-w-[600px] bg-white/95">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Quick access</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeFrames.quick.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full h-auto py-2 px-3 justify-start font-normal whitespace-normal text-left"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">PAST</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeFrames.past.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full h-auto py-2 px-3 justify-start font-normal whitespace-normal text-left"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">FUTURE</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeFrames.future.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  className="w-full h-auto py-2 px-3 justify-start font-normal whitespace-normal text-left"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          <Button variant="outline" className="w-full justify-start font-normal">
            Clear
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateFilterDialog;