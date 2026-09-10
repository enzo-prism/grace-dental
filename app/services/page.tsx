import type { Metadata } from "next"
import Link from "next/link"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { serviceCategories } from "@/lib/services"

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore cosmetic, general, and restorative dental services at Grace Dental in Santa Rosa, CA.",
}

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Services" },
        ]}
        eyebrow="Services"
        title="Dental services"
        description="Simple care options for your smile."
        actions={
          <>
            <BookAppointmentButton />
            <Button asChild variant="outline">
              <Link href="/insurance">Insurance</Link>
            </Button>
          </>
        }
      />

      <section className="py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid gap-10 lg:gap-14">
            {serviceCategories.map((category, index) => (
              <section key={category.title} aria-label={category.title} className="min-w-0 border-t-2 border-foreground/10 pt-8 sm:pt-10">
                <div className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-2">
                  <span className="text-sm font-semibold text-foreground/50 tabular-nums" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <category.icon className="size-5 shrink-0 translate-y-0.5 text-primary" aria-hidden="true" />
                  <h2 className="min-w-0 text-2xl font-semibold tracking-tight text-balance sm:text-3xl">{category.title}</h2>
                </div>
                <ul className="mt-6 divide-y divide-border overflow-hidden rounded-2xl border bg-card">
                  {category.services.map((service) => (
                    <li key={service.slug} className="min-w-0">
                      <Button
                        asChild
                        variant="ghost"
                        className="h-auto min-h-12 w-full justify-between rounded-none px-5 py-4 text-left font-medium motion-reduce:transition-none"
                      >
                        <Link href={`/services/${service.slug}`}>
                          <span className="min-w-0 flex-1 truncate sm:whitespace-normal">{service.name}</span>
                          <span aria-hidden="true" className="shrink-0 text-foreground/40">→</span>
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <Card className="mt-16 rounded-[2rem] p-8 sm:mt-20 sm:p-10 lg:p-12">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl sm:text-3xl">Not sure where to start?</CardTitle>
              <CardDescription className="mt-2 text-base">Book online and we’ll help with the next step.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3 p-0 pt-6">
              <BookAppointmentButton />
              <Button asChild variant="outline">
                <Link href="/about">Meet the team</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
