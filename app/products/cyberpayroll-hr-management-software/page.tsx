import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title: "CyberPayroll: Automated HRMS & Payroll Software | Cyberspace Works",

  description:
    "Simplify your human resources operations with CyberPayroll. Automate complex salary calculations, manage employee attendance, and generate compliant payslips effortlessly.",

  keywords: [
    "HR management software",
    "automated payroll system",
    "HRMS platform",
    "employee attendance tracker",
    "salary slip generator",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberpayroll-hr-management-software",
  },

  openGraph: {
    title: "CyberPayroll: Automated HRMS & Payroll Software | Cyberspace Works",
    description:
      "Simplify your human resources operations with CyberPayroll. Automate complex salary calculations, manage employee attendance, and generate compliant payslips effortlessly.",
    url: "https://cyberspaceworks.com/products/cyberpayroll-hr-management-software",
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