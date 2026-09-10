import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { BookAppointmentButton } from "@/components/book-appointment-button"
import { GoogleMapsIcon } from "@/components/google-maps-icon"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ClipboardListIcon,
  HomeIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  MessageCircleIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparklesIcon,
  StarIcon,
  UsersRoundIcon,
  type LucideIcon,
} from "lucide-react"

const navIcons: Record<(typeof siteConfig.nav)[number]["href"], LucideIcon> = {
  "/": HomeIcon,
  "/services": SparklesIcon,
  "/about": UsersRoundIcon,
  "/reviews": StarIcon,
  "/insurance": ShieldCheckIcon,
  "/forms": ClipboardListIcon,
  "/contact": MessageCircleIcon,
}

const headerNavItems = siteConfig.nav.filter(
  (item) => item.href !== "/insurance" && item.href !== "/forms"
)

function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <a
        href="#main-content"
        className="sr-only rounded-md bg-background px-3 py-2 text-sm font-medium text-foreground shadow-xs focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:ring-[3px] focus:ring-ring/50"
      >
        Skip to content
      </a>
      <Container className="flex min-w-0 items-center justify-between gap-3 py-3 sm:gap-4">
        <Link
          href="/"
          className="min-w-0 leading-tight"
          aria-label={`${siteConfig.name} — home`}
        >
          <span className="font-display block truncate text-lg font-semibold tracking-tight sm:text-xl">
            {siteConfig.name}
          </span>
          <span className="block truncate text-xs text-foreground/65 sm:text-sm">
            {siteConfig.locationShort}
          </span>
        </Link>

        <nav className="hidden min-w-0 items-center gap-1 md:flex" aria-label="Primary">
          {headerNavItems.map((item) => {
            const Icon = navIcons[item.href]

            return (
              <Button key={item.href} asChild variant="ghost" size="sm">
                <Link href={item.href}>
                  <Icon data-icon="inline-start" aria-hidden="true" />
                  {item.title}
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <BookAppointmentButton
            size="sm"
            label="Book"
            className="h-11 px-3 sm:hidden"
          />
          <BookAppointmentButton
            size="sm"
            label="Book Appointment"
            className="hidden sm:inline-flex"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-full md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 rounded-2xl">
              <div className="flex items-center gap-2 px-2 py-1 text-xs text-foreground/65">
                <MapPinIcon className="size-4" aria-hidden="true" />
                {siteConfig.locationShort}
              </div>
              <DropdownMenuSeparator />
              {headerNavItems.map((item) => {
                const Icon = navIcons[item.href]

                return (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>
                      <Icon />
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href={siteConfig.contact.phoneHref}>
                  <PhoneIcon />
                  Call {siteConfig.contact.phoneDisplay}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  <MailIcon />
                  {siteConfig.contact.email}
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a
                  href={siteConfig.googleMapsHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GoogleMapsIcon />
                  Open in Maps
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </header>
  )
}

export { SiteHeader }
