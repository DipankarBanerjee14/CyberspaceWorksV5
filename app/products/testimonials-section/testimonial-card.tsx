import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  role: string
  review: string
}

export function TestimonialCard({
  name,
  role,
  review,
}: TestimonialCardProps) {
  return (
    <div className="w-[350px] rounded-2xl border bg-background/60 backdrop-blur p-6 shadow-sm">
      <div className="flex items-center gap-1 mb-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <Star
              key={i}
              className="size-4 fill-yellow-400 text-yellow-400"
            />
          ))}
      </div>

      <p className="text-muted-foreground leading-relaxed mb-6">
        {review}
      </p>

      <div>
        <h4 className="font-semibold">
          {name}
        </h4>

        <p className="text-sm text-muted-foreground">
          {role}
        </p>
      </div>
    </div>
  )
}