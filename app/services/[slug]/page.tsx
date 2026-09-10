import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.sections.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
        <Container className="grid min-w-0 gap-8 lg:grid-cols-3 lg:items-start lg:gap-10">
          <div className="min-w-0 space-y-8 lg:col-span-2">
            <Card className="rounded-3xl p-8 sm:p-10">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl sm:text-3xl">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-0 pt-5 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {service.sections.overview.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </CardContent>
            </Card>

            <div className="min-w-0 border-t-2 border-foreground/10 pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">Who it helps</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {service.sections.whoItsFor.map((item) => (
                  <li key={item} className="flex min-w-0 items-start gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0 border-t-2 border-foreground/10 pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">What to expect</h2>
              <ol className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {service.sections.whatToExpect.map((step, index) => (
                  <li key={step} className="flex min-w-0 items-start gap-4">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground tabular-nums" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span className="min-w-0 pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="min-w-0 border-t-2 border-foreground/10 pt-8">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">Aftercare</h2>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                {service.sections.aftercare.map((item) => (
                  <li key={item} className="flex min-w-0 items-start gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    <span className="min-w-0">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="rounded-2xl p-8 sm:p-10">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">FAQ</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <Accordion type="single" collapsible>
                  {service.sections.faqs.map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="leading-relaxed text-foreground/80">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="min-w-0 space-y-6">
            <Card className="bg-primary text-primary-foreground overflow-hidden rounded-[2rem] p-8 sm:p-10">
              <CardHeader className="gap-2 p-0">
                <div className="text-primary-foreground/90 flex min-w-0 items-center gap-2">
                  <service.icon className="size-5 shrink-0" aria-hidden="true" />
                  <span className="min-w-0 text-sm font-medium">{category.title}</span>
                </div>
                <CardTitle className="text-primary-foreground text-2xl">
                  Ready?
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Book online and we’ll follow up.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 p-0 pt-5">
                <div className="flex flex-wrap gap-3">
                  <BookAppointmentButton variant="secondary" label="Book appointment" />
                  <Button asChild variant="outline">
                    <a href={siteConfig.contact.phoneHref}>Call office</a>
                  </Button>
                </div>
                <p className="text-primary-foreground/80 text-sm">
                  Prefer to book instantly?{" "}
                  <a
                    href={siteConfig.zocdocHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Use Zocdoc
                  </a>
                </p>
              </CardContent>
            </Card>

            <nav aria-label="Related services" className="min-w-0 overflow-hidden rounded-2xl border bg-card">
              <h2 className="px-5 pt-5 text-lg font-semibold tracking-tight">Related services</h2>
              <div className="flex flex-col gap-1 p-3">
                {related.length ? (
                  related.slice(0, 4).map((s) => (
                    <Button key={s.slug} asChild variant="ghost" className="h-auto min-h-11 justify-start rounded-xl px-3 py-2.5 text-left motion-reduce:transition-none">
                      <Link href={`/services/${s.slug}`}><span className="min-w-0 flex-1 truncate sm:whitespace-normal">{s.name}</span></Link>
                    </Button>
                  ))
                ) : (
                  <div className="px-2 py-2 text-sm text-foreground/70">
                    Browse all services to learn more.
                  </div>
                )}
                <Button asChild variant="ghost" className="justify-start motion-reduce:transition-none">
                  <Link href="/services">View all services</Link>
                </Button>
              </div>
            </nav>
          </div>
        </Container>
      </section>
    </div>
  )
}
