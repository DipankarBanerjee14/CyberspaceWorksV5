interface DotPatternProps {
  className?: string
}

export function DotPattern({ className = '' }: DotPatternProps) {
  return (
    <div
      className={`
        pointer-events-none
        absolute
        inset-0
        -z-10
        h-full
        w-full
        overflow-hidden
        opacity-40

        bg-[radial-gradient(circle,#d4d4d4_1px,transparent_1px)]
        [background-size:20px_20px]

        ${className}
      `}
    />
  )
}