import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import SideBarList from "@/components/SideBarList";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel Healthcare",
  description: "Admin Panel for Travel Healthcare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-hidden">
      <body className={inter.className}>
        {children}
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
