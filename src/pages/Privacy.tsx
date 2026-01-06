import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-4">
            <strong>Effective Date:</strong> January 1, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Northstar Cloud Solutions LLC ("Company," "we," "us," or "our") respects your privacy and is 
              committed to protecting your personal data. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you use our products and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect minimal information necessary to operate our website. We do not collect personal data unless 
              you voluntarily contact us by email. The information we may collect includes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and device information for security and website functionality purposes.</li>
              <li><strong>Contact Information:</strong> If you contact us by email, we collect the information you provide in your message.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We use essential cookies only for website operation. We do not use tracking cookies or third-party analytics 
              without your explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Respond to your inquiries and provide customer support.</li>
              <li>Improve our products, services, and website experience.</li>
              <li>Comply with legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain personal data only for as long as necessary to fulfill the purposes for which it was 
              collected, including to satisfy any legal, accounting, or reporting requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal data 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Depending on your jurisdiction, you may have the right to access, correct, delete, or port your 
              personal data. To exercise these rights, please contact us using the information below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy, please contact us at:{" "}
              <a href="mailto:support@northstarcloud.io" className="text-accent hover:underline">
                support@northstarcloud.io
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
