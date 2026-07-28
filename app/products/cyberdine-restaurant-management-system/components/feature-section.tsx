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
    icon: "🪑",
    title: 'Live Floor View',
    description: 'See every tables status — open, seated, or reserved — updated in real time from a single visual layout.'
  },
  {
    icon: "📅",
    title: 'Reservation Sync',
    description: 'Bookings flow straight into your floor plan, so hosts always know whats coming before guests walk in.'
  },
  {
    icon: "⏱️",
    title: 'Wait Time Estimator',
    description: 'Predict turnaround per table based on course pace and party size to keep queues short and guests happy.'
  },
  {
    icon: "📈",
    title: 'Occupancy Analytics',
    description: 'Track peak hours, table turnover rate, and seating efficiency to plan staffing and layout smarter.'
  }
]

const secondaryFeatures = [
  {
    icon: "🍽️",
    title: 'Recipe-to-Inventory Mapping',
    description: 'Link every dish to its exact ingredients, so each sale automatically deducts the right stock quantities.'
  },
  {
    icon: "💰",
    title: 'Real-Time Food Cost %',
    description: ' See live cost-per-plate and margin per dish as ingredient prices and portions change.'
  },
  {
    icon: "📦",
    title: 'Stock Variance Alerts',
    description: ' Catch shrinkage, waste, or over-portioning early with automated variance reports against expected usage.'
  },
  {
    icon:"🔔",
    title: 'Low-Stock Notifications',
    description: ' Get notified before you run out of key ingredients, with reorder suggestions based on usage trends.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">🍴 Restaurant Operations Suite</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to run a smoother, faster kitchen
          </h2>
          <p className="text-lg text-muted-foreground">
             CyberDine connects your seating, orders, and inventory in real time — so your team spends less time firefighting and more time serving great food.
          </p>
        </div>

    
         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
       
          <Image3D
            lightSrc="/cyberdine.png"
            darkSrc="/cyberdine.png"
            alt="Analytics dashboard"
            direction="left"
          />
    
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Smart Table & Seating Matrix

              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                Track live table status, reservation bookings, and course progression visually. Minimize customer wait times and maximize floor occupancy smoothly.

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
                Recipe Costing & Inventory Control

              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                Link menu dishes directly to raw inventory consumption. Track and monitor food cost variances, and preserve your restaurant margins.
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
          </div>

        
          <Image3D
            lightSrc="/cyberdine.png"
            darkSrc="/cyberdine.png"
            alt="Performance dashboard"
            direction="right"
            className="order-1 lg:order-2"
          />
        </div> 
      </div>
     
    </section>
  )
}