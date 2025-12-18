import * as React from "react"
import Image from "next/image"

import { Breadcrumbs, type BreadcrumbItemData } from "@/components/breadcrumbs"
import { cn } from "@/lib/utils"
import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { siteConfig } from "@/lib/site"

type PageHeroProps = {
  breadcrumbs?: BreadcrumbItemData[]
  eyebrow?: string
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("bg-background relative overflow-hidden border-b", className)}>
      <Container className="py-14 sm:py-20">
        <div className="max-w-2xl">
          <div className="bg-white ring-black/10 shadow-xs mb-5 inline-flex rounded-2xl p-3 ring-1 sm:p-4">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={668}
              height={566}
              priority
              sizes="(min-width: 640px) 132px, 112px"
              className="h-24 w-auto sm:h-28"
            />
          </div>
          {breadcrumbs ? (
            <Breadcrumbs items={breadcrumbs} className="mb-3" />
          ) : null}
          {eyebrow ? <Badge variant="secondary">{eyebrow}</Badge> : null}
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <div className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {description}
            </div>
          ) : null}
          {actions ? (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

export { PageHero }
