import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Sparkles, Loader2, Palette, Download } from "lucide-react";
import { VisionBoardAPI, VisionPlan, GeneratedImage } from "@/lib/api";
import { VisionBoardManager, VisionBoardItem } from "@/lib/visionBoard";
import { useToast } from "@/hooks/use-toast";

interface VisionFormProps {
  type: "text" | "image";
  onBack: () => void;
  onOpenCanvas?: () => void;
}

export const VisionForm = ({ type, onBack, onOpenCanvas }: VisionFormProps) => {
  const [input, setInput] = useState("");
  const [style, setStyle] = useState<"cartoon" | "vivid" | "oil" | "watercolor">("vivid");
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<VisionPlan | GeneratedImage | null>(null);
  const [savedCount, setSavedCount] = useState(0);
  const [savingToBoard, setSavingToBoard] = useState(false);
  const { toast } = useToast();

  // Load saved count on component mount
  useEffect(() => {
    setSavedCount(VisionBoardManager.getItemCount());
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setResult(null);
    
    try {
      if (type === "text") {
        const visionPlan = await VisionBoardAPI.generateVisionPlan(input);
        setResult(visionPlan);
        toast({
          title: "Vision Plan Generated! ✨",
          description: "Your dream has been transformed into an actionable plan.",
        });
      } else {
        const generatedImage = await VisionBoardAPI.generateImage(input, style);
        setResult(generatedImage);
        toast({
          title: "Image Generated! 🎨",
          description: "Your scene has been brought to life with magic.",
        });
      }
    } catch (error) {
      console.error('Generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAddToBoard = async () => {
    if (!result) return;

    try {
      setSavingToBoard(true); // Add a loading state
      
      let title: string;
      let content: any;

      if (type === "text" && 'statement' in result) {
        title = result.statement.substring(0, 50) + (result.statement.length > 50 ? '...' : '');
        content = result;
      } else if (type === "image" && 'imageUrl' in result) {
        title = input.substring(0, 50) + (input.length > 50 ? '...' : '');
        
        // Convert image to base64 for permanent storage
        try {
          const response = await fetch(result.imageUrl);
          const blob = await response.blob();
          
          // Convert blob to base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          
          // Store base64 instead of external URL
          content = {
            ...result,
            imageUrl: base64, // Replace external URL with base64
            originalUrl: result.imageUrl // Keep original URL as backup
          };
          
          console.log('Image converted to base64 successfully');
        } catch (error) {
          console.error('Failed to convert image to base64, using original URL:', error);
          content = result; // Fallback to original URL if conversion fails
        }
      } else {
        return;
      }

      const newItem: Omit<VisionBoardItem, 'id' | 'createdAt'> = {
        type,
        title,
        content,
        style: type === "image" ? style : undefined
      };

      VisionBoardManager.addItem(newItem);
      setSavedCount(VisionBoardManager.getItemCount());

      toast({
        title: "Added to Vision Board! 📋",
        description: type === "text" 
          ? "Your vision plan has been saved to your board." 
          : "Your generated image has been permanently saved to your board.",
      });
      
    } catch (error) {
      console.error('Error adding to vision board:', error);
      toast({
        title: "Failed to Add to Board",
        description: "There was an error saving to your vision board. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingToBoard(false);
    }
  };

  const handleDownloadImage = async () => {
    if (type !== "image" || !result || !('imageUrl' in result)) return;

    try {
      console.log('Starting image download for:', result.imageUrl);
      
      // Method 1: Try direct download first (works for some image sources)
      try {
        const response = await fetch(result.imageUrl);
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          
          // Generate filename based on input and style
          const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 30);
          const filename = `vision-board-${sanitizedInput}-${style}.png`;
          link.download = filename;
          link.href = url;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          
          // Cleanup
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);

          toast({
            title: "Image Downloaded! 💾",
            description: `Your ${style} style image has been saved as ${filename}`,
          });
          return;
        }
      } catch (directError) {
        console.log('Direct download failed, trying canvas method:', directError);
      }

      // Method 2: Canvas method for CORS issues
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        console.log('Image loaded successfully, dimensions:', img.width, 'x', img.height);
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (!blob) {
            toast({
              title: "Download Failed",
              description: "Could not process the image for download.",
              variant: "destructive",
            });
            return;
          }
          
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          
          // Generate filename based on input and style
          const sanitizedInput = input.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 30);
          const filename = `vision-board-${sanitizedInput}-${style}.png`;
          link.download = filename;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          
          // Cleanup
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);

          toast({
            title: "Image Downloaded! 💾",
            description: `Your ${style} style image has been saved as ${filename}`,
          });
        }, 'image/png');
      };
      
      img.onerror = (error) => {
        console.error('Image load error:', error);
        toast({
          title: "Download Failed",
          description: "Could not load the image for download. Please try again.",
          variant: "destructive",
        });
      };
      
      // Set source after setting up event handlers
      img.src = result.imageUrl;
      
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-blue-50/80 p-6 rounded-2xl backdrop-blur-sm">
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
              disabled={isGenerating}
              className={`min-h-32 bg-input border-input-border text-card-foreground resize-none transition-all duration-300 ${
                isGenerating ? 'opacity-60 cursor-not-allowed' : 'hover:border-primary/50 focus:border-primary'
              }`}
            />

            {type === "image" && (
              <div className="space-y-3">
                <label className="text-sm font-medium text-card-foreground">Choose Style:</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { key: "cartoon", label: "Cartoon", icon: "🎨" },
                    { key: "vivid", label: "Vivid", icon: "✨" },
                    { key: "oil", label: "Oil Painting", icon: "🖼️" },
                    { key: "watercolor", label: "Watercolor", icon: "🎨" },
                    
                  ].map((styleOption) => (
                    <Button
                      key={styleOption.key}
                      variant={style === styleOption.key ? "default" : "outline"}
                      size="sm"
                      onClick={() => setStyle(styleOption.key as any)}
                      disabled={isGenerating}
                      className={`capitalize h-auto py-3 px-2 text-xs flex flex-col items-center gap-1 transition-transform ${
                        isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                      }`}
                    >
                      <span className="text-lg">{styleOption.icon}</span>
                      <span>{styleOption.label}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="text-center space-y-3 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="font-medium">
                    {type === "text" 
                      ? "crafting your vision plan..." 
                      : "painting your scene..."
                    }
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {type === "text" 
                    ? "This may take 10-30 seconds. Please wait while we transform your wish into actionable steps."
                    : "This may take 15-45 seconds. Please wait while we create your beautiful image."
                  }
                </p>
                
                {/* Progress bar */}
                <div className="w-full bg-primary/20 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full animate-pulse" 
                       style={{ 
                         animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                         width: '100%'
                       }} />
                </div>
                
                {/* Floating particles during generation */}
                <div className="relative h-8">
                  <div className="absolute top-0 left-1/4 w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                  <div className="absolute top-2 right-1/4 w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-4 left-1/3 w-1 h-1 bg-primary-glow rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            )}

            <Button 
              onClick={handleGenerate}
              disabled={!input.trim() || isGenerating}
              className="w-full relative overflow-hidden"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  <span className="animate-pulse">
                    {type === "text" ? "Generating Vision Plan..." : "Creating Your Image..."}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
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
              {type === "text" && 'statement' in result ? (
                <div className="space-y-8">
                  {/* Vision Statement */}
                  <div className="text-center p-6 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                    <h3 className="text-xl font-bold text-primary mb-3">✨ Your Vision Statement</h3>
                    <p className="text-lg text-card-foreground leading-relaxed max-w-3xl mx-auto">
                      {result.statement}
                    </p>
                  </div>
                  
                  {/* Action Plan Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Milestones */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-sm">🎯</span>
                        </div>
                        <h4 className="font-semibold text-blue-900">Milestones</h4>
                      </div>
                      <ul className="space-y-3">
                        {result.milestones.map((milestone: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm text-blue-800 leading-relaxed">{milestone}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Actions */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">🚀</span>
                        </div>
                        <h4 className="font-semibold text-green-900">Action Steps</h4>
                      </div>
                      <ul className="space-y-3">
                        {result.actions.map((action: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm text-green-800 leading-relaxed">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Blockers & Solutions */}
                    <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                          <span className="text-amber-600 font-bold text-sm">🛡️</span>
                        </div>
                        <h4 className="font-semibold text-amber-900">Challenges & Solutions</h4>
                      </div>
                      <ul className="space-y-3">
                        {result.blockers.map((blocker: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-sm text-amber-800 leading-relaxed">{blocker}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : type === "image" && 'imageUrl' in result ? (
                <div className="text-center space-y-4">
                  <img 
                    src={result.imageUrl} 
                    alt="Generated vision" 
                    className="mx-auto rounded-lg shadow-lg max-w-md"
                  />
                  
                  {/* Download button for images */}
                  <div className="text-center space-y-4">
                    <Button 
                      onClick={handleDownloadImage}
                      className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <Download className="h-5 w-5" />
                      Download PNG
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Click to download your generated image as a PNG file
                    </p>
                    <p className="text-xs text-muted-foreground">
                      💡 Tip: If download doesn't work, right-click the image above and select "Save image as..."
                    </p>
                  </div>
                </div>
              ) : null}
              
{/* Action Area */}
<div className="mt-12">
  <div className="grid gap-8">

    {/* Save to Vision Board card */}
    <div className="rounded-2xl border border-purple-200/40 bg-gradient-to-br from-purple-50/80 to-indigo-50/80 p-6 backdrop-blur-sm supports-[backdrop-filter]:bg-gradient-to-br from-purple-50/60 to-indigo-50/60 transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold tracking-tight">Save to Your Vision Board Canvas</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Add this {type === "text" ? "vision plan" : "generated image"} to your collection.
          </p>
        </div>

        {savedCount > 0 && (
          <span
            className="inline-flex items-center rounded-full border border-purple-300 px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 shadow-sm"
            aria-live="polite"
          >
            ✨ {savedCount} saved ✨
          </span>
        )}
      </div>

      <div className="mt-5">
        <Button
          onClick={handleAddToBoard}
          disabled={savingToBoard}
          className={`w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform ${
            savingToBoard ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {savingToBoard ? (
            <>
              <div className="h-6 w-6 mr-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Converting & Saving...
            </>
          ) : (
            '✨ Add to Vision Board Canvas ✨'
          )}
        </Button>
      </div>
    </div>

    {/* Generate Another */}
    <div className="flex justify-center">
      <Button
        onClick={() => setResult(null)}
        className="px-10 py-4 text-base font-semibold bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
      >
        🔄 Generate Another
      </Button>
    </div>
  </div>
</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};