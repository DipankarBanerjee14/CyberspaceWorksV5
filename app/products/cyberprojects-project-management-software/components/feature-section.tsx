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
    icon: "📊",
    title: 'Gantt Chart Timelines',
    description: 'Visualize every task, dependency, and milestone on a single interactive timeline.'
  },
  {
    icon: "🗂️",
    title: 'Backlog & Sprint Management',
    description: 'Organize work into backlogs, sprints, and structured feature tests built for engineering teams.'
  },
  {
    icon: "📄",
    title: 'Client Handover Documentation',
    description: 'Generate clean, formal handover docs directly from completed project work.'
  },
  {
    icon: "👥",
    title: 'Employee & Resource Allocation',
    description: ' Assign team members to tasks and track workload across the whole delivery pipeline.'
  }
]

const secondaryFeatures = [
  {
    icon: "📝",
    title: 'Built-In Grids',
    description: 'Spreadsheet-style Grids live inside your workspace — no exporting to external sheets.'
  },
  {
    icon: "📓",
    title: 'Built-In Notes',
    description: ' Docs-style Notes attach directly to task cards, keeping specs and feedback in context.'
  },
  {
    icon: "🎨",
    title: 'Design & Asset Linking',
    description: 'Attach mockups, code links, and files right where the related task lives.'
  },
  {
    icon: "✅",
    title: 'In-Context Approvals',
    description: 'Collect feedback and sign-off on deliverables without leaving the task card.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-12 sm:py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4 text-white">📋 Platform Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">
           Everything you need to run projects end to end
          </h2>
          <p className="text-lg text-muted-foreground">
            CyberProjects brings task delivery, team management, billing, and vendor coordination into one workspace — with Gantt timelines, Grids, and Notes built in.
          </p>
        </div>


         <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
  
          <Image3D
            lightSrc="/cyberprojects.png"
            darkSrc="/cyberprojects.png"
            alt="Analytics dashboard"
            direction="left"
          />

          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Integrated Agile Delivery Systems
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                Perfect for engineering structures. Manage backlogs, run structured feature tests, and handle formal handover documentation for clients transparently.
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
                Centralized Workflow and Documents
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                 Keep contextual feedback where it belongs. Centralize assets, design mockups, code links, and performance approvals inside the specific task cards using our in platform Notes and Grids.
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
            lightSrc="/cyberprojects.png"
            darkSrc="/cyberprojects.png"
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