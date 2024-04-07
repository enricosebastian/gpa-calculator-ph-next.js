import type { Metadata } from "next";
import "./globals.css";

import Header from "./_components/Header";
import Content from "./Content";
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
          <Content></Content>
          <Footer></Footer>
        </body>
    </html>
  );
}
