export const siteConfig = {
  name: "Grace Dental",
  description:
    "Personalized, compassionate dentistry led by Dr. Tingjen Ji in Santa Rosa, CA.",
  locationShort: "Santa Rosa, CA",
  logo: {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1766078122/67a8f171df038bad96be5ceb_Logo_Grace_Dental_Dark_1_iqbkw5.webp",
    alt: "Grace Dental",
  },
  contact: {
    phoneDisplay: "(707) 539-8762",
    phoneHref: "tel:+17075398762",
    email: "gracedentalsantarosa@gmail.com",
  },
  googleReviewHref:
    "https://www.google.com/maps/place//data=!4m3!3m2!1s0x808447cea0376135:0xb361e8804d432e1f!12e1?source=g.page.m._&laa=merchant-review-solicitation",
  address: {
    street: "170 Farmer Ln, STE 1",
    city: "Santa Rosa",
    state: "CA",
    zip: "95405",
  },
  hours: [
    { days: "Monday", hours: "8:00am–5:00pm" },
    { days: "Tuesday", hours: "8:00am–5:00pm" },
    { days: "Wednesday", hours: "8:00am–5:00pm" },
    { days: "Thursday", hours: "8:00am–5:00pm" },
    { days: "Friday", hours: "Closed" },
    { days: "Saturday", hours: "Closed" },
    { days: "Sunday", hours: "Closed" },
  ],
  nav: [
    { title: "Home", href: "/" },
    { title: "Services", href: "/services" },
    { title: "About", href: "/about" },
    { title: "Reviews", href: "/reviews" },
    { title: "Insurance", href: "/insurance" },
    { title: "Forms", href: "/forms" },
    { title: "Contact", href: "/contact" },
  ],
} as const

export type SiteConfig = typeof siteConfig
