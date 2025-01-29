import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getChatCompletion } from "@/services/openai";
import { ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam } from "openai/resources/chat/completions";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  showAnalysis?: boolean;
  chartType?: 'bar' | 'funnel' | 'trend' | 'distribution';
}

export function useChatMessages() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Olá! Sou Kai, seu assistente de vendas da Avantto. Como posso ajudar você hoje? Posso analisar seu pipeline de vendas, sugerir estratégias ou responder suas dúvidas.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    console.log("Input recebido:", input);
    console.log("Verificando palavras-chave para análise...");

    const pipelineKeywords = [
      'pipeline',
      'funil',
      'vendas',
      'oportunidades',
      'criar grafico',
      'mostrar grafico',
      'ver grafico'
    ];

    const shouldShowAnalysis = pipelineKeywords.some(keyword => 
      input.toLowerCase().includes(keyword)
    );

    let chartType: 'bar' | 'funnel' | 'trend' | 'distribution' | undefined;
    
    // Se for uma solicitação relacionada a pipeline/funil, usar o funil horizontal por padrão
    if (shouldShowAnalysis && !input.toLowerCase().includes('barra') && 
        !input.toLowerCase().includes('tendência') && 
        !input.toLowerCase().includes('distribuição')) {
      chartType = 'funnel';
    } else if (input.toLowerCase().includes('barra')) {
      chartType = 'bar';
    } else if (input.toLowerCase().includes('tendência') || input.toLowerCase().includes('evolução')) {
      chartType = 'trend';
    } else if (input.toLowerCase().includes('distribuição')) {
      chartType = 'distribution';
    }

    console.log("Deve mostrar análise?", shouldShowAnalysis);
    console.log("Tipo de gráfico:", chartType);

    const userMessage = {
      id: messages.length + 1,
      content: input,
      sender: "user" as const,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiMessages = messages.map((msg) => {
        if (msg.sender === "user") {
          return {
            role: "user",
            content: msg.content
          } as ChatCompletionUserMessageParam;
        } else {
          return {
            role: "assistant",
            content: msg.content
          } as ChatCompletionAssistantMessageParam;
        }
      });

      apiMessages.push({
        role: "user",
        content: input
      } as ChatCompletionUserMessageParam);

      const response = await getChatCompletion(apiMessages);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: response,
          sender: "ai",
          showAnalysis: shouldShowAnalysis,
          chartType
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