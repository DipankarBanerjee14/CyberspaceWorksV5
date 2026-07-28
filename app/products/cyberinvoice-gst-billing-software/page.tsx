import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title: "CyberInvoice: GST Billing & Invoicing Software | Cyberspace Works",

  description:
    "Create professional, tax-compliant invoices in seconds with CyberInvoice. Automate GST calculations, track outstanding client dues, and manage business bills smoothly.",

  keywords: [
    "GST billing software",
    "tax invoice generator",
    "small business invoicing app",
    "client billing software",
    "automated receipt maker",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberinvoice-gst-billing-software",
  },

  openGraph: {
    title: "CyberInvoice: GST Billing & Invoicing Software | Cyberspace Works",
    description:
      "Create professional, tax-compliant invoices in seconds with CyberInvoice. Automate GST calculations, track outstanding client dues, and manage business bills smoothly.",
    url: "https://cyberspaceworks.com/products/cyberinvoice-gst-billing-software",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },



};

export default function LandingPage() {
  return <LandingPageContent />
}