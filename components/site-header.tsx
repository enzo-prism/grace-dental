import Link from "next/link"

import { siteConfig } from "@/lib/site"
import { BookAppointmentButton } from "@/components/book-appointment-button"
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
  const addressLine = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    addressLine
  )}`

  return (
    <header className="bg-background/80 supports-backdrop-filter:backdrop-blur-sm sticky top-0 z-40 border-b">
      <a
        href="#main-content"
        className="bg-background text-foreground focus:ring-ring/50 sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 rounded-md px-3 py-2 text-sm font-medium shadow-xs focus:ring-[3px]"
      >
        Skip to content
      </a>
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link href="/" className="leading-tight">
          <span className="block text-sm font-semibold sm:text-base">
            {siteConfig.name}
          </span>
          <span className="text-muted-foreground block text-xs sm:text-sm">
            {siteConfig.locationShort}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
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

        <div className="flex items-center gap-2">
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
                className="size-11 md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <div className="text-muted-foreground flex items-center gap-2 px-2 py-1 text-xs">
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
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  <MapPinIcon />
                  Directions
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
