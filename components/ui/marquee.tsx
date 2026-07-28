import { type ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  vertical?: boolean
  repeat?: number
    onHoverChange?: (hovered: boolean) => void
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
   onHoverChange,
  ...props
}: MarqueeProps) {
  console.log("hello",{ reverse, pauseOnHover, vertical, repeat }) // ✅ debug log to verify props
  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-black to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-black to-transparent" />

      <div
        {...props}
        className={cn(
          "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-[var(--gap)]",
          vertical ? "flex-col" : "flex-row",
          className
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
           <div
  key={i}
  className={cn(
    "flex shrink-0 justify-around gap-[var(--gap)]",
    reverse && "rounded-xl p-2 animate-marquee-reverse",
    vertical
      ? "animate-marquee-vertical flex-col"
      : reverse
      ? "animate-marquee-reverse flex-row"
      : "animate-marquee flex-row",
    pauseOnHover && "animation-play-state"
    
  )}
>
              {children}
            </div>
          ))}
      </div>
    </div>
  )
}