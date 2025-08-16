import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
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
  const [isExporting, setIsExporting] = useState(false);
  
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
    if (isExporting) return;
    
    setIsExporting(true);
    console.log('Starting improved canvas export...');
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas dimensions
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      // Draw background based on theme
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

      // Improved image loading with base64 support
      const imagePromises = items
        .filter(item => item.type === 'image')
        .map(item => {
          return new Promise<{ id: string; img: HTMLImageElement | null }>((resolve) => {
            const img = new Image();
            
            // Timeout for image loading
            const timeout = setTimeout(() => {
              console.warn(`Image timeout for item ${item.id}`);
              resolve({ id: item.id, img: null });
            }, 10000); // Increased timeout for base64 images

            img.onload = () => {
              clearTimeout(timeout);
              console.log(`Image loaded successfully for item ${item.id}`);
              resolve({ id: item.id, img });
            };

            img.onerror = (error) => {
              clearTimeout(timeout);
              console.error(`Failed to load image for item ${item.id}:`, error);
              
              // Try fallback to original URL if base64 fails
              if ('originalUrl' in item.content && item.content.originalUrl) {
                const fallbackImg = new Image();
                fallbackImg.crossOrigin = 'anonymous';
                fallbackImg.onload = () => resolve({ id: item.id, img: fallbackImg });
                fallbackImg.onerror = () => resolve({ id: item.id, img: null });
                fallbackImg.src = item.content.originalUrl;
              } else {
                resolve({ id: item.id, img: null });
              }
            };

            // Load the image
            if ('imageUrl' in item.content) {
              // Check if it's base64 data
              if (item.content.imageUrl.startsWith('data:')) {
                // Base64 images don't need CORS
                img.src = item.content.imageUrl;
              } else {
                // External URL - set crossOrigin
                img.crossOrigin = 'anonymous';
                img.src = item.content.imageUrl;
              }
            }
          });
        });

      const loadedImages = await Promise.all(imagePromises);
      const imageMap = new Map(
        loadedImages
          .filter(result => result.img !== null)
          .map(result => [result.id, result.img!])
      );

      console.log(`Successfully loaded ${imageMap.size} out of ${imagePromises.length} images`);

      // Sort items by z-index to draw in correct order
      const sortedItems = [...items].sort((a, b) => a.zIndex - b.zIndex);

      // Draw each item
      for (const item of sortedItems) {
        ctx.save();
        
        // Apply transformations
        ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);

        if (item.type === 'text') {
          // Draw background for text if specified
          if (item.backgroundColor && item.backgroundColor !== 'transparent') {
            ctx.fillStyle = item.backgroundColor;
            ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
          }

          // Configure text style
          ctx.fillStyle = item.fontColor || '#000000';
          ctx.font = `${item.fontSize || 24}px 'Arial', sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const text = item.customText || 
                      (item.content.statement || item.content.title || 'Text');
          
          // Improved word wrapping
          const maxWidth = item.width - 20;
          const words = text.split(' ');
          const lines: string[] = [];
          let currentLine = '';

          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine) {
              lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) {
            lines.push(currentLine);
          }

          // Draw text lines
          const lineHeight = (item.fontSize || 24) * 1.4;
          const startY = -(lines.length - 1) * lineHeight / 2;

          lines.forEach((line, index) => {
            ctx.fillText(line, 0, startY + index * lineHeight);
          });

        } else if (item.type === 'image') {
          const img = imageMap.get(item.id);
          
          if (img) {
            // Add subtle shadow for images
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            
            // Draw the loaded image with rounded corners effect
            ctx.save();
            ctx.beginPath();
            // Create rounded rectangle effect
            const radius = 8;
            const x = -item.width / 2;
            const y = -item.height / 2;
            const w = item.width;
            const h = item.height;
            
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + w - radius, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
            ctx.lineTo(x + w, y + h - radius);
            ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
            ctx.lineTo(x + radius, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.clip();
            
            ctx.drawImage(
              img,
              -item.width / 2,
              -item.height / 2,
              item.width,
              item.height
            );
            ctx.restore();
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          } else {
            // Improved placeholder for failed images
            // Gradient background
            const gradient = ctx.createLinearGradient(
              -item.width / 2, -item.height / 2,
              item.width / 2, item.height / 2
            );
            gradient.addColorStop(0, '#f3f4f6');
            gradient.addColorStop(1, '#e5e7eb');
            ctx.fillStyle = gradient;
            ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
            
            // Border
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Icon and text
            ctx.fillStyle = '#4b5563';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🖼️', 0, -15);
            
            ctx.font = '14px Arial';
            ctx.fillText('Image Not Available', 0, 10);
            
            // Add title if available
            if (item.title) {
              ctx.font = 'italic 12px Arial';
              ctx.fillStyle = '#6b7280';
              const truncatedTitle = item.title.length > 25 
                ? item.title.substring(0, 22) + '...' 
                : item.title;
              ctx.fillText(truncatedTitle, 0, 30);
            }
          }
        }
        
        ctx.restore();
      }

      // Draw each item
      for (const item of sortedItems) {
        ctx.save();
        
        // Apply transformations
        ctx.translate(item.x + item.width / 2, item.y + item.height / 2);
        ctx.rotate((item.rotation * Math.PI) / 180);

        if (item.type === 'text') {
          // Draw background for text if specified
          if (item.backgroundColor && item.backgroundColor !== 'transparent') {
            ctx.fillStyle = item.backgroundColor;
            ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
          }

          // Configure text style
          ctx.fillStyle = item.fontColor || '#000000';
          ctx.font = `${item.fontSize || 24}px 'Arial', sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const text = item.customText || 
                      (item.content.statement || item.content.title || 'Text');
          
          // Improved word wrapping
          const maxWidth = item.width - 20;
          const words = text.split(' ');
          const lines: string[] = [];
          let currentLine = '';

          for (const word of words) {
            const testLine = currentLine ? `${currentLine} ${word}` : word;
            const metrics = ctx.measureText(testLine);
            
            if (metrics.width > maxWidth && currentLine) {
              lines.push(currentLine);
              currentLine = word;
            } else {
              currentLine = testLine;
            }
          }
          if (currentLine) {
            lines.push(currentLine);
          }

          // Draw text lines
          const lineHeight = (item.fontSize || 24) * 1.4;
          const startY = -(lines.length - 1) * lineHeight / 2;

          lines.forEach((line, index) => {
            ctx.fillText(line, 0, startY + index * lineHeight);
          });

        } else if (item.type === 'image') {
          const img = imageMap.get(item.id);
          
          if (img) {
            // Add subtle shadow for images
            ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 5;
            ctx.shadowOffsetY = 5;
            
            // Draw the loaded image with rounded corners effect
            ctx.save();
            ctx.beginPath();
            // Create rounded rectangle effect
            const radius = 8;
            const x = -item.width / 2;
            const y = -item.height / 2;
            const w = item.width;
            const h = item.height;
            
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + w - radius, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
            ctx.lineTo(x + w, y + h - radius);
            ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
            ctx.lineTo(x + radius, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            ctx.clip();
            
            ctx.drawImage(
              img,
              -item.width / 2,
              -item.height / 2,
              item.width,
              item.height
            );
            ctx.restore();
            
            // Reset shadow
            ctx.shadowColor = 'transparent';
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
          } else {
            // Improved placeholder for failed images
            // Gradient background
            const gradient = ctx.createLinearGradient(
              -item.width / 2, -item.height / 2,
              item.width / 2, item.height / 2
            );
            gradient.addColorStop(0, '#f3f4f6');
            gradient.addColorStop(1, '#e5e7eb');
            ctx.fillStyle = gradient;
            ctx.fillRect(-item.width / 2, -item.height / 2, item.width, item.height);
            
            // Border
            ctx.strokeStyle = '#9ca3af';
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
            
            // Icon and text
            ctx.fillStyle = '#4b5563';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🖼️', 0, -15);
            
            ctx.font = '14px Arial';
            ctx.fillText('Image Not Available', 0, 10);
            
            // Add title if available
            if (item.title) {
              ctx.font = 'italic 12px Arial';
              ctx.fillStyle = '#6b7280';
              const truncatedTitle = item.title.length > 25 
                ? item.title.substring(0, 22) + '...' 
                : item.title;
              ctx.fillText(truncatedTitle, 0, 30);
            }
          }
        }
        
        ctx.restore();
      }

      // Add decorative frame and title
      ctx.save();
      
      // Add subtle vignette effect
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(0.7, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(0, 0, 0, 0.15)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add title with better styling
      const titleGradient = ctx.createLinearGradient(0, 0, canvas.width, 80);
      titleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      titleGradient.addColorStop(1, 'rgba(255, 255, 255, 0.85)');
      ctx.fillStyle = titleGradient;
      ctx.fillRect(0, 0, canvas.width, 80);
      
      // Title text
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('✨ My Vision Board ✨', canvas.width / 2, 35);
      
      ctx.font = '16px "Segoe UI", Arial, sans-serif';
      ctx.fillStyle = '#6b7280';
      ctx.fillText(new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }), canvas.width / 2, 60);
      
      ctx.restore();

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Failed to create blob');
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `vision-board-${new Date().toISOString().slice(0, 10)}.png`;
        link.href = url;
        
        document.body.appendChild(link);
        link.click();
        
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 100);
        
        toast({
          title: "Canvas Exported Successfully! 🎨",
          description: `Your vision board with ${items.length} items has been saved as an image.`,
        });
      }, 'image/png', 0.95); // High quality PNG
      
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export Issue",
        description: "Some items couldn't be exported. The vision board has been saved with available content.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };



  const filteredItems = VisionBoardManager.getAllItems().filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 z-50 flex flex-col">
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
          <Button 
            variant="outline" 
            onClick={exportCanvas}
            disabled={isExporting}
            className={isExporting ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isExporting ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export
              </>
            )}
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
                  ? 'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 25%, #dbeafe 50%, #e0f2fe 75%, #f0f9ff 100%)'
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
