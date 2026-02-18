import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { NotificationProvider } from "./admin/context/NotificationContext";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Abhinandan Events | Premier Wedding & Event Planners",
  description: "Planning and celebrating your precious moments since 2010. Expert event management in Amravati and Pune.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${serif.variable} ${sans.variable} bg-[#0a0a0a] text-white antialiased`}>
        <NotificationProvider>
        {children}
        </NotificationProvider>
      </body>
    </html>
  );
}