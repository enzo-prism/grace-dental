import type { LucideIcon } from "lucide-react"
import {
  BoneIcon,
  BrushIcon,
  CircleDotIcon,
  ClipboardCheckIcon,
  CrownIcon,
  HammerIcon,
  MoonIcon,
  SparklesIcon,
  StethoscopeIcon,
  SyringeIcon,
  WrenchIcon,
} from "lucide-react"

export type ServiceCategoryId = "cosmetic" | "general" | "restorative"

export type ServiceFaq = {
  question: string
  answer: string
}

export type Service = {
  slug: string
  name: string
  categoryId: ServiceCategoryId
  shortDescription: string
  icon: LucideIcon
  seo: {
    title: string
    description: string
  }
  sections: {
    overview: string[]
    whoItsFor: string[]
    whatToExpect: string[]
    aftercare: string[]
    faqs: ServiceFaq[]
  }
  relatedSlugs: string[]
}

export type ServiceCategory = {
  id: ServiceCategoryId
  title: string
  description: string
  icon: LucideIcon
  services: Service[]
}

export const serviceCategoryMeta: Record<
  ServiceCategoryId,
  Omit<ServiceCategory, "services">
> = {
  cosmetic: {
    id: "cosmetic",
    title: "Cosmetic",
    description: "Natural-looking enhancements to brighten and refine your smile.",
    icon: SparklesIcon,
  },
  general: {
    id: "general",
    title: "General",
    description: "Routine care to protect your teeth, gums, and long-term health.",
    icon: StethoscopeIcon,
  },
  restorative: {
    id: "restorative",
    title: "Restorative",
    description: "Repair, protect, and replace teeth for comfort and function.",
    icon: WrenchIcon,
  },
}

