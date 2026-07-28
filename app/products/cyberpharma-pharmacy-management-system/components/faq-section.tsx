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
    question: 'How does the batch tracking and expiry alert system work?',
    answer:
      'Every batch of medicine is logged with its unique expiry date during stock entry. CyberPharma automatically triggers dashboard alerts months in advance, helping you liquidate or return near-expiry stock to vendors.',
  },
  {
    value: 'item-2',
    question: 'Is the checkout interface fast enough for high-volume rush hours?',
    answer:
      'Yes, the billing UI is built for speed. It supports universal barcode scanning and keyboard-only shortcuts, allowing your pharmacists to pull up medicines, view alternatives, and finalize invoices in seconds',
  },
  {
    value: 'item-3',
    question: 'Can we quickly search for alternative medicines by salt or chemical composition?',
    answer:
      'Yes. If a specific brand is out of stock, typing the generic name or chemical salt composition instantly displays all available matches on your shelves along with their real-time stock levels',
  },
  {
    value: 'item-4',
    question: 'Does CyberPharma comply with tax structures and purchase ledger requirements?',
    answer:
      'Completely. It handles multi-tier tax rates, processes purchase invoices from distributors, automatically updates your supplier ledgers, and generates clean data summaries ready for your accounting audits.',
  },
  {
    value: 'item-5',
    question: 'Can it manage partial sales, like selling a single tablet from a strip?',
    answer:
      'Yes. CyberPharma handles fractional inventory mapping, allowing you to define pack sizes (e.g., 10 tablets per strip) and bill individual tablets while keeping your master stock count accurate.',
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