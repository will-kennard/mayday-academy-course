import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getCourse } from "@/lib/course";
import { SITE_URL } from "@/lib/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const course = getCourse();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${course.title} | Mayday Academy`,
    template: "%s | Mayday Academy",
  },
  description: course.description,
  openGraph: {
    title: `${course.title} | Mayday Academy`,
    description: course.description,
    siteName: "Mayday Academy",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
