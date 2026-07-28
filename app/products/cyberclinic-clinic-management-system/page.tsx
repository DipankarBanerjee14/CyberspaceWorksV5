import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'

// Metadata for the landing page
// export const metadata: Metadata = {
//   title: "CyberClinic: Smart Clinic Management & EMR Software | Cyberspace Works",

//   description:
//     "Streamline patient care with CyberClinic. Securely manage electronic medical records (EMR), automate doctor scheduling, and generate rapid digital prescriptions and billing.",

//   keywords: [
//     "clinic management system",
//     "doctor EMR software",
//     "patient scheduling software",
//     "digital prescription app",
//     "healthcare practice management",
//   ],

//   alternates: {
//     canonical:
//       "https://cyberspaceworks.com/products/cyberclinic-clinic-management-system",
//   },
  
// }


export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title:
    "CyberClinic: Smart Clinic Management & EMR Software | Cyberspace Works",

  description:
    "Streamline patient care with CyberClinic. Securely manage electronic medical records (EMR), automate doctor scheduling, and generate rapid digital prescriptions and billing.",

  keywords: [
    "clinic management system",
    "doctor EMR software",
    "patient scheduling software",
    "digital prescription app",
    "healthcare practice management",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberclinic-clinic-management-system",
  },

  openGraph: {
    title:
      "CyberClinic: Smart Clinic Management & EMR Software | Cyberspace Works",
    description:
      "Streamline patient care with CyberClinic. Securely manage electronic medical records (EMR), automate doctor scheduling, and generate rapid digital prescriptions and billing.",
    url: "https://cyberspaceworks.com/products/cyberclinic-clinic-management-system",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title:
  //     "CyberClinic: Smart Clinic Management & EMR Software | Cyberspace Works",
  //   description:
  //     "Streamline patient care with CyberClinic. Securely manage electronic medical records (EMR), automate doctor scheduling, and generate rapid digital prescriptions and billing.",
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};


export default function LandingPage() {
  return <LandingPageContent />
}