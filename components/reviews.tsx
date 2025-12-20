import { Container } from "@/components/container"
import { Badge } from "@/components/ui/badge"
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

export function Reviews() {
  return (
    <section className="py-14 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="secondary">Patient Reviews</Badge>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Reviews for Dr. Ji and her team
            </h2>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm sm:text-base">
              Real feedback from patients who trust Grace Dental for their care.
            </p>
          </div>
        </div>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {reviews.map((review, index) => (
            <Card key={`${review.name}-${index}`} size="sm" className="mb-4 break-inside-avoid">
              <CardHeader className="gap-2">
                <div className="flex items-start justify-between gap-3">
                  <CardTitle>{review.name}</CardTitle>
                  <ReviewStars rating={review.rating} />
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground text-sm">
                <div className="space-y-3 leading-relaxed">
                  {review.body.split("\n\n").map((paragraph, paragraphIndex) => (
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
