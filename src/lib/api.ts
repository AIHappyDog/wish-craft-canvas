// Vision Board API service using Vercel serverless functions
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
  static async generateVisionPlan(wish: string): Promise<VisionPlan> {
    try {
      const response = await fetch('/api/vision-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wish })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
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
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          style
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.data && data.data[0]?.url) {
        return {
          imageUrl: data.data[0].url
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
