import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import 'react-toastify/ReactToastify.css';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de imagem",
  description: "Sistema de imagem usando docker, Java e Next",
    icons: {
        icon: [
            { url: '/faviconNew.ico' },
            { url: '/icon.png', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-icon.png' },
        ],
    }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
