import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AnimationProvider } from "@/contexts/AnimationContext";
import { ResponsiveProvider } from "@/contexts/ResponsiveProvider";
import { NavigationWrapper } from "@/components/navigation/NavigationWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maelstrom Global",
    template: "%s | Maelstrom Global",
  },
  description: "Maelstrom Global - Official Company Website",
  keywords: ["Maelstrom Global", "Corporate Website"],
  authors: [{ name: "Maelstrom Global" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Maelstrom Global",
    title: "Maelstrom Global",
    description: "Maelstrom Global - Official Company Website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maelstrom Global",
    description: "Maelstrom Global - Official Company Website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ResponsiveProvider>
          <AnimationProvider enableSmoothScroll={true}>
            <NavigationWrapper />
            {children}
          </AnimationProvider>
        </ResponsiveProvider>
      </body>
    </html>
  );
}
