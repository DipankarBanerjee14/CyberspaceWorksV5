import {
  BentoCard,
  BentoGrid,
} from "@/components/ui/bento-grid"

import {
  FileText,
  Shield,
  Database,
  BarChart3,
  Layout,
  BarChart,
} from "lucide-react"

export default function FeaturesSection() {
  return (
    <section className="p-20  bg-black">
      <BentoGrid>
        {/* Card 1 */}
        <BentoCard
          name=" Immersive UI & Intuitive Experience"
          description="Experience software that feels second nature. We design clean, minimalist glassmorphic interfaces paired with thoughtful, modern typography and dark-mode aesthetics, turning complex workflows into effortless digital experiences."
          href="/products/gst"
          cta=""
          Icon={Layout}
          className="md:col-span-2"
          background={
            <div className="h-full w-full bg-cyan-500/10" />
          }
        />

        {/* Card 2 */}
        <BentoCard
          name="Enterprise-Grade Security"
          description="Your data integrity is non-negotiable. Every application is fortified with end-to-end encryption, strict multi-factor authentication, and automated nightly backups to keep your business fully protected."
          href="/security"
          cta=""
          Icon={Shield}
          className="md:col-span-1"
          background={
            <div className="h-full w-full bg-purple-500/10" />
          }
        />

        {/* Card 3 */}
        <BentoCard
          name="High-Velocity Architecture"
          description="Powered by modern relational databases and optimized indexes. Experience lightning-fast query execution, real-time inventory synchronization, and zero lag, even under massive data loads."
          href="/database"
          cta=""
          Icon={Database}
          className="md:col-span-1"
          background={
            <div className="h-full w-full bg-emerald-500/10" />
          }
        />

        {/* Card 4 */}
        <BentoCard
          name="Real-Time Analytics & Growth Tracking"
          description="Transform raw numbers into strategic growth. Access immersive, live dashboards that track your revenue metrics, customer trends, and daily operational bottlenecks with absolute clarity."
          href="/analytics"
          cta=""
          Icon={BarChart}
          className="md:col-span-2"
          background={
            <div className="h-full w-full bg-orange-500/10" />
          }
        />
      </BentoGrid>
    </section>
  )
}