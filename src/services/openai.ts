import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
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
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', 'pt');

    const response = await openai.audio.transcriptions.create({
      file: audioBlob,
      model: 'whisper-1',
      language: 'pt'
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
}
