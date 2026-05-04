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
        <Container className="grid gap-6 lg:grid-cols-3 lg:items-start">
          <div className="space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm leading-relaxed">
                <p>{service.shortDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who it helps</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="text-muted-foreground space-y-2 text-sm">
                  {service.sections.whoItsFor.slice(0, 3).map((item) => (
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
              </CardHeader>
              <CardContent className="pt-0">
                <ol className="text-muted-foreground space-y-2 text-sm">
                  {service.sections.whatToExpect.slice(0, 3).map((step, index) => (
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
                <CardTitle>FAQ</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Accordion type="single" collapsible>
                  {service.sections.faqs.slice(0, 2).map((faq) => (
                    <AccordionItem key={faq.question} value={faq.question}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                  Ready?
                </CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Book online and we’ll follow up.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3">
                <BookAppointmentButton variant="secondary" label="Book appointment" />
                <Button asChild variant="outline">
                  <a href={siteConfig.contact.phoneHref}>Call office</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Related services</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                {related.length ? (
                  related.slice(0, 4).map((s) => (
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