export const services = [
  {
    slug: "porcelain-veneers",
    name: "Porcelain Veneers",
    categoryId: "cosmetic",
    shortDescription:
      "Thin porcelain shells bonded to the front of teeth to refine shape, color, and spacing.",
    icon: CrownIcon,
    seo: {
      title: "Porcelain Veneers",
      description:
        "Learn how porcelain veneers can refine tooth shape and color, what to expect, and how to care for them at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Porcelain veneers are custom-made shells that are bonded to the front surface of teeth. They’re designed to improve the look of your smile while still feeling natural.",
        "Veneers can be a great option for addressing chips, uneven edges, small gaps, and discoloration that doesn’t respond to whitening.",
        "Because veneers usually require some reshaping of the tooth surface, we’ll start with an exam and a conversation about your goals to make sure veneers are the right fit.",
      ],
      whoItsFor: [
        "Chipped or worn front teeth",
        "Uneven tooth shape or size",
        "Small gaps or mild alignment concerns",
        "Staining that doesn’t improve with whitening",
        "Patients looking for a cosmetic refresh with a natural result",
      ],
      whatToExpect: [
        "We evaluate your teeth and gum health and talk through your goals.",
        "If veneers make sense, we plan the shape and shade and prepare the tooth surface.",
        "We take impressions or scans and place temporaries if needed.",
        "At your next visit, we bond the veneers and check your bite and comfort.",
      ],
      aftercare: [
        "Brush and floss daily and keep up with routine cleanings.",
        "Avoid using veneered teeth to bite very hard foods (ice, hard candy, pens).",
        "If you clench or grind, a custom night guard can help protect your investment.",
        "Call if you notice a chip, a rough edge, or bite changes.",
      ],
      faqs: [
        {
          question: "How long do porcelain veneers last?",
          answer:
            "Veneers can last many years with good home care and regular checkups. Longevity depends on your bite, habits like grinding, and overall oral health.",
        },
        {
          question: "Do veneers look natural?",
          answer:
            "Yes—when planned thoughtfully. We customize shape and shade so the result complements your face and existing teeth.",
        },
        {
          question: "Are veneers reversible?",
          answer:
            "Veneers often require some enamel reshaping, so they may not be fully reversible. We’ll review options and tradeoffs before you decide.",
        },
      ],
    },
    relatedSlugs: ["teeth-whitening", "crowns-bridges", "night-guards", "exams"],
  },
  {
    slug: "teeth-whitening",
    name: "Teeth Whitening",
    categoryId: "cosmetic",
    shortDescription:
      "Professional whitening to safely lift stains and brighten your smile.",
    icon: SparklesIcon,
    seo: {
      title: "Teeth Whitening",
      description:
        "Professional teeth whitening options, what to expect, and aftercare tips at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Professional teeth whitening helps lift stains that build up over time from foods, drinks, and everyday wear.",
        "Before whitening, we’ll make sure your teeth and gums are healthy—because whitening works best (and feels best) when any underlying issues are addressed first.",
        "If you have crowns, veneers, or tooth-colored fillings, we’ll talk about shade matching since restorations don’t whiten the same way natural enamel does.",
      ],
      whoItsFor: [
        "Stains from coffee, tea, wine, or tobacco",
        "A smile refresh for photos, weddings, or events",
        "Patients looking for a conservative cosmetic improvement",
      ],
      whatToExpect: [
        "We review your goals, sensitivity history, and existing restorations.",
        "We recommend the right whitening approach for your teeth and timeline.",
        "You may experience temporary sensitivity—typically manageable and short-lived.",
      ],
      aftercare: [
        "Avoid heavy staining foods and drinks for 24–48 hours after whitening.",
        "Use a sensitivity toothpaste if you’re prone to sensitivity.",
        "Keep up with cleanings—fresh enamel stays brighter longer.",
      ],
      faqs: [
        {
          question: "Does whitening damage enamel?",
          answer:
            "When used appropriately, professional whitening is designed to be safe for enamel. We’ll guide you on the right option and timing for your teeth.",
        },
        {
          question: "How long do results last?",
          answer:
            "It varies with diet and habits. Many patients maintain results with good home care and occasional touch-ups.",
        },
        {
          question: "Will whitening work on crowns or fillings?",
          answer:
            "Restorations don’t whiten the same way natural enamel does. We’ll help plan around existing dental work for a consistent shade.",
        },
      ],
    },
    relatedSlugs: ["cleaning", "porcelain-veneers", "exams"],
  },
  {
    slug: "exams",
    name: "Dental Exams",
    categoryId: "general",
    shortDescription:
      "Comprehensive exams to evaluate teeth, gums, and overall oral health.",
    icon: ClipboardCheckIcon,
    seo: {
      title: "Dental Exams",
      description:
        "What happens during a dental exam, why exams matter, and how to schedule at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Dental exams help catch issues early—before they turn into bigger problems. We evaluate tooth health, gum health, bite function, and your overall oral condition.",
        "If X-rays are needed, we’ll explain why and review the results with you in plain language.",
        "We’ll always connect findings to your goals and help you understand options, timing, and next steps.",
      ],
      whoItsFor: [
        "New patients establishing care",
        "Routine checkups to stay ahead of cavities and gum issues",
        "Patients with sensitivity, pain, or concerns about a tooth",
        "Anyone who wants clarity and a plan for their oral health",
      ],
      whatToExpect: [
        "We review your health history and what you’d like to improve.",
        "We examine teeth, gums, bite, and supporting structures.",
        "We discuss findings and provide a clear, prioritized plan.",
      ],
      aftercare: [
        "Schedule recommended follow-up care (cleanings, fillings, restorations).",
        "Ask questions—understanding your plan is part of great care.",
        "Keep up with home care between visits: brushing, flossing, and healthy habits.",
      ],
      faqs: [
        {
          question: "How often should I get a dental exam?",
          answer:
            "Many patients benefit from exams every 6 months, but the right schedule depends on your risk factors and oral health history.",
        },
        {
          question: "Do I need X-rays every visit?",
          answer:
            "Not always. We recommend X-rays based on your needs and history to help us see what isn’t visible during a visual exam.",
        },
      ],
    },
    relatedSlugs: ["cleaning", "fillings", "night-guards"],
  },
  {
    slug: "cleaning",
    name: "Dental Cleaning",
    categoryId: "general",
    shortDescription:
      "Professional cleanings to remove plaque and tartar and support gum health.",
    icon: BrushIcon,
    seo: {
      title: "Dental Cleaning",
      description:
        "Learn what to expect during a dental cleaning and why routine cleanings help protect your smile at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Even with great brushing and flossing, plaque can build up in places that are hard to reach. Over time, plaque hardens into tartar that can’t be removed at home.",
        "A professional cleaning helps remove plaque and tartar, polish teeth, and support healthy gums.",
        "If we see signs of gum disease or deeper buildup, we’ll explain what we’re seeing and recommend the right next step.",
      ],
      whoItsFor: [
        "Routine preventive visits",
        "Patients with mild gum inflammation (gingivitis)",
        "Patients prepping for cosmetic treatments like whitening",
      ],
      whatToExpect: [
        "We review your health history and any sensitivity concerns.",
        "We remove plaque and tartar, then polish teeth.",
        "We discuss gum health and home care tips tailored to you.",
      ],
      aftercare: [
        "Some mild sensitivity is normal and should improve quickly.",
        "Brush and floss regularly—consistency makes cleanings easier over time.",
        "If gums were inflamed, we may recommend additional gum care at home.",
      ],
      faqs: [
        {
          question: "Why do my gums bleed during cleaning?",
          answer:
            "Bleeding can be a sign of inflammation. With improved home care and regular cleanings, many patients see bleeding decrease over time.",
        },
        {
          question: "How long does a cleaning take?",
          answer:
            "Timing varies based on buildup and gum health. We’ll keep you informed throughout the visit.",
        },
      ],
    },
    relatedSlugs: ["exams", "teeth-whitening"],
  },
  {
    slug: "fillings",
    name: "Fillings",
    categoryId: "restorative",
    shortDescription:
      "Tooth-colored restorations to repair cavities and minor tooth damage.",
    icon: CircleDotIcon,
    seo: {
      title: "Fillings",
      description:
        "Learn about tooth-colored fillings, what to expect, and aftercare at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Fillings restore teeth that have been damaged by decay or minor fractures. The goal is to remove unhealthy tooth structure and rebuild the tooth so it can function comfortably again.",
        "Many fillings today are tooth-colored, designed to blend naturally with your enamel.",
        "We’ll always explain what we’re seeing on the tooth and why a filling is recommended before we begin.",
      ],
      whoItsFor: [
        "Cavities or early decay",
        "Chipped teeth with minor damage",
        "Replacing older restorations when appropriate",
      ],
      whatToExpect: [
        "We numb the area for comfort and remove the decay.",
        "We place the filling material in layers and shape it carefully.",
        "We check your bite and polish for a smooth finish.",
      ],
      aftercare: [
        "Avoid chewing until numbness wears off to prevent biting your cheek or tongue.",
        "Mild sensitivity can happen for a short time, especially with hot/cold.",
        "Call us if the bite feels high or you have persistent pain.",
      ],
      faqs: [
        {
          question: "How long do fillings last?",
          answer:
            "It depends on the size of the filling, your bite, and home care habits. We’ll monitor fillings at routine exams.",
        },
        {
          question: "Are fillings painful?",
          answer:
            "We use local anesthetic to keep you comfortable. You may feel pressure during treatment, but you shouldn’t feel sharp pain.",
        },
      ],
    },
    relatedSlugs: ["exams", "crowns-bridges", "root-canal"],
  },
  {
    slug: "crowns-bridges",
    name: "Crowns and Bridges",
    categoryId: "restorative",
    shortDescription:
      "Crowns protect damaged teeth; bridges can replace missing teeth for a complete smile.",
    icon: CrownIcon,
    seo: {
      title: "Crowns and Bridges",
      description:
        "Learn about dental crowns and bridges, what to expect, and aftercare at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "A crown is a protective covering that fits over a tooth to help restore strength, shape, and function. Crowns are commonly recommended for teeth with large fillings, cracks, or after root canal therapy.",
        "A bridge can replace one or more missing teeth by anchoring to neighboring teeth (or implants), helping restore function and appearance.",
        "We’ll review whether a crown, a bridge, or another option fits best for your needs and long-term oral health.",
      ],
      whoItsFor: [
        "Cracked, weak, or heavily restored teeth",
        "Teeth needing added protection after root canal therapy",
        "Replacing missing teeth when appropriate",
      ],
      whatToExpect: [
        "We evaluate the tooth and plan the right restoration.",
        "The tooth is prepared and impressions or scans are taken.",
        "A temporary may be placed while the final is made.",
        "We seat the final crown/bridge and check bite and comfort.",
      ],
      aftercare: [
        "Avoid very sticky foods until you’re fully comfortable.",
        "Brush and floss daily—bridges require special flossing tools for cleaning under the bridge.",
        "Call if you feel bite changes, sensitivity that worsens, or mobility.",
      ],
      faqs: [
        {
          question: "Do crowns and bridges look natural?",
          answer:
            "Yes. We select shapes and shades designed to blend with your smile for a natural appearance.",
        },
        {
          question: "What’s the difference between a bridge and an implant?",
          answer:
            "A bridge uses neighboring teeth for support. An implant replaces the tooth root and can support a crown without relying on adjacent teeth. We’ll discuss what fits your situation best.",
        },
      ],
    },
    relatedSlugs: ["fillings", "root-canal", "dental-implants"],
  },
  {
    slug: "root-canal",
    name: "Root Canal Therapy",
    categoryId: "restorative",
    shortDescription:
      "Relieve pain and save a tooth by treating infection or inflammation inside the tooth.",
    icon: SyringeIcon,
    seo: {
      title: "Root Canal Therapy",
      description:
        "Root canal therapy explained: symptoms, treatment steps, and aftercare at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Root canal therapy treats infection or inflammation inside a tooth (the pulp). The goal is to relieve discomfort and preserve the natural tooth when possible.",
        "During treatment, the inside of the tooth is cleaned, disinfected, and sealed to help prevent reinfection.",
        "Dr. Tingjen Ji is proficient in premolar and molar endodontic therapy and will guide you through options and next steps in a clear, calm way.",
      ],
      whoItsFor: [
        "Tooth pain that lingers or worsens",
        "Sensitivity that doesn’t resolve",
        "Deep decay or a crack that reaches the nerve",
        "Swelling, tenderness, or signs of infection near a tooth",
      ],
      whatToExpect: [
        "We numb the area and keep you comfortable throughout treatment.",
        "We access the inside of the tooth and carefully clean and disinfect the canals.",
        "We seal the tooth and discuss the best final restoration (often a crown).",
      ],
      aftercare: [
        "Mild soreness for a short time can be normal.",
        "Avoid chewing on the treated tooth until it has the final restoration if recommended.",
        "Call us if you develop swelling, fever, severe pain, or persistent discomfort.",
      ],
      faqs: [
        {
          question: "Is a root canal painful?",
          answer:
            "Most patients feel relief after treatment. We use local anesthetic to keep you comfortable during the procedure.",
        },
        {
          question: "Will I need a crown after a root canal?",
          answer:
            "Often, yes—especially for back teeth. A crown can help protect the tooth from fracture after root canal therapy.",
        },
      ],
    },
    relatedSlugs: ["crowns-bridges", "fillings", "dental-extractions"],
  },
  {
    slug: "dental-extractions",
    name: "Dental Extractions",
    categoryId: "restorative",
    shortDescription:
      "Removal of a tooth that can’t be saved or needs to be removed for your health.",
    icon: BoneIcon,
    seo: {
      title: "Dental Extractions",
      description:
        "When extractions are needed, what to expect, and healing tips at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Our first goal is usually to preserve natural teeth. In some situations, removing a tooth is the healthiest option—such as severe damage, deep infection, or a tooth that can’t be restored predictably.",
        "We’ll explain why an extraction is recommended and review replacement options when appropriate (such as implants or bridges).",
        "Dr. Ji has experience with surgical extractions and focuses on a calm, clear experience with thorough aftercare instructions.",
      ],
      whoItsFor: [
        "A tooth that can’t be restored due to severe decay or fracture",
        "Persistent infection that isn’t treatable with other options",
        "Teeth that may need removal for long-term oral health planning",
      ],
      whatToExpect: [
        "We evaluate the tooth and take imaging if needed.",
        "We numb the area and remove the tooth carefully.",
        "You’ll leave with written aftercare instructions and a plan for healing and next steps.",
      ],
      aftercare: [
        "Bite gently on gauze as directed and avoid disturbing the area.",
        "Avoid straws and smoking during early healing to reduce dry socket risk.",
        "Stick with soft foods and keep the area clean as instructed.",
        "Call if you have heavy bleeding, fever, worsening swelling, or severe pain.",
      ],
      faqs: [
        {
          question: "How long does it take to heal after an extraction?",
          answer:
            "Initial healing is often within days, but full healing varies based on the tooth, location, and your health history. We’ll provide guidance based on your case.",
        },
        {
          question: "What is dry socket?",
          answer:
            "Dry socket can occur when the blood clot is disrupted early in healing. Following aftercare instructions—especially avoiding straws and smoking—helps reduce the risk.",
        },
      ],
    },
    relatedSlugs: ["dental-implants", "crowns-bridges", "root-canal"],
  },
  {
    slug: "dental-implants",
    name: "Dental Implants",
    categoryId: "restorative",
    shortDescription:
      "A strong, natural-feeling option for replacing missing teeth with an implant-supported restoration.",
    icon: HammerIcon,
    seo: {
      title: "Dental Implants",
      description:
        "Learn how dental implants work, the timeline, and what to expect at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Dental implants replace missing teeth by supporting a crown, bridge, or denture with an implant placed in the jawbone. The implant functions like a tooth root and is designed to be stable and long-lasting.",
        "Implant care is a process: we evaluate bone and gum health, plan the procedure carefully, and support healing before final restoration.",
        "Dr. Tingjen Ji earned a Master’s Degree in Implant Dentistry and completed advanced implant education at Loma Linda University, bringing strong implant planning experience to your care.",
      ],
      whoItsFor: [
        "Replacing one or more missing teeth",
        "Patients who want a fixed (non-removable) tooth replacement option",
        "Patients with adequate bone and healthy gums (or a plan to get there)",
      ],
      whatToExpect: [
        "A consultation and imaging to plan implant position and timeline.",
        "Implant placement and a healing period while the implant integrates with bone.",
        "Final restoration placement (such as an implant crown) and bite adjustment.",
      ],
      aftercare: [
        "Follow post-op instructions closely—especially regarding diet and hygiene.",
        "Avoid smoking during healing to support gum and bone health.",
        "Maintain routine cleanings and home care to protect the implant long-term.",
      ],
      faqs: [
        {
          question: "How long does the implant process take?",
          answer:
            "Timelines vary by case and healing needs. Some cases are straightforward; others require staged treatment. We’ll outline your expected timeline after evaluation.",
        },
        {
          question: "Are implants painful?",
          answer:
            "We use local anesthetic to keep you comfortable. Some soreness after placement is normal and typically improves over the first few days.",
        },
        {
          question: "Is everyone a candidate for implants?",
          answer:
            "Not everyone—factors like bone level, gum health, and medical history matter. We’ll review candidacy and alternatives during your visit.",
        },
      ],
    },
    relatedSlugs: ["dental-extractions", "crowns-bridges"],
  },
  {
    slug: "night-guards",
    name: "Night Guards",
    categoryId: "restorative",
    shortDescription:
      "Custom night guards to protect teeth from clenching and grinding while you sleep.",
    icon: MoonIcon,
    seo: {
      title: "Night Guards",
      description:
        "Custom night guards for grinding/clenching: benefits, fit, and care at Grace Dental in Santa Rosa.",
    },
    sections: {
      overview: [
        "Night guards are custom appliances worn during sleep to help protect teeth from grinding (bruxism) and clenching.",
        "Grinding can lead to worn enamel, chips, fractures, and jaw soreness. A custom guard provides a protective barrier and can help reduce strain on your bite.",
        "We’ll evaluate your bite and symptoms and recommend the right style of guard for your needs.",
      ],
      whoItsFor: [
        "Patients who grind or clench during sleep",
        "Worn, chipped, or cracked teeth from bite forces",
        "Morning jaw soreness or tension headaches (in some cases)",
      ],
      whatToExpect: [
        "We evaluate your bite and tooth wear patterns.",
        "We take impressions or scans for a custom fit.",
        "We deliver the guard, check comfort, and adjust as needed.",
      ],
      aftercare: [
        "Rinse after use and brush the guard gently with cool water.",
        "Avoid hot water (it can warp the material).",
        "Bring your guard to dental visits so we can check fit and wear.",
      ],
      faqs: [
        {
          question: "How do I know if I grind my teeth?",
          answer:
            "Common signs include tooth wear, chipped edges, jaw soreness, or waking with headaches. We can often see wear patterns during an exam.",
        },
        {
          question: "Can I use a store-bought guard instead?",
          answer:
            "Over-the-counter guards may help some patients, but custom guards are designed for fit, comfort, and bite balance. We can help you decide what’s best for you.",
        },
      ],
    },
    relatedSlugs: ["exams", "fillings", "crowns-bridges"],
  },
] satisfies Service[]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}

export function getServicesByCategory(categoryId: ServiceCategoryId) {
  return services.filter((service) => service.categoryId === categoryId)
}

export const serviceCategories: ServiceCategory[] = (Object.keys(
  serviceCategoryMeta
) as ServiceCategoryId[])
  .map((id) => ({
    ...serviceCategoryMeta[id],
    services: getServicesByCategory(id),
  }))

export function getRelatedServices(service: Service) {
  const bySlug = new Map(services.map((s) => [s.slug, s]))
  return service.relatedSlugs.map((slug) => bySlug.get(slug)).filter(Boolean) as Service[]
}
