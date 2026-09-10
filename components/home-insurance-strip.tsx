import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { Container } from "@/components/container"
import { homeDisplay } from "@/components/home-display"
import { Button } from "@/components/ui/button"
import { insuranceInNetwork, insuranceNote } from "@/lib/content"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

// Insurance as a compact tick-list strip: plan chips in a wrapping row with
// the verify note and actions, instead of another card pair.
function HomeInsuranceStrip() {
  return (
    <section
      aria-labelledby="home-insurance-heading"
      className="border-b bg-secondary/50"
    >
      <Container className="py-16 sm:py-20">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
          <div className="min-w-0 lg:max-w-xs">
            <h2
              id="home-insurance-heading"
              className={cn(
                homeDisplay.className,
                "text-2xl font-medium tracking-tight sm:text-3xl"
              )}
            >
              Insurance
            </h2>
            <p className="mt-2 text-base leading-relaxed text-foreground/80">
              We can help verify your plan.
            </p>
          </div>
          <div className="min-w-0">
            <ul className="flex min-w-0 flex-wrap gap-2">
              {insuranceInNetwork.map((name) => (
                <li
                  key={name}
                  className="inline-flex min-w-0 items-center gap-2 rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground ring-1 ring-border"
                >
                  <CheckIcon
                    className="size-3.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 break-words">{name}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80">
              {insuranceNote}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="outline" className="w-fit bg-background">
                <Link href="/insurance">Insurance details</Link>
              </Button>
              <Button asChild variant="outline" className="w-fit bg-background">
                <a href={siteConfig.contact.phoneHref}>Call to verify</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { HomeInsuranceStrip }
