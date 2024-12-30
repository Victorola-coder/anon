import "./global.css";
import { Toaster } from "sonner";
import { AOS } from "./components/global";
import { Montserrat } from "next/font/google";
import type { Metadata, Viewport } from "next";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://Anon.xyz"),
  icons: {
    icon: "/icon.png",
  },
  title: "Anon - Anonymous Messaging Platform",
  description: "Share your thoughts freely and anonymously",
  applicationName: "Anon - Anonymous Messaging Platform",
  authors: [{ name: "Anon", url: "https://Anon.xyz" }],
  keywords: ["Anon", "Anonymous", "Messaging", "Platform"],
  creator: "Anon",
  publisher: "Anon",
  generator: "Next.js",
  referrer: "origin",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "https://Anon.xyz",
    title: "Anon - Anonymous Messaging Platform",
    siteName: "Anon - Anonymous Messaging Platform",
    locale: "en_US",
    images: [
      {
        url: "https://Anon.xyz/og.png",
        width: 1200,
        height: 630,
        alt: "Anon - Anonymous Messaging Platform",
      },
    ],
  },
  twitter: {
    site: "Anon",
    creator: "socialmediahandle",
    title: "Anon - Anonymous Messaging Platform",
    description: "Share your thoughts freely and anonymously",
    card: "summary_large_image",
    images: ["https://Anon.xyz/og.png"],
  },
  appleWebApp: {
    capable: true,
    title: "Anon - Anonymous Messaging Platform",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  abstract: "Share your thoughts freely and anonymously",
  category: "Social",
  classification: "Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <Toaster richColors theme="dark" position="top-center" />
        <AOS />
        {children}
      </body>
    </html>
  );
}
