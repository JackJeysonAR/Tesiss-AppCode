
import type { Metadata } from "next";
import { Geist } from "next/font/google"; // Using Geist Sans as primary modern sans-serif
import "./globals.css";
import { AuthGuard } from "@/components/app/auth-guard"; // Import AuthGuard
import { Toaster } from "@/components/ui/toaster"; // Keep Toaster here for global availability

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WheelTaxi Huancayo 2025",
  description: "Accessible ride-hailing for Huancayo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} font-sans antialiased`} suppressHydrationWarning>
        <AuthGuard>{children}</AuthGuard>
        <Toaster />
      </body>
    </html>
  );
}
