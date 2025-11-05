import type { Metadata } from "next";
import Navbar from "@/components/ui/NavBar"
import Footer from "@/components/ui/Footer"
import "./globals.css";

export const metadata: Metadata = {
  title: "Star to Write",
  description: "sexy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}