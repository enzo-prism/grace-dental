import Link from "next/link"
import { StarIcon } from "lucide-react"

import { Container } from "@/components/container"
import { Card, CardContent } from "@/components/ui/card"
import { reviews } from "@/lib/reviews"

function MiniStars() {
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} className="size-3.5 fill-current" aria-hidden="true" />
      ))}
      <span className="sr-only">5 out of 5 stars</span>
    </div>
  )
}

function MiniReviews() {
  const featuredReviews = reviews.slice(0, 3)

  return (
    <section className="border-b bg-background py-5">
      <Container>
        <div className="grid gap-3 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div>
            <div className="flex items-center gap-2">
              <MiniStars />
              <span className="text-sm font-medium">5.0 patient rating</span>
            </div>
            <Link
              href="/reviews"
              className="premium-link mt-1 inline-flex text-sm"
            >
              Read patient reviews
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {featuredReviews.map((review) => (
              <Card key={review.name} size="sm" className="bg-muted/20">
                <CardContent className="grid gap-2">
                  <MiniStars />
                  <p className="text-sm leading-relaxed">
                    “{review.body.split("\n\n")[0]}”
                  </p>
                  <div className="text-muted-foreground text-xs">{review.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export { MiniReviews }
