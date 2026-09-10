import type { Metadata } from "next"

import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { insuranceInNetwork, insuranceNote } from "@/lib/content"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "Insurance information for Grace Dental in Santa Rosa, CA, including in-network plans and verification details.",
}

export default function InsurancePage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Insurance" },
        ]}
        eyebrow="Insurance"
        title="Insurance"
        description="We’ll help verify your plan."
      />

      <section className="py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
            <div className="min-w-0 rounded-3xl border bg-card p-8 sm:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-balance">In-network plans</h2>
              <div className="mt-6 flex min-w-0 flex-wrap gap-2">
                {insuranceInNetwork.map((name) => (
                  <Badge key={name} variant="secondary" className="min-w-0">
                    {name}
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="rounded-2xl bg-muted/20 p-8 sm:p-10">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">Need verification?</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">{insuranceNote}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-0 pt-6 text-sm">
                <div className="flex min-w-0 flex-wrap gap-3">
                  <Button asChild className="min-w-0">
                    <a href={siteConfig.contact.phoneHref} className="min-w-0 truncate">
                      Call {siteConfig.contact.phoneDisplay}
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="min-w-0">
                    <a href={`mailto:${siteConfig.contact.email}`} className="min-w-0 break-all">Email us</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  )
}
