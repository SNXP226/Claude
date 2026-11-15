import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/i18n/LangProvider";
import Splash from "@/components/Splash";

export const metadata: Metadata = {
  title: "ReadyBoard",
  description: "Ingen behöver ropa ut ordernummer längre.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

// Hides the splash before the first paint if it was already shown this session.
const splashCheck = `try{if(sessionStorage.getItem('rb-splash'))document.documentElement.classList.add('no-splash')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashCheck }} />
      </head>
      <body className="antialiased">
        <Splash />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
