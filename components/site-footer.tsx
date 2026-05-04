import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"

const footerNav = siteConfig.nav.filter((item) =>
  ["/services", "/about", "/reviews", "/contact"].includes(item.href)
)

const resourceNav = siteConfig.nav.filter((item) =>
  ["/insurance", "/forms"].includes(item.href)
)

function SiteFooter() {
  const { address } = siteConfig

  return (
    <footer className="border-t bg-muted/20">
      <Container className="py-10 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <Link href="/" className="inline-flex flex-col leading-tight">
                  <span className="text-base font-semibold">{siteConfig.name}</span>
                  <span className="text-muted-foreground text-sm">
                    {siteConfig.locationShort}
                  </span>
                </Link>

                <div className="grid gap-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                    <div>
                      <div>{address.street}</div>
                      <div className="text-muted-foreground">
                        {address.city}, {address.state} {address.zip}
                      </div>
                    </div>
                  </div>
                  <a
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 underline-offset-4 hover:underline"
                    href={siteConfig.contact.phoneHref}
                  >
                    <PhoneIcon className="size-4" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <a
                    className="text-muted-foreground hover:text-foreground flex items-center gap-2 underline-offset-4 hover:underline"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    <MailIcon className="size-4" />
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <FooterLinkGroup title="Explore" items={footerNav} />
                <FooterLinkGroup title="Resources" items={resourceNav} />
              </div>
            </div>

            <Separator />

            <div className="grid gap-2 text-sm sm:grid-cols-2">
              {siteConfig.hours.slice(0, 4).map((row) => (
                <div
                  key={row.days}
                  className="flex items-center justify-between gap-4 sm:justify-start"
                >
                  <span className="text-muted-foreground min-w-24">{row.days}</span>
                  <span>{row.hours}</span>
                </div>
              ))}
            </div>
          </div>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle>New patient?</CardTitle>
              <CardDescription>Book online in minutes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <BookAppointmentButton />
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-8" />

        <div className="text-muted-foreground flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} {siteConfig.name}</div>
          <div>For emergencies, call 911.</div>
        </div>
      </Container>
    </footer>
  )
}

function FooterLinkGroup({
  title,
  items,
}: {
  title: string
  items: Array<{ title: string; href: string }>
}) {
  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              href={item.href}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { SiteFooter }
