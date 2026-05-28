import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Dhimant Portfolio",
  description:
    "Cinematic editing, storytelling, motion, and creative direction.",

  openGraph: {
    title: "Dhimant Portfolio",
    description:
      "Cinematic editing, storytelling, motion, and creative direction.",
    url: "https://www.dhimant.space",
    siteName: "Dhimant Portfolio",

    images: [
      {
        url: "/web-logo.jpg",
        width: 1200,
        height: 630,
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dhimant Portfolio",
    description:
      "Cinematic editing, storytelling, motion, and creative direction.",
    images: ["/web-logo.jpg"],
  },
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
      <body className="min-h-full flex flex-col bg-black text-white">
        {children}
      </body>
    </html>
  );
}