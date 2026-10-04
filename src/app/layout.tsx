import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Noise } from "@/components/ui/noise";
import { SmoothScroll } from "@/components/smooth-scroll";
import { STUDIO } from "@/lib/studio-data";
import { PageEntrance } from "@/components/page-entrance";

const quicksand = localFont({
  src: [
    {
      path: "../../public/fonts/quicksand/Quicksand-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/quicksand/Quicksand-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/quicksand/Quicksand-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/quicksand/Quicksand-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/quicksand/Quicksand-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-quicksand",
  display: "swap",
});

const tanker = localFont({
  src: "../../public/fonts/tanker/Tanker-Regular.otf",
  variable: "--font-tanker",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BellCurve Studios — Crafting Immersive Digital Experiences",
  description: `${STUDIO.description} Bespoke WebGL/WebGPU engineering, fluid GSAP motion, procedural 3D art, and high-performance digital products.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${tanker.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#ddddd8] text-[#141414] antialiased">
        <SmoothScroll><PageEntrance>{children}</PageEntrance></SmoothScroll>
        <Noise
          fullScreen
          className="pointer-events-none fixed inset-0 z-50 h-full w-full"
          patternAlpha={30}
          patternSize={250}
        />
      </body>
    </html>
  );
}
