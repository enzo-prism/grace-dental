import Link from "next/link"
import Image from "next/image"

import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  doctor,
  insuranceInNetwork,
  insuranceNote,
  values,
  valuesHeadline,
} from "@/lib/content"
import { serviceCategories } from "@/lib/services"
import { siteConfig } from "@/lib/site"
import {
  ArrowRightIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react"

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
              src="https://res.cloudinary.com/dhqpqfw6w/video/upload/v1766199853/YTDown.com_YouTube_Laguna-de-Santa-Rosa-Drone-Footage-Sonom_Media_xlsMoO1Bdxo_001_1080p_rtzhgb.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/70 to-background/95" />
          <div className="absolute inset-0 opacity-70">
            <div className="bg-primary/10 absolute -top-24 -left-24 size-80 rounded-full blur-3xl" />
            <div className="bg-primary/5 absolute -right-32 top-24 size-[28rem] rounded-full blur-3xl" />
          </div>
        </div>

        <Container className="py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="relative mb-6 inline-flex">
              <div className="bg-white ring-black/10 shadow-xs inline-flex rounded-2xl p-4 ring-1">
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
                  className="bg-white/90 text-foreground ring-black/10 shadow-xs backdrop-blur-sm ring-1"
                >
                  New patients welcome
                </Badge>
              </div>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Personalized dental care in {siteConfig.locationShort}
            </h1>
            <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">
              {siteConfig.description} Our focus is comprehensive dentistry in a
              welcoming environment—so you always feel comfortable and informed.
            </p>
            <p className="mt-3 text-sm font-semibold tracking-tight">
              {valuesHeadline}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact#request">
                  Request Appointment <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </Button>
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
              <Card key={item.title} className="bg-background/60">
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

      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
                Cosmetic, general, and restorative dentistry—designed around your
                goals and long-term oral health.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/services">View all services</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {serviceCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader className="gap-2">
                  <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-xl">
                    <category.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    {category.services.map((service) => (
                      <li key={service.slug} className="flex items-center gap-2">
                        <span className="bg-border size-1.5 rounded-full" />
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
                      Experience personalized dental care at Grace Dental.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <ul className="text-muted-foreground list-disc space-y-2 pl-4">
                  <li>Loma Linda University School of Dentistry (DDS, 2009)</li>
                  <li>Master’s Degree in Implant Dentistry (2010)</li>
                  <li>
                    3‑year Advanced Education Program in Implant Dentistry (LLU)
                  </li>
                  <li>Serving Santa Rosa since 2016</li>
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <Link href="/about">Meet your dental team</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/contact#request">Request appointment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background">
              <CardHeader>
                <CardTitle>Insurance</CardTitle>
                <CardDescription>
                  In-network with several plans. Call us to confirm details.
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

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card>
              <CardHeader>
                <CardTitle>Visit Grace Dental</CardTitle>
                <CardDescription>
                  Conveniently located in {siteConfig.locationShort}.
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
                  <Button asChild>
                    <Link href="/contact#request">
                      Request Appointment{" "}
                      <ArrowRightIcon data-icon="inline-end" />
                    </Link>
                  </Button>
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
                  A clear plan and a comfortable visit—no surprises.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-1">
                  <div className="font-medium">1) Quick intake</div>
                  <div className="text-primary-foreground/80 text-sm">
                    We’ll confirm your goals and medical history.
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
