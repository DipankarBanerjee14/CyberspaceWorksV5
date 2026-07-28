"use client"

import Link from "next/link"

const menuGroups = [
  {
    title: "Browse Products",
    items: [
      { label: "Free Blocks", href: "#free-blocks" },
      { label: "Premium Templates", href: "#premium-templates" },
      { label: "Admin Dashboards", href: "#admin-dashboards" },
      { label: "Landing Pages", href: "#landing-pages" },
    ],
  },
  {
    title: "Categories",
    items: [
      { label: "E-commerce", href: "#ecommerce" },
      { label: "SaaS Dashboards", href: "#saas-dashboards" },
      { label: "Analytics", href: "#analytics" },
      { label: "Authentication", href: "#authentication" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Documentation", href: "#docs" },
      { label: "Component Showcase", href: "#showcase" },
      { label: "GitHub Repository", href: "#github" },
      { label: "Design System", href: "#design-system" },
    ],
  },
]

export function MegaMenu() {
  return (
    <div className="grid gap-4 p-4 md:w-[720px] md:grid-cols-3 lg:w-[840px]">
      {menuGroups.map((group) => (
        <div key={group.title} className="space-y-3 rounded-lg border bg-background/80 p-4 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </div>
          <div className="grid gap-1">
            {group.items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
