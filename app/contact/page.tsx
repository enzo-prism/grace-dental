import type { Metadata } from "next"
import Link from "next/link"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
import { GoogleMapsButton } from "@/components/google-maps-button"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/lib/site"
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Grace Dental in Santa Rosa, CA, or book an appointment online.",
}

export default function ContactPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Contact" },
        ]}
        eyebrow="Contact"
        title="Get in touch"
        description="Book online, call, or send a quick question."
        actions={
          <>
            <BookAppointmentButton />
            <Button asChild variant="outline">
              <a href={siteConfig.contact.phoneHref}>Call now</a>
            </Button>
          </>
        }
      />

      <section className="py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
            <Card className="min-w-0 rounded-3xl p-8 sm:p-10">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">Contact details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5 p-0 pt-6 text-sm sm:text-base">
                <div className="min-w-0 space-y-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <div className="min-w-0">
                      <div>{siteConfig.address.street}</div>
                      <div className="text-foreground/75">
                        {siteConfig.address.city}, {siteConfig.address.state}{" "}
                        {siteConfig.address.zip}
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-0 items-center gap-3">
                    <PhoneIcon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <a
                      className="premium-link min-w-0 truncate"
                      href={siteConfig.contact.phoneHref}
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex min-w-0 items-center gap-3">
                    <MailIcon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    <a
                      className="premium-link min-w-0 break-all"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div className="flex min-w-0 items-start gap-3">
                    <ClockIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                    <ul className="w-full min-w-0 space-y-1.5 text-foreground/75">
                      {siteConfig.hours.map((row) => (
                        <li
                          key={row.days}
                          className="flex min-w-0 items-center justify-between gap-4"
                        >
                          <span>{row.days}</span>
                          <span className="shrink-0">{row.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex min-w-0 flex-wrap gap-3 border-t pt-6">
                  <Button asChild className="min-w-0">
                    <a href={siteConfig.contact.phoneHref}>Call now</a>
                  </Button>
                  <Button asChild variant="outline" className="min-w-0">
                    <a href={`mailto:${siteConfig.contact.email}`} className="break-all">Email us</a>
                  </Button>
                  <GoogleMapsButton />
                  <Button asChild variant="outline">
                    <Link href="/forms/new-patient">New Patient Form</Link>
                  </Button>
                </div>

                <p className="text-xs leading-relaxed text-foreground/70 sm:text-sm">
                  If you’re experiencing severe pain, swelling, trouble
                  breathing, or uncontrolled bleeding, call 911 or go to your
                  nearest emergency room.
                </p>
              </CardContent>
            </Card>

            <Card id="request" className="min-w-0 scroll-mt-24 rounded-2xl p-8 sm:p-10">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">Have a question?</CardTitle>
                <CardDescription className="mt-2">Send a quick note.</CardDescription>
              </CardHeader>
              <CardContent className="min-w-0 p-0 pt-6">
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}
