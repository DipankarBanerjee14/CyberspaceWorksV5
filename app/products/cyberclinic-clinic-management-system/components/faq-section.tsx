"use client"

import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

type FaqItem = {
  value: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    value: 'item-1',
    question: 'Is patient medical history and health data securely protected?',
    answer:
      'Yes, data privacy is a core priority. CyberClinic uses strict role-based access control (RBAC) and data encryption protocols, ensuring that sensitive patient Electronic Medical Records (EMR) are only viewable by authorized medical professionals.',
  },
  {
    value: 'item-2',
    question: 'Can our reception desk manage live patient queues and walk-ins simultaneously?',
    answer:
      'Yes. The live appointment matrix splits advance bookings and unexpected walk-ins into a unified digital queue. Staff can check patients in, assign token numbers, and track live consultation statuses seamlessly.',},
  {
    value: 'item-3',
    question: 'How customizable are the digital prescription pads for specialty doctors?',
    answer:
      'Highly customizable. Doctors can build tailored templates for their specific practices, save frequently prescribed medication combinations, pre-set dosage instructions, and generate print-ready prescriptions with one click.',
  },
  {
    value: 'item-4',
    question: 'Does CyberClinic link consultation data directly to billing and diagnostics?',
    answer:
      'Yes. Once a doctor closes a session, any prescribed lab tests or procedure fees are instantly pushed to the billing desk terminal, eliminating manual data entry and preventing billing leakages',
  },
  {
    value: 'item-5',
    question: 'Can the platform automatically send appointment updates to patients?',
    answer:
      'Yes. CyberClinic features automated notification triggers that send instant confirmations, rescheduling alerts, and friendly follow-up reminders to patients via SMS or email to minimize no-shows.',
  },
  
]

const FaqSection = () => {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about ShadcnStore components, licensing, and integration. Still have questions? We&apos;re here to help!
          </p>
        </div>

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          <div className='bg-transparent'>
            <div className='p-0'>
              <Accordion type='single' collapsible className='space-y-5'>
                {faqItems.map(item => (
                  <AccordionItem key={item.value} value={item.value} className='rounded-md !border bg-transparent'>
                    <AccordionTrigger className='cursor-pointer items-center gap-4 rounded-none bg-transparent py-2 ps-3 pe-4 hover:no-underline data-[state=open]:border-b'>
                      <div className='flex items-center gap-4'>
                        <div className='bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full'>
                          <CircleHelp className='size-5' />
                        </div>
                        <span className='text-start font-semibold'>{item.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className='p-4 bg-transparent'>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Contact Support CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <Button className='cursor-pointer' asChild>
              <a href="#contact">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export { FaqSection }