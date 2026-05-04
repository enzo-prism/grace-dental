import type { Metadata } from "next"
import Image from "next/image"

import { BookAppointmentButton } from "@/components/book-appointment-button"
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
import { aboutMission, doctor, team, values, valuesHeadline } from "@/lib/content"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Dr. Tingjen Ji and the team at Grace Dental in Santa Rosa, CA. Learn about our values, approach, and what to expect.",
}

const aboutImages = {
  patientComfort: {
    src: "https://cdn.prod.website-files.com/66d9cb76c33ef67dc0df55bc/679eb30cab66d7db8f8e712e_patient%20chair%20(1).jpg",
    alt: "A patient smiling from a dental chair",
  },
  sonomaLandscape: {
    src: "https://cdn.prod.website-files.com/66d9cb76c33ef67dc0df55bc/66e07a97b6110e35e2df90c4_027SVTF.jpg",
    alt: "Aerial view of the Santa Rosa and Sonoma County landscape",
  },
} as const

export default function AboutPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "About" },
        ]}
        eyebrow="About Us"
        title="Meet Grace Dental"
        description="A small team focused on calm, thoughtful care."
        actions={
          <>
            <BookAppointmentButton />
            <Button asChild variant="outline">
              <a href={siteConfig.contact.phoneHref}>
                Call {siteConfig.contact.phoneDisplay}
              </a>
            </Button>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <div>
              <h2 className="text-2xl font-semibold tracking-tight">Our approach</h2>
              <div className="mt-3 text-lg font-semibold tracking-tight">{valuesHeadline}</div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {aboutMission}
              </p>
              </div>

              <Card className="bg-muted/20">
                <CardHeader className="gap-2">
                  <CardTitle>What to expect</CardTitle>
                  <CardDescription>What your visit feels like.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="grid gap-1">
                    <div className="font-medium">A warm welcome</div>
                    <div className="text-muted-foreground">
                      We listen first.
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">A thoughtful exam</div>
                    <div className="text-muted-foreground">
                      We check what matters.
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <div className="font-medium">Clear next steps</div>
                    <div className="text-muted-foreground">
                      You leave with a plan.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-xs ring-1 ring-border">
                <Image
                  src={aboutImages.patientComfort.src}
                  alt={aboutImages.patientComfort.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-5">
                  <div className="w-fit rounded-full bg-background/90 px-3 py-1 text-xs font-medium shadow-xs ring-1 ring-border backdrop-blur-sm">
                    Comfort-first care
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-[0.75fr_1fr]">
                <div className="relative min-h-44 overflow-hidden rounded-3xl bg-muted shadow-xs ring-1 ring-border">
                  <Image
                    src={aboutImages.sonomaLandscape.src}
                    alt={aboutImages.sonomaLandscape.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <Card className="justify-center bg-background">
                  <CardHeader>
                    <CardTitle className="text-base">Rooted in Santa Rosa</CardTitle>
                    <CardDescription>
                      Local care with a calm Sonoma County feel.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title}>
                <CardHeader className="gap-2">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
                    <v.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{v.title}</CardTitle>
                  <CardDescription>{v.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="dr-tingjen-ji"
        className="bg-muted/30 border-y py-14 sm:py-20 scroll-mt-24"
      >
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <Card className="overflow-hidden bg-background">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={doctor.headshot.src}
                  alt={doctor.headshot.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <CardHeader className="gap-2">
                <CardTitle>{doctor.name}</CardTitle>
                <CardDescription>
                  Advanced training. Gentle chairside care.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookAppointmentButton
                  variant="outline"
                  className="w-full"
                  label="Book appointment"
                />
              </CardContent>
            </Card>

            <div>
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold tracking-tight">
                  Meet {doctor.name}
                </h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed sm:text-base">
                  Dr. Ji combines advanced training with calm, clear care.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {doctor.sections.map((section) => (
                  <Card key={section.title} className="bg-background">
                    <CardHeader className="gap-2">
                      <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-xl">
                        <section.icon className="size-5" aria-hidden="true" />
                      </div>
                      <CardTitle className="text-base">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                      {section.paragraphs.slice(0, 1).map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Meet the Team</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
                Friendly faces, simple communication.
              </p>
            </div>
            <BookAppointmentButton variant="outline" className="w-fit" />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {team.map((member) => {
              const id = member.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-+|-+$)/g, "")

              return (
                <Card key={member.name} id={id} className="scroll-mt-24">
                <CardHeader className="gap-3">
                  <div className="flex items-start gap-4">
                    {member.headshot ? (
                      <Image
                        src={member.headshot.src}
                        alt={member.headshot.alt}
                        width={128}
                        height={128}
                        sizes="64px"
                        className="ring-foreground/10 bg-muted size-16 shrink-0 rounded-xl object-cover ring-1"
                      />
                    ) : null}
                    <div className="grid gap-1">
                      <CardTitle className="text-base">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                  {member.paragraphs.slice(0, 1).map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </CardContent>
              </Card>
              )
            })}
          </div>
        </Container>
      </section>
    </div>
  )
}
