import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Eye, Lock, Database, Clock } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "December 2025";

  return (
    <>
      <Helmet>
        <title>Privacy Policy - Manifest Magic Vision Board | Data Protection & Privacy</title>
        <meta name="description" content="Read the Privacy Policy for Manifest Magic Vision Board. Learn how we protect your data and ensure your privacy while using our AI-powered vision board application." />
        <meta name="keywords" content="Manifest Magic privacy policy, vision board privacy, AI vision board data protection, manifestation app privacy, goal setting privacy, vision board data security, AI goal planner privacy, life coaching privacy, personal development privacy, goal achievement privacy, vision planning privacy, AI image generation privacy, goal visualization privacy, success planning privacy, dream manifestation privacy, vision board creator privacy, AI life coach privacy, goal tracking privacy, milestone planning privacy, action steps privacy, personal goals privacy, career goals privacy, health goals privacy, financial goals privacy, relationship goals privacy, spiritual goals privacy, creative visualization privacy, law of attraction privacy, positive thinking privacy, goal mapping privacy, success mindset privacy, personal transformation privacy, life planning privacy, future planning privacy, dream visualization privacy, goal setting tools privacy, vision board templates privacy, AI-powered planning privacy, intelligent goal setting privacy, automated goal planning privacy, smart goal creation privacy, digital vision board privacy, online goal planner privacy, virtual vision board privacy, interactive goal setting privacy, dynamic goal planning privacy, AI-enhanced visualization privacy, intelligent life planning privacy, smart dream mapping privacy, automated success planning privacy, AI goal optimization privacy, intelligent milestone tracking privacy, smart action planning privacy, AI-powered manifestation privacy, intelligent dream realization privacy, smart goal achievement privacy, AI-enhanced success planning privacy, intelligent life transformation privacy, smart personal development privacy, automated goal tracking privacy, AI goal monitoring privacy, intelligent progress tracking privacy, smart success measurement privacy, AI-powered achievement privacy, intelligent goal completion privacy, smart dream fulfillment privacy, AI-enhanced manifestation privacy, intelligent success realization privacy, smart goal accomplishment privacy, AI-powered transformation privacy, intelligent life improvement privacy, smart personal growth privacy, automated success tracking privacy, AI goal analysis privacy, intelligent progress analysis privacy, smart achievement analysis privacy, AI-powered success privacy, intelligent goal success privacy, smart dream success privacy, AI-enhanced achievement privacy, intelligent success planning privacy, smart goal planning privacy, AI-powered life coaching privacy, intelligent success coaching privacy, smart achievement coaching privacy, AI-enhanced life planning privacy, intelligent success mapping privacy, smart goal mapping privacy, AI-powered dream planning privacy, intelligent success tracking privacy, smart achievement tracking privacy, AI-enhanced goal setting privacy, intelligent success setting privacy, smart achievement setting privacy, AI-powered manifestation tools privacy, intelligent success tools privacy, smart achievement tools privacy, AI-enhanced planning tools privacy, intelligent success planning tools privacy, smart achievement planning tools privacy, AI-powered goal tools privacy, intelligent success goal tools privacy, smart achievement goal tools privacy, AI-enhanced life tools privacy, intelligent success life tools privacy, smart achievement life tools privacy, AI-powered dream tools privacy, intelligent success dream tools privacy, smart achievement dream tools privacy, AI-enhanced vision tools privacy, intelligent success vision tools privacy, smart achievement vision tools privacy, AI-powered board tools privacy, intelligent success board tools privacy, smart achievement board tools privacy, AI-enhanced creation tools privacy, intelligent success creation tools privacy, smart achievement creation tools privacy, AI-powered visualization tools privacy, intelligent success visualization tools privacy, smart achievement visualization tools privacy, AI-enhanced planning software privacy, intelligent success planning software privacy, smart achievement planning software privacy, AI-powered goal software privacy, intelligent success goal software privacy, smart achievement goal software privacy, AI-enhanced life software privacy, intelligent success life software privacy, smart achievement life software privacy, AI-powered dream software privacy, intelligent success dream software privacy, smart achievement dream software privacy, AI-enhanced vision software privacy, intelligent success vision software privacy, smart achievement vision software privacy, AI-powered board software privacy, intelligent success board software privacy, smart achievement board software privacy, AI-enhanced creation software privacy, intelligent success creation software privacy, smart achievement creation software privacy, AI-powered visualization software privacy, intelligent success visualization software privacy, smart achievement visualization software privacy" />
        <meta name="author" content="Manifest Magic" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.manifestmagics.com/privacy" />
        <meta property="og:title" content="Privacy Policy - Manifest Magic Vision Board | Data Protection & Privacy" />
        <meta property="og:description" content="Read the Privacy Policy for Manifest Magic Vision Board. Learn how we protect your data and ensure your privacy while using our AI-powered vision board application." />
        <meta property="og:image" content="https://www.manifestmagics.com/og-image.jpg" />
        <meta property="og:site_name" content="Manifest Magic" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.manifestmagics.com/privacy" />
        <meta property="twitter:title" content="Privacy Policy - Manifest Magic Vision Board | Data Protection & Privacy" />
        <meta property="twitter:description" content="Read the Privacy Policy for Manifest Magic Vision Board. Learn how we protect your data and ensure your privacy while using our AI-powered vision board application." />
        <meta property="twitter:image" content="https://www.manifestmagics.com/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.manifestmagics.com/privacy" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Manifest Magic Privacy" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Data protection and privacy policy for Manifest Magic Vision Board",
            "url": "https://manifest-magic.vercel.app/privacy",
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
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-primary leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We respect your privacy and are committed to protecting your personal information. 
              This policy explains how we collect, use, and safeguard your data.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="max-w-4xl mx-auto px-4 pb-20">
          <Card className="glass-card border-card-border">
            <CardHeader>
              <CardTitle className="text-2xl">Privacy and Data Protection</CardTitle>
              <CardDescription>
                How we handle your information and protect your privacy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-8 text-sm leading-relaxed">
                  {/* Introduction */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <Eye className="h-5 w-5 mr-2 text-primary" />
                      1. Introduction
                    </h2>
                    <p className="text-muted-foreground mb-3">
                    Manifest Magic Vision Board ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our vision board application.
                    </p>
                  </section>

                  {/* Information We Collect */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
                    <p className="text-muted-foreground mb-3">
                      We collect the following types of information:
                    </p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                        <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                          <li>Email address (if provided for support)</li>
                          <li>Name (if provided for support)</li>
                          <li>Contact information (if provided for support)</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                        <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                          <li>Vision board content and designs</li>
                          <li>AI-generated text and images</li>
                          <li>Application usage patterns</li>
                          <li>Feature preferences and settings</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">Technical Information</h3>
                        <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                          <li>Device information and browser type</li>
                          <li>IP address and location data</li>
                          <li>Application performance data</li>
                          <li>Error logs and crash reports</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* How We Use Information */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">3. How We Use Information</h2>
                    <p className="text-muted-foreground mb-3">
                      We use the collected information for the following purposes:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Provide and maintain the vision board service</li>
                      <li>Generate AI content based on your prompts</li>
                      <li>Improve and optimize our application</li>
                      <li>Provide customer support and respond to inquiries</li>
                      <li>Send important updates and notifications</li>
                      <li>Ensure security and prevent fraud</li>
                      <li>Comply with legal obligations</li>
                    </ul>
                  </section>

                  {/* Data Storage and Security */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Storage and Security</h2>
                    <p className="text-muted-foreground mb-3">
                      We implement appropriate security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Local storage of vision board content on your device</li>
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and updates</li>
                      <li>Access controls and authentication measures</li>
                      <li>Secure data centers and infrastructure</li>
                    </ul>
                  </section>

                  {/* AI Content Processing */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">5. AI Content Processing</h2>
                    <p className="text-muted-foreground mb-3">
                      When you use our AI features, we may process your content to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Generate text content based on your prompts</li>
                      <li>Create images from your descriptions</li>
                      <li>Improve AI model performance and accuracy</li>
                      <li>Ensure content appropriateness and safety</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      Your original prompts and generated content are processed securely and may be temporarily stored to improve our services.
                    </p>
                  </section>

                  {/* Data Sharing */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">6. Data Sharing and Disclosure</h2>
                    <p className="text-muted-foreground mb-3">
                      We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>With your explicit consent</li>
                      <li>To comply with legal requirements</li>
                      <li>To protect our rights and safety</li>
                      <li>With service providers who assist in our operations</li>
                      <li>In connection with business transfers or mergers</li>
                    </ul>
                  </section>

                  {/* Your Rights */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">7. Your Rights and Choices</h2>
                    <p className="text-muted-foreground mb-3">
                      You have the following rights regarding your personal information:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Access and review your personal data</li>
                      <li>Request correction of inaccurate information</li>
                      <li>Request deletion of your personal data</li>
                      <li>Opt-out of certain data collection</li>
                      <li>Export your data in a portable format</li>
                      <li>Withdraw consent for data processing</li>
                    </ul>
                  </section>

                  {/* Cookies and Tracking */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">8. Cookies and Tracking</h2>
                    <p className="text-muted-foreground mb-3">
                      We use cookies and similar technologies to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Remember your preferences and settings</li>
                      <li>Analyze application usage and performance</li>
                      <li>Provide personalized experiences</li>
                      <li>Ensure security and prevent fraud</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      You can control cookie settings through your browser preferences.
                    </p>
                  </section>

                  {/* Third-Party Services */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">9. Third-Party Services</h2>
                    <p className="text-muted-foreground mb-3">
                      Our application may integrate with third-party services for:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>AI content generation</li>
                      <li>Analytics and performance monitoring</li>
                      <li>Customer support tools</li>
                      <li>Payment processing (if applicable)</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      These services have their own privacy policies, and we encourage you to review them.
                    </p>
                  </section>

                  {/* Data Retention */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">10. Data Retention</h2>
                    <p className="text-muted-foreground mb-3">
                      We retain your information for as long as necessary to:
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground ml-4 space-y-1">
                      <li>Provide our services</li>
                      <li>Comply with legal obligations</li>
                      <li>Resolve disputes and enforce agreements</li>
                      <li>Improve our services</li>
                    </ul>
                    <p className="text-muted-foreground mt-3">
                      Vision board content is stored locally on your device and can be deleted at any time.
                    </p>
                  </section>

                  {/* Children's Privacy */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">11. Children's Privacy</h2>
                    <p className="text-muted-foreground mb-3">
                      Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                    </p>
                  </section>

                  {/* Changes to Policy */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">12. Changes to This Policy</h2>
                    <p className="text-muted-foreground mb-3">
                      We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                    </p>
                  </section>

                  {/* Contact Us */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">13. Contact Us</h2>
                    <p className="text-muted-foreground mb-3">
                      If you have any questions about this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-muted/20 p-4 rounded-lg">
                      <p className="text-primary font-medium mb-2">Email: summer.duanzy@gmail.com</p>
                      <p className="text-sm text-muted-foreground">
                        We will respond to your inquiry within 24 hours.
                      </p>
                    </div>
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

export default Privacy;
