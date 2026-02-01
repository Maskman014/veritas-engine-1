import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Veritas Engine - Fake News Detection",
  description: "Real-time fake news detection using Gemini AI",
  keywords: ["fake news", "fact-check", "ai", "gemini"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
