import type { Metadata } from "next"
import Link from "next/link"

import { BookAppointmentButton } from "@/components/book-appointment-button"
import { GoogleReviewButton } from "@/components/google-review-button"
import { PageHero } from "@/components/page-hero"
import { Reviews } from "@/components/reviews"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Read patient reviews for Dr. Tingjen Ji and the Grace Dental team in Santa Rosa, CA.",
}

export default function ReviewsPage() {
  return (
    <div>
      <PageHero
        breadcrumbs={[
          { title: "Home", href: "/" },
          { title: "Reviews" },
        ]}
        eyebrow="Patient Reviews"
        title="Patients feel cared for here"
        description="A selection of real reviews from Grace Dental patients."
        actions={
          <>
            <BookAppointmentButton />
            <Button asChild variant="outline">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <GoogleReviewButton />
          </>
        }
      />
      <Reviews limit={12} />
    </div>
  )
}
