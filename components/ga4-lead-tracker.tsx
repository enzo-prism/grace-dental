"use client"

import { useEffect } from "react"

import {
  locationFromPathname,
  phoneLeadParams,
  trackGenerateLead,
} from "@/lib/ga4"

function isModifiedClick(event: MouseEvent): boolean {
  return (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  )
}

export function Ga4LeadTracker() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || isModifiedClick(event)) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) {
        return
      }

      const telLink = target.closest<HTMLAnchorElement>('a[href^="tel:"]')
      if (!telLink) {
        return
      }

      trackGenerateLead(phoneLeadParams(locationFromPathname(window.location.pathname)))
    }

    document.addEventListener("click", handleClick, { capture: true })

    return () => {
      document.removeEventListener("click", handleClick, { capture: true })
    }
  }, [])

  return null
}
