import { useState } from "react";
import { VisionCard } from "@/components/VisionCard";
import { VisionForm } from "@/components/VisionForm";
import { VisionBoardCanvas } from "@/components/VisionBoardCanvas";
import { MagicalBackground } from "@/components/MagicalBackground";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Image, Heart, BookOpen, Palette, Type } from "lucide-react";
import { Link } from "react-router-dom";

type ViewState = "home" | "text" | "image";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("home");
  const [showCanvas, setShowCanvas] = useState(false);

  if (currentView === "text") {
    return (
      <div className="min-h-screen p-6">
        <VisionForm 
          type="text" 
          onBack={() => setCurrentView("home")} 
          onOpenCanvas={() => setShowCanvas(true)}
        />
      </div>
    );
  }

  if (currentView === "image") {
    return (
      <div className="min-h-screen p-6">
        <VisionForm 
          type="image" 
          onBack={() => setCurrentView("home")} 
          onOpenCanvas={() => setShowCanvas(true)}
        />
      </div>
    );
  }

  if (showCanvas) {
    return <VisionBoardCanvas onClose={() => setShowCanvas(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
      <Navigation />
      <MagicalBackground />
      <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10 pt-16 pb-20">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glass-border text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-accent" />
            First generation is free — no login required
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-primary leading-tight">
            Vision Board Generator
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your dreams into actionable plans or visualize them with AI-generated imagery. 
            Create your personal vision board in minutes. Check out our tips and examples to get inspired!
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="h-full">
            <VisionCard
              type="text"
              title="I have a big wish"
              description="Turn your ambitious dreams into concrete, verifiable statements with clear milestones and action steps."
              icon={<Sparkles className="h-8 w-8 text-primary-foreground" />}
              onClick={() => setCurrentView("text")}
            />
          </div>
          
          <div className="h-full">
            <VisionCard
              type="image"
              title="I have a specific scene"
              description="Generate beautiful, inspiring images from your imagination in cartoon, vivid, or oil painting styles."
              icon={<Image className="h-8 w-8 text-primary-foreground" />}
              onClick={() => setCurrentView("image")}
            />
          </div>
        </div>

        {/* Canvas Button */}
        <div className="text-center">
          <Button 
            onClick={() => setShowCanvas(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Palette className="h-6 w-6 mr-3" />
            Create Your Vision Board Canvas
          </Button>
          <p className="text-muted-foreground mt-3 text-sm">
            Drag, arrange, and design your perfect vision board layout
          </p>
        </div>

        {/* Quick Tips */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/20">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Generate Content</h3>
              <p className="text-sm text-muted-foreground">
                Use AI to create vision plans and beautiful images for your goals
              </p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-accent/5 to-transparent border border-accent/20">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                <Type className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Add Personal Touch</h3>
              <p className="text-sm text-muted-foreground">
                Write custom text, quotes, and messages that inspire you
              </p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-gradient-to-r from-accent/5 to-transparent border border-accent/20">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                <Palette className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Design & Arrange</h3>
              <p className="text-sm text-muted-foreground">
                Drag, rotate, and resize elements to create your perfect layout
              </p>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="text-center space-y-4 mb-20">
          <div className="flex justify-center">
            <Link to="/vision-board">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                View My Vision Board
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
          Manifest everything you want • Create your vision board today
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-20 relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
