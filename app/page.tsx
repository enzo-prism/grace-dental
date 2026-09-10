import { MiniReviews } from "@/components/mini-reviews"
import { Reviews } from "@/components/reviews"
import { HomeCta } from "@/components/home-cta"
import { HomeDoctor } from "@/components/home-doctor"
import { HomeHero } from "@/components/home-hero"
import { HomeInsuranceStrip } from "@/components/home-insurance-strip"
import { HomePillars } from "@/components/home-pillars"
import { HomeServices } from "@/components/home-services"
import { HomeVisit } from "@/components/home-visit"

export default function Page() {
  return (
    <div className="min-w-0 overflow-hidden">
      <HomeHero />
      <MiniReviews />
      <HomePillars />
      <HomeDoctor />
      <HomeServices />
      <div className="min-w-0 border-b bg-muted/30">
        <Reviews limit={3} />
      </div>
      <HomeInsuranceStrip />
      <HomeVisit />
      <HomeCta />
    </div>
  )
}
