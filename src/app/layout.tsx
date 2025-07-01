import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Service from "@/components/Service";
import { AppProvider } from "@/context/AppContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jewelry Shop - Trang sức cao cấp",
  description: "Khám phá bộ sưu tập trang sức tinh xảo và đẳng cấp.",
  keywords: ["trang sức", "jewelry", "vàng", "bạc", "phụ kiện", "cao cấp"],
  metadataBase: new URL("https://jewelryshop.vn"),
  openGraph: {
    title: "Jewelry Shop",
    description: "Trang sức phong cách, đẳng cấp và tinh xảo.",
    url: "https://jewelryshop.vn",
    siteName: "Jewelry Shop",
    images: [
      {
        url: "/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Jewelry Shop",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewelry Shop",
    description: "Khám phá trang sức đỉnh cao tại Jewelry Shop",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Service />
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
