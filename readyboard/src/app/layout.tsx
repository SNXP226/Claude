import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/i18n/LangProvider";

export const metadata: Metadata = {
  title: "ReadyBoard",
  description: "Visa ordernummer på en skärm – ingen behöver ropa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c1917",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body className="antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
