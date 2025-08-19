import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Shield, Users, Clock } from "lucide-react";

const Terms = () => {
  const lastUpdated = "December 2025";

  return (
    <>
      <Helmet>
        <title>Terms of Service - Manifest Magic Vision Board | Legal Terms & Conditions</title>
        <meta name="description" content="Read the Terms of Service for Manifest Magic Vision Board. Understand the legal terms and conditions for using our AI-powered vision board application." />
        <meta name="keywords" content="Manifest Magic terms of service, vision board terms, AI vision board legal, manifestation app terms, goal setting terms, vision board conditions, AI goal planner legal, life coaching terms, personal development terms, goal achievement legal, vision planning terms, AI image generation legal, goal visualization terms, success planning legal, dream manifestation terms, vision board creator legal, AI life coach terms, goal tracking legal, milestone planning terms, action steps legal, personal goals terms, career goals legal, health goals terms, financial goals legal, relationship goals terms, spiritual goals legal, creative visualization terms, law of attraction legal, positive thinking terms, goal mapping legal, success mindset terms, personal transformation legal, life planning terms, future planning legal, dream visualization terms, goal setting tools legal, vision board templates terms, AI-powered planning legal, intelligent goal setting terms, automated goal planning legal, smart goal creation terms, digital vision board legal, online goal planner terms, virtual vision board legal, interactive goal setting terms, dynamic goal planning legal, AI-enhanced visualization terms, intelligent life planning legal, smart dream mapping terms, automated success planning legal, AI goal optimization terms, intelligent milestone tracking legal, smart action planning terms, AI-powered manifestation legal, intelligent dream realization terms, smart goal achievement legal, AI-enhanced success planning terms, intelligent life transformation legal, smart personal development terms, automated goal tracking legal, AI goal monitoring terms, intelligent progress tracking legal, smart success measurement terms, AI-powered achievement legal, intelligent goal completion terms, smart dream fulfillment legal, AI-enhanced manifestation terms, intelligent success realization legal, smart goal accomplishment terms, AI-powered transformation legal, intelligent life improvement terms, smart personal growth legal, automated success tracking terms, AI goal analysis legal, intelligent progress analysis terms, smart achievement analysis legal, AI-powered success terms, intelligent goal success legal, smart dream success terms, AI-enhanced achievement legal, intelligent success planning terms, smart goal planning legal, AI-powered life coaching terms, intelligent success coaching legal, smart achievement coaching terms, AI-enhanced life planning legal, intelligent success mapping terms, smart goal mapping legal, AI-powered dream planning terms, intelligent success tracking legal, smart achievement tracking terms, AI-enhanced goal setting legal, intelligent success setting terms, smart achievement setting legal, AI-powered manifestation tools terms, intelligent success tools legal, smart achievement tools terms, AI-enhanced planning tools legal, intelligent success planning tools terms, smart achievement planning tools legal, AI-powered goal tools terms, intelligent success goal tools legal, smart achievement goal tools terms, AI-enhanced life tools legal, intelligent success life tools terms, smart achievement life tools legal, AI-powered dream tools terms, intelligent success dream tools legal, smart achievement dream tools terms, AI-enhanced vision tools legal, intelligent success vision tools terms, smart achievement vision tools legal, AI-powered board tools terms, intelligent success board tools legal, smart achievement board tools terms, AI-enhanced creation tools legal, intelligent success creation tools terms, smart achievement creation tools legal, AI-powered visualization tools terms, intelligent success visualization tools legal, smart achievement visualization tools terms, AI-enhanced planning software legal, intelligent success planning software terms, smart achievement planning software legal, AI-powered goal software terms, intelligent success goal software legal, smart achievement goal software terms, AI-enhanced life software legal, intelligent success life software terms, smart achievement life software legal, AI-powered dream software terms, intelligent success dream software legal, smart achievement dream software terms, AI-enhanced vision software legal, intelligent success vision software terms, smart achievement vision software legal, AI-powered board software terms, intelligent success board software legal, smart achievement board software terms, AI-enhanced creation software legal, intelligent success creation software terms, smart achievement creation software legal, AI-powered visualization software terms, intelligent success visualization software legal, smart achievement visualization software terms" />
        <meta name="author" content="Manifest Magic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://manifest-magic.vercel.app/terms" />
        <meta property="og:title" content="Terms of Service - Manifest Magic Vision Board | Legal Terms & Conditions" />
        <meta property="og:description" content="Read the Terms of Service for Manifest Magic Vision Board. Understand the legal terms and conditions for using our AI-powered vision board application." />
        <meta property="og:image" content="https://manifest-magic.vercel.app/og-image.jpg" />
        <meta property="og:site_name" content="Manifest Magic" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://manifest-magic.vercel.app/terms" />
        <meta property="twitter:title" content="Terms of Service - Manifest Magic Vision Board | Legal Terms & Conditions" />
        <meta property="twitter:description" content="Read the Terms of Service for Manifest Magic Vision Board. Understand the legal terms and conditions for using our AI-powered vision board application." />
        <meta property="twitter:image" content="https://manifest-magic.vercel.app/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://manifest-magic.vercel.app/terms" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Manifest Magic Terms" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Legal terms and conditions for Manifest Magic Vision Board",
            "url": "https://manifest-magic.vercel.app/terms",
            "publisher": {
              "@type": "Organization",
              "name": "Manifest Magic"
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
              <FileText className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-primary leading-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Please read these terms carefully before using Manifest Magic Vision Board. 
              By using our service, you agree to these terms.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <Card className="glass-card border-card-border">
            <CardHeader>
              <CardTitle className="text-2xl">Terms and Conditions</CardTitle>
              <CardDescription>
                These terms govern your use of Manifest Magic Vision Board
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8 text-sm leading-relaxed">
                  {/* Acceptance of Terms */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-primary" />
                      1. Acceptance of Terms
                    </h2>
                    <p className="text-muted-foreground mb-3">
                      By accessing and using Manifest Magic Vision Board ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </section>

                  {/* Description of Service */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                    <p className="text-muted-foreground mb-3">
                    Manifest Magic Vision Board is an AI-powered application that allows users to create and manage personal vision boards. The service includes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>AI-generated text content for vision planning</li>
                      <li>AI-generated images based on user descriptions</li>
                      <li>Vision board canvas creation and management</li>
                      <li>Local storage of user content</li>
                    </ul>
                  </section>

                  {/* User Accounts */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                    <p className="text-muted-foreground mb-3">
                      You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>
                  </section>

                  {/* Acceptable Use */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">4. Acceptable Use</h2>
                    <p className="text-muted-foreground mb-3">
                      You agree not to use the Service to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Generate content that is illegal, harmful, threatening, abusive, or defamatory</li>
                      <li>Violate any applicable laws or regulations</li>
                      <li>Infringe upon the rights of others</li>
                      <li>Attempt to gain unauthorized access to the Service</li>
                      <li>Use the Service for commercial purposes without permission</li>
                    </ul>
                  </section>

                  {/* AI Content Generation */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">5. AI Content Generation</h2>
                    <p className="text-muted-foreground mb-3">
                      The Service uses artificial intelligence to generate content and images. While we strive for quality and appropriateness, AI-generated content may not always meet your expectations. You acknowledge that:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>AI-generated content is for personal use only</li>
                      <li>Content should be reviewed before use</li>
                      <li>We are not responsible for the accuracy or appropriateness of AI-generated content</li>
                      <li>You retain ownership of your original input and prompts</li>
                    </ul>
                  </section>

                  {/* Privacy and Data */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">6. Privacy and Data</h2>
                    <p className="text-muted-foreground mb-3">
                      Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
                    </p>
                  </section>

                  {/* Intellectual Property */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
                    <p className="text-muted-foreground mb-3">
                      The Service and its original content, features, and functionality are and will remain the exclusive property of Manifest Magic and its licensors. The Service is protected by copyright, trademark, and other laws.
                    </p>
                  </section>

                  {/* User Content */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">8. User Content</h2>
                    <p className="text-muted-foreground mb-3">
                      You retain ownership of the content you create using the Service. By using the Service, you grant us a limited license to use, store, and process your content solely for the purpose of providing the Service.
                    </p>
                  </section>

                  {/* Disclaimers */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">9. Disclaimers</h2>
                    <p className="text-muted-foreground mb-3">
                      The Service is provided "as is" without warranties of any kind. We do not guarantee that the Service will be uninterrupted, secure, or error-free. We are not responsible for any content generated by the AI systems.
                    </p>
                  </section>

                  {/* Limitation of Liability */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">10. Limitation of Liability</h2>
                    <p className="text-muted-foreground mb-3">
                      In no event shall Manifest Magic be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                    </p>
                  </section>

                  {/* Termination */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">11. Termination</h2>
                    <p className="text-muted-foreground mb-3">
                      We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                    </p>
                  </section>

                  {/* Changes to Terms */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">12. Changes to Terms</h2>
                    <p className="text-muted-foreground mb-3">
                      We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                    </p>
                  </section>

                  {/* Contact Information */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">13. Contact Information</h2>
                    <p className="text-muted-foreground mb-3">
                      If you have any questions about these Terms, please contact us at:
                    </p>
                    <p className="text-primary font-medium">
                      Email: summer.duanzy@gmail.com
                    </p>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
      </>
  );
};

export default Terms;
