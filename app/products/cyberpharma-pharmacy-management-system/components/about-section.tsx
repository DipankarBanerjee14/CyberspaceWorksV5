"use client"

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CardDecorator } from '@/components/ui/card-decorator'
import { Github, Code, Palette, Layout, Crown,Calculator,
  Fingerprint,
  FolderOpen,
  CalendarCheck2, } from 'lucide-react'
import { DotBackground } from '@/components/lightswind/grid-dot-backgrounds'
import DotField from '@/components/DotField'

const values = [
  {
    icon: Calculator,
    title: ' Barcode-Driven Checkout',
    description: ' Process prescriptions instantly using precise universal barcode scanning linked directly to active inventory.'
  },
  {
    icon: Fingerprint,
    title: 'Batch & Expiry Alarms',
    description: 'Zero out wastage with intelligent notifications warning your team of upcoming medicine expirations months in advance.'
  },
  {
    icon: FolderOpen,
    title: 'Clean Drug Search Hierarchy',
    description: 'Instantly filter alternatives by chemical composition, salt group, or manufacturer name during high-volume hours.'
  },
  {
    icon: CalendarCheck2,
    title: 'Supplier Ledger Automation',
    description: 'Auto-populate purchase orders, record supplier invoices, and track outstanding vendor balances smoothly.'
  }
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             
        {/* Section Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About 
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Build for the businesses, by the developers
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We’ve surveyed the market, conducted in-depth research, addressed the issues businesses face with related software, and developed this product to provide greater convenience and faster business growth.
          </p>
        </div>

        {/* Modern Values Grid with Enhanced Design */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4 mb-12">
          {values.map((value, index) => (
            <Card key={index} className='group shadow-xs py-2'>
              <CardContent className='p-8'>
                <div className='flex flex-col items-center text-center'>
          
                  <CardDecorator>
                    <value.icon className='h-6 w-6' aria-hidden />
                  </CardDecorator>
                  <h3 className='mt-6 font-medium text-balance'>{value.title}</h3>
                  <p className='text-muted-foreground mt-3 text-sm'>{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-muted-foreground">❤️ Made with love for the developer community</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="cursor-pointer" asChild>
              <a href="https://github.com/silicondeck/shadcn-dashboard-landing-template" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Star on GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="cursor-pointer" asChild>
              <a href="https://discord.com/invite/XEQhPc9a6p" target="_blank" rel="noopener noreferrer">
                Join Discord Community
              </a>
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  )
}