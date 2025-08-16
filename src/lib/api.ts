// OpenAI API service for Vision Board
import { config } from './config';

export interface VisionPlan {
  statement: string;
  milestones: string[];
  actions: string[];
  blockers: string[];
}

export interface GeneratedImage {
  imageUrl: string;
}

export class VisionBoardAPI {
  private static async makeRequest(endpoint: string, options: RequestInit = {}) {
    console.log('Making API request to:', `${config.openai.apiUrl}${endpoint}`);
    console.log('Request options:', options);
    
    const response = await fetch(`${config.openai.apiUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${config.openai.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  static async generateVisionPlan(wish: string): Promise<VisionPlan> {
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

    try {
      const response = await this.makeRequest('/chat/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: config.openai.models.text,
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

      const content = response.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response content from API');
      }

      console.log('Raw API response:', content);

      // Clean the content - remove markdown code blocks if present
      let cleanContent = content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Try to parse JSON from the cleaned response
      try {
        const parsed = JSON.parse(cleanContent);
        console.log('Parsed JSON:', parsed);
        
        // Validate and clean the parsed data
        const result = {
          statement: parsed.statement || 'Vision statement not generated',
          milestones: Array.isArray(parsed.milestones) ? parsed.milestones : [],
          actions: Array.isArray(parsed.actions) ? parsed.actions : [],
          blockers: Array.isArray(parsed.blockers) ? parsed.blockers : []
        };

        // Ensure we have at least some content
        if (!result.statement || result.statement === 'Vision statement not generated') {
          throw new Error('Invalid response format');
        }

        return result;
      } catch (parseError) {
        console.log('JSON parsing failed, trying fallback extraction');
        
        // Fallback: extract information from text response
        const lines = content.split('\n').filter(line => line.trim());
        
        // Look for structured content patterns
        const statement = lines.find(line => line.includes('vision') || line.includes('goal') || line.includes('wish')) || lines[0] || 'Vision statement not generated';
        
        const milestones = lines
          .filter(line => line.includes('milestone') || line.includes('Milestone') || line.match(/^\d+\./))
          .slice(0, 4)
          .map(line => line.replace(/^\d+\.\s*/, '').trim());
        
        const actions = lines
          .filter(line => line.includes('action') || line.includes('Action') || line.includes('step') || line.includes('Step'))
          .slice(0, 4)
          .map(line => line.replace(/^\d+\.\s*/, '').trim());
        
        const blockers = lines
          .filter(line => line.includes('blocker') || line.includes('Blocker') || line.includes('challenge') || line.includes('Challenge'))
          .slice(0, 3)
          .map(line => line.replace(/^\d+\.\s*/, '').trim());

        return {
          statement,
          milestones: milestones.length > 0 ? milestones : ['Milestone details not available'],
          actions: actions.length > 0 ? actions : ['Action steps not available'],
          blockers: blockers.length > 0 ? blockers : ['Challenge details not available']
        };
      }
    } catch (error) {
      console.error('Error generating vision plan:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        if (error.message.includes('API request failed')) {
          throw new Error('API request failed. Please check your internet connection and try again.');
        }
      }
      throw new Error('Failed to generate vision plan. Please try again.');
    }
  }

  static async generateImage(prompt: string, style: 'cartoon' | 'vivid' | 'oil' | 'watercolor' | 'digital-art' | 'fantasy' | 'minimalist' | 'retro'): Promise<GeneratedImage> {
    const stylePrompts = {
      cartoon: 'in a colorful, whimsical cartoon style',
      vivid: 'in a vibrant, high-contrast, photorealistic style',
      oil: 'in a beautiful oil painting style with rich textures and artistic brushstrokes',
      watercolor: 'in a soft, flowing watercolor painting style with gentle washes and transparency',
      'digital-art': 'in a modern digital art style with clean lines and vibrant colors',
      fantasy: 'in a magical fantasy art style with ethereal lighting and mystical elements',
      minimalist: 'in a clean, minimalist style with simple shapes and limited color palette',
      retro: 'in a vintage retro style with nostalgic colors and classic design elements'
    };

    const fullPrompt = `${prompt}, ${stylePrompts[style]}, high quality, inspiring, magical`;

    try {
      const response = await this.makeRequest('/images/generations', {
        method: 'POST',
        body: JSON.stringify({
          model: config.openai.models.image,
          prompt: fullPrompt,
          n: 1,
          size: '1024x1024',
          quality: 'hd'
        })
      });

      if (response.data && response.data[0]?.url) {
        return {
          imageUrl: response.data[0].url
        };
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        if (error.message.includes('API request failed')) {
          throw new Error('API request failed. Please check your internet connection and try again.');
        }
      }
      throw new Error('Failed to generate image. Please try again.');
    }
  }
}
