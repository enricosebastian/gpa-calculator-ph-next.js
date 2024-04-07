import type { Metadata } from "next";
import "./globals.css";

import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description: "Created for university students in the Philippines",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
        <body className="flex h-screen flex-col">
          <Header></Header>
          <div className="flex-grow flex content-center justify-center bg-red-300">
            {children}
          </div>
          <Footer></Footer>
        </body>
    </html>
  );
}
