import Image from "next/image"
import Link from "next/link"
import { CheckIcon } from "lucide-react"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { Container } from "@/components/container"
import { homeDisplay } from "@/components/home-display"
import { Button } from "@/components/ui/button"
import { doctor } from "@/lib/content"
import { cn } from "@/lib/utils"

const credentials = [
  "DDS, Loma Linda University",
  "Master’s Degree in Implant Dentistry",
  "Advanced implant training",
  "Serving Santa Rosa since 2016",
]

// Doctor profile as an asymmetric split: portrait in a soft offset frame
// with a hand-drawn SVG ring, credentials as a checklist ledger.
function HomeDoctor() {
  return (
    <section aria-labelledby="home-doctor-heading">
      <Container className="py-24 sm:py-32 lg:py-40">
        <div className="grid min-w-0 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <figure className="relative m-0 min-w-0">
            <svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              className="absolute -top-8 -left-8 -z-0 size-36 text-primary/40 sm:size-44"
            >
              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="3 9"
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="100"
                r="62"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="2 7"
                strokeLinecap="round"
              />
            </svg>
            <Image
              src={doctor.headshot.src}
              alt={doctor.headshot.alt}
              width={640}
              height={800}
              sizes="(min-width: 1024px) 460px, 100vw"
              className="relative aspect-[4/5] w-full min-w-0 rounded-[2.5rem] bg-muted object-cover ring-1 ring-border"
            />
          </figure>

          <div className="min-w-0">
            <h2
              id="home-doctor-heading"
              className={cn(
                homeDisplay.className,
                "text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-5xl"
              )}
            >
              {doctor.name}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg sm:leading-relaxed">
              Gentle care, clear options, and strong clinical training.
            </p>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {credentials.map((credential) => (
                <li
                  key={credential}
                  className="flex min-w-0 items-center gap-3 py-3.5 text-sm font-medium text-foreground sm:text-base"
                >
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <CheckIcon
                      className="size-3.5 text-primary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="min-w-0 break-words">{credential}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild className="w-fit">
                <Link href="/about">Meet your dental team</Link>
              </Button>
              <BookAppointmentButton
                variant="outline"
                label="Book appointment"
                className="w-fit"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export { HomeDoctor }
