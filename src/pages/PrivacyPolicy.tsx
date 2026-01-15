import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ThemeProvider } from '../hooks/use-theme';

const PrivacyPolicy = () => {
  return (
    <ThemeProvider>
      <Helmet>
        <title>Privacy Policy | E-Code Halal Check</title>
        <meta name="description" content="Privacy Policy for E-Code Halal Check. Learn how we handle your data and protect your privacy." />
        <link rel="canonical" href="https://www.ecodehalalcheck.com/privacy-policy" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main id="main-content" className="flex-grow">
          <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <p className="text-muted-foreground mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                E-Code Halal Check ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and Progressive Web App (PWA).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect minimal information to provide our service:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Usage Data:</strong> We may collect anonymous usage statistics such as pages visited, search queries, and device type to improve our service.</li>
                <li><strong>Local Storage:</strong> We store your preferences (such as theme settings) locally on your device. This data never leaves your device.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide and maintain our service</li>
                <li>Improve user experience</li>
                <li>Analyze usage patterns to enhance our features</li>
                <li>Remember your preferences across sessions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Data Storage and Security</h2>
              <p className="text-muted-foreground mb-4">
                Our app is designed with privacy in mind. The E-code database is embedded directly in the application, meaning your searches are processed locally on your device. We do not store your search history on our servers.
              </p>
              <p className="text-muted-foreground mb-4">
                As a Progressive Web App, E-Code Halal Check can work offline once installed, ensuring your data stays on your device.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We may use cookies or similar technologies to enhance your experience. These are used for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Remembering your preferences</li>
                <li>Anonymous analytics to improve our service</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                You can disable cookies in your browser settings, though this may affect some functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-muted-foreground mb-4">
                We may use third-party services for analytics. These services have their own privacy policies governing the use of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>

            <div className="mt-12 pt-8 border-t">
              <Link
                to="/"
                className="text-primary hover:underline"
              >
                &larr; Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;
