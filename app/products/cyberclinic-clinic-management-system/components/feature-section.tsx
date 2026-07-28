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
  Palette,
  Scroll
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image3D } from './image-3d'
import StickyScrollRevealDemo from '@/components/sticky-scroll-reveal-demo'

const mainFeatures = [
  {
    icon: "📅",
    title: 'Live Appointment Scheduling',
    description: ' See every doctors calendar in real time, with drag-and-drop rescheduling for walk-ins and cancellations.'
  },
  {
    icon: "🚶",
    title: 'Walk-In vs Appointment Tracking',
    description: 'Separate advance bookings from walk-ins in one queue view, so front desk staff always know whos next.'
  },
  {
    icon: "⏱️",
    title: 'Wait Time Transparency',
    description: 'Copy-paste components that just work out of the box.'
  },
  {
    icon: "📊",
    title: 'Doctor Utilization Reports',
    description: 'Track appointment load per doctor to balance schedules and reduce burnout.'
  }
]

const secondaryFeatures = [
  {
    icon: "🔔",
    title: 'Automated Reminders',
    description: 'Send SMS or email reminders for upcoming appointments, reducing no-shows automatically.'
  },
  {
    icon: "💊",
    title: 'Prescription Renewal Alerts',
    description: 'Notify patients when its time to renew a prescription — no manual follow-up calls needed.'
  },
  {
    icon: "🩻",
    title: 'Health Test Follow-Ups',
    description: 'Trigger reminders for overdue screenings or test results to improve care continuity.'
  },
  {
    icon: "📱",
    title: 'Two-Way Messaging',
    description: ' Let patients confirm, reschedule, or ask quick questions directly through the notification thread.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-black">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">🩺 Clinic Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to run a modern medical practice
          </h2>
          <p className="text-lg text-muted-foreground">
             CyberClinic brings scheduling, patient communication, and clinical records together in one platform — built to reduce front-desk chaos and keep patients engaged.

          </p>
        </div>

      
       <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8 xl:gap-16 mb-24">
          
          <Image3D
            lightSrc="/cyberclinic.png"
            darkSrc="/cyberclinic.png"
            alt="Analytics dashboard"
            direction="left"
          />
         
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                Smart Doctor Calendars & Queues
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                 Reduce waiting room fatigue. Let your front desk track active walk-ins versus advance appointments via a live queue tracker.
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
                Patient Engagement Communications
              </h3>
              {/* <p className="text-muted-foreground text-base text-pretty">
                 Improve clinical adherence with automatic notification triggers for upcoming follow-up appointments, prescription renewals, or health tests.

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
            lightSrc="/cyberclinic.png"
            darkSrc="/cyberclinic.png"
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



// "use client";
// import React from "react";
// import { StickyScroll } from "../../../../components/ui/sticky-scroll-reveal";


// const content = [
//   {
//     title: "Collaborative Editing",
//     description:
//       "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
//         Collaborative Editing
//       </div>
//     ),
//   },
//   {
//     title: "Real time changes",
//     description:
//       "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center text-white">
//         <img
//           src="/linear.webp"
//           width={300}
//           height={300}
//           className="h-full w-full object-cover"
//           alt="linear board demo"
//         />
//       </div>
//     ),
//   },
//   {
//     title: "Version control",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
//         Version control
//       </div>
//     ),
//   },
//   {
//     title: "Running out of content",
//     description:
//       "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
//     content: (
//       <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
//         Running out of content
//       </div>
//     ),
//   },
// ];
// export default function StickyScrollRevealDemo() {
//   return (
//     <div className="w-full py-4">
//       <StickyScroll content={content} />
//     </div>
//   );
// }
