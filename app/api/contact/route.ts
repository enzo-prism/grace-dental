import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"

import { getClientIp, isRateLimited } from "@/lib/rate-limit"

export const runtime = "nodejs"

const FALLBACK_TO_EMAIL = "gracedentalsantarosa@gmail.com"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(320),
  phone: z.string().trim().max(50).optional().default(""),
  reason: z.string().trim().max(100).optional().default(""),
  message: z.string().trim().max(5000).optional().default(""),
  // Honeypot — legitimate users leave this blank.
  company_website: z.string().max(500).optional().default(""),
})

function fakeSuccess() {
  // Silently accept likely-bot submissions so bots learn nothing.
  return NextResponse.json({ ok: true }, { status: 200 })
}

export async function POST(request: Request) {
  if (isRateLimited(`contact:${getClientIp(request)}`)) {
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

  const parsed = contactSchema.safeParse(body)
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
      "[api/contact] Email service is not configured. Set RESEND_API_KEY and EMAIL_FROM (a Resend-verified sender)."
    )
    return NextResponse.json(
      { error: "Email service is unavailable right now. Please call (707) 539-8762." },
      { status: 503 }
    )
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || FALLBACK_TO_EMAIL
  const resend = new Resend(apiKey)

  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.reason ? `Reason: ${data.reason}` : null,
    data.message ? `Message:\n${data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n")

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `Website contact request from ${data.name}`,
      text,
    })
    if (error) {
      console.error("[api/contact] Resend send failed:", error)
      return NextResponse.json(
        { error: "Could not send your request. Please call (707) 539-8762." },
        { status: 502 }
      )
    }
  } catch (err) {
    console.error("[api/contact] Resend send threw:", err)
    return NextResponse.json(
      { error: "Could not send your request. Please call (707) 539-8762." },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
