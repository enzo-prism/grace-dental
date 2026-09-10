import Link from "next/link"
import { ArrowRightIcon, PhoneIcon } from "lucide-react"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { homeDisplay } from "@/components/home-display"
import { valuesHeadline } from "@/lib/content"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const heroVideoSrc =
  "https://res.cloudinary.com/dhqpqfw6w/video/upload/v1766199979/drone_shot_fvcf6j.mp4"

// Editorial split hero: left-aligned copy on paper, drone footage set in a
// tall arch frame with a dotted SVG plot behind it. No glass card, no blobs,
// no centered pill-plus-CTA row.
function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          <div className="min-w-0">
            <p className="flex min-w-0 items-center gap-3 text-sm font-semibold text-foreground">
              <span
                aria-hidden="true"
                className="h-px w-10 shrink-0 bg-primary"
              />
              <span className="min-w-0">New patients welcome</span>
            </p>
            <h1
              className={cn(
                homeDisplay.className,
                "mt-6 max-w-xl text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl"
              )}
            >
              Calm, personal dental care in {siteConfig.locationShort}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
              Thoughtful dentistry from a team that keeps visits simple,
              comfortable, and clear.
            </p>
            <p className="mt-4 text-sm font-semibold tracking-tight text-foreground/80">
              {valuesHeadline}
            </p>

            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookAppointmentButton size="lg" className="w-fit" />
              <Link
                href={siteConfig.contact.phoneHref}
                className="inline-flex min-w-0 items-center gap-2 rounded-md px-1 py-2 text-sm font-semibold text-foreground underline decoration-foreground/30 underline-offset-8 transition-colors hover:decoration-foreground"
              >
                <PhoneIcon className="size-4 shrink-0" aria-hidden="true" />
                <span className="break-words">
                  {siteConfig.contact.phoneDisplay}
                </span>
              </Link>
              <Link
                href="/services"
                className="inline-flex min-w-0 items-center gap-1.5 rounded-md px-1 py-2 text-sm font-semibold text-foreground underline decoration-foreground/30 underline-offset-8 transition-colors hover:decoration-foreground"
              >
                View Services
                <ArrowRightIcon className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="relative min-w-0">
            <svg
              aria-hidden="true"
              className="absolute -top-10 -right-6 -z-0 size-44 text-foreground/15 sm:size-56"
            >
              <defs>
                <pattern
                  id="home-hero-dots"
                  width="18"
                  height="18"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.6" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#home-hero-dots)" />
            </svg>
            <div className="relative min-w-0 overflow-hidden rounded-t-[999px] rounded-b-[2rem] ring-1 ring-border">
              <video
                className="aspect-[4/5] h-auto w-full bg-muted object-cover object-left-top motion-reduce:hidden"
                autoPlay
                muted
                playsInline
                preload="auto"
              >
                <source src={heroVideoSrc} type="video/mp4" />
              </video>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { HomeHero }
