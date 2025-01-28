import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";
import DealStatusDropZone from "@/components/deals/DealStatusDropZone";

interface Deal {
  id: string;
  title: string;
  value: string;
  company: string;
  assignee: {
    name: string;
    avatar: string;
  };
  stageEnteredAt: Date;
  scheduledMeeting?: {
    date: string;
    time: string;
  };
}

interface DealsState {
  lead: Deal[];
  qualification: Deal[];
  meet: Deal[];
  negotiation: Deal[];
  closed: Deal[];
}

interface DealsProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const Deals = ({ isCollapsed, setIsCollapsed }: DealsProps) => {
  const [deals, setDeals] = useState<DealsState>({
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
  });
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

  const handleDealStatusChange = (dealId: string, status: string) => {
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
      const updatedDeals = {
        ...deals,
        [sourceColumn]: deals[sourceColumn].filter((d) => d.id !== dealId),
      };

      setDeals(updatedDeals);

      toast({
        title: `Deal marked as ${status}`,
        description: `${foundDeal.title} has been marked as ${status}`,
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    setIsDragging(false);
    const { source, destination } = result;
    
    if (!destination) return;

    if (destination.droppableId.startsWith('status-')) {
      const status = destination.droppableId.replace('status-', '');
      const dealId = result.draggableId;
      handleDealStatusChange(dealId, status);
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (source.droppableId === destination.droppableId) {
      const column = Array.from(deals[source.droppableId as keyof DealsState]);
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setDeals({ ...deals, [source.droppableId]: column });
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

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragUpdate = () => {
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const columns = [
    { id: "lead", title: "Lead" },
    { id: "qualification", title: "Qualification" },
    { id: "meet", title: "Meet" },
    { id: "negotiation", title: "Negotiation" },
    { id: "closed", title: "Closing" },
  ];

  const showMeetingBadge = (columnId: string) => {
    return ["meet", "negotiation", "closed"].includes(columnId);
  };

  return (
    <div className="min-h-screen bg-white flex relative">
      <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main 
        className={`flex-1 p-4 sm:p-8 transition-all duration-300 ${
          isCollapsed ? 'ml-[60px]' : 'ml-[60px] sm:ml-64'
        }`}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Deals Pipeline</h1>
          <p className="text-gray-600 mt-1 text-sm">Track and manage your deals</p>
        </div>

        <DragDropContext 
          onDragEnd={onDragEnd} 
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
        >
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
              {columns.map((column) => (
                <div key={column.id} className="w-[280px]">
                  <h2 className="font-medium text-sm mb-3">
                    {column.title} ({deals[column.id as keyof DealsState].length}) - {formatCurrency(calculateColumnTotal(deals[column.id as keyof DealsState]))}
                  </h2>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`space-y-3 min-h-[200px] p-3 rounded-lg ${
                          snapshot.isDraggingOver ? "bg-gray-50" : "bg-gray-100/50"
                        }`}
                      >
                        {deals[column.id as keyof DealsState].map((deal, index) => (
                          <Draggable key={deal.id} draggableId={deal.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`p-3 cursor-move bg-white ${
                                  snapshot.draggingOver ? "shadow-lg" : "hover:shadow-md"
                                } transition-shadow`}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <h3 className="font-medium text-sm">{deal.title}</h3>
                                    <p className="text-xs text-gray-600 mt-1">{deal.company}</p>
                                    <p className="text-sm font-semibold text-primary mt-2">
                                      {deal.value}
                                    </p>
                                  </div>
                                  <Avatar className="h-8 w-8 ml-2">
                                    <AvatarImage src={deal.assignee.avatar} alt={deal.assignee.name} />
                                    <AvatarFallback>{deal.assignee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                  <p className="text-xs text-gray-500">
                                    {formatDistanceToNow(deal.stageEnteredAt, { addSuffix: true })}
                                  </p>
                                  {showMeetingBadge(column.id) && deal.scheduledMeeting && (
                                    <Badge 
                                      variant="secondary" 
                                      className="bg-[#333333] text-white hover:bg-[#333333]"
                                    >
                                      📅 {deal.scheduledMeeting.date} at {deal.scheduledMeeting.time}
                                    </Badge>
                                  )}
                                </div>
                              </Card>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </div>
          {isDragging && <DealStatusDropZone isDropDisabled={!isDragging} />}
        </DragDropContext>
      </main>
    </div>
  );
};

export default Deals;