import Link from "next/link"

import { Container } from "@/components/container"
import { homeDisplay } from "@/components/home-display"
import { Button } from "@/components/ui/button"
import { serviceCategories } from "@/lib/services"
import { cn } from "@/lib/utils"

const numerals = ["01", "02", "03"]

// Care menu as a sticky-heading ledger: one ruled entry per category with an
// outlined numeral, so the three categories read as chapters, not cards.
function HomeServices() {
  return (
    <section
      aria-labelledby="home-services-heading"
      className="border-y bg-muted/40"
    >
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="min-w-0 lg:sticky lg:top-24 lg:self-start">
            <h2
              id="home-services-heading"
              className={cn(
                homeDisplay.className,
                "text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl"
              )}
            >
              Services
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
              Preventive, cosmetic, and restorative care.
            </p>
            <Button asChild variant="outline" className="mt-8 w-fit bg-background">
              <Link href="/services">View all services</Link>
            </Button>
          </div>

          <div className="min-w-0 border-t border-foreground/20">
            {serviceCategories.map((category, index) => (
              <article
                key={category.title}
                className="grid min-w-0 gap-5 border-b border-foreground/20 py-10 first:pt-10 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8 lg:py-12"
              >
                <div
                  aria-hidden="true"
                  style={{ WebkitTextStroke: "1.5px var(--color-foreground)" }}
                  className={cn(
                    homeDisplay.className,
                    "text-6xl leading-none font-medium text-transparent opacity-30 select-none sm:text-7xl"
                  )}
                >
                  {numerals[index] ?? String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <h3 className="flex min-w-0 items-center gap-2.5 text-xl font-semibold tracking-tight text-foreground">
                    <category.icon
                      className="size-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="min-w-0 break-words">
                      {category.title}
                    </span>
                  </h3>
                  <p className="mt-2 max-w-lg text-base leading-relaxed text-foreground/80">
                    {category.description}
                  </p>
                  <ul className="mt-5 flex min-w-0 flex-wrap gap-x-6 gap-y-2.5">
                    {category.services.map((service) => (
                      <li key={service.slug} className="min-w-0">
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-sm font-medium text-foreground/85 underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export { HomeServices }
