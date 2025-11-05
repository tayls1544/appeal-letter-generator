import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Appeal Letter Generator",
  description: "Generate professional appeal letters for parking tickets and train fines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
