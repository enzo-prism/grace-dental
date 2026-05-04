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

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader className="gap-2">
                  <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-xl">
                    <category.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-2">
                    {category.services.map((service) => (
                      <Button
                        key={service.slug}
                        asChild
                        variant="outline"
                        className="justify-start"
                      >
                        <Link href={`/services/${service.slug}`}>{service.name}</Link>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle>Not sure where to start?</CardTitle>
              <CardDescription>Book online and we’ll help with the next step.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
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
