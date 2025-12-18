import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

function SiteFooter() {
  const { address } = siteConfig

  return (
    <footer className="border-t">
      <Container className="grid gap-10 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <Link href="/" className="leading-tight">
            <span className="block text-base font-semibold">
              {siteConfig.name}
            </span>
            <span className="text-muted-foreground block text-sm">
              {siteConfig.locationShort}
            </span>
          </Link>

          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPinIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <div>
                <div>{address.street}</div>
                <div className="text-muted-foreground">
                  {address.city}, {address.state} {address.zip}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon className="text-muted-foreground size-4" />
              <a
                className="hover:text-foreground text-muted-foreground underline-offset-4 hover:underline"
                href={siteConfig.contact.phoneHref}
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="text-muted-foreground size-4" />
              <a
                className="hover:text-foreground text-muted-foreground underline-offset-4 hover:underline"
                href={`mailto:${siteConfig.contact.email}`}
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-2 md:grid-cols-3">
          <div className="space-y-2">
            <div className="text-sm font-semibold">Pages</div>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    className="hover:text-foreground underline-offset-4 hover:underline"
                    href={item.href}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold">Hours</div>
            <ul className="text-muted-foreground space-y-1 text-sm">
              {siteConfig.hours.map((row) => (
                <li key={row.days} className="flex items-center justify-between">
                  <span>{row.days}</span>
                  <span>{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-semibold">New Patients</div>
            <div className="text-muted-foreground text-sm">
              Ready to schedule? Send a request and we’ll follow up to confirm
              availability.
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild size="sm">
                <Link href="/contact#request">Request Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/forms/new-patient">New Patient Form</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-muted/30 border-t py-4">
        <Container className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
          <div>
            For emergencies, call 911 or visit your nearest emergency room.
          </div>
        </Container>
      </div>
    </footer>
  )
}

export { SiteFooter }
