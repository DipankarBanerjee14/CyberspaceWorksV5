import { HeroParallax } from '@/components/ui/hero-parallax'
import React from 'react'
// import HomePage from './hero-section/page'
import HeroParallaxDemo from './hero-section/page'
import SoftwareShowcase from './our-product/page'
import AboutPage from './about/page'
// import { BentoDemo } from '@/components/ui/bento-grid'
import FeaturesSection from './feature-section/page'
import TestimonialsSection from './testimonials-section/page'
import ContactSection from '@/components/HomeComponents/ContactForm'
import type { Metadata } from "next";


export const metadata: Metadata = {

  title: "Innovative Software Products & Digital Solutions | Cyberspace Works",
  description:
    "Explore Cyberspace Works' suite of digital products. From powerful Desktop and Mobile apps to ERP softwares, we build scalable solutions designed to drive real results and empower your business growth.",
  keywords: [
    "software products",
    "digital solutions",
    "custom web applications",
    "business growth tools",
    "enterprise software",
    "Cyberspace Works products",
    "scalable digital tools",
  ],
  alternates: {
    canonical: "https://cyberspaceworks.com/products",
  },
  openGraph: {
    title: "Innovative Software Products & Digital Solutions | Cyberspace Works",
    description:
      "Explore Cyberspace Works' suite of digital products. From powerful Desktop and Mobile apps to ERP softwares, we build scalable solutions designed to drive real results and empower your business growth.",
    url: "https://cyberspaceworks.com/products",
    siteName: "Cyberspace Works",
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Innovative Software Products & Digital Solutions | Cyberspace Works",
  //   description:
  //     "Explore Cyberspace Works' suite of digital products. From powerful Desktop and Mobile apps to ERP softwares, we build scalable solutions designed to drive real results and empower your business growth.",
  // },
};
const page = () => {
 
  return (
    <div>
      <HeroParallaxDemo/>
      {/* <SoftwareShowcase/> */}
      <SoftwareShowcase/>
      <AboutPage/>
      <FeaturesSection/>
      <TestimonialsSection/>
      <ContactSection/>
    </div>
  )
}

export default page
