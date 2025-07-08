"use client";

import { AppProvider } from "@/context/AppContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Service from "@/components/section/Service";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Service />
      <Footer />
    </AppProvider>
  );
}
