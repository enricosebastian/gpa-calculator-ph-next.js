import type { Metadata } from "next";
import "./globals.scss";

import { Press_Start_2P } from "next/font/google";
import { VT323 } from "next/font/google";

export const metadata: Metadata = {
  title: "PH GPA Calculator",
  description: "Powered by Next.js",
};

const press_start_2p = Press_Start_2P({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--press-start-2p'
});

const vt323 = VT323({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--vt323'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${press_start_2p.variable} ${vt323.variable}`}>
        {children}
      </body>
    </html>
  );
}
