import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Lightbulb, Sparkles, Image as ImageIcon, Type, Move, RotateCcw, Maximize2 } from "lucide-react";

interface VisionBoardTipsProps {
  onClose: () => void;
}

export const VisionBoardTips = ({ onClose }: VisionBoardTipsProps) => {
  const samples = [
    {
      id: 1,
      image: '/samplegraph/sample1.png',
      title: "Goal-Oriented Vision Board",
      description: "Focus on specific life goals with clear milestones and inspirational imagery."
    },
    {
      id: 2,
      image: '/samplegraph/sample2.png',
      title: "Lifestyle & Wellness Board",
      description: "Combine health goals, personal growth, and lifestyle aspirations in one board."
    },
    {
      id: 3,
      image: '/samplegraph/sample3.png',
      title: "Career & Success Vision",
      description: "Visualize professional achievements, skills development, and career milestones."
    },
    {
      id: 4,
      image: '/samplegraph/sample4.png',
      title: "Dream Life Collage",
      description: "Mix of personal dreams, travel goals, and life aspirations in a creative layout."
    }
  ];

  const tips = [
    {
      icon: <ImageIcon className="h-5 w-5" />,
      title: "Add Images",
      description: "Use AI-generated images or upload your own photos to represent your goals visually."
    },
    {
      icon: <Type className="h-5 w-5" />,
      title: "Write Inspirational Text",
      description: "Add quotes, affirmations, or personal messages that motivate and inspire you."
    },
    {
      icon: <Move className="h-5 w-5" />,
      title: "Arrange Freely",
      description: "Drag items around the canvas to create your perfect layout and composition."
    },
    {
      icon: <RotateCcw className="h-5 w-5" />,
      title: "Rotate & Resize",
      description: "Turn items and adjust sizes to create dynamic, interesting arrangements."
    }
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Vision Board Creation Tips</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sample Vision Boards */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">Sample Vision Boards</h3>
            <p className="text-muted-foreground mb-4">
              Get inspired by these examples of different vision board styles and themes.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {samples.map((sample) => (
                <div key={sample.id} className="space-y-2">
                  <div className="relative group">
                    <img
                      src={sample.image}
                      alt={sample.title}
                      className="w-full h-32 object-cover rounded-lg border-2 border-border hover:border-primary transition-colors cursor-pointer"
                      onClick={() => window.open(sample.image, '_blank')}
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button size="sm" variant="secondary">
                        View Full Size
                      </Button>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{sample.title}</h4>
                    <p className="text-xs text-muted-foreground">{sample.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Creation Tips */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary">How to Create Your Vision Board</h3>
            <p className="text-muted-foreground mb-4">
              Follow these steps to build your perfect vision board and manifest your dreams.
            </p>
            
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-card-foreground">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Start Guide */}
            <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
              <h4 className="font-semibold text-accent-foreground mb-2">Quick Start Guide</h4>
              <ol className="text-sm text-muted-foreground space-y-1">
                <li>1. <strong>Generate Content:</strong> Use AI to create vision plans and images</li>
                <li>2. <strong>Add Custom Text:</strong> Write your own inspirational messages</li>
                <li>3. <strong>Arrange Items:</strong> Drag and position everything on your canvas</li>
                <li>4. <strong>Customize:</strong> Rotate, resize, and style your elements</li>
                <li>5. <strong>Save & Share:</strong> Export your completed vision board</li>
              </ol>
            </div>

            {/* Pro Tips */}
            <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Pro Tips
              </h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Use contrasting colors to make text stand out</li>
                <li>• Group related goals together for better organization</li>
                <li>• Add personal photos alongside AI-generated content</li>
                <li>• Include both short-term and long-term goals</li>
                <li>• Make it visually appealing - you'll look at it daily!</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={onClose} size="lg" className="bg-gradient-to-r from-primary to-accent text-white border-0">
            <Sparkles className="h-4 w-4 mr-2" />
            Start Creating My Vision Board
          </Button>
        </div>
      </Card>
    </div>
  );
};
