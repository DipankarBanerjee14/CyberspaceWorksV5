"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Mail, MessageCircle, Github, BookOpen } from 'lucide-react'
import { SelectContent, SelectItem, SelectTrigger, SelectValue,Select } from "@/components/ui/select"

const contactFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export function ContactSection() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    console.log("Submitting contact form with values:", values)
    try {
      const response = await fetch("/api/contact-software", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message")
      }

      alert("Message sent successfully")
      form.reset()
    } catch (error) {
      console.log(error)
      alert(error instanceof Error ? error.message : "Something went wrong")
    }
  }

  function onInvalid(errors: Record<string, { message?: string }>) {
    const firstErrorMessage = Object.values(errors)[0]?.message
    alert(firstErrorMessage || "Please complete all required fields before submitting.")
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <Badge variant="outline" className="mb-4">Get In Touch</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Need help or have suggestion or questions?
          </h2>
          {/* <p className="text-lg text-muted-foreground">
            Our team is here to help you get the most out of ShadcnStore. Choose the best way to reach out to us.
          </p> */}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Options */}
          <div className="space-y-6 order-2 lg:order-1">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Discord Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Join our active community for quick help and discussions with other developers.
                </p>
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <a href="https://discord.com/invite/XEQhPc9a6p" target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  GitHub Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Report bugs, request features, or contribute to our open source repository.
                </p>
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <a href="https://github.com/silicondeck/shadcn-dashboard-landing-template/issues" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3">
                  Browse our comprehensive guides, tutorials, and component documentation.
                </p>
                <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                  <a href="#">
                    View Docs
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} noValidate className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                          <FormField
  control={form.control}
  name="subject"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Query Type</FormLabel>

      <Select
        onValueChange={field.onChange}
        defaultValue={field.value}

      >
        <FormControl>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Enquiry For Demo" />
          </SelectTrigger>
        </FormControl>

        <SelectContent>
          <SelectItem value="need-help">
            Need Help
          </SelectItem>

          <SelectItem value="have-suggestion">
            Have Suggestion
          </SelectItem>

          <SelectItem value="have-question">
            Have Question
          </SelectItem>
           <SelectItem value="free-demo">
                      Enquiry For Demo
                    </SelectItem>
        </SelectContent>
      </Select>

      <FormMessage />
    </FormItem>
  )}
/>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us how we can help you with ShadcnStore components..."
                              rows={10}
                              className="min-h-50"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full cursor-pointer">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}