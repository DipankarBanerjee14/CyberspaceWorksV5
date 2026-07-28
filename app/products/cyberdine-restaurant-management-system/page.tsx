import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'


// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title: "CyberDine: Advanced Restaurant Management Software | Cyberspace Works",

  description:
    "Optimize your kitchen, billing, and seating workflows with CyberDine. A comprehensive restaurant management and POS system built for cloud kitchens, cafes, and fine dining.",

  keywords: [
    "restaurant management system",
    "restaurant POS software",
    "cloud kitchen billing software",
    "table management tool",
    "cafe billing app",
    "Cyberspace Works",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberdine-restaurant-management-system",
  },

  openGraph: {
    title: "CyberDine: Advanced Restaurant Management Software | Cyberspace Works",
    description:
      "Optimize your kitchen, billing, and seating workflows with CyberDine. A comprehensive restaurant management and POS system built for cloud kitchens, cafes, and fine dining.",
    url: "https://cyberspaceworks.com/products/cyberdine-restaurant-management-system",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "CyberDine: Advanced Restaurant Management Software | Cyberspace Works",
  //   description:
  //     "Optimize your kitchen, billing, and seating workflows with CyberDine. A comprehensive restaurant management and POS system built for cloud kitchens, cafes, and fine dining.",
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};



export default function LandingPage() {
  return <LandingPageContent />
}