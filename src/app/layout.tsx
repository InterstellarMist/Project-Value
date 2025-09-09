import "@/styles/globals.css";
import { Inter_Tight, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { NavigationBar } from "@/components/NavigationBar";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

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
          <div className="blurry-bg">{children}</div>
        </Suspense>
        <NavigationBar variant="glass" />
      </body>
    </html>
  );
}
