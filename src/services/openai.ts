import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
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