import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'



// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title: "CyberLedger: Business Accounting & Ledger Software | Cyberspace Works",

  description:
    "Maintain perfect financial clarity with CyberLedger. Track cash flow, manage double-entry bookkeeping, and generate instant balance sheets and profit & loss reports.",

  keywords: [
    "business accounting software",
    "digital ledger app",
    "financial auditing tool",
    "corporate bookkeeping system",
    "profit and loss tracker",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberledger-accounting-software",
  },

  openGraph: {
    title: "CyberLedger: Business Accounting & Ledger Software | Cyberspace Works",
    description:
      "Maintain perfect financial clarity with CyberLedger. Track cash flow, manage double-entry bookkeeping, and generate instant balance sheets and profit & loss reports.",
    url: "https://cyberspaceworks.com/products/cyberledger-accounting-software",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "CyberLedger: Business Accounting & Ledger Software | Cyberspace Works",
  //   description:
  //     "Maintain perfect financial clarity with CyberLedger. Track cash flow, manage double-entry bookkeeping, and generate instant balance sheets and profit & loss reports.",
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};



export default function LandingPage() {
  return <LandingPageContent />
}