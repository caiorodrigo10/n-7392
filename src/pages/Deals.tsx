import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { ChevronRight } from "lucide-react";

interface Deal {
  id: string;
  title: string;
  value: string;
  company: string;
}

interface DealsState {
  lead: Deal[];
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
      { id: "1", title: "Enterprise Deal", value: "$50,000", company: "Tech Corp" },
      { id: "2", title: "Software License", value: "$25,000", company: "StartUp Inc" },
    ],
    negotiation: [
      { id: "3", title: "Consulting Project", value: "$30,000", company: "Consulting Co" },
    ],
    closed: [
      { id: "4", title: "Training Program", value: "$15,000", company: "Education Ltd" },
    ],
  });

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

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    if (source.droppableId === destination.droppableId) {
      const column = Array.from(deals[source.droppableId]);
      const [removed] = column.splice(source.index, 1);
      column.splice(destination.index, 0, removed);
      setDeals({ ...deals, [source.droppableId]: column });
      return;
    }

    const sourceColumn = Array.from(deals[source.droppableId]);
    const destColumn = Array.from(deals[destination.droppableId]);
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);
    setDeals({
      ...deals,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  const columns = [
    { id: "lead", title: "Lead" },
    { id: "negotiation", title: "Negotiation" },
    { id: "closed", title: "Closed Won" },
  ];

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

        <div className="flex items-center justify-between mb-8 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-primary font-medium">Lead</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Qualification</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Meet</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">Negotiation</span>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col lg:flex-row gap-4">
            {columns.map((column) => (
              <div key={column.id} className="flex-1 min-w-0 max-w-[300px]">
                <h2 className="font-medium text-sm mb-3">
                  {column.title} ({deals[column.id].length}) - {formatCurrency(calculateColumnTotal(deals[column.id]))}
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
                      {deals[column.id].map((deal, index) => (
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
                              <h3 className="font-medium text-sm">{deal.title}</h3>
                              <p className="text-xs text-gray-600 mt-1">{deal.company}</p>
                              <p className="text-sm font-semibold text-primary mt-2">
                                {deal.value}
                              </p>
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
        </DragDropContext>
      </main>
    </div>
  );
};

export default Deals;