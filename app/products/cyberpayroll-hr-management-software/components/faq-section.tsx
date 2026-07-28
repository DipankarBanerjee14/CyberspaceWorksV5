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
    question: 'Can CyberPayroll handle diverse compensation structures like hourly wages and fixed stipends?',
    answer:
      'Yes. You can configure unique salary structures for permanent corporate employees, variable hourly contractors, or fixed monthly stipends for active interns within the same system.',
  },
  {
    value: 'item-2',
    question: 'How does the platform capture employee attendance data?',
    answer:
      'CyberPayroll supports direct web/mobile clock-ins, geo-fenced check-ins, or seamless API integrations with physical biometric hardware devices to capture precise attendance and overtime inputs',
  },
  {
    value: 'item-3',
    question: 'Can employees view their records and download payslips independently?',
    answer:
      'Yes, the platform includes an intuitive self-service portal for employees. Team members can securely view their shift logs, request leaves, upload expense receipts, and instantly download their monthly PDF payslips.',
  },
  {
    value: 'item-4',
    question: 'How are complex tax deductions and statutory calculations handled?',
    answer:
      'All regional regulatory allocations, statutory insurance percentages, and professional taxes are automatically calculated and deducted based on the rules you configure, ensuring accurate compliance every pay cycle.',
  },
  {
    value: 'item-5',
    question: 'Can we customize multi-level approval workflows for leave requests?',
    answer:
      'Yes. You can build custom cascading approval rules, routing employee leave requests to their direct project managers first, before automatically escalating them to HR or administrative heads for final sign-off.',
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