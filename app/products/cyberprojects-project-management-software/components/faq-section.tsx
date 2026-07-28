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
    question: 'Is CyberProjects optimized for agile development environments and sprints?',
    answer:
      'Yes. It features dedicated developer sprint boards, backlog management spaces, task priority assignments, and custom workflow states to streamline software delivery cycles cleanly.',
  },
  {
    value: 'item-2',
    question: 'Can we invite external clients to view project progress securely?',
    answer:
      'Yes. You can grant tailored access to external stakeholders, allowing them to track milestone progress, view specific task timelines, or sign off on deliverables while keeping internal team chatter completely hidden.',
  },
  {
    value: 'item-3',
    question: 'How does the platform help project managers identify team bottlenecks?',
    answer:
      'The resource capacity matrix monitors task distribution across your team members, highlighting who is overloaded or under-allocated so you can reassign items and keep delivery timelines on track.',
  },
  {
    value: 'item-4',
    question: 'Can we create task dependencies to enforce strict workflow order?',
    answer:
      'Yes. You can chain critical development milestones together, ensuring that dependent tasks (like feature deployment) cannot be mistakenly moved to production until the prerequisite stages (like QA testing) are complete.',
  },
  {
    value: 'item-5',
    question: 'Does it support recurring task creation for routine company processes?',
    answer:
      'Yes, you can automate repetitive processes—such as setting up weekly sprint planning tasks, monthly maintenance reviews, or daily standup logs—ensuring they appear automatically on your teams board.',
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