import type { Metadata } from "next"
import Link from "next/link"

import { Container } from "@/components/container"
import { PageHero } from "@/components/page-hero"
import { PrintButton } from "@/components/print-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "New Patient Form",
  description:
    "Printable new patient form for Grace Dental in Santa Rosa, CA.",
}

export default function NewPatientFormPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Forms", href: "/forms" },
          { title: "New Patient Form" },
        ]}
        eyebrow="Forms"
        title="New Patient Form"
        description="You can print this form and bring it to your first appointment."
        actions={
          <>
            <PrintButton />
            <Button asChild>
              <Link href="/contact#request">Request Appointment</Link>
            </Button>
          </>
        }
      />

      <section className="py-14 sm:py-20">
        <Container className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient information</CardTitle>
              <CardDescription>
                Please complete what you can. You may also fill this out in-office.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-name">Full name</FieldLabel>
                    <Input id="np-name" name="name" autoComplete="name" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-dob">Date of birth</FieldLabel>
                    <Input id="np-dob" name="dob" placeholder="MM/DD/YYYY" />
                  </Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-phone">Phone</FieldLabel>
                    <Input id="np-phone" name="phone" autoComplete="tel" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-email">Email</FieldLabel>
                    <Input id="np-email" name="email" type="email" autoComplete="email" />
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="np-address">Address</FieldLabel>
                  <Input id="np-address" name="address" autoComplete="street-address" />
                </Field>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field>
                    <FieldLabel htmlFor="np-city">City</FieldLabel>
                    <Input id="np-city" name="city" autoComplete="address-level2" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-state">State</FieldLabel>
                    <Input id="np-state" name="state" autoComplete="address-level1" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-zip">ZIP</FieldLabel>
                    <Input id="np-zip" name="zip" autoComplete="postal-code" />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency contact</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-ec-name">Name</FieldLabel>
                    <Input id="np-ec-name" name="emergencyContactName" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-ec-phone">Phone</FieldLabel>
                    <Input id="np-ec-phone" name="emergencyContactPhone" />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="np-ec-relationship">Relationship</FieldLabel>
                  <Input id="np-ec-relationship" name="emergencyContactRelationship" />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insurance information</CardTitle>
              <CardDescription>
                Please bring your insurance card. We’ll verify that your plan type is in network.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-insurance-provider">Provider</FieldLabel>
                    <Input id="np-insurance-provider" name="insuranceProvider" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-insurance-subscriber">Subscriber name</FieldLabel>
                    <Input id="np-insurance-subscriber" name="insuranceSubscriber" />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-insurance-id">Member ID</FieldLabel>
                    <Input id="np-insurance-id" name="insuranceId" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-insurance-group">Group #</FieldLabel>
                    <Input id="np-insurance-group" name="insuranceGroup" />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical & dental history</CardTitle>
              <CardDescription>
                For your privacy, please avoid emailing sensitive medical details. This form is intended to be printed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="np-concerns">Reason for visit / concerns</FieldLabel>
                  <Textarea id="np-concerns" name="concerns" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="np-allergies">Allergies</FieldLabel>
                  <Textarea id="np-allergies" name="allergies" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="np-medications">Medications</FieldLabel>
                  <Textarea id="np-medications" name="medications" />
                </Field>
                <Field>
                  <FieldLabel htmlFor="np-history">Medical conditions / history</FieldLabel>
                  <Textarea id="np-history" name="history" />
                </Field>
              </FieldGroup>

              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-last-visit">Last dental visit</FieldLabel>
                    <Input id="np-last-visit" name="lastDentalVisit" placeholder="Month/Year" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-last-xrays">Last X-rays</FieldLabel>
                    <Input id="np-last-xrays" name="lastXrays" placeholder="Month/Year" />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Signature</CardTitle>
              <CardDescription>
                By signing, you confirm the information provided is accurate to the best of your knowledge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="np-signature">Signature</FieldLabel>
                    <Input id="np-signature" name="signature" />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="np-signature-date">Date</FieldLabel>
                    <Input id="np-signature-date" name="signatureDate" placeholder="MM/DD/YYYY" />
                  </Field>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="bg-muted/20">
            <CardHeader>
              <CardTitle>Need help?</CardTitle>
              <CardDescription>
                Call or email us and we’ll be happy to assist.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Button asChild>
                <a href={siteConfig.contact.phoneHref}>
                  Call {siteConfig.contact.phoneDisplay}
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`mailto:${siteConfig.contact.email}`}>Email us</a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact page</Link>
              </Button>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  )
}
