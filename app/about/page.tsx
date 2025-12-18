import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"

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

export default function AboutPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "About" },
        ]}
        eyebrow="About Us"
        title="Meet the Team at Grace Dental Santa Rosa"
        description="Experience personalized dental care at Grace Dental."
        actions={
          <>
            <Button asChild>
              <Link href="/contact#request">Request Appointment</Link>
            </Button>
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
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Values & Priorities
              </h2>
              <div className="mt-3 text-lg font-semibold tracking-tight">
                {valuesHeadline}
              </div>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed sm:text-base">
                {aboutMission}
              </p>
            </div>

            <Card className="bg-muted/20">
              <CardHeader className="gap-2">
                <CardTitle>What to expect</CardTitle>
                <CardDescription>A welcoming visit built around you.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="grid gap-1">
                  <div className="font-medium">A warm welcome</div>
                  <div className="text-muted-foreground">
                    We’ll confirm your goals and take time for questions.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">A comprehensive exam</div>
                  <div className="text-muted-foreground">
                    We assess your teeth and gum health and review any imaging needed.
                  </div>
                </div>
                <div className="grid gap-1">
                  <div className="font-medium">Clear options</div>
                  <div className="text-muted-foreground">
                    You’ll leave with a plan and transparent guidance.
                  </div>
                </div>
              </CardContent>
            </Card>
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src={doctor.headshot.src}
                alt={doctor.headshot.alt}
                width={160}
                height={160}
                sizes="(min-width: 640px) 80px, 64px"
                className="ring-foreground/10 bg-background size-16 shrink-0 rounded-xl object-cover ring-1 sm:size-20"
              />
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{doctor.name}</h2>
                <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
                  Education, experience, and a comfort-first approach for patients in{" "}
                  {siteConfig.locationShort}.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/contact#request">Schedule a visit</Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {doctor.sections.map((section) => (
              <Card key={section.title} className="bg-background">
                <CardHeader className="gap-2">
                  <div className="bg-muted text-foreground flex size-10 items-center justify-center rounded-xl">
                    <section.icon className="size-5" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-3 text-sm leading-relaxed">
                  {section.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Meet the Team</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
                We’re here to help you feel comfortable, informed, and cared for.
              </p>
            </div>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/contact#request">Request an appointment</Link>
            </Button>
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
                  {member.paragraphs.map((p) => (
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
