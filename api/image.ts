import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest, 
  res: VercelResponse
): Promise<void> {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('Missing OPENAI_API_KEY environment variable');
    res.status(500).json({ error: 'Missing OPENAI_API_KEY environment variable' });
    return;
  }

  try {
    const { prompt, style } = req.body as { prompt: string; style: string };
    
    if (!prompt) {
      res.status(400).json({ error: 'Missing prompt parameter' });
      return;
    }

    console.log('Processing image generation:', { prompt, style });
    console.log('Using API key:', apiKey.substring(0, 10) + '...');

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd'
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      res.status(response.status).json({ 
        error: `OpenAI API request failed: ${response.status} ${response.statusText}` 
      });
      return;
    }

    const data = await response.json();
    console.log('OpenAI API response received successfully');
    res.status(200).json(data);
  } catch (error) {
    console.error('Error in image API:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
