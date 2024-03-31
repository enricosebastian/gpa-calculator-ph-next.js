import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description: "Created for university students in the Philippines",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
        <body>{children}</body>
    </html>
  );
}
