import Link from "next/link"
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { GoogleMapsButton } from "@/components/google-maps-button"
import { homeDisplay } from "@/components/home-display"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const steps = [
  {
    title: "1) Book online",
    description: "Share the essentials one question at a time.",
  },
  {
    title: "2) Thorough exam",
    description: "We assess your teeth and gum health with modern tools.",
  },
  {
    title: "3) Options & next steps",
    description:
      "You’ll get a simple plan with choices and transparency.",
  },
]

// Visit section: address + hours as an open ledger beside a tinted
// "what to expect" rail with a dashed SVG timeline spine.
function HomeVisit() {
  return (
    <section aria-labelledby="home-visit-heading">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl min-w-0">
          <h2
            id="home-visit-heading"
            className={cn(
              homeDisplay.className,
              "text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl"
            )}
          >
            Visit Grace Dental
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
            Find us in {siteConfig.locationShort}.
          </p>
        </div>

        <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="min-w-0">
            <address className="grid min-w-0 gap-4 text-sm leading-relaxed not-italic sm:text-base">
              <div className="flex min-w-0 items-start gap-3">
                <MapPinIcon
                  className="mt-1 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="font-medium text-foreground">
                    {siteConfig.address.street}
                  </div>
                  <div className="text-foreground/80">
                    {siteConfig.address.city}, {siteConfig.address.state}{" "}
                    {siteConfig.address.zip}
                  </div>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-3">
                <PhoneIcon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  className="min-w-0 font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
                  href={siteConfig.contact.phoneHref}
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex min-w-0 items-center gap-3">
                <MailIcon
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <a
                  className="min-w-0 font-medium break-words text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex min-w-0 items-start gap-3">
                <ClockIcon
                  className="mt-1 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <ul className="w-full min-w-0 divide-y divide-border border-y border-border text-foreground/85">
                  {siteConfig.hours.map((row) => (
                    <li
                      key={row.days}
                      className="flex min-w-0 items-center justify-between gap-4 py-2.5"
                    >
                      <span className="min-w-0">{row.days}</span>
                      <span className="shrink-0 font-medium">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </address>

            <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
              <BookAppointmentButton className="w-fit" />
              <GoogleMapsButton className="w-fit" />
              <Button asChild variant="outline" className="w-fit">
                <Link href="/forms/new-patient">New Patient Form</Link>
              </Button>
            </div>
          </div>

          <div className="relative min-w-0 overflow-hidden rounded-[2rem] bg-secondary/60 p-8 ring-1 ring-border sm:p-10 lg:p-12">
            <svg
              aria-hidden="true"
              className="absolute top-10 bottom-10 left-[2.65rem] w-px text-foreground/25 sm:left-[3.15rem] lg:left-[3.65rem]"
              preserveAspectRatio="none"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="2 7"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <h3
              className={cn(
                homeDisplay.className,
                "text-2xl font-medium tracking-tight sm:text-3xl"
              )}
            >
              What to expect
            </h3>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              Simple, clear, comfortable.
            </p>
            <ol className="relative mt-8 grid min-w-0 gap-8">
              {steps.map((step) => (
                <li key={step.title} className="relative min-w-0 pl-12">
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-0 flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                  >
                    {step.title.charAt(0)}
                  </span>
                  <div className="font-semibold text-foreground">
                    {step.title}
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {step.description}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { HomeVisit }
