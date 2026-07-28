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
    question: 'Can CyberDine handle multiple kitchen preparation stations simultaneously?',
    answer:
      'Yes. You can route items automatically based on categories—beverages go to the bar display, starters to the pantry printer, and mains to the hot kitchen line—eliminating order confusion entirely.',
  },
  {
    value: 'item-2',
    question: 'Does the system work offline if our internet connection drops?',
    answer:
      'Absolutely. CyberDine features a resilient local sync engine. Your staff can keep taking orders, generating KOTs, and printing bills offline; the data securely uploads to your cloud dashboard the moment connection is restored.',
  },
  {
    value: 'item-3',
    question: 'Does it support QR-based digital menus for self-ordering?',
    answer:
      'Yes, CyberDine includes a built-in QR code generator for tables. Guests can scan the code, view your modern digital menu, and place orders directly, which land straight on your POS terminal for approval.',
  },
  {
    value: 'item-4',
    question: 'Can we manage recipe ingredients and track micro-wastage?',
    answer:
      'Yes. You can link menu items directly to your raw inventory raw materials down to grams or units. When a dish is sold or logged as wastage, your stock levels adjust automatically in real-time.',
  },
  {
    value: 'item-5',
    question: 'Is it possible to manage multiple restaurant outlets from one dashboard?',
    answer:
      'Yes, CyberDine provides centralized multi-outlet telemetry. You can track sales performance, modify menu pricing, and manage inventory transfers across all branches from a single master account.'
  },
  // {
  //   value: 'item-6',
  //   question: 'How often do you release new components?',
  //   answer:
  //     'We release new components and templates weekly. Premium subscribers get early access to new releases, while free components are updated regularly based on community feedback. You can track our roadmap and request specific components through our GitHub repository.',
  // },
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