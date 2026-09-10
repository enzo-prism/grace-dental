import type { MetadataRoute } from "next"

import { services } from "@/lib/services"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteUrl
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
