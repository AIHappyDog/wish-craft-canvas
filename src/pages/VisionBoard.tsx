import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Trash2, Eye, Calendar, Sparkles, Image as ImageIcon, Download } from "lucide-react";
import { VisionBoardManager, VisionBoardItem } from "@/lib/visionBoard";
import { useToast } from "@/hooks/use-toast";

const VisionBoard = () => {
  const [items, setItems] = useState<VisionBoardItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<VisionBoardItem | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = () => {
    const savedItems = VisionBoardManager.getAllItems();
    setItems(savedItems);
  };

  const handleDeleteItem = (id: string) => {
    if (VisionBoardManager.removeItem(id)) {
      loadItems();
      toast({
        title: "Item Removed",
        description: "The item has been removed from your vision board.",
      });
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all items from your vision board?")) {
      VisionBoardManager.clearAll();
      loadItems();
      toast({
        title: "Vision Board Cleared",
        description: "All items have been removed from your vision board.",
      });
    }
  };

  const handleDownloadImage = async (item: VisionBoardItem) => {
    if (item.type !== "image" || !('imageUrl' in item.content)) return;

    try {
      // Create a canvas to handle CORS issues
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
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
          
          // Generate filename based on title and style
          const sanitizedTitle = item.title.replace(/[^a-zA-Z0-9\s]/g, '').substring(0, 30);
          const style = item.style || 'unknown';
          const filename = `vision-board-${sanitizedTitle}-${style}.png`;
          link.download = filename;
          
          // Trigger download
          document.body.appendChild(link);
          link.click();
          
          // Cleanup
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          toast({
            title: "Image Downloaded! 💾",
            description: `Your ${style} style image has been saved as ${filename}`,
          });
        }, 'image/png');
      };
      
      img.onerror = () => {
        toast({
          title: "Download Failed",
          description: "Could not load the image for download. Please try again.",
          variant: "destructive",
        });
      };
      
      // Set source after setting up event handlers
      img.src = item.content.imageUrl;
      
    } catch (error) {
      console.error('Error downloading image:', error);
      toast({
        title: "Download Failed",
        description: "There was an error downloading the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (selectedItem) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 p-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedItem(null)}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Vision Board
        </Button>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {selectedItem.type === "text" ? (
                <Sparkles className="h-5 w-5 text-primary" />
              ) : (
                <ImageIcon className="h-5 w-5 text-accent" />
              )}
              <h2 className="text-xl font-semibold">{selectedItem.title}</h2>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(selectedItem.createdAt)}
              </div>
              {selectedItem.style && (
                <span className="capitalize">Style: {selectedItem.style}</span>
              )}
            </div>

            {selectedItem.type === "text" ? (
              <div className="space-y-6">
                {/* Vision Statement */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                  <h3 className="text-lg font-bold text-primary mb-2">✨ Vision Statement</h3>
                  <p className="text-card-foreground leading-relaxed">
                    {selectedItem.content.statement}
                  </p>
                </div>
                
                {/* Action Plan Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Milestones */}
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600 text-sm">🎯</span>
                      <h4 className="font-medium text-blue-900 text-sm">Milestones</h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedItem.content.milestones.map((milestone: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="text-xs text-blue-800 leading-relaxed">{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Actions */}
                  <div className="p-3 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-600 text-sm">🚀</span>
                      <h4 className="font-medium text-green-900 text-sm">Action Steps</h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedItem.content.actions.map((action: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="text-xs text-green-800 leading-relaxed">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Blockers & Solutions */}
                  <div className="p-3 rounded-lg bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-amber-600 text-sm">🛡️</span>
                      <h4 className="font-medium text-amber-900 text-sm">Challenges & Solutions</h4>
                    </div>
                    <ul className="space-y-2">
                      {selectedItem.content.blockers.map((blocker: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          <span className="text-xs text-amber-800 leading-relaxed">{blocker}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <img 
                  src={selectedItem.content.imageUrl} 
                  alt={selectedItem.title}
                  className="mx-auto rounded-lg shadow-lg max-w-md"
                />
                
                {/* Download button for saved images */}
                <Button 
                  onClick={() => handleDownloadImage(selectedItem)}
                  variant="outline"
                  className="gap-2 hover:bg-accent hover:text-accent-foreground"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Navigation />
      <div className="max-w-6xl mx-auto space-y-6 p-6 pt-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground">My Vision Board</h1>
          <p className="text-muted-foreground mt-2">
            Your collection of dreams, goals, and visual inspirations
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleClearAll}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-card-foreground">Your Vision Board is Empty</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Start by generating some vision plans or images. They'll appear here for you to review and track your progress.
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card 
              key={item.id} 
              className="p-4 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedItem(item)}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {item.type === "text" ? (
                      <Sparkles className="h-4 w-4 text-primary" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-accent" />
                    )}
                    <span className="text-xs text-muted-foreground capitalize">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.type === "image" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-accent hover:text-accent-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownloadImage(item);
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteItem(item.id);
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <h3 className="font-medium text-card-foreground line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatDate(item.createdAt)}</span>
                  {item.style && (
                    <span className="capitalize">{item.style}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-xs text-primary">
                  <Eye className="h-3 w-3" />
                  Click to view details
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      </div>
      <Footer />
    </div>
  );
};

export default VisionBoard;
