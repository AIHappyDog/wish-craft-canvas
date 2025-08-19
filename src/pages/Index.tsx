import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>Manifest Magic - AI Vision Board Generator</title>
        <meta name="description" content="Create powerful vision boards with AI-generated content and images. Transform your dreams into actionable plans with Manifest Magic's intelligent goal-setting tools. Start manifesting your future today!" />
        <meta name="keywords" content="vision board, AI vision board, goal setting, manifestation, dream board, AI goal planner, life coaching, personal development, goal achievement, vision planning, AI image generation, DALL-E, GPT-4, goal visualization, success planning, dream manifestation, vision board creator, AI life coach, goal tracking, milestone planning, action steps, personal goals, career goals, health goals, financial goals, relationship goals, spiritual goals, creative visualization, law of attraction, positive thinking, goal mapping, success mindset, personal transformation, life planning, future planning, dream visualization, goal setting tools, vision board templates, AI-powered planning, intelligent goal setting, automated goal planning, smart goal creation, digital vision board, online goal planner, virtual vision board, interactive goal setting, dynamic goal planning, AI-enhanced visualization, intelligent life planning, smart dream mapping, automated success planning, AI goal optimization, intelligent milestone tracking, smart action planning, AI-powered manifestation, intelligent dream realization, smart goal achievement, AI-enhanced success planning, intelligent life transformation, smart personal development, automated goal tracking, AI goal monitoring, intelligent progress tracking, smart success measurement, AI-powered achievement, intelligent goal completion, smart dream fulfillment, AI-enhanced manifestation, intelligent success realization, smart goal accomplishment, AI-powered transformation, intelligent life improvement, smart personal growth, automated success tracking, AI goal analysis, intelligent progress analysis, smart achievement analysis, AI-powered success, intelligent goal success, smart dream success, AI-enhanced achievement, intelligent success planning, smart goal planning, AI-powered life coaching, intelligent success coaching, smart achievement coaching, AI-enhanced life planning, intelligent success mapping, smart goal mapping, AI-powered dream planning, intelligent success tracking, smart achievement tracking, AI-enhanced goal setting, intelligent success setting, smart achievement setting, AI-powered manifestation tools, intelligent success tools, smart achievement tools, AI-enhanced planning tools, intelligent success planning tools, smart achievement planning tools, AI-powered goal tools, intelligent success goal tools, smart achievement goal tools, AI-enhanced life tools, intelligent success life tools, smart achievement life tools, AI-powered dream tools, intelligent success dream tools, smart achievement dream tools, AI-enhanced vision tools, intelligent success vision tools, smart achievement vision tools, AI-powered board tools, intelligent success board tools, smart achievement board tools, AI-enhanced creation tools, intelligent success creation tools, smart achievement creation tools, AI-powered visualization tools, intelligent success visualization tools, smart achievement visualization tools, AI-enhanced planning software, intelligent success planning software, smart achievement planning software, AI-powered goal software, intelligent success goal software, smart achievement goal software, AI-enhanced life software, intelligent success life software, smart achievement life software, AI-powered dream software, intelligent success dream software, smart achievement dream software, AI-enhanced vision software, intelligent success vision software, smart achievement vision software, AI-powered board software, intelligent success board software, smart achievement board software, AI-enhanced creation software, intelligent success creation software, smart achievement creation software, AI-powered visualization software, intelligent success visualization software, smart achievement visualization software" />
        <meta name="author" content="Manifest Magic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.manifestmagics.com/" />
        <meta property="og:title" content="Manifest Magic - AI Vision Board Generator" />
        <meta property="og:description" content="Transform your dreams into actionable plans with AI-generated content and images. Create powerful vision boards that manifest your future!" />
        <meta property="og:image" content="https://www.manifestmagics.com/og-image.jpg" />
        <meta property="og:site_name" content="Manifest Magic" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.manifestmagics.com/" />
        <meta property="twitter:title" content="Manifest Magic - AI Vision Board Generator" />
        <meta property="twitter:description" content="Transform your dreams into actionable plans with AI-generated content and images. Create powerful vision boards that manifest your future!" />
        <meta property="twitter:image" content="https://www.manifestmagics.com/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.manifestmagics.com/" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Manifest Magic" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Manifest Magic",
            "description": "AI-Powered Vision Board Generator for transforming dreams into actionable plans",
            "url": "https://www.manifestmagics.com/",
            "applicationCategory": "ProductivityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "Manifest Magic"
            }
          }
          `}
        </script>
      </Helmet>
      
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
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Essential Vision Board Features
          </h2>
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
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Ready to Create Your Vision Board?
          </h2>
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

      {/* Enhanced Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Transform Your Dreams Into Reality
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              The Power of AI-Enhanced Vision Boards
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Manifest Magic combines cutting-edge artificial intelligence with proven manifestation techniques to create the most powerful vision board experience available. Our AI doesn't just generate content—it understands your deepest desires and transforms them into structured, achievable plans that align with universal laws of attraction.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Unlike traditional vision boards that rely solely on your imagination, our AI-powered system analyzes your goals, identifies potential obstacles, and creates comprehensive action plans with measurable milestones. This intelligent approach ensures that every element of your vision board serves a purpose in your journey toward success.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Why Choose Manifest Magic?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Intelligent Goal Analysis</h4>
                  <p className="text-sm text-muted-foreground">AI analyzes your goals and creates optimal action plans</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Visual Manifestation</h4>
                  <p className="text-sm text-muted-foreground">Generate inspiring images that perfectly match your vision</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Progress Tracking</h4>
                  <p className="text-sm text-muted-foreground">Monitor your journey with intelligent milestone tracking</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            How Manifest Magic Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Share Your Dream</h4>
              <p className="text-sm text-muted-foreground">
                Simply describe your biggest wish or goal in natural language. Our AI understands context and emotion.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">AI Magic Happens</h4>
              <p className="text-sm text-muted-foreground">
                Watch as AI transforms your dream into a structured plan with milestones, actions, and solutions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Visualize & Manifest</h4>
              <p className="text-sm text-muted-foreground">
                Create beautiful visual representations and track your progress toward achieving your dreams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
          Start Your Manifestation Journey Today
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              The Science Behind Vision Boards
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Research shows that visualization techniques can significantly improve goal achievement. When you create a vision board, you're not just collecting images and words—you're programming your subconscious mind to recognize opportunities that align with your desires.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our AI-enhanced approach takes this proven technique to the next level by providing structured planning, measurable milestones, and intelligent insights that keep you focused and motivated throughout your journey.
            </p>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Proven Success Strategies
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Daily Visualization</h4>
                  <p className="text-sm text-muted-foreground">Regular exposure to your vision board reinforces your goals</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Action-Oriented Planning</h4>
                  <p className="text-sm text-muted-foreground">AI-generated action steps keep you moving forward</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="h-3 w-3 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Progress Monitoring</h4>
                  <p className="text-sm text-muted-foreground">Track milestones and celebrate achievements along the way</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-20 relative z-10">
        <Footer />
      </div>
    </div>
      </>
  );
};

export default Index;
