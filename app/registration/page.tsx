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
      className="from-muted/30 via-background to-background min-h-screen bg-gradient-to-br"
    >
      <header className="sticky top-0 z-20 border-b bg-background/85 supports-backdrop-filter:backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="-ml-2">
            <Link href="/" aria-label="Back to Grace Dental home">
              <ArrowLeftIcon data-icon="inline-start" />
              <span className="hidden sm:inline">Back to site</span>
              <span className="sm:hidden">Back</span>
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

      <main className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <section className="mx-auto w-full max-w-xl text-center lg:mx-0 lg:text-left">
          <div className="mx-auto hidden w-fit rounded-[2rem] bg-white p-4 shadow-xs ring-1 ring-border lg:mx-0 lg:inline-flex">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={668}
              height={566}
              priority
              sizes="128px"
              className="h-28 w-auto"
            />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl lg:mt-8">
            Request an appointment.
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-lg text-base leading-relaxed sm:text-lg lg:mx-0">
            Pick a preferred date and time. We’ll review and confirm.
          </p>

          <div className="mx-auto mt-8 flex max-w-lg flex-wrap justify-center gap-2 text-sm lg:mx-0 lg:justify-start">
            <div className="rounded-full bg-background/80 px-3 py-1.5 shadow-xs ring-1 ring-border">
              ~2 minutes
            </div>
            <div className="rounded-full bg-background/80 px-3 py-1.5 shadow-xs ring-1 ring-border">
              No long forms
            </div>
            <div className="rounded-full bg-background/80 px-3 py-1.5 shadow-xs ring-1 ring-border">
              Help:{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-medium underline underline-offset-4"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl" aria-label="Book appointment form">
          <RegistrationForm />
        </section>
      </main>
    </div>
  )
}
