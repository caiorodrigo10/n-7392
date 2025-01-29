import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getChatCompletion } from "@/services/openai";
import { ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam } from "openai/resources/chat/completions";
import { useDataVisualization } from "./useDataVisualization";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  showAnalysis?: boolean;
  visualizationType?: 'comparison' | 'trend' | 'distribution' | 'relationship' | 'hierarchy' | 'flow';
  analysisData?: any[];
}

export function useChatMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Sou Kai, seu assistente de vendas da Avantto. Como posso ajudar você hoje? Posso analisar seus dados de vendas, mostrar tendências ou responder suas dúvidas.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { analyzeData } = useDataVisualization({} as any); // Será atualizado com os deals reais

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Analisa os dados baseado na query do usuário
      const analysis = analyzeData(input);
      
      const apiMessages = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content
      }));

      apiMessages.push({
        role: "user",
        content: input
      });

      const response = await getChatCompletion(apiMessages);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: response,
          sender: "ai",
          showAnalysis: true,
          visualizationType: analysis.type,
          analysisData: analysis.data
        },
      ]);
    } catch (error) {
      console.error("Erro ao obter resposta:", error);
      toast({
        title: "Erro",
        description: "Não foi possível obter resposta da IA. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    handleSubmit
  };
}