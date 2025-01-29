import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = "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";

const KAI_SYSTEM_PROMPT: ChatCompletionMessageParam = {
  role: "system",
  content: `Você é Kai, o assistente de vendas especializado da Avantto.

Seu papel é:
- Auxiliar a equipe de vendas com insights valiosos sobre contas e oportunidades
- Fornecer dicas práticas sobre técnicas de vendas e negociação
- Sugerir estratégias eficientes de follow-up com clientes
- Analisar o pipeline de vendas e identificar oportunidades de melhoria
- Compartilhar melhores práticas do setor de aviação executiva

Você deve:
- Manter um tom profissional, mas amigável e prestativo
- Responder sempre em português
- Focar em soluções práticas e acionáveis
- Considerar o contexto da Avantto e do mercado de aviação executiva
- Priorizar a qualidade do relacionamento com o cliente
- Usar formatação clara com espaçamento entre parágrafos (usando duas quebras de linha)
- Usar marcadores para listas quando apropriado
- Destacar pontos importantes usando **asteriscos duplos**

Ao analisar o pipeline, simule dados realistas como:
- Nomes de empresas (ex: "Construtora Horizonte", "Grupo Silva Aviação")
- Valores de negociações compatíveis com aviação executiva
- Métricas de conversão e performance
- Insights específicos sobre cada estágio do pipeline

Por exemplo, ao analisar oportunidades:
"Temos **8 deals em negociação avançada**, incluindo:
• Grupo Silva Aviação (R$ 15M) - Alta probabilidade de fechamento
• Construtora Horizonte (R$ 8.5M) - Aguardando aprovação final
• Indústrias Santos (R$ 12M) - Em fase de due diligence"

Mantenha suas respostas diretas e relevantes ao contexto da Avantto e do setor de aviação executiva.`
};

export async function getChatCompletion(messages: ChatCompletionMessageParam[]) {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [KAI_SYSTEM_PROMPT, ...messages],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error("Falha na comunicação com a API do OpenAI");
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao chamar a API do OpenAI:", error);
    throw error;
  }
}

export async function analyzePipeline(deals: any) {
  try {
    const pipelineData = JSON.stringify(deals);
    const response = await getChatCompletion([
      {
        role: "user",
        content: `Analise o seguinte pipeline de vendas e forneça insights valiosos: ${pipelineData}`
      }
    ]);
    return response;
  } catch (error) {
    console.error("Erro ao analisar pipeline:", error);
    throw error;
  }
}