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

      <section className="py-24 sm:py-32 lg:py-40">
        <Container>
          <ol className="grid min-w-0 gap-6 lg:grid-cols-3 lg:items-stretch">
            <li className="min-w-0">
            <Card className="flex h-full flex-col rounded-[2rem] bg-primary p-8 text-primary-foreground sm:p-10">
              <CardHeader className="p-0">
                <span className="text-sm font-semibold text-primary-foreground/70 tabular-nums" aria-hidden="true">01</span>
                <CardTitle className="text-primary-foreground mt-2 text-2xl">
                  Book appointment
                </CardTitle>
                <CardDescription className="text-primary-foreground/80 mt-2">
                  One question at a time.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3 p-0 pt-6">
                <BookAppointmentButton variant="secondary" />
              </CardContent>
            </Card>
            </li>

            <li className="min-w-0">
            <Card className="flex h-full flex-col rounded-3xl p-8 sm:p-10">
              <CardHeader className="p-0">
                <span className="text-sm font-semibold text-foreground/50 tabular-nums" aria-hidden="true">02</span>
                <CardTitle className="mt-2 text-2xl">Questions before booking?</CardTitle>
                <CardDescription className="mt-2">We’re happy to help.</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3 p-0 pt-6">
                <Button asChild>
                  <Link href="/contact">Contact the office</Link>
                </Button>
              </CardContent>
            </Card>
            </li>

            <li className="min-w-0">
            <Card className="flex h-full flex-col rounded-2xl p-8 sm:p-10">
              <CardHeader className="p-0">
                <span className="text-sm font-semibold text-foreground/50 tabular-nums" aria-hidden="true">03</span>
                <CardTitle className="mt-2 text-2xl">New patient form</CardTitle>
                <CardDescription className="mt-2">Prefer paper? Print this.</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3 p-0 pt-6">
                <Button asChild>
                  <Link href="/forms/new-patient">Open new patient form</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/insurance">Insurance</Link>
                </Button>
              </CardContent>
            </Card>
            </li>
          </ol>

          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-foreground/70">
            For urgent symptoms, call 911 or visit an emergency room.
          </p>
        </Container>
      </section>
    </div>
  )
}
