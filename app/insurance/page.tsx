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
        title="Insurance at Grace Dental"
        description="Here are the insurance plans we are in-network with. Please note: we must verify that your plan type is in network."
      />

      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
            <Card>
              <CardHeader>
                <CardTitle>In-network plans</CardTitle>
                <CardDescription>
                  If you don’t see your plan listed, call our office and we’ll help.
                </CardDescription>
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
                <CardTitle>Verification note</CardTitle>
                <CardDescription>{insuranceNote}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  Insurance networks can vary by plan type—even within the same provider.
                  We’ll verify eligibility and benefits before your appointment.
                </p>
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
