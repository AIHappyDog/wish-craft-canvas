import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Loader2 } from "lucide-react";

interface VisionFormProps {
  type: "text" | "image";
  onBack: () => void;
}

export const VisionForm = ({ type, onBack }: VisionFormProps) => {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState<"cartoon" | "vivid" | "oil">("vivid");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // TODO: Implement API calls after Supabase integration
    setTimeout(() => {
      if (type === "text") {
        setResult({
          statement: "I will complete a marathon within 6 months by running consistently 4 times per week.",
          milestones: [
            "Complete 5K run without stopping",
            "Build up to 10K distance",
            "Complete a half marathon",
            "Successfully finish full marathon"
          ],
          actions: [
            "Create weekly running schedule",
            "Buy proper running shoes",
            "Find local running group",
            "Track progress with app"
          ],
          blockers: [
            "Weather conditions - have indoor backup plan",
            "Injury risk - include proper warmup/cooldown",
            "Time constraints - schedule runs early morning"
          ]
        });
      } else {
        setResult({
          imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
        });
      }
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>

      <Card className="glass-card border-card-border p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-card-foreground mb-2">
              {type === "text" ? "Transform Your Big Wish" : "Visualize Your Scene"}
            </h1>
            <p className="text-muted-foreground">
              {type === "text" 
                ? "Turn your ambitious dream into a concrete, actionable plan"
                : "Generate a beautiful image from your imagination"
              }
            </p>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder={type === "text" 
                ? "Describe your big wish or goal... (e.g., 'I want to be healthier and more fit')"
                : "Describe the scene you want to visualize... (e.g., 'A peaceful mountain sunrise with a cozy cabin')"
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-32 bg-input border-input-border text-card-foreground resize-none"
            />

            {type === "image" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-card-foreground">Choose Style:</label>
                <div className="flex gap-3">
                  {["cartoon", "vivid", "oil"].map((styleOption) => (
                    <Button
                      key={styleOption}
                      variant={style === styleOption ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStyle(styleOption as any)}
                      className="capitalize"
                    >
                      {styleOption}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="w-full"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate {type === "text" ? "Vision Plan" : "Image"}
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="border-t border-card-border pt-6">
              {type === "text" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">Vision Statement</h3>
                    <p className="text-muted-foreground italic">{result.statement}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">Milestones</h4>
                      <ul className="space-y-2">
                        {result.milestones.map((milestone: string, i: number) => (
                          <li key={i} className="text-sm text-muted-foreground">• {milestone}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">Actions</h4>
                      <ul className="space-y-2">
                        {result.actions.map((action: string, i: number) => (
                          <li key={i} className="text-sm text-muted-foreground">• {action}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-card-foreground mb-3">Blockers & Solutions</h4>
                      <ul className="space-y-2">
                        {result.blockers.map((blocker: string, i: number) => (
                          <li key={i} className="text-sm text-muted-foreground">• {blocker}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <img 
                    src={result.imageUrl} 
                    alt="Generated vision" 
                    className="mx-auto rounded-lg shadow-lg max-w-md"
                  />
                </div>
              )}
              
              <div className="flex gap-3 mt-6">
                <Button variant="vision" className="flex-1">
                  Add to Board
                </Button>
                <Button variant="outline" onClick={() => setResult(null)}>
                  Generate Another
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};