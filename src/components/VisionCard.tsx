import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Image } from "lucide-react";

interface VisionCardProps {
  type: "text" | "image";
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const VisionCard = ({ type, title, description, icon, onClick }: VisionCardProps) => {
  return (
    <Card className="glass-card border-card-border hover:shadow-glow transition-all duration-700 group cursor-pointer sparkle relative overflow-hidden animate-dreamglow"
          onClick={onClick}>
      <div className="p-8 text-center space-y-6">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center group-hover:animate-startwinkle transition-all duration-300 shadow-lg">
          {icon}
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-card-foreground group-hover:text-primary-glow transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <Button 
          variant={type === "text" ? "default" : "secondary"}
          size="lg" 
          className="group/btn w-full bg-gradient-primary hover:bg-gradient-secondary border-0 text-primary-foreground font-medium transition-all duration-300 hover:scale-105"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </Card>
  );
};