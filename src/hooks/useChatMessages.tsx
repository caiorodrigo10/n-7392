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

  const shouldShowPipelineAnalysis = (input: string, response: string): { show: boolean; type?: 'bar' | 'funnel' | 'trend' | 'distribution' } => {
    const input_lower = input.toLowerCase();
    const response_lower = response.toLowerCase();
    
    // Keywords that indicate a request for pipeline visualization
    const visualizationKeywords = [
      'mostrar pipeline',
      'ver pipeline',
      'análise do pipeline',
      'análise de vendas',
      'funil de vendas',
      'mostrar funil',
      'ver funil',
      'gráfico',
      'visualizar vendas',
      'status das vendas',
      'oportunidades',
      'deals'
    ];

    // Keywords that indicate pipeline data in the response
    const responseKeywords = [
      'leads',
      'qualificados',
      'negociação',
      'propostas',
      'fechadas',
      'pipeline',
      'funil'
    ];

    // Check if the input contains visualization keywords
    const requestingVisualization = visualizationKeywords.some(keyword => 
      input_lower.includes(keyword)
    );

    // Check if the response contains pipeline data
    const containsPipelineData = responseKeywords.some(keyword =>
      response_lower.includes(keyword)
    );

    // Show visualization if either condition is met
    if (!requestingVisualization && !containsPipelineData) {
      return { show: false };
    }

    // Determine the type of visualization based on specific keywords
    if (input_lower.includes('barra') || input_lower.includes('barras')) {
      return { show: true, type: 'bar' };
    } else if (input_lower.includes('tendência') || input_lower.includes('evolução')) {
      return { show: true, type: 'trend' };
    } else if (input_lower.includes('distribuição')) {
      return { show: true, type: 'distribution' };
    }

    // Default to funnel visualization
    return { show: true, type: 'funnel' };
  };

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
      const { show: shouldShow, type: chartType } = shouldShowPipelineAnalysis(input, response);

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: response,
          sender: "ai",
          showAnalysis: shouldShow,
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