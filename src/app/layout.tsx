import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a2c66",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tzgenergy.com"),
  title: { default: "TZG Energy — Premium LiFePO4 Energy Storage Systems", template: "%s | TZG Energy" },
  description: "Manufacturer of premium LiFePO4 battery energy storage systems for residential, commercial, and utility-scale applications. Trusted in 50+ countries.",
  keywords: ["energy storage system", "BESS", "LiFePO4 battery", "residential battery", "commercial battery storage", "utility scale battery"],
  authors: [{ name: "TZG Energy" }],
  creator: "TZG Energy",
  publisher: "TZG Energy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tzgenergy.com",
    siteName: "TZG Energy",
    title: "TZG Energy — Premium Energy Storage Systems",
    description: "Premium LiFePO4 energy storage systems for global markets.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "TZG Energy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "TZG Energy",
    description: "Premium LiFePO4 energy storage systems for global markets.",
  },
  robots: {
    index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en", "ru": "/ru", "ar": "/ar", "x-default": "/en",
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
