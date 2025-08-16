import { useState } from "react";
import { VisionCard } from "@/components/VisionCard";
import { VisionForm } from "@/components/VisionForm";
import { Sparkles, Image, Heart } from "lucide-react";

type ViewState = "home" | "text" | "image";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("home");

  if (currentView === "text") {
    return (
      <div className="min-h-screen p-6">
        <VisionForm type="text" onBack={() => setCurrentView("home")} />
      </div>
    );
  }

  if (currentView === "image") {
    return (
      <div className="min-h-screen p-6">
        <VisionForm type="image" onBack={() => setCurrentView("home")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl mx-auto text-center space-y-12">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glass-border text-sm text-muted-foreground">
            <Heart className="h-4 w-4 text-accent" />
            First generation is free — no login required
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-primary leading-tight">
            Vision Board AI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your dreams into actionable plans or visualize them with AI-generated imagery. 
            Create your personal vision board in minutes.
          </p>
        </div>

        {/* Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <VisionCard
            type="text"
            title="I have a big wish"
            description="Turn your ambitious dreams into concrete, verifiable statements with clear milestones and action steps."
            icon={<Sparkles className="h-8 w-8 text-primary-foreground" />}
            onClick={() => setCurrentView("text")}
          />
          
          <VisionCard
            type="image"
            title="I have a specific scene"
            description="Generate beautiful, inspiring images from your imagination in cartoon, vivid, or oil painting styles."
            icon={<Image className="h-8 w-8 text-primary-foreground" />}
            onClick={() => setCurrentView("image")}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Powered by AI • Create your vision board today</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
