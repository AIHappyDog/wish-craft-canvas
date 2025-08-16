import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Shield, Users, Clock } from "lucide-react";

const Terms = () => {
  const lastUpdated = "December 2024";

  return (
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
              Please read these terms carefully before using WishCraft Vision Board. 
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
                These terms govern your use of WishCraft Vision Board
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
                      By accessing and using WishCraft Vision Board ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                    </p>
                  </section>

                  {/* Description of Service */}
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                    <p className="text-muted-foreground mb-3">
                      WishCraft Vision Board is an AI-powered application that allows users to create and manage personal vision boards. The service includes:
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
                      The Service and its original content, features, and functionality are and will remain the exclusive property of WishCraft and its licensors. The Service is protected by copyright, trademark, and other laws.
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
                      In no event shall WishCraft be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
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
  );
};

export default Terms;
