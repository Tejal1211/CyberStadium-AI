import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "CyberStadium AI - The AI Brain Behind FIFA World Cup 2026",
  description: "A premium AI-powered operations platform transforming fan experiences, stadium management, and real-time decision-making during the FIFA World Cup 2026.",
  keywords: ["FIFA World Cup 2026", "Generative AI", "Smart Stadium", "Operations Center", "Crowd Intelligence", "Indoor Navigation"],
  authors: [{ name: "CyberStadium AI Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark scroll-smooth">
      <body className="min-h-full flex flex-col bg-cyber-bg text-slate-100 font-sans selection:bg-primary/30 selection:text-white">
        <LenisProvider>
          <CustomCursor />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
