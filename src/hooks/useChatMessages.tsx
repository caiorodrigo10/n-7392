import { useState, FormEvent, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getChatCompletion } from "@/services/openai";
import { useDataVisualization } from "./useDataVisualization";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
  showAnalysis?: boolean;
  visualizationType?: 'comparison' | 'trend' | 'distribution' | 'relationship' | 'hierarchy' | 'flow';
  analysisData?: any[];
}

interface CachedAnalysis {
  query: string;
  result: {
    type: string;
    data: any[];
  };
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
const analysisCache = new Map<string, CachedAnalysis>();

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
  const { analyzeData } = useDataVisualization({} as any);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Gera sugestões baseadas no contexto atual
  const generateSuggestions = () => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "ai" && lastMessage?.analysisData) {
      const newSuggestions = [
        "Mostre a evolução desses dados ao longo do tempo",
        "Compare esses resultados por vendedor",
        "Qual a distribuição por valor dos negócios?",
      ];
      setSuggestions(newSuggestions);
    }
  };

  useEffect(() => {
    generateSuggestions();
  }, [messages]);

  const getCachedAnalysis = (query: string) => {
    const cached = analysisCache.get(query);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.result;
    }
    return null;
  };

  const cacheAnalysis = (query: string, result: any) => {
    analysisCache.set(query, {
      query,
      result,
      timestamp: Date.now(),
    });
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
      // Verifica cache primeiro
      const cachedResult = getCachedAnalysis(input);
      let analysis;
      
      if (cachedResult) {
        analysis = cachedResult;
        console.log("Usando análise em cache");
      } else {
        analysis = analyzeData(input);
        cacheAnalysis(input, analysis);
        console.log("Nova análise realizada e cacheada");
      }
      
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
    handleSubmit,
    suggestions
  };
}