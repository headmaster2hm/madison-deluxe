import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Madison Deluxe Spa & Wellness Center | Book Your Appointment",
  description:
    "Experience luxury spa treatments, therapeutic massage, and holistic wellness services. Book your appointment at Madison Deluxe Spa & Wellness Center today.",
  keywords: [
    "spa",
    "massage",
    "wellness",
    "Madison Deluxe",
    "book appointment",
    "facial",
    "aromatherapy",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${cormorant.variable} ${outfit.variable} font-sans antialiased bg-cream-50 text-sage-800`}
      >
        {children}
      </body>
    </html>
  );
}
