import '../styles/globals.css';
import Footer from './components/Layout/Footer';
import Header from './components/Layout/Header';
import { SidebarUI } from './components/Sidebar/SidebarUI';
import { Metadata } from 'next';
import { LayoutProvider } from '@/app/components/LayoutProvider/LayoutProvider';
import NextTopLoader from 'nextjs-toploader';
import { ClientProvider } from '@/app/components/Provider/Providers';
import { getPageSEO } from '@/app/lib/seo';
import { StructuredDataScript } from '@/app/components/SEO/StructuredData';
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from '@/app/lib/structured-data';
import { GoogleAnalytics } from '@/app/components/SEO/GoogleAnalytics';

export const metadata: Metadata = getPageSEO('home');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head>
        <StructuredDataScript data={[organizationSchema, websiteSchema]} />
        {GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={GA_MEASUREMENT_ID} />
        )}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="relative paper-texture">
        {/* Site-wide decorative color blobs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Large pink blob - top left area */}
          <div className="absolute -top-8 left-8 w-80 h-80 bg-primary-600 rounded-full opacity-20 blur-3xl blob-texture animate-blob-drift-1"></div>

          {/* Large orange blob - top right area */}
          <div className="absolute top-32 right-8 w-96 h-96 bg-secondary-600 rounded-full opacity-20 blur-3xl blob-texture animate-blob-drift-2"></div>

          {/* Large purple blob - bottom center */}
          <div className="absolute bottom-[200px] left-1/2 w-72 h-72 bg-accent-700 rounded-full opacity-30 blur-3xl blob-texture animate-blob-drift-3"></div>
        </div>

        {process.env.WIX_CLIENT_ID ? (
          <ClientProvider>
            <div className="relative z-10 min-h-screen flex flex-col">
              <NextTopLoader shadow={false} showSpinner={false} />
              <Header />
              <main className="flex-1 min-h-[37.5rem]">
                <LayoutProvider>{children}</LayoutProvider>
              </main>
              <SidebarUI />
              <Footer />
            </div>
          </ClientProvider>
        ) : (
          <div className="bg-paper min-h-[37.5rem] max-w-5xl mx-auto p-5 relative z-10">
            Page not available. Please add an environment variable called
            WIX_CLIENT_ID, containing the client ID, to your deployment
            provider.
          </div>
        )}
      </body>
    </html>
  );
}
