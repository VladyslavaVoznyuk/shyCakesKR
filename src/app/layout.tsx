import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";
import Footer from '@/components/Footer/footer';
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shy Cakes",
  description: "Мусові торти, Бісквітні торти, Macarons, Ескімо, Cake-pops, Подарункові набори",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Providers>
        <Header />
        {children}
        <Footer />
      </Providers>
      </body>
      </html>
  );
}
