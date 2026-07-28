"use client"

import React from 'react'
import { LandingNavbar } from './components/navbar'
import { HeroSection } from './components/hero-section'
import { LogoCarousel } from './components/logo-carousel'
import { StatsSection } from './components/stats-section'
import { FeaturesSection } from './components/feature-section'
// import { TeamSection } from './components/t'
import { TestimonialsSection } from './components/testimonials-secion'
import { BlogSection } from './components/blog-section'
import { PricingSection } from './components/pricing-section'
import { CTASection } from './components/cta-section'
import { ContactSection } from './components/contact-section'
import { FaqSection } from './components/faq-section'
import { LandingFooter } from './components/footer'
import { LandingThemeCustomizer, LandingThemeCustomizerTrigger } from './components/landing-theme-customizer'
import Navbar from '@/components/Navbar'
import { SessionProvider } from 'next-auth/react'
import { AboutSection } from './components/about-section'
import Footer from '@/components/Footer'

export function LandingPageContent() {
  const [themeCustomizerOpen, setThemeCustomizerOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <SessionProvider>
        <Navbar />
      </SessionProvider>

      {/* Main Content */}
      <main>
        <HeroSection />
        {/* <LogoCarousel /> */}
        <StatsSection />
        <AboutSection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        {/* <BlogSection /> */}
        <FaqSection />
        <CTASection />
        <ContactSection />
        {/* <SoftwareShowcase/> */}
      </main>

      {/* Footer */}
      {/* <LandingFooter /> */}
      {/* <SessionProvider>
      <Footer/>
      </SessionProvider> */}
      

      {/* Theme Customizer */}
      {/* <LandingThemeCustomizerTrigger onClick={() => setThemeCustomizerOpen(true)} />
      <LandingThemeCustomizer open={themeCustomizerOpen} onOpenChange={setThemeCustomizerOpen} /> */}
    </div>
  )
}