import { Layout } from "@/components/Layout";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface CalendarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const CalendarPage = ({ isCollapsed, setIsCollapsed }: CalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Calendar</h1>
        <Card className="p-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
      </div>
    </Layout>
  );
};

export default CalendarPage;