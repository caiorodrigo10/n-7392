import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat-bubble";
import PipelineAnalysis from "../ai/PipelineAnalysis";
import { Deal } from "@/types/deals";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  showAnalysis?: boolean;
  chartType?: 'bar' | 'funnel' | 'trend' | 'distribution';
}

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  deals?: Deal[];
}

export function ChatMessages({ messages, isLoading, deals }: ChatMessagesProps) {
  return (
    <>
      {messages.map((message) => (
        <>
          <ChatBubble
            key={message.id}
            variant={message.sender === "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar
              className="h-8 w-8 shrink-0"
              fallback={message.sender === "user" ? "US" : "KA"}
            />
            <ChatBubbleMessage
              variant={message.sender === "user" ? "sent" : "received"}
            >
              {message.content}
            </ChatBubbleMessage>
          </ChatBubble>
          {message.showAnalysis && deals && (
            <div className="mt-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
              <PipelineAnalysis deals={deals} chartType={message.chartType} />
            </div>
          )}
        </>
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