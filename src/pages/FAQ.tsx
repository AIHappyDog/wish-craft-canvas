import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
