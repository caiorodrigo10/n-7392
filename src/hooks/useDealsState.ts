import { useState } from "react";
import { Deal, DealsState } from "@/types/deals";
import { toast } from "@/hooks/use-toast";
import { triggerWinConfetti } from "@/utils/confetti";
import { DropResult } from "@hello-pangea/dnd";

const initialDeals: DealsState = {
  lead: [
    { 
      id: "1", 
      title: "Jato Executivo Legacy 500", 
      value: "$14,500,000", 
      company: "Tech Corp Airlines",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 2, 15)
    },
    { 
      id: "2", 
      title: "Phenom 300 Customizado", 
      value: "$9,800,000", 
      company: "StartUp Aviation",
      assignee: {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      },
      stageEnteredAt: new Date(2024, 3, 1)
    },
    { 
      id: "3", 
      title: "Programa de Compartilhamento", 
      value: "$5,200,000", 
      company: "Share & Fly Co",
      assignee: {
        name: "Maria Santos",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      stageEnteredAt: new Date(2024, 3, 5)
    },
  ],
  qualification: [
    { 
      id: "4", 
      title: "Praetor 600 Elite", 
      value: "$20,900,000", 
      company: "Elite Aviation Ltd",
      assignee: {
        name: "Mike Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      stageEnteredAt: new Date(2024, 3, 5)
    },
    { 
      id: "5", 
      title: "Pacote Manutenção Premium", 
      value: "$3,500,000", 
      company: "AeroMaintain Corp",
      assignee: {
        name: "Ana Oliveira",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
      },
      stageEnteredAt: new Date(2024, 3, 8)
    },
  ],
  meet: [
    { 
      id: "6", 
      title: "Legacy 650E Corporativo", 
      value: "$32,000,000", 
      company: "Global Airways Inc",
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
      title: "Programa de Treinamento", 
      value: "$1,800,000", 
      company: "AeroTraining Systems",
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
      id: "8", 
      title: "Phenom 100EV Fleet", 
      value: "$28,500,000", 
      company: "Regional Express",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 3, 10)
    },
    { 
      id: "9", 
      title: "Programa VIP Charter", 
      value: "$7,200,000", 
      company: "Luxury Air Services",
      assignee: {
        name: "Carlos Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      stageEnteredAt: new Date(2024, 3, 15)
    },
  ],
  closed: [
    { 
      id: "10", 
      title: "Legacy 500 Corporate", 
      value: "$18,900,000", 
      company: "Business Air Ltd",
      assignee: {
        name: "John Smith",
        avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
      },
      stageEnteredAt: new Date(2024, 2, 28)
    },
    { 
      id: "11", 
      title: "Pacote Manutenção Anual", 
      value: "$2,500,000", 
      company: "TechAir Solutions",
      assignee: {
        name: "Lisa Wong",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
      },
      stageEnteredAt: new Date(2024, 3, 18)
    },
  ],
  won: [
    { 
      id: "12", 
      title: "Praetor 500 Executive", 
      value: "$17,000,000", 
      company: "Executive Air Corp",
      assignee: {
        name: "Sarah Wilson",
        avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      stageEnteredAt: new Date(2024, 2, 25)
    },
    { 
      id: "13", 
      title: "Programa de Fretamento", 
      value: "$4,800,000", 
      company: "Charter Solutions",
      assignee: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
      },
      stageEnteredAt: new Date(2024, 3, 20)
    },
  ],
};

export const useDealsState = () => {
  const [deals, setDeals] = useState<DealsState>(initialDeals);
  const [isDragging, setIsDragging] = useState(false);

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

    // Find the deal and its source column
    Object.entries(deals).forEach(([column, columnDeals]) => {
      const deal = columnDeals.find((d) => d.id === dealId);
      if (deal) {
        foundDeal = deal;
        sourceColumn = column as keyof DealsState;
      }
    });

    if (foundDeal && sourceColumn) {
      // Remove the deal from its source column immediately
      setDeals((prevDeals) => ({
        ...prevDeals,
        [sourceColumn!]: prevDeals[sourceColumn!].filter((d) => d.id !== dealId),
      }));

      // Show appropriate notification and trigger confetti for won deals
      if (status === 'won') {
        triggerWinConfetti();
        toast({
          title: "🎉 Deal Won!",
          description: `Congratulations! ${foundDeal.title} has been won!`,
        });
      } else {
        toast({
          title: `Deal marked as ${status}`,
          description: `${foundDeal.title} has been marked as ${status}`,
        });
      }

      return true;
    }

    return false;
  };

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
      handleDealStatusChange(result.draggableId, status);
      return; // Important: return here to prevent further processing
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

  const handleAddDeal = () => {
    toast({
      title: "Add Deal",
      description: "Opening deal creation form...",
    });
    // TODO: Implement deal creation form
    console.log("Add deal clicked");
  };

  return {
    deals,
    isDragging,
    calculateColumnTotal,
    formatCurrency,
    onDragStart,
    onDragEnd,
    handleAddDeal
  };
};