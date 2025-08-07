import "../styles/globals.css";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import { SidebarUI } from "./components/Sidebar/SidebarUI";
import { Metadata } from "next";
import { LayoutProvider } from "@/app/components/LayoutProvider/LayoutProvider";
import NextTopLoader from "nextjs-toploader";
import { ClientProvider } from '@/app/components/Provider/Providers';

export const metadata: Metadata = {
  title: {
    default: "Create Wix Demo Site",
    template: "%s | Create Wix Demo Site",
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "https://www.wix.com/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative paper-texture">
        {/* Site-wide decorative color blobs */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Large pink blob - top left area */}
          <div className="absolute -top-8 left-8 w-80 h-80 bg-primary-600 rounded-full opacity-20 blur-3xl blob-texture"></div>

          {/* Large orange blob - top right area */}
          <div className="absolute top-32 right-8 w-96 h-96 bg-secondary-600 rounded-full opacity-20 blur-3xl blob-texture"></div>

          {/* Large purple blob - bottom center */}
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-accent-700 rounded-full opacity-30 blur-3xl blob-texture"></div>
        </div>

        <link rel="icon" href="https://www.wix.com/favicon.ico" />
        {process.env.WIX_CLIENT_ID ? (
          <ClientProvider>
            <div className="relative z-10">
              <NextTopLoader shadow={false} showSpinner={false} />
              <Header />
              <main className="min-h-[37.5rem]">
                <LayoutProvider>{children}</LayoutProvider>
              </main>
              <SidebarUI />
              <Footer />
            </div>
          </ClientProvider>
        ) : (
          <div className="bg-paper min-h-[37.5rem] max-w-5xl mx-auto p-5 relative z-10">
            Page not available. Please add an environment variable called
            WIX_CLIENT_ID, containing the client ID, to your
            deployment provider.
          </div>
        )}
      </body>
    </html>
  );
}
