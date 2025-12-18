import type { Metadata } from "next"
import Link from "next/link"

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
        description="Use these forms to request an appointment or prepare for your first visit."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Contact form</CardTitle>
                <CardDescription>
                  Send a request and we’ll follow up to confirm availability.
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact#request">Request appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/contact">Contact details</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>New patient form</CardTitle>
                <CardDescription>
                  A printable form you can fill out and bring to your appointment.
                </CardDescription>
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

          <p className="text-muted-foreground mt-8 max-w-3xl text-sm leading-relaxed">
            For your privacy, please avoid sending sensitive medical information by
            email. If you have urgent symptoms (severe pain, swelling, trouble
            breathing, uncontrolled bleeding), call 911 or go to your nearest
            emergency room.
          </p>
        </Container>
      </section>
    </div>
  )
}
