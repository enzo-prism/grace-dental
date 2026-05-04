import { Container } from "@/components/container"
import { GoogleReviewButton } from "@/components/google-review-button"
import { SectionHeading } from "@/components/section-heading"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { reviews } from "@/lib/reviews"
import { StarIcon } from "lucide-react"

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: rating }).map((_, index) => (
        <StarIcon key={index} className="size-4" aria-hidden="true" />
      ))}
      <span className="sr-only">{rating} out of 5 stars</span>
    </div>
  )
}

type ReviewsProps = {
  limit?: number
}

export function Reviews({ limit = 9 }: ReviewsProps) {
  const visibleReviews = reviews.slice(0, limit)

  return (
    <section className="py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Patient Reviews"
          title="Kind words from patients"
          description="A few recent notes from people who trust Grace Dental."
          actions={<GoogleReviewButton />}
        />

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {visibleReviews.map((review, index) => (
            <Card
              key={`${review.name}-${index}`}
              size="sm"
              className="mb-4 break-inside-avoid"
            >
              <CardHeader className="gap-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{review.name}</CardTitle>
                  <ReviewStars rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                <div className="space-y-3 leading-relaxed">
                  {review.body.split("\n\n").slice(0, 1).map((paragraph, paragraphIndex) => (
                    <p key={`${review.name}-${paragraphIndex}`}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}
