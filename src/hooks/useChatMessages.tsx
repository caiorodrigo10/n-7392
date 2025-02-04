import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getChatCompletion, TogetherMessage } from "@/services/together";


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
      content: "Hi! I'm Kai, your Avantto sales assistant. How can I help you today? I can analyze your sales pipeline, suggest strategies, or answer your questions.",
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

    const userMessage: Message = {
      id: messages.length + 1,
      content: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Create messages array with system message first
      const apiMessages: TogetherMessage[] = [
        {
          role: "system",
          content: "You are Kai, an AI sales assistant for Avantto. When providing sales pipeline or funnel data, do not mention that you will create or show a chart, as it will be displayed automatically below your response. Just provide the relevant data and insights."
        },
        ...messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content
        })),
        {
          role: "user",
          content: input
        }
      ];

      console.log('Prepared messages for API:', apiMessages);

      console.log('Sending chat request...');
      const response = await getChatCompletion(apiMessages);
      console.log('Received response:', response);
      
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
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Could not get AI response. Please try again.",
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