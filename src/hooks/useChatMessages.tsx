import { useState, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getChatCompletion } from "@/services/openai";
import { ChatCompletionUserMessageParam, ChatCompletionAssistantMessageParam } from "openai/resources/chat/completions";
import { Deal, DealsState } from "@/types/deals";

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

  const analyzeScheduledMeetings = (deals: DealsState) => {
    const allDeals = Object.values(deals).flat();
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
    
    const scheduledMeetings = allDeals
      .filter(deal => deal.scheduledMeeting)
      .filter(deal => {
        const meetingDate = new Date(`${deal.scheduledMeeting!.date} 2024`);
        return meetingDate >= thirtyDaysAgo && meetingDate <= today;
      });

    return {
      total: scheduledMeetings.length,
      meetings: scheduledMeetings.map(deal => ({
        title: deal.title,
        date: deal.scheduledMeeting!.date,
        time: deal.scheduledMeeting!.time,
        company: deal.company
      }))
    };
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
      const isAskingAboutMeetings = input.toLowerCase().includes("agendamento") || 
                                   input.toLowerCase().includes("reunião") ||
                                   input.toLowerCase().includes("reuniões") ||
                                   input.toLowerCase().includes("agenda");

      const shouldShowAnalysis = input.toLowerCase().includes("análise") || 
          input.toLowerCase().includes("pipeline") || 
          input.toLowerCase().includes("relatório") ||
          input.toLowerCase().includes("gráfico") ||
          isAskingAboutMeetings;

      let chartType: 'bar' | 'funnel' | 'trend' | 'distribution' | undefined;
      
      if (input.toLowerCase().includes("funil")) {
        chartType = 'funnel';
      } else if (input.toLowerCase().includes("tendência") || input.toLowerCase().includes("evolução")) {
        chartType = 'trend';
      } else if (input.toLowerCase().includes("distribuição")) {
        chartType = 'distribution';
      } else if (shouldShowAnalysis) {
        chartType = 'bar';
      }

      let response: string;

      // Primeiro verifica se é uma pergunta sobre agendamentos
      if (isAskingAboutMeetings) {
        const meetingsInfo = analyzeScheduledMeetings(window.currentDeals || {});
        response = `Nos últimos 30 dias temos ${meetingsInfo.total} agendamentos:\n\n` +
          meetingsInfo.meetings.map(meeting => 
            `- ${meeting.title} com ${meeting.company}\n  📅 ${meeting.date} às ${meeting.time}`
          ).join('\n\n');
      } else {
        // Se não for sobre agendamentos, processa normalmente com a API
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

        response = await getChatCompletion(apiMessages);
      }

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