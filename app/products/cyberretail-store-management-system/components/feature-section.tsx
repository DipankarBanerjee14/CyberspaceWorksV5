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
    icon: "🏬",
    title: 'Cross-Branch Visibility',
    description: ' See live stock counts across every warehouse and storefront from a single dashboard.'
  },
  {
    icon: "🔄",
    title: 'Instant Transfer Requests',
    description: 'Request and approve stock transfers between branches in a few clicks, no phone calls needed.'
  },
  {
    icon: "📉",
    title: 'Low-Stock Detection',
    description: 'Get flagged automatically when any locations inventory dips below its safe threshold.'
  },
  {
    icon: "📊",
    title: 'Store-Level Reporting',
    description: ' Compare stock turnover and sell-through rates across locations to spot underperformers early.'
  }
]

const secondaryFeatures = [
  {
    icon: "📅",
    title: 'Payment Due Tracking',
    description: ' See every upcoming supplier payment date in one calendar, so nothing slips through the cracks.'
  },
  {
    icon: "🚚",
    title: 'Incoming Shipment Log',
    description: 'Track shipments in transit with expected arrival dates tied to each purchase order.'
  },
  {
    icon: "🤝",
    title: 'Vendor Friction Reduction',
    description: 'Auto-generate settlement summaries and payment confirmations to keep supplier relationships smooth.'
  },
  {
    icon: "📈",
    title: 'Supplier Performance History',
    description: 'Track delivery timeliness and order accuracy per supplier to inform future sourcing decisions.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">🛒 Retail Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to run multi-store retail operations
          </h2>
          <p className="text-lg text-muted-foreground">
            CyberRetail connects stock levels, supplier payments, and cross-branch transfers in one platform — built to keep every location in sync.
          </p>
        </div>

  
       <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
  
          <Image3D
            lightSrc="/cyberretail.jpeg"
            darkSrc="/cyberretail.jpeg"
            alt="Analytics dashboard"
            direction="left"
          />
      
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Multicenter Stock Telemetry
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
                Monitor inventory configurations across distinct branch warehouses or storefront displays seamlessly. Run cross-store stock balance requests instantly.
              </p>
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
                Automated Supplier Settlement
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
                 Take control of your product pipelines. Track upcoming wholesale payment dates, organize incoming inventory shipments, and minimize vendor friction.
                               </p>
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
            lightSrc="/cyberretail.jpeg"
            darkSrc="/cyberretail.jpeg"
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