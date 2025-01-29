import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: 'OPENAI_API_KEY', // Placeholder que será substituído pelo valor real
  dangerouslyAllowBrowser: true
});

export async function getChatCompletion(messages: any[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
  return response.choices[0].message.content;
}

export async function transcribeAudio(audioBlob: Blob): Promise<string> {
  try {
    // Converter o Blob para um File com nome e tipo específicos
    const audioFile = new File([audioBlob], 'audio.wav', {
      type: 'audio/wav',
      lastModified: Date.now(),
    });

    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'pt'
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}