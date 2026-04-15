import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookingModal, { BookingProvider } from "./components/BookingModal";
import ScrollToTop from "./components/ScrollToTop";
import NewsletterPopup from "./components/NewsletterPopup";
import FloatingEnquiry from "./components/FloatingEnquiry";

export const metadata: Metadata = {
  title: "Madura Travel | Explore the World",
  description: "Experience premium travel with Madura Travel. Book your next adventure with us.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ScrollToTop />
        <BookingProvider>
          <Navbar />
          <main className="flex-1 pt-[64px] md:pt-[74px]">
            {children}
          </main>
          <Footer />
          <NewsletterPopup />
          <FloatingEnquiry />
        </BookingProvider>
      </body>
    </html>
  );
}
