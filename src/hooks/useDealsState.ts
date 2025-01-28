import { useState } from "react";
import { Deal, DealsState } from "@/types/deals";
import { DropResult } from "@hello-pangea/dnd";
import { calculateColumnTotal, formatCurrency } from "@/utils/dealCalculations";
import { handleDealStatusChange } from "@/utils/dealStatusHandler";

const initialDeals: DealsState = {
  lead: [
    { 
      id: "1", 
      title: "Enterprise Deal", 
      value: "$50,000", 
      company: "Tech Corp",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 2, 15)
    },
    { 
      id: "2", 
      title: "Software License", 
      value: "$25,000", 
      company: "StartUp Inc",
      assignee: {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      },
      stageEnteredAt: new Date(2024, 3, 1)
    },
  ],
  qualification: [
    { 
      id: "5", 
      title: "Training Service", 
      value: "$20,000", 
      company: "Learning Co",
      assignee: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      stageEnteredAt: new Date(2024, 3, 5)
    },
  ],
  meet: [
    { 
      id: "6", 
      title: "Hardware Supply", 
      value: "$35,000", 
      company: "Hardware Ltd",
      assignee: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      },
      stageEnteredAt: new Date(2024, 2, 20),
      scheduledMeeting: {
        date: "15 Apr",
        time: "14:30"
      }
    },
    { 
      id: "7", 
      title: "Cloud Services", 
      value: "$42,000", 
      company: "Cloud Systems Inc",
      assignee: {
        name: "Robert Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      stageEnteredAt: new Date(2024, 3, 12),
      scheduledMeeting: {
        date: "18 Apr",
        time: "10:00"
      }
    },
  ],
  negotiation: [
    { 
      id: "3", 
      title: "Consulting Project", 
      value: "$30,000", 
      company: "Consulting Co",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 3, 10)
    },
  ],
  closed: [
    { 
      id: "4", 
      title: "Training Program", 
      value: "$15,000", 
      company: "Education Ltd",
      assignee: {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      },
      stageEnteredAt: new Date(2024, 2, 28)
    },
  ],
};

export const useDealsState = () => {
  const [deals, setDeals] = useState<DealsState>(initialDeals);
  const [isDragging, setIsDragging] = useState(false);

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);

    if (!result.destination) {
      return;
    }

    // Handle dropping to status zones
    if (result.destination.droppableId.startsWith('status-')) {
      const status = result.destination.droppableId.replace('status-', '');
      const success = handleDealStatusChange(deals, setDeals, result.draggableId, status);
      if (success) {
        return;
      }
    }

    const { source, destination } = result;

    // Handle moving between columns
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const column = Array.from(deals[source.droppableId as keyof DealsState]);
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      
      setDeals({
        ...deals,
        [source.droppableId]: column
      });
      return;
    }

    const sourceColumn = Array.from(deals[source.droppableId as keyof DealsState]);
    const destColumn = Array.from(deals[destination.droppableId as keyof DealsState]);
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    setDeals({
      ...deals,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  return {
    deals,
    isDragging,
    calculateColumnTotal,
    formatCurrency,
    onDragStart,
    onDragEnd
  };
};
