const TOGETHER_API_KEY = '15c8a049f77f5928fc545c5dbc06f4236fce384c9ebd6c919bbc4f63a9db9361';
const TOGETHER_API_URL = 'https://api.together.xyz/v1/chat/completions';

export interface TogetherMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function getChatCompletion(messages: TogetherMessage[]) {
  const payload = {
    model: 'meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo',
    messages: messages,
    max_tokens: 1000,
    temperature: 0.7,
    top_p: 0.9
  };

  console.log('Sending request to Together API:', {
    url: TOGETHER_API_URL,
    headers: {
      'Authorization': `Bearer ${TOGETHER_API_KEY.substring(0, 10)}...`,
      'Content-Type': 'application/json'
    },
    payload
  });

  const response = await fetch(TOGETHER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOGETHER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  console.log('Raw API Response:', responseText);

  if (!response.ok) {
    console.error('Together API Error Response:', {
      status: response.status,
      statusText: response.statusText,
      error: responseText
    });
    try {
      const error = JSON.parse(responseText);
      throw new Error(`Together API Error: ${error.message || error.error || 'Unknown error'}`);
    } catch {
      throw new Error(`Together API Error: ${responseText}`);
    }
  }

  const data = JSON.parse(responseText);
  console.log('Together API Response:', {
    model: data.model,
    choices: data.choices,
    usage: data.usage
  });
  
  if (!data.choices?.[0]?.message?.content) {
    console.error('Unexpected API response format:', data);
    throw new Error('Invalid response format from Together API');
  }

  return data.choices[0].message.content;
}
