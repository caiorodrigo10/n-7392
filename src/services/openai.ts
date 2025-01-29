import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

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
        messages,
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