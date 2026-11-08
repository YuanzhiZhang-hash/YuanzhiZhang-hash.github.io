import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/vs2015.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { BackgroundProvider } from "@/components/providers/BackgroundProvider";
import { MusicProvider } from "@/components/providers/MusicProvider";
import { EffectProvider } from "@/components/providers/EffectProvider";
import BackgroundRenderer from "@/components/layout/BackgroundRenderer";
import Navbar from "@/components/layout/Navbar";
import ClientWidgets from "@/components/layout/ClientWidgets";
import ClickEffect from "@/components/ui/ClickEffect";
import RadialMenu from "@/components/ui/RadialMenu";
import MouseTrail from "@/components/ui/MouseTrail";
import SeasonalEffect from "@/components/ui/SeasonalEffect";
import KiraSparkle from "@/components/ui/KiraSparkle";
import WelcomeScreen from "@/components/layout/WelcomeScreen";
import VisitorTracker from "@/components/layout/VisitorTracker";
import { loadSiteConfig } from "@/lib/site-config";
import { SiteConfigProvider } from "@/components/providers/SiteConfigProvider";

export async function generateMetadata(): Promise<Metadata> {
  const config = await loadSiteConfig();
  return {
  title: config.title,
  description: config.bio,
  alternates: {
    types: {
      "application/rss+xml": "/feed.xml",
    },
  },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await loadSiteConfig();
  return (
    <html
      lang="zh-CN"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <SiteConfigProvider initialConfig={config}>
        <ThemeProvider>
          <EffectProvider>
            <WelcomeScreen />
            <BackgroundProvider>
              <MusicProvider>
                <ToastProvider>
                  <BackgroundRenderer />
                  <VisitorTracker />
                  <ClickEffect />
                  <RadialMenu />
                  <MouseTrail />
                  <SeasonalEffect />
                  <KiraSparkle />
                  <Navbar />
                  <main className="flex-1 pt-16">
                    {children}
                  </main>
                  <ClientWidgets />
                </ToastProvider>
              </MusicProvider>
            </BackgroundProvider>
          </EffectProvider>
        </ThemeProvider>
        </SiteConfigProvider>
      </body>
    </html>
  );
}
