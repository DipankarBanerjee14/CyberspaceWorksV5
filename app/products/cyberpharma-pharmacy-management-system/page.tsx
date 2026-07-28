import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'



// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title: "CyberPharma: Pharmacy Billing & Inventory Software | Cyberspace Works",

  description:
    "Take control of your medical retail store with CyberPharma. Track drug batch numbers, manage inventory expiry alerts, and generate tax-compliant digital invoices instantly.",

  keywords: [
   
    "pharmacy management system", "pharmacy billing software", "medical store stock tracker", "chemist inventory app", "pharmaceutical retail software"
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberpharma-pharmacy-management-system",
  },

  openGraph: {
    title: "CyberPharma: Pharmacy Billing & Inventory Software | Cyberspace Works",
    description:
      "Take control of your medical retail store with CyberPharma. Track drug batch numbers, manage inventory expiry alerts, and generate tax-compliant digital invoices instantly.",
    url: "https://cyberspaceworks.com/products/cyberpharma-pharmacy-management-system",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "CyberPayroll: Automated HRMS & Payroll Software | Cyberspace Works",
  //   description:
  //     "Simplify your human resources operations with CyberPayroll. Automate complex salary calculations, manage employee attendance, and generate compliant payslips effortlessly.",
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};



export default function LandingPage() {
  return <LandingPageContent />
}