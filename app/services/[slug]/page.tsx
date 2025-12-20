import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  getRelatedServices,
  getService,
  serviceCategoryMeta,
  services,
} from "@/lib/services"
import { siteConfig } from "@/lib/site"

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) {
    return {}
  }

  return {
    title: service.seo.title,
    description: service.seo.description,
  }
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) {
    notFound()
  }

  const related = getRelatedServices(service)
  const category = serviceCategoryMeta[service.categoryId]

  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Services", href: "/services" },
          { title: service.name },
        ]}
        eyebrow={`${category.title} Service`}
        title={service.name}
        description={service.shortDescription}
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
        <Container className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  A clear explanation of what this service is and how it may help.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4 text-sm leading-relaxed">
                {service.sections.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who it helps</CardTitle>
                <CardDescription>
                  Common reasons patients ask about {service.name.toLowerCase()}.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {service.sections.whoItsFor.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="bg-border mt-2 size-1.5 shrink-0 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What to expect</CardTitle>
                <CardDescription>
                  A typical visit flow. Exact steps can vary by patient.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ol className="text-muted-foreground space-y-2 text-sm">
                  {service.sections.whatToExpect.map((step, index) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="bg-muted text-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Aftercare & follow-up</CardTitle>
                <CardDescription>
                  Simple guidance to support healing and long-term results.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {service.sections.aftercare.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="bg-border mt-2 size-1.5 shrink-0 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription>Answers to common questions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {service.sections.faqs.map((faq) => (
                  <div key={faq.question} className="space-y-2">
                    <div className="font-medium">{faq.question}</div>
                    <div className="text-muted-foreground text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                    <Separator />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-primary text-primary-foreground overflow-hidden">
              <CardHeader className="gap-2">
                <div className="text-primary-foreground/90 flex items-center gap-2">
                  <service.icon className="size-5" aria-hidden="true" />
                  <span className="text-sm font-medium">{category.title}</span>
                </div>
                <CardTitle className="text-primary-foreground">
                  Ready to get started?
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Request an appointment and we’ll follow up to confirm availability.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <Link href="/contact#request">Request appointment</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={siteConfig.contact.phoneHref}>Call office</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related services</CardTitle>
                <CardDescription>
                  Explore other options that may support your goals.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {related.length ? (
                  related.map((s) => (
                    <Button key={s.slug} asChild variant="outline" className="justify-start">
                      <Link href={`/services/${s.slug}`}>{s.name}</Link>
                    </Button>
                  ))
                ) : (
                  <div className="text-muted-foreground text-sm">
                    Browse all services to learn more.
                  </div>
                )}
                <Button asChild variant="ghost" className="justify-start">
                  <Link href="/services">View all services</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}
