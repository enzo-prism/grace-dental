import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeftIcon, PhoneIcon } from "lucide-react"

import { RegistrationForm } from "@/components/registration-form"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Request an appointment date and time with Grace Dental in Santa Rosa, CA.",
}

export default function RegistrationPage() {
  return (
    <div
      data-registration-page
      className="min-h-screen overflow-hidden bg-background"
    >
      <header className="sticky top-0 z-20 border-b bg-background/85 supports-backdrop-filter:backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/" aria-label="Back to Grace Dental home">
              <ArrowLeftIcon data-icon="inline-start" />
              <span className="hidden md:inline">Back to site</span>
              <span className="md:hidden">Back</span>
            </Link>
          </Button>

          <Link
            href="/"
            className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-xs ring-1 ring-border transition-opacity hover:opacity-90"
            aria-label="Grace Dental home"
          >
            <Image
              src={siteConfig.logo.src}
              alt=""
              width={668}
              height={566}
              priority
              sizes="(min-width: 640px) 84px, 64px"
              className="h-10 w-auto sm:h-12"
            />
          </Link>

          <Button asChild variant="outline" size="sm" className="hidden sm:flex">
            <a href={siteConfig.contact.phoneHref}>
              <PhoneIcon data-icon="inline-start" />
              Need help?
            </a>
          </Button>
          <Button asChild variant="outline" size="icon" className="size-11 sm:hidden">
            <a href={siteConfig.contact.phoneHref} aria-label="Call Grace Dental">
              <PhoneIcon className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-0 py-6 sm:py-10 lg:min-h-[calc(100vh-4rem)]">
        <h1 className="sr-only">Book an appointment at Grace Dental</h1>
        <section aria-label="Book appointment form">
          <RegistrationForm />
        </section>
      </main>
    </div>
  )
}
