import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "PH GPA Calculator",
  description: "Powered by Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="main">{children}</body>
    </html>
  );
}
