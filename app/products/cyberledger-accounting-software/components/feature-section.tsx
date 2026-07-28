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
    icon: "🏦",
    title: 'Bank Feed Matching',
    description: ' Automatically match internal ledger entries against live bank and payment gateway records.'
  },
  {
    icon: "⚡",
    title: 'Instant Discrepancy Flags',
    description: 'Catch mismatched amounts or missing transactions the moment they appear, not at month-end.'
  },
  {
    icon: "📆",
    title: 'Daily Cash Position',
    description: 'See a real-time, reconciled view of cash on hand across all accounts and entities.'
  },
  {
    icon: "🧾",
    title: ' Audit Trail Logging',
    description: 'Every match, adjustment, and override is timestamped and logged for clean audit reviews.'
  }
]

const secondaryFeatures = [
  {
    icon: "🤝",
    title: 'Vendor Split Payouts',
    description: ' Automatically divide payments across multiple vendors or partners per agreed splits.'
  },
  {
    icon: "💸",
    title: 'Operational Fee Handling',
    description: 'Deduct platform, processing, or service fees automatically before settlement'
  },
  {
    icon: "🏢",
    title: 'Corporate Partner Adjustments',
    description: ' Handle complex multi-entity account adjustments without manual spreadsheet work.'
  },
  {
    icon: "📊",
    title: 'Settlement History Reports',
    description: ' Pull a full ledger of past settlements per vendor or partner for reconciliation or disputes.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">📒 Finance Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to keep your books airtight
          </h2>
          <p className="text-lg text-muted-foreground">
           CyberLedger connects bank reconciliation, vendor settlements, and multi-party ledgers in one platform — built so nothing slips through at month-end close
          </p>
        </div>

       
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
     
          <Image3D
            lightSrc="/cyberledger.png"
            darkSrc="/cyberledger.png"
            alt="Analytics dashboard"
            direction="left"
          />
  
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Advanced Cash Flow Reconciliation
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
                Match internal ledger lines against actual company bank records or payment gate notifications swiftly to ensure cash numbers stay accurate.
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
                Multi-Vendor Settlement Ledgers

              </h3>
              <p className="text-muted-foreground text-base text-pretty">
                Engineered to handle intricate business formats, tracking vendor split payouts, operational fees, and complex corporate partner account adjustments easily.
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
            lightSrc="/cyberledger.png"
            darkSrc="/cyberledger.png"
            alt="Performance dashboard"
            direction="right"
            className="order-1 lg:order-2"
          />
        </div> 
      </div>
      {/* <StickyScrollRevealDemo /> */}
    </section>
  )
}