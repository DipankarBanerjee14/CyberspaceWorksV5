import type { Metadata } from 'next'
import { LandingPageContent } from './landing-page-content'


// Metadata for the landing page
export const metadata: Metadata = {
  metadataBase: new URL("https://cyberspaceworks.com"),

  title:
    "CyberProjects: Enterprise Project Management Software | Cyberspace Works",

  description:
    "Centralize your team's workflows using CyberProjects. Plan project timelines, track task dependencies, and collaborate seamlessly across your organization in one unified hub.",

  keywords: [
    "project management software",
    "team collaboration tool",
    "task management platform",
    "workflow tracking app",
    "enterprise project planner",
  ],

  alternates: {
    canonical:
      "https://cyberspaceworks.com/products/cyberprojects-project-management-software",
  },

  openGraph: {
    title:
      "CyberProjects: Enterprise Project Management Software | Cyberspace Works",
    description:
      "Centralize your team's workflows using CyberProjects. Plan project timelines, track task dependencies, and collaborate seamlessly across your organization in one unified hub.",
    url: "https://cyberspaceworks.com/products/cyberprojects-project-management-software",
    siteName: "Cyberspace Works",
    type: "website",
    locale: "en_US",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title:
  //     "CyberProjects: Enterprise Project Management Software | Cyberspace Works",
  //   description:
  //     "Centralize your team's workflows using CyberProjects. Plan project timelines, track task dependencies, and collaborate seamlessly across your organization in one unified hub.",
  // },

  // robots: {
  //   index: true,
  //   follow: true,
  // },
};


export default function LandingPage() {
  return <LandingPageContent />
}