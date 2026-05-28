import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export default function RootLayout
export const metadata = {
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
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhimant's Portfolio",
  description:
    "Portfolio showcasing with the works of Dhimant Jaiswal, a passionate editor and creator. Explore a curated selection of projects that highlight Dhimant's skills in web development, design, and innovation. Each project is a testament to Dhimant's dedication to crafting seamless digital experiences. Dive in to see how Dhimant brings ideas to life through code and creativity.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
