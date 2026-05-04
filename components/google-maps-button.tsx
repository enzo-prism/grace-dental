import * as React from "react"

import { GoogleMapsIcon } from "@/components/google-maps-icon"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

function GoogleMapsButton({
  variant = "outline",
  size = "default",
  className,
  label = "Open in Maps",
}: Pick<React.ComponentProps<typeof Button>, "variant" | "size" | "className"> & {
  label?: string
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={siteConfig.googleMapsHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Open Grace Dental in Google Maps"
      >
        <GoogleMapsIcon className="size-4" />
        {label}
      </a>
    </Button>
  )
}

export { GoogleMapsButton }
