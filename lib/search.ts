import { insuranceInNetwork } from "@/lib/content"
import { services } from "@/lib/services"

export type SearchGroup = "Services" | "Pages" | "Forms" | "Insurance" | "Team"

export type SearchItem = {
  id: string
  title: string
  href: string
  group: SearchGroup
  description?: string
  keywords?: string[]
  rank?: number
}

const serviceSynonyms: Record<string, string[]> = {
  "porcelain-veneers": ["veneers", "cosmetic", "chips", "gaps", "spacing", "shape", "stains"],
  "teeth-whitening": ["whitening", "bleaching", "stains", "brighten"],
  exams: ["exam", "checkup", "x-rays", "diagnosis"],
  cleaning: ["cleaning", "plaque", "tartar", "gum health"],
  fillings: ["fillings", "cavity", "decay", "tooth-colored", "composite"],
  "crowns-bridges": ["crown", "cap", "bridge", "missing tooth", "broken tooth"],
  "root-canal": ["root canal", "endodontic", "infection", "tooth pain"],
  "dental-extractions": ["extraction", "tooth removal", "pull tooth"],
  "dental-implants": ["implant", "replace tooth", "implant crown"],
  "night-guards": ["night guard", "grinding", "clenching", "bruxism"],
}

export function buildSearchIndex(): SearchItem[] {
  const pageItems: SearchItem[] = [
    {
      id: "page:home",
      title: "Home",
      href: "/",
      group: "Pages",
      rank: 1,
    },
    {
      id: "page:services",
      title: "Services",
      href: "/services",
      group: "Pages",
      description: "Explore cosmetic, general, and restorative services.",
      rank: 2,
      keywords: ["veneers", "whitening", "cleaning", "exam", "implants", "root canal", "crowns", "fillings"],
    },
    {
      id: "page:about",
      title: "About Us",
      href: "/about",
      group: "Pages",
      description: "Meet Dr. Tingjen Ji and the Grace Dental team.",
      rank: 3,
      keywords: ["team", "values", "quality", "compassion", "connection"],
    },
    {
      id: "page:contact",
      title: "Contact",
      href: "/contact",
      group: "Pages",
      description: "Call, email, or request an appointment.",
      rank: 4,
      keywords: ["phone", "email", "address", "hours", "appointment"],
    },
  ]

  const teamItems: SearchItem[] = [
    {
      id: "team:dr-tingjen-ji",
      title: "Dr. Tingjen Ji",
      href: "/about#dr-tingjen-ji",
      group: "Team",
      description: "Lead dentist (DDS, MSD).",
      rank: 10,
      keywords: ["tingjen", "ji", "implant dentistry", "loma linda"],
    },
    {
      id: "team:clarisa",
      title: "Clarisa",
      href: "/about#clarisa",
      group: "Team",
      description: "Front Desk Coordinator.",
      rank: 11,
      keywords: ["front desk", "scheduling", "reception"],
    },
    {
      id: "team:pablo-vazquez-valles",
      title: "Pablo Vazquez Valles",
      href: "/about#pablo-vazquez-valles",
      group: "Team",
      description: "Dental Assistant.",
      rank: 12,
      keywords: ["pablo", "assistant", "x-ray certified"],
    },
  ]

  const insuranceItem: SearchItem = {
    id: "insurance",
    title: "Insurance",
    href: "/insurance",
    group: "Insurance",
    description: "In-network plans and verification details.",
    rank: 20,
    keywords: [
      "in-network",
      "verify",
      "eligibility",
      "benefits",
      ...insuranceInNetwork,
    ],
  }

  const formsItems: SearchItem[] = [
    {
      id: "forms",
      title: "Forms",
      href: "/forms",
      group: "Forms",
      description: "Contact and new patient forms.",
      rank: 30,
      keywords: ["new patient", "intake", "paperwork"],
    },
    {
      id: "forms:new-patient",
      title: "New Patient Form",
      href: "/forms/new-patient",
      group: "Forms",
      description: "Printable form to bring to your first visit.",
      rank: 31,
      keywords: ["print", "intake", "history", "insurance"],
    },
  ]

  const serviceItems: SearchItem[] = services.map((service, index) => ({
    id: `service:${service.slug}`,
    title: service.name,
    href: `/services/${service.slug}`,
    group: "Services",
    description: service.shortDescription,
    rank: 100 + index,
    keywords: [
      service.name,
      ...(serviceSynonyms[service.slug] ?? []),
      ...service.sections.whoItsFor.slice(0, 5),
    ],
  }))

  return [
    ...pageItems,
    ...serviceItems,
    insuranceItem,
    ...formsItems,
    ...teamItems,
  ]
}

