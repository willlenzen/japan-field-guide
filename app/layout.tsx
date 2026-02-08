import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Japan Field Guide — 東京 '26",
  description:
    "Personal Tokyo trip guide · February 12–20, 2026 · Built with Claude",
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0C0C0C",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ backgroundColor: "#0C0C0C" }}>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        style={{ backgroundColor: "#0C0C0C", color: "#FCFAF2" }}
      >
        {children}
      </body>
    </html>
  );
}
