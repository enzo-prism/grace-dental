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
    <section
      className={cn(
        "from-muted/30 via-background to-background relative overflow-hidden border-b bg-gradient-to-br",
        className
      )}
    >
      <div
        className="bg-primary/10 absolute -right-28 -top-28 size-80 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <div
        className="bg-primary/5 absolute -bottom-32 left-8 size-72 rounded-full blur-3xl"
        aria-hidden="true"
      />
      <Container className="relative py-14 sm:py-20">
        <div className="max-w-3xl rounded-3xl bg-background/80 p-6 shadow-xs ring-1 ring-border supports-backdrop-filter:backdrop-blur-md sm:p-8">
          <div className="mb-5 inline-flex rounded-2xl bg-white p-3 shadow-xs ring-1 ring-border sm:p-4">
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
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

export { PageHero }
