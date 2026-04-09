import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BookingProvider } from "./components/BookingModal";

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
        <BookingProvider>
          <Navbar />
          <main className="flex-1 pt-[74px]">
            {children}
          </main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
