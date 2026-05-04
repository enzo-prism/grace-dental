import type { MetadataRoute } from "next"

import { services } from "@/lib/services"

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl()
  const lastModified = new Date()

  return [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/about`, lastModified },
    { url: `${baseUrl}/reviews`, lastModified },
    { url: `${baseUrl}/services`, lastModified },
    ...services.map((service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified,
    })),
    { url: `${baseUrl}/insurance`, lastModified },
    { url: `${baseUrl}/forms`, lastModified },
    { url: `${baseUrl}/registration`, lastModified },
    { url: `${baseUrl}/forms/new-patient`, lastModified },
    { url: `${baseUrl}/contact`, lastModified },
  ]
}
