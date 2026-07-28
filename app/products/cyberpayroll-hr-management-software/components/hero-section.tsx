"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, IdCardLanyard, Play, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
// import { DotPattern } from '@/components/dot-pattern'
import { DotBackground } from '@/components/lightswind/grid-dot-backgrounds'
import SparkleNavbar from '@/components/lightswind/sparkle-navbar'
  import DotGrid from './DotGrid';

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-black  pt-16 sm:pt-20 pb-16">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Dot pattern overlay using reusable component */}
        {/* <DotPattern className="opacity-100" size="md" fadeStyle="ellipse" /> */}
            {/* <DotBackground
    className="h-full w-full"
    DotSize={1}
    gridColor="rgba(0, 0, 0, 0.05)"
    darkGridColor="rgba(255, 255, 255, 0.05)"
    showFade={true}
    fadeIntensity={30}
  /> */}


<div style={{ width: '100%', height: '1000px', position: 'relative' }}>
  <DotGrid
    dotSize={3}
    edgeOpacity={0.05}       // nearly invisible at edges
  centerOpacity={1}
  falloffSharpness={3}  
    gap={15}
    baseColor="#969095"
    activeColor="#06b6d4"
    proximity={120}
    shockRadius={250}
    shockStrength={5}
    resistance={750}
    returnDuration={1.5}
  />
</div>
      </div>
      {/* <div className="flex justify-between absolute top-0 left-0 w-full p-4 mt-10 z-10">
  <div>
    <ul className="flex gap-4">
      <li>home</li>
      <li>about</li>
      <li>contact</li>
    </ul>
  </div>

  <div>
    <ul className="flex gap-4">
      <li>login</li>
      <li>signup</li>
      <li>profile</li>
    </ul>
  </div>
</div> */}

<div className="fixed top-0 w-full px-4 pt-4 pb-1 mt-10 z-10 bg-black
      backdrop-blur-xl
      shadow-[0_8px_32px_rgba(0,0,0,0.37)]
      supports-[backdrop-filter]:bg-black/20">
  <SparkleNavbar
    color="#22d3ee"
    items={[
      { label: "Home", href: "/" },
      { label: "About", href: "#about" },
      { label: "Features", href: "#features" },

      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ]}
  />
</div>
      <div className="container mx-auto  mt-7 px-4 sm:px-6 lg:px-8 relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Announcement Badge */}
          <div className="mb-8 flex justify-center">
            <Badge variant="outline" className="mx-auto mb-10 max-w-2xl text-lg sm:text-xl">
<span className="mr-2 inline-flex size-4 shrink-0 items-center justify-center">
  <IdCardLanyard className="size-4 text-cyan-500" strokeWidth={3} />
</span>
              CyberPayroll
              {/* <ArrowRight className="w-3 h-3 ml-2" /> */}
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-mono tracking-tight sm:text-6xl lg:text-7xl">
            Take the Complexity Out of Monthly Payroll and Employee Compliance
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-lg  sm:text-xl">
            Automate intricate salary payouts, track variable attendance inputs, and distribute professional payslips inside a highly automated dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-base cursor-pointer" asChild>
              <Link href="#pricing">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base cursor-pointer" asChild>
              <a href="#contact">
                <Play className="mr-2 h-4 w-4" />
                free Demo
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Image/Visual */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="relative group">
            {/* Top background glow effect - positioned above the image */}
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-cyan-500 rounded-full blur-3xl"></div>

            <div className="relative rounded-xl border bg-card shadow-2xl">
              {/* Light mode dashboard image */}
              <Image
                src="/Screenshot 2026-05-29 100006.png"
                alt="Dashboard Preview - Light Mode"
                width={1200}
                height={800}
                className="w-full rounded-xl object-cover block dark:hidden"
                priority
              />

              {/* Dark mode dashboard image */}
              <Image
                src="/Screenshot 2026-05-29 100006.png"
                alt="Dashboard Preview - Dark Mode"
                width={1200}
                height={800}
                className="w-full rounded-xl object-cover hidden dark:block"
                priority
              />

              {/* Bottom fade effect - gradient overlay that fades the image to background */}
              <div className="absolute bottom-0 left-0 w-full h-32 md:h-40 lg:h-48 bg-gradient-to-b from-background/0 via-background/70 to-background rounded-b-xl"></div>

              {/* Overlay play button for demo */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="lg"
                  className="rounded-full h-16 w-16 p-0 cursor-pointer hover:scale-105 transition-transform"
                  asChild
                >
                  <a href="#" aria-label="Watch demo video">
                    <Play className="h-6 w-6 fill-current" />
                  </a>
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}