import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

import { getClientIp, isRateLimited } from "@/lib/rate-limit"

export const runtime = "nodejs"

const FALLBACK_TO_EMAIL = "gracedentalsantarosa@gmail.com"

const appointmentSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(200),
  phone: z.string().trim().min(1, "Phone is required").max(50),
  email: z
    .string()
    .trim()
    .max(320)
    .optional()
    .default("")
    .refine((v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email address or leave this blank."),
  preferredContact: z.string().trim().min(1, "Preferred contact method is required").max(50),
  visitReason: z.string().trim().min(1, "Visit reason is required").max(100),
  appointmentDate: z.string().trim().min(1, "Preferred date is required").max(20),
  appointmentTime: z.string().trim().min(1, "Preferred time is required").max(20),
  notes: z.string().trim().max(5000).optional().default(""),
  // Honeypot — legitimate users leave this blank.
  company_website: z.string().max(500).optional().default(""),
})

function fakeSuccess() {
  // Silently accept likely-bot submissions so bots learn nothing.
  return NextResponse.json({ ok: true }, { status: 200 })
}

export async function POST(request: Request) {
  if (isRateLimited(`appointment:${getClientIp(request)}`)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = appointmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 }
    )
  }

  const data = parsed.data

  if (data.company_website.trim()) {
    return fakeSuccess()
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  if (!apiKey || !from) {
    console.error(
      "[api/appointment] Email service is not configured. Set RESEND_API_KEY and EMAIL_FROM (a Resend-verified sender)."
    )
    return NextResponse.json(
      { error: "Email service is unavailable right now. Please call (707) 539-8762." },
      { status: 503 }
    )
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || FALLBACK_TO_EMAIL
  const resend = new Resend(apiKey)

  const text = [
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    data.email ? `Email: ${data.email}` : null,
    `Preferred contact: ${data.preferredContact}`,
    `Visit reason: ${data.visitReason}`,
    `Preferred date: ${data.appointmentDate}`,
    `Preferred time: ${data.appointmentTime}`,
    data.notes ? `Notes:\n${data.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email || undefined,
      subject: `Appointment request from ${data.fullName} (${data.appointmentDate} ${data.appointmentTime})`,
      text,
    })
    if (error) {
      console.error("[api/appointment] Resend send failed:", error)
      return NextResponse.json(
        { error: "Could not send your request. Please call (707) 539-8762." },
        { status: 502 }
      )
    }
  } catch (err) {
    console.error("[api/appointment] Resend send threw:", err)
    return NextResponse.json(
      { error: "Could not send your request. Please call (707) 539-8762." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
