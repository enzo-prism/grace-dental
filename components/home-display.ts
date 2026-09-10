import { Fraunces } from "next/font/google"

// Warm display serif for home headings. Body copy stays on the site body
// face; this face is applied per-heading via `homeDisplay.className`.
const homeDisplay = Fraunces({
  subsets: ["latin"],
  variable: "--font-home-display",
  display: "swap",
})

export { homeDisplay }
