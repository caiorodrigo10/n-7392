import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import { Deal, DealsState } from "@/types/deals";
import { useDataVisualization } from "@/hooks/useDataVisualization";
import { 
  LineChart, 
  BarChart, 
  AreaChart, 
  PieChart, 
  ScatterChart,
  Line, 
  Bar, 
  Area, 
  Pie,
  Scatter,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from 'recharts';

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  showAnalysis?: boolean;
  visualizationType?: 'comparison' | 'trend' | 'distribution' | 'relationship' | 'hierarchy' | 'flow';
  analysisData?: any[];
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  deals?: DealsState;
}

const VisualizationComponent = ({ type, data }: { type: string, data: any[] }) => {
  const commonProps = {
    width: 500,
    height: 300,
    data: data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  switch (type) {
    case 'trend':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      );
    case 'distribution':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart {...commonProps}>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name" 
              cx="50%" 
              cy="50%" 
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    case 'relationship':
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" name="Valor" />
            <YAxis dataKey="y" name="Quantidade" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Deals" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      );
    case 'comparison':
    default:
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      );
  }
};

export function ChatMessages({ messages, isLoading, deals }: ChatMessagesProps) {
  return (
    <>
      {messages.map((message) => (
        <div key={message.id}>
          <ChatBubble variant={message.sender === "user" ? "sent" : "received"}>
            <ChatBubbleAvatar
              className="h-8 w-8 shrink-0"
              fallback={message.sender === "user" ? "US" : "KA"}
            />
            <ChatBubbleMessage variant={message.sender === "user" ? "sent" : "received"}>
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
          
          {message.showAnalysis && message.analysisData && (
            <div className="mt-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
              <VisualizationComponent 
                type={message.visualizationType || 'comparison'} 
                data={message.analysisData}
              />
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <ChatBubble variant="received">
          <ChatBubbleAvatar className="h-8 w-8 shrink-0" fallback="KA" />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
      )}
    </>
  );
}