import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// import type { Metadata } from "next";
// import { LandingPageContent } from "./landing-page-content";

// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title: "CyberRetail: Retail Shop Billing & Inventory Software | Cyberspace Works",

  description:
    "Scale your retail business with CyberRetail. Pair high-velocity POS billing with automated inventory alerts, multi-location tracking, and deep sales analytics dashboards.",

  keywords: [
    "store management system",
    "retail billing software",
    "shop POS application",
    "retail inventory management",
    "barcode billing tool",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberretail-store-management-system",
  },

  openGraph: {
    title: "CyberRetail: Retail Shop Billing & Inventory Software | Cyberspace Works",
    description:
      "Scale your retail business with CyberRetail. Pair high-velocity POS billing with automated inventory alerts, multi-location tracking, and deep sales analytics dashboards.",
    url: "https://cyberspaceworks.com/products/cyberretail-store-management-system",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "CyberRetail: Retail Shop Billing & Inventory Software | Cyberspace Works",
  //   description:
  //     "Scale your retail business with CyberRetail. Pair high-velocity POS billing with automated inventory alerts, multi-location tracking, and deep sales analytics dashboards.",
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};



export default function LandingPage() {
  return <LandingPageContent />
}