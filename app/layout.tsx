import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";

import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "eManage",
  description: "A platform for managing staff in the care sector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontSans.className}>
        <div className="flex min-h-screen justify-between w-full flex-col">
          <MainNav />
          <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-8">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
