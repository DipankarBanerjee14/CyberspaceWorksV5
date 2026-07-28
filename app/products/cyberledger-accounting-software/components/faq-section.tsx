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
    question: 'Is CyberLedger a true double-entry accounting platform?',
    answer:
      'Yes, it is engineered strictly on standard double-entry bookkeeping principles. Every ledger transaction automatically self-balances across corresponding assets, liabilities, equities, revenues, and expenses.',
  },
  {
    value: 'item-2',
    question: 'Can we generate professional financial statements like Balance Sheets instantly?',
    answer:
      'Yes. Because the ledger processes data in real-time, you can generate updated Balance Sheets, Trial Balances, Cash Flow trends, and Profit & Loss statements with a single click at any point in the fiscal year.',
  },
  {
    value: 'item-3',
    question: 'Does the system maintain a permanent audit trail for all entries?',
    answer:
      'Security and compliance are absolute. CyberLedger logs a non-editable, timestamped historical record of every single journal entry creation, modification, or user access log, giving your auditors total transparency.',
  },
  {
    value: 'item-4',
    question: 'Can it handle multi-vendor payment settlements and commission splits?',
    answer:
      'Yes, CyberLedger is built to navigate complex ecosystem frameworks. It can track individual marketplace vendor ledgers, calculate platform fee splits, and record outbound payouts cleanly.',
  },
  {
    value: 'item-5',
    question: 'How easily can we reconcile our company books with actual bank accounts?',
    answer:
      'Very easily. You can import your bank statements directly into our smart reconciliation module, which auto-matches transaction rows based on values and dates to identify discrepancies instantly.',
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