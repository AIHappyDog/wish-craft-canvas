import React, { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Move, 
  Trash2, 
  Download, 
  Save, 
  RotateCcw, 
  Plus,
  Sparkles,
  Image as ImageIcon,
  GripVertical,
  Palette,
  Type,
  ImagePlus,
  X,
  Edit3,
  Check,
  Minus,
  Maximize2,
  Lightbulb
} from "lucide-react";
import { VisionBoardManager, VisionBoardItem } from "@/lib/visionBoard";
import { VisionBoardTips } from "./VisionBoardTips";
import { useToast } from "@/hooks/use-toast";

interface CanvasItem {
  id: string;
  type: 'text' | 'image';
  content: any;
  style?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  isSelected: boolean;
  title: string;
  createdAt: Date;
  isEditing?: boolean;
  customText?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
}

interface VisionBoardCanvasProps {
  onClose: () => void;
}

export const VisionBoardCanvas = ({ onClose }: VisionBoardCanvasProps) => {
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeData, setResizeData] = useState({ itemId: '', corner: '', startSize: { width: 0, height: 0 }, startPos: { x: 0, y: 0 } });
  const [canvasSize, setCanvasSize] = useState({ width: 1200, height: 800 });
  const [zoom, setZoom] = useState(1);
  const [showAddPanel, setShowAddPanel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'text' | 'image'>('all');
  const [canvasTheme, setCanvasTheme] = useState<'light' | 'dark' | 'magical'>('magical');
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textStyle, setTextStyle] = useState({
    fontSize: 24,
    fontColor: '#000000',
    backgroundColor: 'transparent'
  });
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadSavedItems();
    loadCanvasState();
  }, []);

  const loadSavedItems = () => {
    const savedItems = VisionBoardManager.getAllItems();
    console.log('Loading saved items:', savedItems);
    
    const canvasItems: CanvasItem[] = savedItems.map((item, index) => ({
      id: item.id,
      type: item.type,
      content: item.content,
      style: item.style,
      x: 50 + (index % 3) * 300,
      y: 50 + Math.floor(index / 3) * 250,
      width: item.type === 'image' ? 200 : 280,
      height: item.type === 'image' ? 200 : 150,
      rotation: 0,
      zIndex: index,
      isSelected: false,
      title: item.title,
      createdAt: item.createdAt
    }));
    
    console.log('Created canvas items:', canvasItems);
    setItems(canvasItems);
  };

  const loadCanvasState = () => {
    const saved = localStorage.getItem('vision-board-canvas-state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        setItems(state.items || []);
        setCanvasSize(state.canvasSize || { width: 1200, height: 800 });
        setZoom(state.zoom || 1);
        setCanvasTheme(state.theme || 'magical');
      } catch (error) {
        console.error('Error loading canvas state:', error);
      }
    }
  };

  const saveCanvasState = () => {
    const state = {
      items,
      canvasSize,
      zoom,
      theme: canvasTheme
    };
    localStorage.setItem('vision-board-canvas-state', JSON.stringify(state));
    toast({
      title: "Canvas Saved! 💾",
      description: "Your vision board layout has been saved.",
    });
  };

  const handleMouseDown = (e: React.MouseEvent, itemId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    setSelectedItem(itemId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - item.x,
      y: e.clientY - rect.top - item.y
    });

    // Bring item to front
    setItems(prev => prev.map(i => ({
      ...i,
      zIndex: i.id === itemId ? Math.max(...prev.map(item => item.zIndex)) + 1 : i.zIndex
    })));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (isDragging && selectedItem) {
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;

      setItems(prev => prev.map(item =>
        item.id === selectedItem
          ? { 
              ...item, 
              x: Math.max(0, Math.min(newX, canvasSize.width - item.width)), 
              y: Math.max(0, Math.min(newY, canvasSize.height - item.height)) 
            }
          : item
      ));
    } else if (isResizing && resizeData.itemId) {
      const deltaX = e.clientX - rect.left - resizeData.startPos.x;
      const deltaY = e.clientY - rect.top - resizeData.startPos.y;
      
      if (resizeData.corner === 'se') {
        handleResize(resizeData.itemId, 'width', deltaX, 'se');
        handleResize(resizeData.itemId, 'height', deltaY, 'se');
      } else if (resizeData.corner === 'sw') {
        handleResize(resizeData.itemId, 'width', -deltaX, 'sw');
        handleResize(resizeData.itemId, 'height', deltaY, 'sw');
      } else if (resizeData.corner === 'ne') {
        handleResize(resizeData.itemId, 'width', deltaX, 'ne');
        handleResize(resizeData.itemId, 'height', -deltaY, 'ne');
      } else if (resizeData.corner === 'nw') {
        handleResize(resizeData.itemId, 'width', -deltaX, 'nw');
        handleResize(resizeData.itemId, 'height', -deltaY, 'nw');
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setSelectedItem(null);
    setResizeData({ itemId: '', corner: '', startSize: { width: 0, height: 0 }, startPos: { x: 0, y: 0 } });
  };

  const handleRotate = (itemId: string, direction: 'left' | 'right') => {
    setItems(prev => prev.map(item =>
      item.id === itemId
        ? { ...item, rotation: item.rotation + (direction === 'left' ? -15 : 15) }
        : item
    ));
  };

  const handleResize = (itemId: string, direction: 'width' | 'height', delta: number, corner: 'se' | 'sw' | 'ne' | 'nw') => {
    setItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      
      let newWidth = item.width;
      let newHeight = item.height;
      let newX = item.x;
      let newY = item.y;
      
      if (corner === 'se') {
        newWidth = Math.max(100, Math.min(500, item.width + delta));
        newHeight = Math.max(100, Math.min(500, item.height + delta));
      } else if (corner === 'sw') {
        newWidth = Math.max(100, Math.min(500, item.width - delta));
        newHeight = Math.max(100, Math.min(500, item.height + delta));
        newX = item.x + (item.width - newWidth);
      } else if (corner === 'ne') {
        newWidth = Math.max(100, Math.min(500, item.width + delta));
        newHeight = Math.max(100, Math.min(500, item.height - delta));
        newY = item.y + (item.height - newHeight);
      } else if (corner === 'nw') {
        newWidth = Math.max(100, Math.min(500, item.width - delta));
        newHeight = Math.max(100, Math.min(500, item.height - delta));
        newX = item.x + (item.width - newWidth);
        newY = item.y + (item.height - newHeight);
      }
      
      return {
        ...item,
        width: newWidth,
        height: newHeight,
        x: Math.max(0, Math.min(newX, canvasSize.width - newWidth)),
        y: Math.max(0, Math.min(newY, canvasSize.height - newHeight))
      };
    }));
  };

  const handleDelete = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your canvas.",
    });
  };

  const addItemToCanvas = (item: VisionBoardItem) => {
    const newCanvasItem: CanvasItem = {
      id: item.id,
      type: item.type,
      content: item.content,
      style: item.style,
      x: Math.random() * (canvasSize.width - 200),
      y: Math.random() * (canvasSize.height - 200),
      width: item.type === 'image' ? 200 : 280,
      height: item.type === 'image' ? 200 : 150,
      rotation: Math.random() * 30 - 15,
      zIndex: Math.max(...items.map(i => i.zIndex), 0) + 1,
      isSelected: false,
      title: item.title,
      createdAt: item.createdAt
    };

    setItems(prev => [...prev, newCanvasItem]);
    setShowAddPanel(false);
    toast({
      title: "Item Added! ✨",
      description: "Item has been added to your canvas.",
    });
  };

  const addCustomText = () => {
    if (!textInput.trim()) return;

    const newTextItem: CanvasItem = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: { statement: textInput },
      x: Math.random() * (canvasSize.width - 200),
      y: Math.random() * (canvasSize.height - 100),
      width: Math.max(200, textInput.length * 12),
      height: 80,
      rotation: Math.random() * 20 - 10,
      zIndex: Math.max(...items.map(i => i.zIndex), 0) + 1,
      isSelected: false,
      title: textInput.substring(0, 30),
      createdAt: new Date(),
      customText: textInput,
      fontSize: textStyle.fontSize,
      fontColor: textStyle.fontColor,
      backgroundColor: textStyle.backgroundColor
    };

    setItems(prev => [...prev, newTextItem]);
    setTextInput('');
    setShowTextEditor(false);
    toast({
      title: "Text Added! ✍️",
      description: "Your custom text has been added to the canvas.",
    });
  };

  const toggleTextEdit = (itemId: string) => {
    setItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isEditing: !item.isEditing } : item
    ));
  };

  const updateTextContent = (itemId: string, newText: string) => {
    setItems(prev => prev.map(item =>
      item.id === itemId 
        ? { 
            ...item, 
            customText: newText, 
            width: Math.max(200, newText.length * 12),
            title: newText.substring(0, 30)
          } 
        : item
    ));
  };

  const exportCanvas = async () => {
    console.log('Starting canvas export...');
    console.log('Canvas items:', items);
    console.log('Canvas size:', canvasSize);
    console.log('Canvas theme:', canvasTheme);
    
    try {
      // Method 1: Try to capture the actual rendered canvas using html2canvas
      console.log('Attempting to capture actual canvas content...');
      
      const canvasElement = canvasRef.current;
      if (!canvasElement) {
        throw new Error('Canvas element not found');
      }

      // Create a temporary container with the actual canvas content
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      tempContainer.style.width = `${canvasSize.width}px`;
      tempContainer.style.height = `${canvasSize.height}px`;
      tempContainer.style.overflow = 'hidden';
      tempContainer.style.background = canvasTheme === 'magical' 
        ? 'linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 50%, #f0f9ff 100%)'
        : canvasTheme === 'dark' ? '#1f2937' : '#ffffff';
      
      // Clone the canvas content and remove zoom transform
      const clonedCanvas = canvasElement.cloneNode(true) as HTMLElement;
      clonedCanvas.style.transform = 'none';
      clonedCanvas.style.position = 'relative';
      clonedCanvas.style.width = `${canvasSize.width}px`;
      clonedCanvas.style.height = `${canvasSize.height}px`;
      
      tempContainer.appendChild(clonedCanvas);
      document.body.appendChild(tempContainer);

      console.log('Temporary container created, attempting html2canvas capture...');

      // Use html2canvas to capture the actual content
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(tempContainer, {
        width: canvasSize.width,
        height: canvasSize.height,
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        removeContainer: true
      });

      // Clean up
      document.body.removeChild(tempContainer);
      console.log('html2canvas capture successful');

      // Download the captured canvas
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Could not generate blob from captured content');
        }
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = `vision-board-export-${new Date().toISOString().slice(0, 10)}.png`;
        link.download = filename;
        link.href = url;
        
        console.log('Download link created for captured content:', { filename, blobSize: blob.size });
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          console.log('Download link cleaned up');
        }, 100);

        toast({
          title: "Canvas Exported! 📤",
          description: `Your vision board has been exported with actual content.`,
        });
      }, 'image/png');
      
    } catch (error) {
      console.error('html2canvas export failed:', error);
      console.log('Falling back to manual rendering...');
      
      // Method 2: Fallback to manual canvas rendering with better item positioning
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');

        canvas.width = canvasSize.width;
        canvas.height = canvasSize.height;
        console.log('Created fallback canvas with dimensions:', canvas.width, 'x', canvas.height);

        // Set background
        if (canvasTheme === 'magical') {
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#f0f4ff');
          gradient.addColorStop(0.5, '#fdf2f8');
          gradient.addColorStop(1, '#f0f9ff');
          ctx.fillStyle = gradient;
        } else if (canvasTheme === 'dark') {
          ctx.fillStyle = '#1f2937';
        } else {
          ctx.fillStyle = '#ffffff';
        }
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render items with better positioning
        console.log('Rendering', items.length, 'items in fallback mode...');
        for (const item of items) {
          console.log('Rendering fallback item:', item);
          ctx.save();
          ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
          ctx.rotate((item.rotation * Math.PI) / 180);
          
          if (item.type === 'text') {
            // Render text items with better styling
            ctx.fillStyle = item.fontColor || '#000000';
            ctx.font = `bold ${item.fontSize || 24}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const text = item.customText || item.content.statement || item.title;
            const lines = text.split('\n');
            const lineHeight = (item.fontSize || 24) * 1.2;
            
            lines.forEach((line, index) => {
              const y = (index - (lines.length - 1) / 2) * lineHeight;
              ctx.fillText(line, 0, y);
            });
          } else if (item.type === 'image' && item.content.imageUrl) {
            // Try to load and render actual images
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            try {
              await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = () => reject(new Error('Image failed to load'));
                img.src = item.content.imageUrl;
                setTimeout(() => reject(new Error('Image load timeout')), 3000);
              });
              
              ctx.drawImage(
                img, 
                -item.width / 2, 
                -item.height / 2, 
                item.width, 
                item.height
              );
              console.log('Image rendered successfully:', item.title);
            } catch (imgError) {
              console.error('Image rendering failed:', imgError);
              // Draw a better placeholder
              ctx.fillStyle = '#e5e7eb';
              ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
              ctx.strokeStyle = '#9ca3af';
              ctx.lineWidth = 2;
              ctx.strokeRect(-item.width / 2, -item.height / 2, item.width, item.height);
              
              ctx.fillStyle = '#6b7280';
              ctx.font = '14px Arial';
              ctx.textAlign = 'center';
              ctx.fillText('Image', 0, -10);
              ctx.fillText('Placeholder', 0, 10);
            }
          }
          
          ctx.restore();
        }

        // Add export info
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Vision Board Export', canvas.width / 2, 40);
        
        if (items.length > 0) {
          ctx.font = '16px Arial';
          ctx.fillText(`Contains ${items.length} items`, canvas.width / 2, 70);
        } else {
          ctx.font = '16px Arial';
          ctx.fillText('No items to export', canvas.width / 2, 70);
          ctx.fillText('Add some items to your canvas first!', canvas.width / 2, 100);
        }

        console.log('Fallback canvas rendering complete, creating download...');
        
        // Create download link
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        const filename = `vision-board-export-fallback-${new Date().toISOString().slice(0, 10)}.png`;
        link.download = filename;
        link.href = dataURL;
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);

        toast({
          title: "Canvas Exported (Fallback)! 📤",
          description: `Your vision board has been exported with ${items.length} items.`,
        });
        
      } catch (fallbackError) {
        console.error('Fallback export failed:', fallbackError);
        toast({
          title: "Export Failed",
          description: `All export methods failed. Please try again later.`,
          variant: "destructive",
        });
      }
    }
  };

  const filteredItems = VisionBoardManager.getAllItems().filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onClose} size="sm">
            ← Back
          </Button>
          <h1 className="text-2xl font-bold">Vision Board Canvas</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setShowTips(true)}>
            <Lightbulb className="h-4 w-4 mr-2" />
            Tips & Examples
          </Button>
          <Button variant="outline" onClick={() => setShowTextEditor(!showTextEditor)}>
            <Type className="h-4 w-4 mr-2" />
            Add Text
          </Button>
          <Button variant="outline" onClick={() => setShowAddPanel(!showAddPanel)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Items
          </Button>
          <Button variant="outline" onClick={saveCanvasState}>
            <Save className="h-4 w-4 mr-2" />
            Save Layout
          </Button>
          <Button variant="outline" onClick={exportCanvas}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              console.log('Test export clicked');
              console.log('Current items:', items);
              console.log('Canvas ref:', canvasRef.current);
            }}
          >
            Test
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Text Editor Panel */}
        {showTextEditor && (
          <div className="w-80 border-r border-border bg-card p-4 space-y-4">
            <h3 className="font-semibold">Add Custom Text</h3>
            
            <div className="space-y-3">
              <Textarea
                placeholder="Enter your text here..."
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="min-h-24"
              />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Font Size</label>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setTextStyle(prev => ({ ...prev, fontSize: Math.max(12, prev.fontSize - 2) }))}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-2 py-1 bg-muted rounded text-sm min-w-[3rem] text-center">
                    {textStyle.fontSize}px
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setTextStyle(prev => ({ ...prev, fontSize: Math.min(72, prev.fontSize + 2) }))}
                  >
                    <Maximize2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Color</label>
                <div className="flex gap-2">
                  {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map(color => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        textStyle.fontColor === color ? 'border-primary' : 'border-border'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setTextStyle(prev => ({ ...prev, fontColor: color }))}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Background</label>
                <div className="flex gap-2">
                  <button
                    className={`px-3 py-1 rounded text-sm border ${
                      textStyle.backgroundColor === 'transparent' ? 'border-primary bg-primary text-primary-foreground' : 'border-border'
                    }`}
                    onClick={() => setTextStyle(prev => ({ ...prev, backgroundColor: 'transparent' }))}
                  >
                    None
                  </button>
                  {['#ffffff', '#ffeb3b', '#ff9800', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#4caf50'].map(color => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        textStyle.backgroundColor === color ? 'border-primary' : 'border-border'
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setTextStyle(prev => ({ ...prev, backgroundColor: color }))}
                    />
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={addCustomText}
                disabled={!textInput.trim()}
                className="w-full"
              >
                Add Text to Canvas
              </Button>
            </div>
          </div>
        )}

        {/* Add Items Panel */}
        {showAddPanel && (
          <div className="w-80 border-r border-border bg-card p-4 space-y-4">
            <h3 className="font-semibold">Add Items to Canvas</h3>
            
            {/* Search and Filter */}
            <Input
              placeholder="Search saved items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="flex gap-2">
              {(['all', 'text', 'image'] as const).map(type => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterType(type)}
                  className="capitalize"
                >
                  {type === 'all' ? 'All' : type === 'text' ? <Sparkles className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                </Button>
              ))}
            </div>

            {/* Items List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredItems.map(item => (
                <Card
                  key={item.id}
                  className="p-3 cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => addItemToCanvas(item)}
                >
                  <div className="flex items-center gap-2">
                    {item.type === 'text' ? (
                      <Sparkles className="h-4 w-4 text-primary" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-accent" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Canvas Area */}
        <div className="flex-1 relative overflow-hidden">
          <div
            ref={canvasRef}
            className="relative w-full h-full"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left'
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Canvas Background */}
            <div
              className="absolute inset-0 border-2 border-dashed border-border/50 rounded-lg"
              style={{
                width: canvasSize.width,
                height: canvasSize.height,
                background: canvasTheme === 'magical' 
                  ? 'linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 50%, #f0f9ff 100%)'
                  : canvasTheme === 'dark' ? '#1f2937' : '#ffffff'
              }}
            />

            {/* Canvas Items */}
            {items.map(item => (
              <div
                key={item.id}
                className={`absolute cursor-move select-none ${
                  item.isSelected ? 'ring-2 ring-primary ring-offset-2' : ''
                }`}
                style={{
                  left: item.x,
                  top: item.y,
                  width: item.width,
                  height: item.height,
                  transform: `rotate(${item.rotation}deg)`,
                  zIndex: item.zIndex
                }}
                onMouseDown={(e) => handleMouseDown(e, item.id)}
              >
                {/* Image Items */}
                {item.type === "image" && (
                  <div className="relative w-full h-full group">
                    <img
                      src={item.content.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg shadow-lg"
                      draggable={false}
                    />
                    
                    {/* Image Controls */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRotate(item.id, 'left');
                        }}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Resize Handles */}
                    <div 
                      className="absolute bottom-2 right-2 w-4 h-4 bg-white/90 rounded-full cursor-se-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'se',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                    <div 
                      className="absolute bottom-2 left-2 w-4 h-4 bg-white/90 rounded-full cursor-sw-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'sw',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                    <div 
                      className="absolute top-2 right-2 w-4 h-4 bg-white/90 rounded-full cursor-ne-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'ne',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                    <div 
                      className="absolute top-2 left-2 w-4 h-4 bg-white/90 rounded-full cursor-nw-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'nw',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                  </div>
                )}

                {/* Text Items */}
                {item.type === "text" && (
                  <div className="relative w-full h-full group">
                    {item.isEditing ? (
                      <div className="w-full h-full p-2">
                        <Textarea
                          value={item.customText || item.content.statement}
                          onChange={(e) => updateTextContent(item.id, e.target.value)}
                          className="w-full h-full resize-none border-0 focus:ring-2 focus:ring-primary text-center"
                          style={{
                            fontSize: `${item.fontSize || 24}px`,
                            color: item.fontColor || '#000000',
                            backgroundColor: item.backgroundColor === 'transparent' ? 'transparent' : item.backgroundColor || 'transparent',
                            fontFamily: 'cursive, serif'
                          }}
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          className="absolute top-1 right-1 h-6 w-6 p-0 bg-white/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTextEdit(item.id);
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center p-4 text-center cursor-pointer"
                        style={{
                          fontSize: `${item.fontSize || 24}px`,
                          color: item.fontColor || '#000000',
                          backgroundColor: item.backgroundColor === 'transparent' ? 'transparent' : item.backgroundColor || 'transparent',
                          fontFamily: 'cursive, serif',
                          fontWeight: 'bold'
                        }}
                        onDoubleClick={() => toggleTextEdit(item.id)}
                      >
                        {item.customText || item.content.statement}
                      </div>
                    )}

                    {/* Text Controls */}
                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTextEdit(item.id);
                        }}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRotate(item.id, 'left');
                        }}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 w-7 p-0 bg-white/90 hover:bg-white text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.id);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>

                    {/* Resize Handles */}
                    <div 
                      className="absolute bottom-2 right-2 w-4 h-4 bg-white/90 rounded-full cursor-se-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'se',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                    <div 
                      className="absolute bottom-2 left-2 w-4 h-4 bg-white/90 rounded-full cursor-sw-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'sw',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                    <div 
                      className="absolute top-2 right-2 w-4 h-4 bg-white/90 rounded-full cursor-ne-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'ne',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                    <div 
                      className="absolute top-2 left-2 w-4 h-4 bg-white/90 rounded-full cursor-nw-resize border-2 border-primary shadow-lg"
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        setIsResizing(true);
                        setResizeData({
                          itemId: item.id,
                          corner: 'nw',
                          startSize: { width: item.width, height: item.height },
                          startPos: { x: e.clientX, y: e.clientY }
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Canvas Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              -
            </Button>
            <span className="px-2 py-1 bg-card rounded text-sm">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              +
            </Button>
          </div>
        </div>
      </div>

      {/* Tips Modal */}
      {showTips && <VisionBoardTips onClose={() => setShowTips(false)} />}
    </div>
  );
};
