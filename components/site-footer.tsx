import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { GoogleMapsButton } from "@/components/google-maps-button"
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
    <footer className="bg-[oklch(0.29_0.05_200)] text-[oklch(0.96_0.012_95)] dark:bg-[oklch(0.2_0.03_200)]">
      <Container className="py-16 sm:py-20">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
          <div className="min-w-0 space-y-8">
            <div className="grid min-w-0 gap-8 sm:grid-cols-[1.1fr_0.9fr]">
              <div className="min-w-0 space-y-5">
                <Link
                  href="/"
                  className="inline-flex min-w-0 flex-col leading-tight"
                >
                  <span className="font-display text-xl font-semibold tracking-tight">
                    {siteConfig.name}
                  </span>
                  <span className="mt-1 text-sm text-white/70">
                    {siteConfig.locationShort} — gentle care, clear answers
                  </span>
                </Link>

                <div className="grid min-w-0 gap-3 text-sm">
                  <div className="flex min-w-0 items-start gap-2">
                    <MapPinIcon
                      className="mt-0.5 size-4 shrink-0 text-white/60"
                      aria-hidden="true"
                    />
                    <div className="min-w-0">
                      <div>{address.street}</div>
                      <div className="text-white/70">
                        {address.city}, {address.state} {address.zip}
                      </div>
                    </div>
                  </div>
                  <a
                    className="flex min-w-0 items-center gap-2 text-white/80 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                    href={siteConfig.contact.phoneHref}
                  >
                    <PhoneIcon className="size-4 shrink-0" aria-hidden="true" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                  <a
                    className="flex min-w-0 items-center gap-2 text-white/80 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    <MailIcon className="size-4 shrink-0" aria-hidden="true" />
                    <span className="min-w-0 break-all">
                      {siteConfig.contact.email}
                    </span>
                  </a>
                </div>
              </div>

              <div className="grid min-w-0 grid-cols-2 gap-6">
                <FooterLinkGroup title="Explore" items={footerNav} />
                <FooterLinkGroup title="Resources" items={resourceNav} />
              </div>
            </div>

            <Separator className="bg-white/15" />

            <div>
              <p className="font-display text-lg italic text-white/85">
                Office hours
              </p>
              <div className="mt-3 grid min-w-0 gap-2 text-sm sm:grid-cols-2 sm:gap-x-8">
                {siteConfig.hours.slice(0, 4).map((row) => (
                  <div
                    key={row.days}
                    className="flex min-w-0 items-center justify-between gap-4 sm:justify-start"
                  >
                    <span className="min-w-24 text-white/65">{row.days}</span>
                    <span className="text-white/90">{row.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Card className="min-w-0 rounded-xl border-transparent bg-[oklch(0.985_0.006_95)] text-foreground shadow-none">
            <CardHeader className="px-8 sm:px-10 lg:px-12">
              <CardTitle className="font-display text-2xl font-medium">
                New patient?
              </CardTitle>
              <CardDescription className="text-base text-foreground/70">
                Book online in minutes — no phone tag needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex min-w-0 flex-col gap-3 px-8 pb-8 sm:px-10 sm:pb-10 lg:px-12 lg:pb-12">
              <BookAppointmentButton />
              <GoogleMapsButton />
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-10 bg-white/15" />

        <div className="flex min-w-0 flex-col gap-2 text-xs text-white/60 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}
          </div>
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
    <div className="min-w-0 space-y-3">
      <div className="text-sm font-semibold text-white">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li key={item.href} className="min-w-0">
            <Link
              className="text-white/70 underline-offset-4 transition-colors duration-200 hover:text-white hover:underline"
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
