// biome-ignore-all lint/style/useComponentExportOnlyModules: valid Next.js exports
import "@/styles/globals.css";
import type { Viewport } from "next";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { InitLoaders } from "@/components/init/initLoaders";
import { NavigationBar } from "@/components/NavigationBar";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Suspense fallback={<>...Loading</>}>
          <div className="blurry-bg min-w-[24rem]">
            <InitLoaders>{children}</InitLoaders>
          </div>
        </Suspense>
        <NavigationBar variant="glass" />
      </body>
    </html>
  );
}
