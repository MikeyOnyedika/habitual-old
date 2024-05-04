import type { Metadata } from "next";
import "./globals.css";
import font from "@/app/font"

export const metadata: Metadata = {
  title: "Habitual",
  description: "Track a habit or a deadline countdown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-screen w-screen flex ${font.className}`}>{children}</body>
    </html >
  );
}
