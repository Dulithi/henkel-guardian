import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daring Challenge",
  description: "Created for the AIESEC International Congress 2025",
  icons: {
    icon:"/2560px-Henkel-Logo.svg.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
