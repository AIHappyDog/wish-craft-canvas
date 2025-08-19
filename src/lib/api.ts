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
  // Check if we're in development or production
  private static isDevelopment = import.meta.env.DEV;
  
  static async generateVisionPlan(wish: string): Promise<VisionPlan> {
    try {
      if (this.isDevelopment) {
        // In development, return mock data
        console.log('Development mode: Using mock vision plan data');
        return this.generateMockVisionPlan(wish);
      }

      // In production, call Vercel API
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
      if (this.isDevelopment) {
        // In development, return mock image data
        console.log('Development mode: Using mock image data');
        return this.generateMockImage(prompt, style);
      }

      // In production, call Vercel API
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

  // Mock data generators for development
  private static generateMockVisionPlan(wish: string): VisionPlan {
    const mockPlans = [
      {
        statement: `Transform your wish "${wish}" into a concrete, actionable vision that you can work towards every day.`,
        milestones: [
          "Define your specific goal and timeline",
          "Break down your goal into smaller, manageable steps",
          "Create a daily action plan",
          "Track your progress and celebrate small wins",
          "Review and adjust your approach as needed"
        ],
        actions: [
          "Write down your goal in detail",
          "Create a vision board with images and affirmations",
          "Set daily reminders for your actions",
          "Find an accountability partner or mentor",
          "Schedule regular check-ins with yourself"
        ],
        blockers: [
          "Fear of failure: Start with small, low-risk actions",
          "Lack of motivation: Focus on your 'why' and the end result",
          "Time constraints: Break tasks into 15-minute chunks",
          "Perfectionism: Remember that progress beats perfection"
        ]
      },
      {
        statement: `Your wish "${wish}" is the first step towards creating the life you've always dreamed of.`,
        milestones: [
          "Visualize your desired outcome clearly",
          "Identify the key skills you need to develop",
          "Create a support network of like-minded people",
          "Establish daily habits that align with your goal",
          "Measure and celebrate your progress regularly"
        ],
        actions: [
          "Start each day by reviewing your vision",
          "Take one small action towards your goal daily",
          "Surround yourself with positive influences",
          "Practice gratitude for what you already have",
          "Learn from setbacks and keep moving forward"
        ],
        blockers: [
          "Self-doubt: Focus on your past successes",
          "Comparison: Your journey is unique to you",
          "Impatience: Trust the process and timing",
          "Distractions: Stay focused on your priorities"
        ]
      }
    ];

    // Return a random mock plan
    return mockPlans[Math.floor(Math.random() * mockPlans.length)];
  }

  private static generateMockImage(prompt: string, style: string): GeneratedImage {
    // Use Unsplash images as mock responses for development
    const mockImages = [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1024&h=1024&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1024&h=1024&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1024&h=1024&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1024&h=1024&fit=crop&crop=center"
    ];

    // Return a random mock image
    return {
      imageUrl: mockImages[Math.floor(Math.random() * mockImages.length)]
    };
  }
}
