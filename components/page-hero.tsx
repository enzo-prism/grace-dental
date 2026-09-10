import * as React from "react"

import { Breadcrumbs, type BreadcrumbItemData } from "@/components/breadcrumbs"
import { Container } from "@/components/container"
import { cn } from "@/lib/utils"

type PageHeroProps = {
  breadcrumbs?: BreadcrumbItemData[]
  eyebrow?: string
  title: string
  description?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  videoBackground?: boolean
}

const heroVideoSrc =
  "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1766199979/drone_shot_fvcf6j.mp4"

function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  className,
  videoBackground = true,
}: PageHeroProps) {
  return (
    <section className={cn("overflow-hidden border-b bg-background", className)}>
      <Container className="py-16 sm:py-24 lg:py-28">
        {videoBackground ? (
          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="min-w-0 max-w-2xl">
              <HeroCopy
                breadcrumbs={breadcrumbs}
                eyebrow={eyebrow}
                title={title}
                description={description}
                actions={actions}
              />
            </div>
            <div className="min-w-0">
              <figure className="overflow-hidden rounded-2xl shadow-sm ring-1 ring-border">
                <video
                  className="aspect-video h-auto w-full object-cover motion-reduce:hidden"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Aerial view of Santa Rosa and Sonoma County"
                >
                  <source src={heroVideoSrc} type="video/mp4" />
                </video>
                <figcaption className="border-t bg-card px-5 py-3 text-sm text-foreground/70">
                  Santa Rosa &amp; Sonoma County, from above
                </figcaption>
              </figure>
            </div>
          </div>
        ) : (
          <div className="min-w-0 max-w-3xl">
            <HeroCopy
              breadcrumbs={breadcrumbs}
              eyebrow={eyebrow}
              title={title}
              description={description}
              actions={actions}
            />
          </div>
        )}
      </Container>
    </section>
  )
}

function HeroCopy({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
}: Pick<
  PageHeroProps,
  "breadcrumbs" | "eyebrow" | "title" | "description" | "actions"
>) {
  return (
    <div className="min-w-0">
      {breadcrumbs ? (
        <Breadcrumbs items={breadcrumbs} className="mb-5" />
      ) : null}
      {eyebrow ? (
        <p className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-block h-px w-8 shrink-0 bg-primary"
          />
          <span className="font-display min-w-0 text-lg text-primary italic">
            {eyebrow}
          </span>
        </p>
      ) : null}
      <h1 className="font-display mt-3 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <div className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          {description}
        </div>
      ) : null}
      {actions ? (
        <div className="mt-7 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {actions}
        </div>
      ) : null}
    </div>
  )
}

export { PageHero }
