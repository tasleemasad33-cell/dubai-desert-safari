import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dubai Desert Adventures | Luxury Safari & Tours",
  description: "Experience the ultimate luxury desert safari in Dubai. Premium tours, VIP experiences, and unforgettable adventures in the heart of the Arabian desert.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground min-h-full flex flex-col">
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
