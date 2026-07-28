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
    question: 'Does CyberInvoice automatically calculate individual CGST, SGST, and IGST breakdowns?',
    answer:
      'Yes. The billing engine detects your customers location parameters automatically and applies the precise matching state or central tax distributions dynamically without requiring manual computations.',
  },
  {
    value: 'item-2',
    question: 'Can we set up recurring invoices for client retainer agreements?',
    answer:
      'Yes, perfect for long-term vendor partnerships or monthly service plans. You can configure automated subscription schedules, and the system will generate and email professional invoices to clients right on time.',
  },
  {
    value: 'item-3',
    question: 'Can we customize the visual layout and include our agency branding?',
    answer:
      'Completely. You have full control over invoice styling, enabling you to upload your logo, define brand color matching schemes, modify terms and conditions, and personalize footer payment instructions.',
  },
  {
    value: 'item-4',
    question: 'How does the system help track and recover outstanding payments?',
    answer:
      'The dashboard provides a clear overview of unpaid balances, categorizing invoices by overdue windows. It can send friendly, automated email and SMS reminders to clients as deadlines approach.',
  },
  {
    value: 'item-5',
    question: 'Can we convert a business proposal or estimate directly into an active invoice?',
    answer:
      'Yes, the workflow is seamless. Once a client accepts your digital quote or project estimate, you can convert that exact line-item data into a formal invoice with a single click.',
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