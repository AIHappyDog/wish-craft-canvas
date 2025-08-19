import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, MapPin, Clock, Send, Sparkles } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    // For now, we'll just open the user's email client
    const mailtoLink = `mailto:summer.duanzy@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.open(mailtoLink);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "summer.duanzy@gmail.com",
      link: "mailto:summer.duanzy@gmail.com"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Response Time",
      value: "Within 24 hours",
      link: null
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Business Hours",
      value: "Mon-Fri, 9AM-6PM EST",
      link: null
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Manifest Magic Vision Board | Get Support & Help</title>
        <meta name="description" content="Contact Manifest Magic for support with your vision board creation. Get help with AI image generation, goal planning, and manifestation techniques. We're here to help you succeed!" />
        <meta name="keywords" content="contact Manifest Magic, vision board support, AI vision board help, manifestation support, goal planning help, vision board questions, AI image generation support, DALL-E help, GPT-4 support, goal setting help, manifestation help, vision board troubleshooting, AI goal planner support, life coaching help, personal development support, goal achievement help, vision planning support, AI image generation help, goal visualization support, success planning help, dream manifestation support, vision board creator help, AI life coach support, goal tracking help, milestone planning support, action steps help, personal goals support, career goals help, health goals support, financial goals help, relationship goals help, spiritual goals support, creative visualization help, law of attraction support, positive thinking help, goal mapping support, success mindset help, personal transformation support, life planning help, future planning support, dream visualization help, goal setting tools support, vision board templates help, AI-powered planning support, intelligent goal setting help, automated goal planning support, smart goal creation help, digital vision board support, online goal planner help, virtual vision board support, interactive goal setting help, dynamic goal planning support, AI-enhanced visualization support, intelligent life planning help, smart dream mapping support, automated success planning help, AI goal optimization support, intelligent milestone tracking help, smart action planning support, AI-powered manifestation support, intelligent dream realization help, smart goal achievement support, AI-enhanced success planning help, intelligent life transformation support, smart personal development help, automated goal tracking support, AI goal monitoring help, intelligent progress tracking support, smart success measurement help, AI-powered achievement support, intelligent goal completion help, smart dream fulfillment support, AI-enhanced manifestation support, intelligent success realization help, smart goal accomplishment support, AI-powered transformation support, intelligent life improvement help, smart personal growth support, automated success tracking help, AI goal analysis support, intelligent progress analysis help, smart achievement analysis support, AI-powered success support, intelligent goal success support, smart dream success support, AI-enhanced achievement support, intelligent success planning support, smart goal planning support, AI-powered life coaching support, intelligent success coaching support, smart achievement coaching support, AI-enhanced life planning support, intelligent success mapping support, smart goal mapping support, AI-powered dream planning support, intelligent success tracking support, smart achievement tracking support, AI-enhanced goal setting support, intelligent success setting support, smart achievement setting support, AI-powered manifestation tools support, intelligent success tools support, smart achievement tools support, AI-enhanced planning tools support, intelligent success planning tools support, smart achievement planning tools support, AI-powered goal tools support, intelligent success goal tools support, smart achievement goal tools support, AI-enhanced life tools support, intelligent success life tools support, smart achievement life tools support, AI-powered dream tools support, intelligent success dream tools support, smart achievement dream tools support, AI-enhanced vision tools support, intelligent success vision tools support, smart achievement vision tools support, AI-powered board tools support, intelligent success board tools support, smart achievement board tools support, AI-enhanced creation tools support, intelligent success creation tools support, smart achievement creation tools support, AI-powered visualization tools support, intelligent success visualization tools support, smart achievement visualization tools support, AI-enhanced planning software support, intelligent success planning software support, smart achievement planning software support, AI-powered goal software support, intelligent success goal software support, smart achievement goal software support, AI-enhanced life software support, intelligent success life software support, smart achievement life software support, AI-powered dream software support, intelligent success dream software support, smart achievement dream software support, AI-enhanced vision software support, intelligent success vision software support, smart achievement vision software support, AI-powered board software support, intelligent success board software support, smart achievement board software support, AI-enhanced creation software support, intelligent success creation software support, smart achievement creation software support, AI-powered visualization software support, intelligent success visualization software support, smart achievement visualization software support" />
        <meta name="author" content="Manifest Magic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manifest-magic.vercel.app/contact" />
        <meta property="og:title" content="Contact Us - Manifest Magic Vision Board | Get Support & Help" />
        <meta property="og:description" content="Contact Manifest Magic for support with your vision board creation. Get help with AI image generation, goal planning, and manifestation techniques." />
        <meta property="og:image" content="https://manifest-magic.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="Manifest Magic" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://manifest-magic.vercel.app/contact" />
        <meta property="twitter:title" content="Contact Us - Manifest Magic Vision Board | Get Support & Help" />
        <meta property="twitter:description" content="Contact Manifest Magic for support with your vision board creation. Get help with AI image generation, goal planning, and manifestation techniques." />
        <meta property="twitter:image" content="https://manifest-magic.vercel.app/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://manifest-magic.vercel.app/contact" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Manifest Magic Contact" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Manifest Magic",
            "description": "Get support and help with your vision board creation",
            "url": "https://manifest-magic.vercel.app/contact",
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "summer.duanzy@gmail.com",
              "contactType": "customer service",
              "availableLanguage": "English"
            }
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
              <MessageCircle className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-primary leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions about Manifest Magic? Need help with your vision board? 
              We'd love to hear from you and help bring your dreams to life.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="glass-card border-card-border">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more about your question or feedback..."
                        rows={6}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-primary hover:bg-gradient-secondary text-primary-foreground">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link}
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Contact Us */}
              <Card className="glass-card border-card-border bg-gradient-to-r from-primary/5 to-transparent">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Why Contact Us?</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Get help with your vision board creation</li>
                    <li>• Report bugs or suggest new features</li>
                    <li>• Ask questions about AI image generation</li>
                    <li>• Provide feedback to improve Manifest Magic</li>
                    <li>• Request custom features or integrations</li>
                  </ul>
                </CardContent>
              </Card>

              {/* FAQ Link */}
              <Card className="glass-card border-card-border">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    Looking for Quick Answers?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Check out our FAQ page for answers to common questions.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/faq">View FAQ</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
      </>
  );
};

export default Contact;
