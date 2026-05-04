import * as React from "react"

import { Badge } from "@/components/ui/badge"
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
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        {eyebrow ? (
          <Badge variant="secondary" className="mb-3">
            {eyebrow}
          </Badge>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-balance">
          {title}
        </h2>
        {description ? (
          <div className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed sm:text-base">
            {description}
          </div>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}

export { SectionHeading }
