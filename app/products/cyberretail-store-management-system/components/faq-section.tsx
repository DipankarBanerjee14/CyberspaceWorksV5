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
    question: 'Can CyberRetail handle complex product variations like size, color, and material?',
    answer:
      'Yes, it features a comprehensive product matrix. You can track single items across unlimited variations (e.g., Small/Blue, Large/Red) under distinct barcodes while maintaining a clean, unified inventory system.',
  },
  {
    value: 'item-2',
    question: 'Does the software support split payments at checkout?',
    answer:
      ' Yes. Your cashiers can process a single sales ticket using split tenders—such as a customer paying half in cash and the remainder via digital wallet or card—without messing up daily register balances.',
  },
  {
    value: 'item-3',
    question: 'How does the system help prevent stockouts on popular items?',
    answer:
      'You can establish minimum safety stock thresholds for every item. The moment an item dips below your predefined safety limit, CyberRetail Flags it on your dashboard and drafts an automated replenishment sheet.',
  },
  {
    value: 'item-4',
    question: 'Can we run customer loyalty programs and point-tier systems?',
    answer:
      'Yes. CyberRetail includes an integrated customer profiling engine. You can track buyer histories, assign customized loyalty point rules per purchase value, and set up tiered reward tiers to boost repeat business.',
  },
  {
    value: 'item-5',
    question: 'Does it provide real-time sales performance indicators for multi-location stores?',
    answer:
      'Yes. The cloud telemetry dashboard aggregates live transaction updates across all your physical storefronts or warehouses, giving you immediate insights into top-performing products and profit margins.',
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