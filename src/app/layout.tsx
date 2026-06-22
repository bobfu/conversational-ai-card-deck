import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conversational AI Card Deck",
  description: "Build & Grow card generator for RTE Developer Community"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
