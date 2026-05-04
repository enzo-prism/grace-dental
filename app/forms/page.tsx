import type { Metadata } from "next"
import Link from "next/link"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Forms",
  description:
    "Contact and new patient forms for Grace Dental in Santa Rosa, CA.",
}

export default function FormsPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Forms" },
        ]}
        eyebrow="Forms"
        title="Forms & resources"
        description="Book online or print a form."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
            <Card className="flex flex-col bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-primary-foreground">
                  Book appointment
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  One question at a time.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3">
                <BookAppointmentButton variant="secondary" />
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Questions before booking?</CardTitle>
                <CardDescription>We’re happy to help.</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact">Contact the office</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>New patient form</CardTitle>
                <CardDescription>Prefer paper? Print this.</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/forms/new-patient">Open new patient form</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/insurance">Insurance</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <p className="text-muted-foreground mt-8 max-w-3xl text-sm">
            For urgent symptoms, call 911 or visit an emergency room.
          </p>
        </Container>
      </section>
    </div>
  )
}
