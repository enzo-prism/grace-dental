import { Container } from "@/components/container"
import { homeDisplay } from "@/components/home-display"
import { values } from "@/lib/content"
import { cn } from "@/lib/utils"

const numerals = ["01", "02", "03"]

// Practice values as a numbered editorial ledger — ruled entries with large
// serif numerals instead of a repeated 3-card icon grid.
function HomePillars() {
  return (
    <section aria-label="Our values" className="border-b">
      <Container className="py-24 sm:py-32 lg:py-40">
        <ol className="grid min-w-0 gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {values.map((item, index) => (
            <li
              key={item.title}
              className="min-w-0 border-t-2 border-foreground pt-6"
            >
              <div
                aria-hidden="true"
                className={cn(
                  homeDisplay.className,
                  "text-5xl font-medium text-foreground/25 sm:text-6xl"
                )}
              >
                {numerals[index] ?? String(index + 1).padStart(2, "0")}
              </div>
              <h2 className="mt-4 flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground">
                <item.icon
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {item.title}
              </h2>
              <p className="mt-2 max-w-sm text-base leading-relaxed text-foreground/80">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export { HomePillars }
