// Configuration for Vision Board
export const config = {
  openai: {
    apiKey: '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',
    apiUrl: 'https://api.openai.com/v1',
    models: {
      text: 'gpt-4o',
      image: 'dall-e-3'
    }
  },
  app: {
    name: 'Vision Board Generator',
    description: 'Transform your dreams into actionable plans or visualize them with generated imagery',
    version: '1.0.0'
  }
};
