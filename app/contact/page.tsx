import type { Metadata } from "next"
import Link from "next/link"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { ContactForm } from "@/components/contact-form"
import { Container } from "@/components/container"
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
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLine
  )}`

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

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card>
              <CardHeader>
                <CardTitle>Contact details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <div>
                      <div>{siteConfig.address.street}</div>
                      <div className="text-muted-foreground">
                        {siteConfig.address.city}, {siteConfig.address.state}{" "}
                        {siteConfig.address.zip}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="text-muted-foreground size-4" />
                    <a
                      className="hover:text-foreground text-muted-foreground underline-offset-4 hover:underline"
                      href={siteConfig.contact.phoneHref}
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="text-muted-foreground size-4" />
                    <a
                      className="hover:text-foreground text-muted-foreground underline-offset-4 hover:underline"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <ClockIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <ul className="text-muted-foreground w-full space-y-1">
                      {siteConfig.hours.map((row) => (
                        <li
                          key={row.days}
                          className="flex items-center justify-between"
                        >
                          <span>{row.days}</span>
                          <span>{row.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={siteConfig.contact.phoneHref}>Call now</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`mailto:${siteConfig.contact.email}`}>Email us</a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={mapsHref} target="_blank" rel="noreferrer">
                      Get directions
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/forms/new-patient">New Patient Form</Link>
                  </Button>
                </div>

                <p className="text-muted-foreground text-xs">
                  If you’re experiencing severe pain, swelling, trouble
                  breathing, or uncontrolled bleeding, call 911 or go to your
                  nearest emergency room.
                </p>
              </CardContent>
            </Card>

            <Card id="request" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Have a question?</CardTitle>
                <CardDescription>Send a quick note.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}
