import * as React from "react"

import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function SectionHeading({
  eyebrow,
  title,
  description,
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="min-w-0 max-w-3xl">
        {eyebrow ? (
          <p className="font-display text-lg text-primary italic">{eyebrow}</p>
        ) : null}
        <h2 className="font-display mt-2 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <div className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            {description}
          </div>
        ) : null}
      </div>
      {actions ? (
        <div className="flex min-w-0 shrink-0 flex-wrap gap-3">{actions}</div>
      ) : null}
    </div>
  )
}

export { SectionHeading }
