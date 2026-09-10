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

      <section className="py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-14">
            <div className="min-w-0 space-y-8">
              <div>
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Our approach</h2>
              <div className="mt-4 text-xl font-semibold tracking-tight text-balance">{valuesHeadline}</div>
              <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
                {aboutMission}
              </p>
              </div>

              <Card className="rounded-2xl bg-muted/20 p-8 sm:p-10">
                <CardHeader className="gap-2 p-0">
                  <CardTitle className="text-xl">What to expect</CardTitle>
                  <CardDescription>What your visit feels like.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 p-0 pt-6 text-sm sm:text-base">
                  <div className="grid gap-1 border-t pt-5 first:border-t-0 first:pt-0">
                    <div className="font-medium">A warm welcome</div>
                    <div className="text-foreground/75">
                      We listen first.
                    </div>
                  </div>
                  <div className="grid gap-1 border-t pt-5">
                    <div className="font-medium">A thoughtful exam</div>
                    <div className="text-foreground/75">
                      We check what matters.
                    </div>
                  </div>
                  <div className="grid gap-1 border-t pt-5">
                    <div className="font-medium">Clear next steps</div>
                    <div className="text-foreground/75">
                      You leave with a plan.
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid min-w-0 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-muted shadow-xs ring-1 ring-border">
                <Image
                  src={aboutImages.patientComfort.src}
                  alt={aboutImages.patientComfort.alt}
                  fill
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex justify-start bg-gradient-to-t from-background/90 to-transparent p-5">
                  <div className="w-fit rounded-full bg-background px-3 py-1 text-xs font-medium shadow-xs ring-1 ring-border">
                    Comfort-first care
                  </div>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-[0.75fr_1fr]">
                <div className="relative min-h-44 overflow-hidden rounded-2xl bg-muted shadow-xs ring-1 ring-border">
                  <Image
                    src={aboutImages.sonomaLandscape.src}
                    alt={aboutImages.sonomaLandscape.alt}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 40vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <Card className="justify-center rounded-2xl bg-background p-8">
                  <CardHeader className="p-0">
                    <CardTitle className="text-xl">Rooted in Santa Rosa</CardTitle>
                    <CardDescription className="mt-2">
                      Local care with a calm Sonoma County feel.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-20">
            <h3 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-3xl">What guides our care</h3>
            <ol className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {values.map((v, index) => (
                <li key={v.title} className="flex min-w-0 gap-4 border-t-2 border-foreground/10 pt-6">
                  <span className="text-sm font-semibold text-foreground/50 tabular-nums" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <v.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                      <h4 className="text-lg font-semibold tracking-tight">{v.title}</h4>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75 sm:text-base">{v.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section
        id="dr-tingjen-ji"
        className="bg-muted/30 border-y py-24 sm:py-32 lg:py-40 scroll-mt-24"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start lg:gap-14">
            <Card className="overflow-hidden rounded-[2rem] bg-background">
              <div className="relative aspect-square bg-muted">
                <Image
                  src={doctor.headshot.src}
                  alt={doctor.headshot.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover"
                />
              </div>
              <CardHeader className="gap-2 p-8">
                <CardTitle className="text-xl">{doctor.name}</CardTitle>
                <CardDescription>
                  Advanced training. Gentle chairside care.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <BookAppointmentButton
                  variant="outline"
                  className="w-full"
                  label="Book appointment"
                />
              </CardContent>
            </Card>

            <div className="min-w-0">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                  Meet {doctor.name}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                  Dr. Ji combines advanced training with calm, clear care.
                </p>
              </div>

              <div className="mt-10 divide-y divide-border border-y border-border">
                {doctor.sections.map((section) => (
                  <div key={section.title} className="flex min-w-0 gap-4 py-6">
                    <section.icon className="mt-1 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight">{section.title}</h3>
                      <div className="mt-2 space-y-3 text-sm leading-relaxed text-foreground/75 sm:text-base">
                      {section.paragraphs.slice(0, 1).map((p) => (
                        <p key={p}>{p}</p>
                      ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">Meet the Team</h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                Friendly faces, simple communication.
              </p>
            </div>
            <BookAppointmentButton variant="outline" className="w-fit shrink-0" />
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {team.map((member) => {
              const id = member.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-+|-+$)/g, "")

              return (
                <Card key={member.name} id={id} className="scroll-mt-24 rounded-3xl p-8 sm:p-10">
                <CardHeader className="gap-3 p-0">
                  <div className="flex min-w-0 items-start gap-4">
                    {member.headshot ? (
                      <Image
                        src={member.headshot.src}
                        alt={member.headshot.alt}
                        width={128}
                        height={128}
                        sizes="64px"
                        className="ring-foreground/10 bg-muted size-16 shrink-0 rounded-full object-cover ring-1"
                      />
                    ) : null}
                    <div className="grid min-w-0 gap-1">
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 p-0 pt-5 text-sm leading-relaxed text-foreground/75 sm:text-base">
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
