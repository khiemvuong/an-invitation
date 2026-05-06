import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phương An — Graduation 2026",
  description: "Phương An Graduation 2026 Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
      </head>
      <body>{children}</body>
    </html>
  );
}
