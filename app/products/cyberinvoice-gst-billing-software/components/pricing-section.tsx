


"use client"

import { useState } from "react"
import type { FormEvent } from "react"
import { Check } from "lucide-react"

import { Drawer } from "@base-ui/react/drawer"
import { Field } from "@base-ui/react/field"
import { Input } from "@base-ui/react/input"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const plans = [
  {
    name: "Basic",
    description: "Perfect for Startups with Limited Resources",
    monthlyPrice: "₹1,750",
    yearlyPrice: "₹17,850",
    lifetimePrice: "₹105,000",
    features: [
      "One Dashboard",
      "Notifications",
      "POS + Billing",
      "Product Log",

"Windows + Android App",
"Basic Support",
"Unlimited Users",
"Future Updates",
"15 Days Free Trial",
"24X7 Support",

    ],
    cta: "Place Order",
    popular: false,
  },
  {
    name: "Bussiness",
    description:
      "Perfect for Established Businesses",
    monthlyPrice: "₹3,500",
    yearlyPrice: "₹33,600",
    lifetimePrice: "₹210,000",
    features: [
    "Everything in Basic Plus:",
    "Multiple Dashboard",
"Own Branding",
"Inventory Management",
"Multi-Branch Facility",
"Reports",
"Mac + Windows App",
"Android + iOS (Coming Soon) App",
"24/7 Support",

    ],
    cta: "Place Order",
    popular: true,
    includesPrevious: "All Free features, plus",
  },
  {
    name: "Enterprise",
    description:
      " Perfect for Tailored Solutions",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    lifetimePrice: "Custom",
    features: [
      "Everything in Business Plus:",
"SMS + WhatsApp API Integration",
"Payment Gateway Integration",
"Dedicated Server",
"Dedicated Support",
"Any Customization",
    ],
    cta: "Contact Us",
    popular: false,
    includesPrevious: "All Pro features, plus",
  },
]

export function PricingSection() {
  const [billing, setBilling] = useState("monthly")
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    businessName: "",
    description: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      businessName: "",
      description: "",
    })
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!selectedPlan) {
      alert("Please choose a plan first.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          planName: selectedPlan.name,
        }),
      })

      const contentType = response.headers.get("content-type") || ""
      const payload = contentType.includes("application/json")
        ? await response.json()
        : { success: false, message: await response.text() }

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Order submission failed.")
      }

      alert("Order submitted successfully")
      resetForm()
      setDrawerOpen(false)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit order."
      alert(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center mb-12">
          <Badge variant="outline" className="mb-4">
            Pricing Plans
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Choose your plan
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Start building with our free components or upgrade to
            Pro for access to premium templates and advanced
            features.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-2">
            <ToggleGroup
              type="single"
              value={billing}
              onValueChange={(value) => {
                if (value) setBilling(value)
              }}
              className="bg-secondary text-secondary-foreground border-none rounded-full p-1 cursor-pointer shadow-none"
            >
              <ToggleGroupItem
                value="monthly"
                className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 rounded-full! data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
              >
                Monthly
              </ToggleGroupItem>

              <ToggleGroupItem
                value="yearly"
                className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 rounded-full! data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
              >
                Annually
              </ToggleGroupItem>

              <ToggleGroupItem
                value="lifetime"
                className="data-[state=on]:bg-background data-[state=on]:border-border border-transparent border px-6 rounded-full! data-[state=on]:text-foreground hover:bg-transparent cursor-pointer transition-colors"
              >
                Lifetime
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* <p className="text-sm text-muted-foreground">
            <span className="text-primary font-semibold">
              Save 20%
            </span>{" "}
            On Annual Billing
          </p> */}
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border-2 border-[#171717]">
            <div className="grid lg:grid-cols-3">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`p-8 grid grid-rows-subgrid row-span-4 gap-6 ${
                    plan.popular
                      ? "my-2 mx-4 rounded-xl bg-card  shadow-xl ring-1 ring-foreground/10 backdrop-blur border border-cyan-500"
                      : ""
                  }`}
                >
                  {/* Plan Header */}
                  <div>
                    <div className="text-lg font-medium tracking-tight mb-2">
                      {plan.name}
                    </div>

                    <div className="text-muted-foreground text-balance text-sm">
                      {plan.description}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <div className="text-4xl font-bold mb-1">
  {billing === "monthly"
    ? plan.monthlyPrice
    : billing === "yearly"
    ? plan.yearlyPrice
    : plan.lifetimePrice}
</div>

                    {/* <div className="text-muted-foreground text-sm">
                      {plan.name === "Lifetime"
                        ? "One-time payment"
                        : "Per month"}
                    </div> */}
                  </div>

                  {/* Drawer */}
                  <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen} swipeDirection="right">
                    <Drawer.Trigger
                      onClick={() => setSelectedPlan(plan)}
                      className={`group/button inline-flex h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg border border-transparent bg-clip-padding px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 my-2 ${
                        plan.popular
                          ? "border-[0.5px] border-white/25 bg-primary text-primary-foreground shadow-md shadow-black/20 ring-1 ring-primary/15 hover:bg-primary/90"
                          : "border border-transparent bg-background shadow-sm shadow-black/15 ring-1 ring-foreground/10 hover:bg-muted/50"
                      }`}
                    >
                      {plan.cta}
                    </Drawer.Trigger>

                    <Drawer.Portal>
                      <Drawer.Backdrop
  className="
    fixed inset-0 z-1100 bg-black/50

    data-open:animate-in
    data-closed:animate-out

    data-closed:fade-out-0
    data-open:fade-in-0

    duration-500
  "
