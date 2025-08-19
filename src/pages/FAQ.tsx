import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, HelpCircle, Lightbulb, Palette, Shield } from "lucide-react";

const FAQ = () => {
  const faqData = [
    {
      question: "What is Manifest Magic Vision Board?",
      answer: "Manifest Magic is an AI-powered vision board generator that helps you transform your dreams into actionable plans and beautiful visualizations. You can create text-based vision plans or generate inspiring images from your imagination."
    },
    {
      question: "How does the AI image generation work?",
      answer: "Our AI uses advanced image generation technology to create beautiful, inspiring images based on your descriptions. You can choose from different styles including cartoon, vivid, and oil painting to match your vision."
    },
    {
      question: "Can I save and edit my vision board?",
      answer: "Yes! You can save your vision board and come back to edit it anytime. All your content is stored locally and you can modify text, rearrange elements, and update your goals as they evolve."
    },
    {
      question: "What makes a good vision board?",
      answer: "A great vision board includes clear, specific goals, inspiring imagery, positive affirmations, and realistic timelines. Focus on what you want to achieve rather than what you want to avoid, and make sure your goals are meaningful to you."
    },
    {
      question: "Is my data private and secure?",
      answer: "Absolutely. We prioritize your privacy and security. All your vision board content is stored locally on your device, and we don't collect or store personal information without your explicit consent."
    },
    {
      question: "Can I share my vision board with others?",
      answer: "Currently, vision boards are private to your device. However, you can take screenshots or export your board to share with friends, family, or accountability partners if you choose to do so."
    }
  ];

  const features = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Generation",
      description: "Create content and images using advanced AI technology"
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Custom Design",
      description: "Drag, arrange, and customize your perfect layout"
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Smart Templates",
      description: "Get started quickly with pre-designed templates"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Your data stays on your device, always secure"
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ - Manifest Magic Vision Board | Common Questions & Answers</title>
        <meta name="description" content="Find answers to frequently asked questions about Manifest Magic Vision Board. Learn how to use AI-powered vision boards, troubleshoot issues, and get the most out of your manifestation journey." />
        <meta name="keywords" content="vision board FAQ, Manifest Magic help, AI vision board questions, vision board troubleshooting, manifestation help, goal setting FAQ, AI goal planner questions, vision board guide, manifestation tips, goal achievement help, vision board support, AI image generation help, DALL-E questions, GPT-4 vision board, goal planning FAQ, manifestation FAQ, vision board tutorial, AI life coach help, goal tracking questions, milestone planning help, action steps FAQ, personal goals help, career goals FAQ, health goals questions, financial goals help, relationship goals FAQ, spiritual goals help, creative visualization FAQ, law of attraction help, positive thinking FAQ, goal mapping help, success mindset FAQ, personal transformation help, life planning FAQ, future planning help, dream visualization FAQ, goal setting tools help, vision board templates FAQ, AI-powered planning help, intelligent goal setting FAQ, automated goal planning help, smart goal creation FAQ, digital vision board help, online goal planner FAQ, virtual vision board help, interactive goal setting FAQ, dynamic goal planning help, AI-enhanced visualization help, intelligent life planning FAQ, smart dream mapping help, automated success planning FAQ, AI goal optimization help, intelligent milestone tracking FAQ, smart action planning help, AI-powered manifestation FAQ, intelligent dream realization help, smart goal achievement FAQ, AI-enhanced success planning help, intelligent life transformation FAQ, smart personal development help, automated goal tracking FAQ, AI goal monitoring help, intelligent progress tracking FAQ, smart success measurement help, AI-powered achievement FAQ, intelligent goal completion help, smart dream fulfillment FAQ, AI-enhanced manifestation help, intelligent success realization FAQ, smart goal accomplishment help, AI-powered transformation FAQ, intelligent life improvement help, smart personal growth FAQ, automated success tracking help, AI goal analysis FAQ, intelligent progress analysis help, smart achievement analysis FAQ, AI-powered success help, intelligent goal success FAQ, smart dream success help, AI-enhanced achievement FAQ, intelligent success planning help, smart goal planning FAQ, AI-powered life coaching help, intelligent success coaching FAQ, smart achievement coaching help, AI-enhanced life planning FAQ, intelligent success mapping help, smart goal mapping FAQ, AI-powered dream planning help, intelligent success tracking FAQ, smart achievement tracking help, AI-enhanced goal setting FAQ, intelligent success setting help, smart achievement setting FAQ, AI-powered manifestation tools help, intelligent success tools FAQ, smart achievement tools help, AI-enhanced planning tools FAQ, intelligent success planning tools help, smart achievement planning tools FAQ, AI-powered goal tools help, intelligent success goal tools FAQ, smart achievement goal tools help, AI-enhanced life tools FAQ, intelligent success life tools help, smart achievement life tools FAQ, AI-powered dream tools help, intelligent success dream tools FAQ, smart achievement dream tools help, AI-enhanced vision tools FAQ, intelligent success vision tools help, smart achievement vision tools FAQ, AI-powered board tools help, intelligent success board tools FAQ, smart achievement board tools help, AI-enhanced creation tools FAQ, intelligent success creation tools help, smart achievement creation tools FAQ, AI-powered visualization tools FAQ, intelligent success visualization tools help, smart achievement visualization tools FAQ, AI-enhanced planning software help, intelligent success planning software FAQ, smart achievement planning software help, AI-powered goal software FAQ, intelligent success goal software help, smart achievement goal software FAQ, AI-enhanced life software FAQ, intelligent success life software help, smart achievement life software FAQ, AI-powered dream software FAQ, intelligent success dream software help, smart achievement dream software FAQ, AI-enhanced vision software FAQ, intelligent success vision software help, smart achievement vision software FAQ, AI-powered board software FAQ, intelligent success board software help, smart achievement board software FAQ, AI-enhanced creation software FAQ, intelligent success creation software help, smart achievement creation software FAQ, AI-powered visualization software FAQ, intelligent success visualization software help, smart achievement visualization software FAQ" />
        <meta name="author" content="Manifest Magic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manifest-magic.vercel.app/faq" />
        <meta property="og:title" content="FAQ - Manifest Magic Vision Board | Common Questions & Answers" />
        <meta property="og:description" content="Find answers to frequently asked questions about Manifest Magic Vision Board. Learn how to use AI-powered vision boards and get the most out of your manifestation journey." />
        <meta property="og:image" content="https://manifest-magic.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="Manifest Magic" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://manifest-magic.vercel.app/faq" />
        <meta property="twitter:title" content="FAQ - Manifest Magic Vision Board | Common Questions & Answers" />
        <meta property="twitter:description" content="Find answers to frequently asked questions about Manifest Magic Vision Board. Learn how to use AI-powered vision boards and get the most out of your manifestation journey." />
        <meta property="twitter:image" content="https://manifest-magic.vercel.app/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://manifest-magic.vercel.app/faq" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Manifest Magic FAQ" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Manifest Magic Vision Board?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Manifest Magic is an AI-powered vision board generator that helps you transform your dreams into actionable plans and beautiful visualizations. You can create text-based vision plans or generate inspiring images from your imagination."
                }
              },
              {
                "@type": "Question",
                "name": "How does the AI image generation work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our AI uses advanced image generation technology to create beautiful, inspiring images based on your descriptions. You can choose from different styles including cartoon, vivid, and oil painting to match your vision."
                }
              }
            ]
          }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Navigation />
        
        <main className="pt-16">
        {/* Hero Section */}
        <div className="text-center py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-6">
              <HelpCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-primary leading-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about Manifest Magic Vision Board. 
              Can't find what you're looking for? Feel free to contact us!
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <Card className="glass-card border-card-border">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Common Questions</CardTitle>
              <CardDescription className="text-center">
                Everything you need to know about using Manifest Magic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose Manifest Magic?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the features that make Manifest Magic the perfect tool for manifesting your dreams
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-card-border text-center hover:shadow-glow transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto px-4 pb-20 text-center">
          <Card className="glass-card border-card-border bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <a 
                href="mailto:summer.duanzy@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-gradient-primary text-primary-foreground font-medium rounded-lg hover:bg-gradient-secondary transition-all duration-300 hover:scale-105"
              >
                Contact Us
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced FAQ Content */}
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Understanding Vision Boards and Manifestation
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                The Science Behind Vision Boards
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Vision boards work through the principle of creative visualization, a technique backed by neuroscience research. When you consistently visualize your goals, your brain creates neural pathways that make those outcomes feel more achievable and familiar. This process activates the reticular activating system (RAS), which helps you notice opportunities and resources that align with your goals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Studies in sports psychology and business have shown that athletes and executives who use visualization techniques perform significantly better than those who don't. The same principles apply to personal goal achievement. By creating a visual representation of your desired future, you're essentially programming your subconscious mind to work toward those outcomes.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground">
                Why AI-Enhanced Vision Boards Are More Effective
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Intelligent Goal Structuring</h4>
                    <p className="text-sm text-muted-foreground">AI analyzes your goals and creates optimal action plans with measurable milestones</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Personalized Visualization</h4>
                    <p className="text-sm text-muted-foreground">Generate images that perfectly match your unique vision and style preferences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">Progress Optimization</h4>
                    <p className="text-sm text-muted-foreground">AI continuously analyzes your progress and suggests improvements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Best Practices for Vision Board Success
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Daily Visualization Routine</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Spend 5-10 minutes each day looking at your vision board. This consistent practice reinforces your goals in your subconscious mind and keeps you focused on what you want to achieve.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Morning visualization for motivation</li>
                  <li>• Evening reflection on progress</li>
                  <li>• Weekly goal review and adjustment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Emotional Connection</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose images and words that evoke strong positive emotions. The more you can feel the success, the more powerful the manifestation effect will be.
                </p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Use images that make you smile</li>
                  <li>• Include personal photos and memories</li>
                  <li>• Add affirmations that resonate deeply</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
      </>
  );
};

export default FAQ;
