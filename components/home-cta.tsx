import { PhoneIcon } from "lucide-react"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { homeDisplay } from "@/components/home-display"
import { Button } from "@/components/ui/button"
import { valuesHeadline } from "@/lib/content"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

// Closing CTA: a deep primary panel etched with concentric SVG rings,
// reusing the practice headline and existing booking links.
function HomeCta() {
  return (
    <section aria-labelledby="home-cta-heading" className="pb-24 sm:pb-32">
      <Container>
        <div className="relative min-w-0 overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-primary-foreground sm:px-12 sm:py-16 lg:px-16 lg:py-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            preserveAspectRatio="xMaxYMax slice"
            className="absolute -right-24 -bottom-24 size-[26rem] text-primary-foreground/15"
          >
            <circle
              cx="300"
              cy="300"
              r="200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="300"
              cy="300"
              r="155"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="300"
              cy="300"
              r="110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle
              cx="300"
              cy="300"
              r="65"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          <div className="relative max-w-2xl min-w-0">
            <h2
              id="home-cta-heading"
              className={cn(
                homeDisplay.className,
                "text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl"
              )}
            >
              {valuesHeadline}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg sm:leading-relaxed">
              Thoughtful dentistry from a team that keeps visits simple,
              comfortable, and clear.
            </p>
            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookAppointmentButton
                variant="secondary"
                size="lg"
                className="w-fit"
              />
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-fit border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <a href={siteConfig.contact.phoneHref}>
                  <PhoneIcon data-icon="inline-start" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { HomeCta }
