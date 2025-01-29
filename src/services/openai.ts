import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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

Você tem conhecimento sobre:
- Pipeline de vendas da Avantto
- Histórico de interações com clientes
- Melhores práticas do setor
- Estratégias comprovadas de vendas consultivas

Mantenha suas respostas diretas e relevantes ao contexto da Avantto e do setor de aviação executiva.`
};

export async function getChatCompletion(messages: ChatCompletionMessageParam[]) {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("OPENAI_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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