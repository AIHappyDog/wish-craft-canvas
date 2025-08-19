import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY environment variable' });
  }

  try {
    const { wish } = req.body as { wish: string };
    
    if (!wish) {
      return res.status(400).json({ error: 'Missing wish parameter' });
    }

    const prompt = `You are a professional life coach and goal-setting expert. Transform this wish into a concrete, actionable vision plan.

Wish: "${wish}"

Please provide a structured response with:
1. A clear, specific vision statement (1-2 sentences)
2. 4-5 specific, measurable milestones to achieve this goal
3. 4-5 actionable steps the person can take immediately
4. 3-4 potential challenges and practical solutions

Respond in this exact JSON format (no markdown, no code blocks):
{
  "statement": "Clear vision statement here",
  "milestones": ["Milestone 1", "Milestone 2", "Milestone 3", "Milestone 4"],
  "actions": ["Action 1", "Action 2", "Action 3", "Action 4"],
  "blockers": ["Challenge 1: Solution 1", "Challenge 2: Solution 2", "Challenge 3: Solution 3"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a professional life coach and goal-setting expert. Help users transform their wishes into concrete, actionable plans.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error:', errorText);
      return res.status(response.status).json({ 
        error: `OpenAI API request failed: ${response.status} ${response.statusText}` 
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in vision-plan API:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
}
