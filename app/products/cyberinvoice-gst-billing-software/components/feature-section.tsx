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
    icon: "🛒",
    title: 'Quote-to-Bill Conversion',
    description: ' Turn a customer quote or held cart directly into a final line-item bill at checkout, no re-entry needed.'
  },
  {
    icon: "🧾",
    title: 'Itemized Receipt Generation',
    description: ' Print or send digital receipts with full line-item breakdowns, taxes, and discounts applied instantly.'
  },
  {
    icon: "💳",
    title: 'Multi-Payment Support',
    description: ' Accept cash, card, and digital wallet payments in a single transaction without switching systems.'
  },
  {
    icon: "🔖",
    title: 'Discount & Promo Handling',
    description: 'Apply coupons, bulk discounts, or loyalty pricing automatically at the register.'
  }
]

const secondaryFeatures = [
  {
    icon: "🔁",
    title: 'Store Credit Accounts',
    description: ' Let regular customers run a tab or store account, billed on a schedule you set.'
  },
  {
    icon: "🎟️",
    title: 'Loyalty & Membership Billing',
    description: ' Automate recurring charges for store memberships or subscription-style customer plans.'
  },
  {
    icon: "📊",
    title: 'Purchase History Lookup',
    description: 'Pull up any customers past bills instantly for returns, exchanges, or reorders'
  },
  {
    icon: "🧾",
    title: 'Auto-Generated Monthly Statements',
    description: ' Send customers a consolidated bill for all their purchases across a billing period.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">🧾 Invoicing Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
           Everything you need to run checkout smoothly

          </h2>
          <p className="text-lg text-muted-foreground">
             CyberInvoice connects quotes, in-store billing, and recurring customer accounts in one platform — built to keep every checkout counter fast and accurate.
          </p>
        </div>

     
         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">

          <Image3D
            lightSrc="/Screenshot 2026-05-29 100006.png"
            darkSrc="/Screenshot 2026-05-29 100006.png"
            alt="Analytics dashboard"
            direction="left"
          />
 
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Custom Estimates & Proposals Integration
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
              Convert accepted digital quotes directly into formal, line-item active invoices with a single click, preserving historical workflow data.
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
               Recurring Retainer Subscriptions
              </h3>
              <p className="text-muted-foreground text-base text-pretty">
               Perfect for service or long-term vendor partnerships. Automate your monthly, quarterly, or custom term client invoices smoothly.
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
            lightSrc="/Screenshot 2026-05-29 100006.png"
            darkSrc="/Screenshot 2026-05-29 100006.png"
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