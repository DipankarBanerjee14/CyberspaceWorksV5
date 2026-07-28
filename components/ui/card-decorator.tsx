import * as React from 'react'

import { cn } from '@/lib/utils'

type CardDecoratorProps = React.HTMLAttributes<HTMLDivElement>

function CardDecorator({ className, ...props }: CardDecoratorProps) {
  return (
    <div
      data-slot="card-decorator"
      className={cn(
        'inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border/60 bg-linear-to-br from-primary/15 via-primary/10 to-transparent text-primary shadow-sm transition-transform group-hover:scale-105',
        className
      )}
      {...props}
    />
  )
}

export { CardDecorator }