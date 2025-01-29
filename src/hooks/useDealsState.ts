import { useState } from "react";
import { Deal, DealsState } from "@/types/deals";
import { toast } from "@/hooks/use-toast";
import { triggerWinConfetti } from "@/utils/confetti";
import { DropResult } from "@hello-pangea/dnd";

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
  won: [
    { 
      id: "8", 
      title: "Enterprise Software", 
      value: "$75,000", 
      company: "Big Corp Ltd",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 2, 25)
    },
  ],
  lost: [
    { 
      id: "9", 
      title: "Failed Project", 
      value: "$45,000", 
      company: "Failed Corp",
      assignee: {
        name: "Emma Davis",
        avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
      },
      stageEnteredAt: new Date(2024, 2, 20)
    },
  ],
  abandoned: [
    { 
      id: "10", 
      title: "Abandoned Deal", 
      value: "$15,000", 
      company: "Left Inc",
      assignee: {
        name: "Robert Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      stageEnteredAt: new Date(2024, 2, 15)
    },
  ],
  extended: [
    { 
      id: "11", 
      title: "Extended Project", 
      value: "$60,000", 
      company: "Delay Corp",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 3, 1)
    },
  ],
};

export const useDealsState = () => {
  const [deals, setDeals] = useState<DealsState>(initialDeals);
  const [isDragging, setIsDragging] = useState(false);
  const [visibleStatuses, setVisibleStatuses] = useState<string[]>(["won"]);

  const calculateColumnTotal = (deals: Deal[]) => {
    return deals.reduce((total, deal) => {
      const value = parseFloat(deal.value.replace(/[$,]/g, ''));
      return total + value;
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleDealStatusChange = (dealId: string, status: string): boolean => {
    let foundDeal: Deal | null = null;
    let sourceColumn: keyof DealsState | null = null;

    Object.entries(deals).forEach(([column, columnDeals]) => {
      const deal = columnDeals.find((d) => d.id === dealId);
      if (deal) {
        foundDeal = deal;
        sourceColumn = column as keyof DealsState;
      }
    });

    if (foundDeal && sourceColumn) {
      setDeals((prevDeals) => ({
        ...prevDeals,
        [sourceColumn!]: prevDeals[sourceColumn!].filter((d) => d.id !== dealId),
      }));

      const statusMessages = {
        won: { title: "🎉 Deal Won!", description: "Congratulations!" },
        lost: { title: "Deal Lost", description: "Better luck next time" },
        abandoned: { title: "Deal Abandoned", description: "Deal has been abandoned" },
        extended: { title: "Deal Extended", description: "Deal timeline has been extended" }
      };

      const message = statusMessages[status as keyof typeof statusMessages];
      
      if (status === 'won') {
        triggerWinConfetti();
      }
      
      toast({
        title: message?.title || `Deal marked as ${status}`,
        description: message?.description || `${foundDeal.title} has been marked as ${status}`,
      });

      return true;
    }

    return false;
  };

  const toggleStatus = (status: string) => {
    setVisibleStatuses((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      }
      return [...prev, status];
    });
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);

    if (!result.destination) {
      return;
    }

    if (result.destination.droppableId.startsWith('status-')) {
      const status = result.destination.droppableId.replace('status-', '');
      handleDealStatusChange(result.draggableId, status);
      return;
    }

    const { source, destination } = result;

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

  const handleAddDeal = () => {
    toast({
      title: "Add Deal",
      description: "Opening deal creation form...",
    });
    console.log("Add deal clicked");
  };

  return {
    deals,
    isDragging,
    visibleStatuses,
    calculateColumnTotal,
    formatCurrency,
    onDragStart,
    onDragEnd,
    handleAddDeal,
    toggleStatus
  };
};
