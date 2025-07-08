// src/app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout"; // ✅ Import đúng

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jewelry Shop - Trang sức cao cấp",
  description: "Khám phá bộ sưu tập trang sức tinh xảo và đẳng cấp.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <ClientLayout>{children}</ClientLayout> {/* ✅ Đây là thay đổi chính */}
      </body>
    </html>
  );
}
