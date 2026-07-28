"use client"

import {
  BarChart3,
  Zap,
  Users,
  ArrowRight,
  Database,
  Package,
  Crown,
  Layout,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image3D } from './image-3d'
import StickyScrollRevealDemo from '@/components/sticky-scroll-reveal-demo'

const mainFeatures = [
  {
    icon: "📦",
    title: 'Real-Time Inventory Sync',
    description: 'Every sale and dispense updates stock instantly, so counts stay accurate across all counters.'
  },
  {
    icon: "⚠️",
    title: 'Threshold Alerts',
    description: ' Get notified the moment critical medications drop below safe stock levels.'
  },
  {
    icon:"🔄",
    title: 'Auto-Replenishment Drafts',
    description: 'Draft reorder sheets automatically when items hit their reorder point — no manual stock checks needed.'
  },
  {
    icon: "🌡️",
    title: 'Expiry & Batch Tracking',
    description: ' Track batch numbers and expiry dates to flag near-expiry stock before it becomes unsellable.'
  }
]

const secondaryFeatures = [
  {
    icon: "👨‍⚕️",
    title: 'Doctor & Patient Records',
    description: ' Log prescriber details, patient history, and dosage instructions tied to every prescription filled.'
  },
  {
    icon: "🔒",
    title: 'Controlled Substance Logs',
    description: ' Track restricted and scheduled drugs with tamper-proof records built for regulatory audits.'
  },
  {
    icon: "📋",
    title: 'Digital Prescription Verification',
    description: 'Cross-check prescriptions against patient history and drug interactions before dispensing. '
  },
  {
    icon: "📑",
    title: 'Audit-Ready Compliance Reports',
    description: 'Generate regulatory reports in one click, formatted to your local pharmacy boards requirements.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">💊 Pharmacy & Clinic Suite</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to run a safer, faster pharmacy
          </h2>
          <p className="text-lg text-muted-foreground">
            From prescriptions to stock control, manage your pharmacy and clinic workflows in one connected platform built for accuracy and compliance.
          </p>
        </div>

    
         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">

          <Image3D
            lightSrc="/cyberpharma.png"
            darkSrc="/cyberpharma.png"
            alt="Analytics dashboard"
            direction="left"
          />
           <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Tight Stock Tracking & Safety Reorders
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                Never run out of critical life-saving medications. Set threshold alerts that automatically draft replenishment sheets when items drop low.
              </p> */}
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {mainFeatures.map((feature, index) => (
                <li key={index} className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors">
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <span className="size-5 text-primary" aria-hidden="true">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* <div className="flex flex-col sm:flex-row gap-4 pe-4 pt-2">
              <Button size="lg" className="cursor-pointer">
                <a href="https://shadcnstore.com/templates" className='flex items-center'>
                  Browse Templates
                  <ArrowRight className="ms-2 size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                <a href="https://shadcnstore.com/blocks">
                  View Components
                </a>
              </Button>
            </div> */}
          </div>
        </div>

   
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16">

          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Prescriptions & Regulatory Controls
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                Seamlessly log doctor details, client information, and critical restricted drug records for regulatory audit compliance without slow workflows
              </p> */}
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {secondaryFeatures.map((feature, index) => (
                <li key={index} className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors">
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <span className="size-5 text-primary" aria-hidden="true">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium">{feature.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* <div className="flex flex-col sm:flex-row gap-4 pe-4 pt-2">
              <Button size="lg" className="cursor-pointer">
                <a href="#" className='flex items-center'>
                  View Documentation
                  <ArrowRight className="ms-2 size-4" aria-hidden="true" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="cursor-pointer">
                <a href="https://github.com/silicondeck/shadcn-dashboard-landing-template" target="_blank" rel="noopener noreferrer">
                  GitHub Repository
                </a>
              </Button>
            </div> */}
          </div>

          <Image3D
            lightSrc="/cyberpharma.png"
            darkSrc="/cyberpharma.png"
            alt="Performance dashboard"
            direction="right"
            className="order-1 lg:order-2"
          />
        </div>
         
         {/* <StickyScrollRevealDemo /> */}
      </div>
    </section>
  )
}