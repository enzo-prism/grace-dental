import Link from "next/link"
import Image from "next/image"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { MiniReviews } from "@/components/mini-reviews"
import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Reviews } from "@/components/reviews"
import {
  doctor,
  insuranceInNetwork,
  insuranceNote,
  values,
  valuesHeadline,
} from "@/lib/content"
import { serviceCategories } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

export default function Page() {
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLine
  )}`

  return (
    <div>
      <section className="relative overflow-hidden border-b">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <video
            className="absolute inset-0 h-full w-full object-cover object-left-top origin-top-left scale-[1.12] motion-reduce:hidden"
            autoPlay
            muted
            playsInline
            preload="auto"
          >
            <source
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1766199979/drone_shot_fvcf6j.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background/35 via-background/20 to-background/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/75 via-background/35 to-transparent" />
          <div className="absolute inset-0 opacity-45">
            <div className="bg-primary/10 absolute -top-24 -left-24 size-80 rounded-full blur-3xl" />
            <div className="bg-primary/5 absolute -right-32 top-24 size-[28rem] rounded-full blur-3xl" />
          </div>
        </div>

        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl rounded-3xl bg-background/70 p-6 shadow-lg ring-1 ring-border supports-backdrop-filter:backdrop-blur-md sm:p-8">
            <div className="relative mb-6 inline-flex">
              <div className="inline-flex rounded-2xl bg-white p-4 shadow-xs ring-1 ring-border">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  width={668}
                  height={566}
                  priority
                  sizes="(min-width: 640px) 150px, 132px"
                  className="h-28 w-auto sm:h-32"
                />
              </div>
              <div className="absolute -bottom-3 left-4 z-10">
                <Badge
                  variant="secondary"
                  className="bg-background/90 text-foreground shadow-xs backdrop-blur-sm ring-1 ring-border"
                >
                  New patients welcome
                </Badge>
              </div>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Calm, personal dental care in {siteConfig.locationShort}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              Thoughtful dentistry from a team that keeps visits simple,
              comfortable, and clear.
            </p>
            <p className="mt-3 text-sm font-semibold tracking-tight text-foreground/80">
              {valuesHeadline}
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookAppointmentButton size="lg" />
              <Button asChild variant="outline" size="lg">
                <a href={siteConfig.contact.phoneHref}>
                  <PhoneIcon data-icon="inline-start" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/services">View Services</Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {values.map((item) => (
              <Card
                key={item.title}
                className="bg-background/80 supports-backdrop-filter:backdrop-blur-sm"
              >
                <CardHeader className="gap-2">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                    <item.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <MiniReviews />

      <section className="py-14 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Care Menu"
            title="Services"
            description="Preventive, cosmetic, and restorative care."
            actions={
              <Button asChild variant="outline" className="w-fit">
                <Link href="/services">View all services</Link>
              </Button>
            }
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <Card key={category.title} className="transition-shadow hover:shadow-md">
                <CardHeader className="gap-2">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                    <category.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    {category.services.map((service) => (
                      <li key={service.slug} className="flex items-center gap-2">
                        <span className="bg-primary/40 size-1.5 rounded-full" />
                        <Link
                          className="hover:text-foreground underline-offset-4 hover:underline"
                          href={`/services/${service.slug}`}
                        >
                          {service.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/30 border-y py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card className="bg-background">
              <CardHeader className="gap-3">
                <div className="flex items-start gap-4">
                  <Image
                    src={doctor.headshot.src}
                    alt={doctor.headshot.alt}
                    width={128}
                    height={128}
                    sizes="64px"
                    className="ring-foreground/10 bg-muted size-16 shrink-0 rounded-xl object-cover ring-1"
                  />
                  <div className="grid gap-1">
                    <CardTitle>{doctor.name}</CardTitle>
                    <CardDescription>
                      Gentle care, clear options, and strong clinical training.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ul className="text-muted-foreground list-disc space-y-2 pl-4">
                  <li>DDS, Loma Linda University</li>
                  <li>Master’s Degree in Implant Dentistry</li>
                  <li>Advanced implant training</li>
                  <li>Serving Santa Rosa since 2016</li>
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/about">Meet your dental team</Link>
                  </Button>
                  <BookAppointmentButton variant="outline" label="Book appointment" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Insurance</CardTitle>
                <CardDescription>
                  We can help verify your plan.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {insuranceInNetwork.map((name) => (
                    <Badge key={name} variant="secondary">
                      {name}
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs">{insuranceNote}</p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <Link href="/insurance">Insurance details</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={siteConfig.contact.phoneHref}>Call to verify</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      <Reviews limit={3} />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card>
              <CardHeader>
                <CardTitle>Visit Grace Dental</CardTitle>
                <CardDescription>
                  Find us in {siteConfig.locationShort}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
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
                  <BookAppointmentButton />
                  <Button asChild variant="outline">
                    <a href={mapsHref} target="_blank" rel="noreferrer">
                      Get Directions
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/forms/new-patient">New Patient Form</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground overflow-hidden">
              <CardHeader>
                <CardTitle className="text-primary-foreground">
                  What to expect
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Simple, clear, comfortable.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-1">
                  <div className="font-medium">1) Book online</div>
                  <div className="text-primary-foreground/80 text-sm">
                    Share the essentials one question at a time.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">2) Thorough exam</div>
                  <div className="text-primary-foreground/80 text-sm">
                    We assess your teeth and gum health with modern tools.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">3) Options & next steps</div>
                  <div className="text-primary-foreground/80 text-sm">
                    You’ll get a simple plan with choices and transparency.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}
