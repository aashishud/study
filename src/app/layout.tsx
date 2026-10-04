import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Audio Study Guide",
  description: "A hyper-optimized study engine. Part of the Pulse.gg brand. Made by Sour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        
        {/* Global Branding Watermark */}
        <div className="fixed bottom-3 right-4 z-50 pointer-events-none opacity-40 hover:opacity-100 transition-opacity duration-300">
          <p className="text-[10px] sm:text-xs font-mono tracking-wider text-white mix-blend-difference drop-shadow-md">
            <a href="https://pulsegg.in" target="_blank" rel="noopener noreferrer" className="font-bold pointer-events-auto hover:text-rose-400 transition-colors">PULSEGG</a> • MADE BY SOUR
          </p>
        </div>
        
        <Analytics />
      </body>
    </html>
  );
}
