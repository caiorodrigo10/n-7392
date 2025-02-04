import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface DateFilterDialogProps {
  children: React.ReactNode;
  onFilterChange: (value: string) => void;
}

const DateFilterDialog = ({ children, onFilterChange }: DateFilterDialogProps) => {
  const [open, setOpen] = useState(false);
  
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

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleOptionClick = (label: string) => {
    onFilterChange(label);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
      <DialogContent className="max-w-[600px] bg-white/95 border border-gray-200">
        <Tabs defaultValue="relative" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="relative">Quick access</TabsTrigger>
            <TabsTrigger value="choose">Choose date</TabsTrigger>
          </TabsList>
          
          <TabsContent value="relative" className="space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-3">RELATIVE</h3>
              <div className="grid grid-cols-3 gap-2">
                {timeFrames.quick.map((option) => (
                  <Button
                    key={option.value}
                    variant="outline"
                    className="w-full h-auto py-2 px-3 justify-start font-normal whitespace-normal text-left hover:bg-gray-50"
                    onClick={() => handleOptionClick(option.label)}
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
                    className="w-full h-auto py-2 px-3 justify-start font-normal whitespace-normal text-left hover:bg-gray-50"
                    onClick={() => handleOptionClick(option.label)}
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
                    className="w-full h-auto py-2 px-3 justify-start font-normal whitespace-normal text-left hover:bg-gray-50"
                    onClick={() => handleOptionClick(option.label)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full justify-start font-normal hover:bg-gray-50"
              onClick={() => handleOptionClick("January")}
            >
              Clear
            </Button>
          </TabsContent>
          
          <TabsContent value="choose">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium">2025</span>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-50">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-50">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {months.map((month) => (
                  <Button
                    key={month}
                    variant="outline"
                    className={`w-full py-2 hover:bg-gray-50 ${
                      month === "January" ? "bg-blue-50 border-blue-200 hover:bg-blue-100" : ""
                    }`}
                    onClick={() => handleOptionClick(month)}
                  >
                    {month}
                  </Button>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-4 hover:bg-gray-50"
                onClick={() => handleOptionClick("Custom")}
              >
                Custom...
              </Button>

              <Button 
                variant="outline" 
                className="w-full hover:bg-gray-50"
                onClick={() => handleOptionClick("January")}
              >
                Clear
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DateFilterDialog;