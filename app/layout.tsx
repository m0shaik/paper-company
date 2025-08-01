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
      <body className="bg-paper">
        <link rel="icon" href="https://www.wix.com/favicon.ico" />
        {process.env.WIX_CLIENT_ID ? (
          <ClientProvider>
            <NextTopLoader shadow={false} showSpinner={false} />
            <Header />
            <main className="bg-paper min-h-[37.5rem]">
              <LayoutProvider>{children}</LayoutProvider>
            </main>
            <SidebarUI />
            <div className="mt-3 sm:mt-9">
              <Footer />
            </div>
          </ClientProvider>
        ) : (
          <div className="bg-paper min-h-[37.5rem] max-w-5xl mx-auto p-5">
            Page not available. Please add an environment variable called
            WIX_CLIENT_ID, containing the client ID, to your
            deployment provider.
          </div>
        )}
      </body>
    </html>
  );
}
