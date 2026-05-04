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

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card>
              <CardHeader>
                <CardTitle>In-network plans</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {insuranceInNetwork.map((name) => (
                    <Badge key={name} variant="secondary">
                      {name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/20">
              <CardHeader>
                <CardTitle>Need verification?</CardTitle>
                <CardDescription>{insuranceNote}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-3">
                  <Button asChild>
                    <a href={siteConfig.contact.phoneHref}>
                      Call {siteConfig.contact.phoneDisplay}
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`mailto:${siteConfig.contact.email}`}>Email us</a>
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
