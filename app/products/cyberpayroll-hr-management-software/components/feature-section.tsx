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
    icon: "📤",
    title: 'Receipt Upload & OCR',
    description: ' Employees snap or upload receipts on the go — amounts, dates, and categories are auto-extracted, no manual entry needed.'
  },
  {
    icon: "✅",
    title: 'Multi-Level Approvals',
    description: 'Route claims through manager and finance sign-off with configurable approval chains and audit trails.'
  },
  {
    icon: "🔄",
    title: 'Payroll Sync',
    description: ' Approved reimbursements and bonuses merge automatically into the active payroll run — no double entry.'
  },
  {
    icon: "📊",
    title: 'Spend Visibility',
    description: ' Real-time dashboards show pending, approved, and paid claims by department, employee, or expense type.'
  }
]

const secondaryFeatures = [
  {
    icon: "🧾",
    title: 'Regional Tax Rules',
    description: ' Pre-configured tax slabs and statutory rates by state/country, updated automatically as regulations change.'
  },
  {
    icon: "🛡️",
    title: 'Insurance & Benefits Mapping',
    description: ' Auto-calculate PF, ESI, gratuity, and insurance contributions based on employee category and salary structure.'
  },
  {
    icon: "📅",
    title: 'Audit-Ready Records',
    description: ' Every deduction is timestamped and logged, so compliance audits and statutory filings take minutes, not days.'
  },
  {
    icon: "⚙️",
    title: 'Configurable Compliance Engine',
    description: 'Adjust deduction logic per entity or jurisdiction without code changes — built for multi-location payroll teams.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4 text-white">📊 HR & Payroll Suite</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
            Everything you need to run payroll with confidence
          </h2>
          <p className="text-md text-muted-foreground">
             CyberPayroll brings employee management, expense reimbursements, statutory deductions, and compliance audits together in one connected platform — built to save your HR team hours every month.
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
                 Variable Reimbursement & Bonus Trackers
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                 Allow team members to upload corporate expense receipts directly. Review, approve, and merge approved payouts into active payroll generation lists cleanly.
                               </p> */}
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {mainFeatures.map((feature, index) => (
                <li key={index} className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors">
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <span className="size-5 text-primary" aria-hidden="true">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{feature.title}</h3>
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
                Statutory Deductions & Audits
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                Ensure your books stay clear. Automatically process regular tax deductions, insurance percentages, and professional tax rules based on regional regulations.
                              </p> */}
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {secondaryFeatures.map((feature, index) => (
                <li key={index} className="group hover:bg-accent/5 flex items-start gap-3 p-2 rounded-lg transition-colors">
                  <div className="mt-0.5 flex shrink-0 items-center justify-center">
                    <span className="size-5 text-primary" aria-hidden="true">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{feature.title}</h3>
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
      </div>
      {/* <StickyScrollRevealDemo /> */}
    </section>
  )
}