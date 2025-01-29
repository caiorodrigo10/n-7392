import { Bot } from "lucide-react";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "@/components/ui/expandable-chat";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { useDealsState } from "@/hooks/useDealsState";
import { ChatMessages } from "./chat/ChatMessages";
import { ChatInputForm } from "./chat/ChatInputForm";
import { useChatMessages } from "@/hooks/useChatMessages";

export function AiChat() {
  const { deals } = useDealsState();
  const { messages, input, setInput, isLoading, handleSubmit, suggestions } = useChatMessages();

  const handleAttachFile = () => {
    // Implement file attachment logic
  };

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center">
        <h1 className="text-xl font-semibold">Kai - Assistente de Vendas ✨</h1>
        <p className="text-sm text-muted-foreground">
          Seu especialista em vendas da Avantto
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          <ChatMessages 
            messages={messages}
            isLoading={isLoading}
            deals={deals}
          />
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <ChatInputForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          handleAttachFile={handleAttachFile}
          suggestions={suggestions}
        />
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}