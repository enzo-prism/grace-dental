import type { LucideIcon } from "lucide-react"
import {
  BadgeCheckIcon,
  GraduationCapIcon,
  HandHeartIcon,
  HeartHandshakeIcon,
  MountainIcon,
  UsersIcon,
} from "lucide-react"

export type IconItem = {
  title: string
  description: string
  icon: LucideIcon
}

export const valuesHeadline = "Quality. Compassion. Connection."

export const aboutMission =
  "Warm, personalized dental care led by Dr. Tingjen Ji in Santa Rosa."

export const values: IconItem[] = [
  {
    title: "Quality",
    description:
      "Thoughtful care with strong clinical standards.",
    icon: BadgeCheckIcon,
  },
  {
    title: "Compassion",
    description:
      "A calm visit that moves at your pace.",
    icon: HandHeartIcon,
  },
  {
    title: "Connection",
    description:
      "Clear options and honest conversation.",
    icon: UsersIcon,
  },
]

export const doctor = {
  name: "Dr. Tingjen Ji, DDS, MSD",
  headshot: {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766078243/dr-ji_vxhikt.webp",
    alt: "Dr. Tingjen Ji",
  },
  sections: [
    {
      title: "Education",
      icon: GraduationCapIcon,
      paragraphs: [
        "Dr. Tingjen Ji, DDS, MSD, is a graduate of Loma Linda University School of Dentistry. She completed her dental degree in 2009 and earned a Master’s Degree in Implant Dentistry in 2010.",
        "Dr. Ji furthered her expertise through the 3‑year Advanced Education Program in Implant Dentistry at Loma Linda University, equipping her to surgically and prosthodontically treat complex cases, with or without the use of implants.",
        "In addition to her implant expertise, Dr. Ji is proficient in premolar and molar endodontic therapy, partial dentures, and surgical extractions.",
        "Since 2016, Dr. Ji has called Santa Rosa home after several years of practice in Snohomish, Washington. She’s proud to serve Sonoma County with high-quality, patient-centered care.",
      ],
    },
    {
      title: "Care",
      icon: HeartHandshakeIcon,
      paragraphs: [
        "Dr. Ji understands that visiting the dentist can feel overwhelming. That’s why she’s made it a priority to create a warm, comforting atmosphere at Grace Dental.",
        "She works closely with each patient, building genuine relationships based on trust and open communication.",
        "By focusing on prevention and education, Dr. Ji empowers patients to take control of their oral health—so they leave each appointment with confidence and a healthy smile.",
      ],
    },
    {
      title: "Outdoors",
      icon: MountainIcon,
      paragraphs: [
        "When Dr. Ji isn’t helping patients achieve their dental goals, you can find her exploring the stunning landscapes of Sonoma County.",
        "She enjoys hiking scenic trails, attending barre classes, and discovering hidden gems at local bakeries.",
        "Her love for the community and the great outdoors inspires her connection with patients who share an appreciation for Northern California.",
      ],
    },
  ],
} as const

export type TeamMember = {
  name: string
  role: string
  headshot?: {
    src: string
    alt: string
  }
  paragraphs: string[]
}

export const team: TeamMember[] = [
  {
    name: "Clarisa",
    role: "Front Desk Coordinator",
    headshot: {
      src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766078243/clarissa_my11wg.webp",
      alt: "Clarisa",
    },
    paragraphs: [
      "Clarisa is our front desk coordinator and is here to help schedule your appointments and answer any questions.",
      "Her background includes completing courses at the Valley School for Dental Assisting in Los Angeles. She is currently studying for her dental hygienist degree and is excited to further her career in dentistry.",
      "Clarisa’s favorite part of her job is seeing patients’ smiles transform—and watching their confidence boost along the way.",
      "In her free time, Clarisa enjoys visiting the coast and spending time with her family and pets. She loves weekend getaways, camping adventures, and learning about nature—especially astronomy, botany, zoology, and geology.",
    ],
  },
  {
    name: "Pablo Vazquez Valles",
    role: "Dental Assistant",
    headshot: {
      src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766078243/pablo_d1itvx.webp",
      alt: "Pablo Vazquez Valles",
    },
    paragraphs: [
      "Pablo Vazquez Valles is a dedicated dental assistant with over 5 years of experience in the dental field.",
      "He has worked alongside dentists in Ventura County, gaining expertise across general dentistry—including sleep sedation, orthodontics, hygiene, and surgery. He’s also experienced in crown and implant work, endodontics, and oral surgery, collaborating with specialists to provide top-notch care.",
      "Pablo holds certifications as a Dental Assistant from the California Academy of Dental Assisting in Camarillo and is X‑ray certified through the Santa Barbara‑Ventura County Dental Society.",
      "In his free time, Pablo enjoys reading literature, watching movies, playing sports, and spending quality time with his family.",
    ],
  },
]

export const insuranceInNetwork = [
  "Redwood Health Services",
  "GEHA",
  "UnitedHealthcare Medicare Advantage",
  "Principal Financial Group",
  "MetLife Insurance Company (PDP Plus Plans)",
  "Ameritas Life Insurance Corp",
  "Humana",
] as const

export const insuranceNote =
  "Our office must verify that your insurance plan type is in network."