/>

                      <Drawer.Viewport className="fixed inset-0 z-1101 flex justify-end">
                      <Drawer.Popup
  className="
    h-full w-full max-w-md border-l bg-background shadow-2xl

    data-open:animate-in
    data-closed:animate-out

    data-closed:slide-out-to-right
    data-open:slide-in-from-right

    duration-500 ease-in-out
  "
>
                          <Drawer.Content className="h-full p-6 flex flex-col border-l border-white">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <Drawer.Title className="text-2xl font-bold">
                                  {selectedPlan?.name} Plan
                                </Drawer.Title>

                                <Drawer.Description className="text-muted-foreground mt-1">
                                  Complete your purchase
                                </Drawer.Description>
                              </div>

                              <Drawer.Close className="inline-flex h-7 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-[0.8rem] font-medium whitespace-nowrap transition-all outline-none select-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 dark:border-input dark:bg-input/30 dark:hover:bg-input/50">
                                Close
                              </Drawer.Close>
                            </div>

                            <form className="space-y-4 overflow-y-auto pr-1" onSubmit={handleSubmit}>
                              <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Selected Plan
                                </p>
                                <p className="mt-1 text-2xl font-bold">{selectedPlan?.name}</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {selectedPlan?.description}
                                </p>
                              </div>

                              <Field.Root name="name" className="space-y-2">
                                <Field.Label className="text-sm font-medium">Full Name</Field.Label>
                                <Input
                                  required
                                  value={formData.name}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      name: event.target.value,
                                    })
                                  }
                                  className="h-11 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                  placeholder="Enter your name"
                                />
                              </Field.Root>

                              <Field.Root name="email" className="space-y-2">
                                <Field.Label className="text-sm font-medium">Email Address</Field.Label>
                                <Input
                                  type="email"
                                  required
                                  value={formData.email}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      email: event.target.value,
                                    })
                                  }
                                  className="h-11 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                  placeholder="Enter your email"
                                />
                              </Field.Root>

                              <Field.Root name="phone" className="space-y-2">
                                <Field.Label className="text-sm font-medium">Phone Number</Field.Label>
                                <Input
                                  value={formData.phone}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      phone: event.target.value,
                                    })
                                  }
                                  className="h-11 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                  placeholder="Enter your phone"
                                />
                              </Field.Root>

                              <Field.Root name="businessName" className="space-y-2">
                                <Field.Label className="text-sm font-medium">Business Name</Field.Label>
                                <Input
                                  value={formData.businessName}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      businessName: event.target.value,
                                    })
                                  }
                                  className="h-11 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                  placeholder="Enter business name"
                                />
                              </Field.Root>

                              <Field.Root name="address" className="space-y-2">
                                <Field.Label className="text-sm font-medium">Address</Field.Label>
                                <textarea
                                  value={formData.address}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      address: event.target.value,
                                    })
                                  }
                                  className="min-h-25 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                  placeholder="Enter your address"
                                />
                              </Field.Root>

                              {/* <Field.Root name="description" className="space-y-2">
                                <Field.Label className="text-sm font-medium">Project Description</Field.Label>
                                <textarea
                                  value={formData.description}
                                  onChange={(event) =>
                                    setFormData({
                                      ...formData,
                                      description: event.target.value,
                                    })
                                  }
                                  className="min-h-35 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                  placeholder="Describe your project"
                                />
                              </Field.Root> */}

                              <Button
                                type="submit"
                                className="w-full h-12 rounded-xl"
                                disabled={isSubmitting}
                              >
                                {isSubmitting ? "Submitting..." : "Submit Order"}
                              </Button>
                            </form>
                          </Drawer.Content>
                        </Drawer.Popup>
                      </Drawer.Viewport>
                    </Drawer.Portal>
                  </Drawer.Root>

                  {/* Features */}
                  <div>
                    <ul role="list" className="space-y-3 text-sm">
                      {plan.includesPrevious && (
                        <li className="flex items-center gap-3 font-medium">
                          {plan.includesPrevious}:
                        </li>
                      )}

                      {plan.features.map(
                        (feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center gap-3"
                          >
                            <Check
                              className="text-muted-foreground size-4 shrink-0"
                              strokeWidth={2.5}
                            />

                            <span>{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enterprise Note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Need custom components or have questions?{" "}
            <Button
              variant="link"
              className="p-0 h-auto cursor-pointer"
              asChild
            >
              <a href="#contact">Contact our team</a>
            </Button>
          </p>
        </div>
      </div>
    </section>
  )
}