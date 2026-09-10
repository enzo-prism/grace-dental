"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CheckIcon,
  ClipboardCheckIcon,
  LoaderCircleIcon,
  MailIcon,
  MessagesSquareIcon,
  NotebookPenIcon,
  PhoneIcon,
  ShieldCheckIcon,
  StethoscopeIcon,
  UserRoundIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { recordAppointmentFormLead } from "@/lib/ga4"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

type RegistrationValues = {
  appointmentDate: string
  appointmentTime: string
  fullName: string
  phone: string
  email: string
  preferredContact: string
  visitReason: string
  notes: string
}

type StepId = keyof RegistrationValues | "appointment" | "review"

type Step = {
  id: StepId
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>
  title: string
  description: string
  required?: boolean
  placeholder?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  autoComplete?: string
  type?: React.HTMLInputTypeAttribute
  options?: Array<{ value: string; label: string }>
  multiline?: boolean
}

const initialValues: RegistrationValues = {
  appointmentDate: "",
  appointmentTime: "",
  fullName: "",
  phone: "",
  email: "",
  preferredContact: "",
  visitReason: "",
  notes: "",
}

const inputSteps: Step[] = [
  {
    id: "appointment",
    icon: CalendarDaysIcon,
    title: "When works best?",
    description: "Pick a preferred date and time. We’ll confirm availability with you.",
    required: true,
  },
  {
    id: "fullName",
    icon: UserRoundIcon,
    title: "What’s your name?",
    description: "The name we should use for your visit.",
    required: true,
    placeholder: "Jane Doe",
    autoComplete: "name",
  },
  {
    id: "phone",
    icon: PhoneIcon,
    title: "What’s your phone number?",
    description: "We’ll use this to confirm the details.",
    required: true,
    placeholder: "(707) 555-0123",
    inputMode: "tel",
    autoComplete: "tel",
    type: "tel",
  },
  {
    id: "email",
    icon: MailIcon,
    title: "And your email?",
    description: "Optional, but helpful for reminders.",
    placeholder: "jane@example.com",
    inputMode: "email",
    autoComplete: "email",
    type: "email",
  },
  {
    id: "preferredContact",
    icon: MessagesSquareIcon,
    title: "How should we reach you?",
    description: "Choose the way you’ll actually respond.",
    required: true,
    options: [
      { value: "phone", label: "Phone call" },
      { value: "text", label: "Text message" },
      { value: "email", label: "Email" },
    ],
  },
  {
    id: "visitReason",
    icon: StethoscopeIcon,
    title: "What brings you in?",
    description: "Choose the closest match.",
    required: true,
    options: [
      { value: "new-patient-exam", label: "New patient exam" },
      { value: "cleaning", label: "Cleaning" },
      { value: "tooth-pain", label: "Tooth pain or urgent concern" },
      { value: "cosmetic", label: "Cosmetic consultation" },
      { value: "insurance", label: "Insurance question" },
      { value: "other", label: "Something else" },
    ],
  },
  {
    id: "notes",
    icon: NotebookPenIcon,
    title: "Anything we should know?",
    description: "Optional — timing, concerns, or questions.",
    placeholder: "Mornings are best. I’m interested in whitening…",
    multiline: true,
  },
]

const reviewStep: Step = {
  id: "review",
  icon: ClipboardCheckIcon,
  title: "Does this look right?",
  description: "Review your request before sending it to the office.",
  required: true,
}

const steps: Step[] = [...inputSteps, reviewStep]

const timeSlots = [
  "8:30 AM",
  "9:30 AM",
  "10:30 AM",
  "11:30 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
]

const weekdayFormatter = new Intl.DateTimeFormat("en-US", { weekday: "short" })
const dayFormatter = new Intl.DateTimeFormat("en-US", { day: "numeric" })
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" })
const monthDayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
})

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function getSelectableDates() {
  const dates: Date[] = []
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)
  cursor.setDate(cursor.getDate() + 1)

  while (dates.length < 12) {
    const day = cursor.getDay()
    if (day >= 1 && day <= 4) {
      dates.push(new Date(cursor))
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}

function moveRadioFocus(event: React.KeyboardEvent<HTMLElement>) {
  const group = event.currentTarget
  const radios = Array.from(
    group.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled])')
  )
  const index = radios.indexOf(document.activeElement as HTMLButtonElement)
  if (index === -1) return
  let next = index
  if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index + 1
  else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index - 1
  else if (event.key === "Home") next = 0
  else if (event.key === "End") next = radios.length - 1
  else return
  event.preventDefault()
  radios[(next + radios.length) % radios.length]?.focus()
}

function getAppointmentLabel(values: RegistrationValues) {
  if (!values.appointmentDate || !values.appointmentTime) return ""
  const [year, month, day] = values.appointmentDate.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return `${monthDayFormatter.format(date)} at ${values.appointmentTime}`
}

function getError(step: Step, values: RegistrationValues) {
  if (step.id === "appointment") {
    if (!values.appointmentDate || !values.appointmentTime) {
      return "Pick a preferred date and time."
    }
    return ""
  }

  if (step.id === "review") return ""

  const value = values[step.id]
  if (step.required && !value.trim()) {
    return "This helps us book your appointment."
  }

  if (step.id === "email" && value.trim() && !/^\S+@\S+\.\S+$/.test(value)) {
    return "Enter a valid email address or leave this blank."
  }

  return ""
}

const stepShortLabels: Record<string, string> = {
  appointment: "Date & time",
  fullName: "Your name",
  phone: "Phone",
  email: "Email",
  preferredContact: "Contact method",
  visitReason: "Visit reason",
  notes: "Notes",
  review: "Review & send",
}

const contactMethodLabels: Record<string, string> = {
  phone: "Phone call",
  text: "Text message",
  email: "Email",
}

const visitReasonLabels: Record<string, string> = {
  "new-patient-exam": "New patient exam",
  cleaning: "Cleaning",
  "tooth-pain": "Tooth pain or urgent concern",
  cosmetic: "Cosmetic consultation",
  insurance: "Insurance question",
  other: "Something else",
}

function AppointmentPicker({
  dates,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: {
  dates: Date[]
  selectedDate: string
  selectedTime: string
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
}) {
  const selectedDateLabel = selectedDate
    ? monthDayFormatter.format(new Date(`${selectedDate}T00:00:00`))
    : ""

  return (
    <div className="grid gap-6">
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Preferred date</div>
          <span className="text-muted-foreground text-xs font-medium tracking-wide">
            Mon–Thu · next 3 weeks
          </span>
        </div>
        <div
          className="grid grid-cols-3 gap-2.5 sm:grid-cols-4"
          role="radiogroup"
          aria-label="Preferred appointment date"
          onKeyDown={moveRadioFocus}
        >
          {dates.map((date) => {
            const dateKey = toDateKey(date)
            const selected = selectedDate === dateKey

            return (
              <button
                key={dateKey}
                type="button"
                role="radio"
                aria-checked={selected}
                className={cn(
                  "border-border bg-background flex min-h-20 flex-col items-center justify-center gap-0.5 rounded-2xl border px-2 py-3 shadow-xs transition-[background-color,border-color,box-shadow,color] duration-200 ease-out hover:border-primary/40 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none",
                  selected && "border-primary bg-primary/[0.08] text-primary shadow-md"
                )}
                onClick={() => onDateSelect(dateKey)}
              >
                <span
                  className={cn(
                    "text-[11px] font-semibold tracking-widest uppercase",
                    selected ? "text-primary/70" : "text-muted-foreground"
                  )}
                >
                  {weekdayFormatter.format(date)}
                </span>
                <span className="font-display text-2xl leading-none font-semibold">
                  {dayFormatter.format(date)}
                </span>
                <span
                  className={cn(
                    "text-[11px] font-medium tracking-widest uppercase",
                    selected ? "text-primary/70" : "text-muted-foreground"
                  )}
                >
                  {monthFormatter.format(date)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm font-semibold">Preferred time</div>
          {selectedDateLabel ? (
            <span className="text-muted-foreground text-xs font-medium">{selectedDateLabel}</span>
          ) : (
            <span id="appt-time-hint" className="text-muted-foreground text-xs">
              Pick a date first
            </span>
          )}
        </div>
        <div
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
          role="radiogroup"
          aria-label="Preferred appointment time"
          aria-describedby={selectedDate ? undefined : "appt-time-hint"}
          onKeyDown={moveRadioFocus}
        >
          {timeSlots.map((time) => {
            const selected = selectedTime === time

            return (
              <button
                key={time}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={!selectedDate}
                className={cn(
                  "border-border bg-background min-h-12 rounded-2xl border px-3 py-2.5 text-sm font-semibold shadow-xs transition-[background-color,border-color,box-shadow,color] duration-200 ease-out hover:border-primary/40 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none",
                  selected && "border-primary bg-primary/[0.08] text-primary shadow-md"
                )}
                onClick={() => onTimeSelect(time)}
              >
                {time}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function OptionList({
  label,
  options,
  selectedValue,
  onSelect,
}: {
  label: string
  options: Array<{ value: string; label: string }>
  selectedValue: string
  onSelect: (value: string) => void
}) {
  return (
    <div
      className="grid gap-3"
      role="radiogroup"
      aria-label={label}
      onKeyDown={moveRadioFocus}
    >
      {options.map((option) => {
        const selected = selectedValue === option.value

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            className={cn(
              "border-border bg-background flex min-h-14 min-w-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left shadow-xs transition-[background-color,border-color,box-shadow] duration-200 ease-out hover:border-primary/40 hover:bg-primary/5 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none motion-reduce:transition-none",
              selected && "border-primary bg-primary/[0.06] shadow-md"
            )}
            onClick={() => onSelect(option.value)}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                selected ? "border-primary" : "border-border"
              )}
              aria-hidden="true"
            >
              {selected ? <span className="bg-primary size-3 rounded-full" /> : null}
            </span>
            <span className="min-w-0 flex-1 text-base font-medium">{option.label}</span>
            {selected ? (
              <CheckIcon className="text-primary size-5 shrink-0" aria-hidden="true" />
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

function FlowRail({
  stepIndex,
  values,
  onEditStep,
}: {
  stepIndex: number
  values: RegistrationValues
  onEditStep: (index: number) => void
}) {
  const appointmentLabel = getAppointmentLabel(values)

  return (
    <div className="flex h-full flex-col gap-8">
      <div>
        <p className="font-display text-2xl leading-snug font-semibold tracking-tight text-balance">
          Request an appointment.
        </p>
        <p className="text-foreground/75 mt-3 text-sm leading-relaxed">
          Takes about 2 minutes. We review every request and confirm with you personally —
          nothing is booked without your OK.
        </p>
      </div>

      <ol className="grid gap-1" aria-label="Booking steps">
        {steps.map((step, index) => {
          const done = index < stepIndex
          const current = index === stepIndex
          const StepIcon = step.icon

          return (
            <li key={step.id}>
              <button
                type="button"
                disabled={!done}
                onClick={() => onEditStep(index)}
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-3.5 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors",
                  current && "bg-primary/[0.07]",
                  done && "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  !done && !current && "opacity-55"
                )}
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                    done && "border-primary bg-primary text-primary-foreground",
                    current && "border-primary bg-primary/10 text-primary",
                    !done && !current && "border-border text-muted-foreground"
                  )}
                  aria-hidden="true"
                >
                  {done ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <StepIcon className="size-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className={cn("block truncate font-semibold", current && "text-primary")}>
                    {stepShortLabels[step.id]}
                  </span>
                  <span className="text-muted-foreground block truncate text-xs">
                    {index === 0
                      ? (appointmentLabel || "Pick a date & time")
                      : index === steps.length - 1
                        ? "Confirm your request"
                        : done
                          ? "Done — tap to edit"
                          : step.description.split(".")[0]}
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      <div className="mt-auto grid gap-3 border-t pt-6 text-sm">
        <a
          href={siteConfig.contact.phoneHref}
          className="hover:text-primary flex min-h-11 items-center gap-3 font-semibold transition-colors"
        >
          <span className="bg-primary/10 text-primary flex size-9 items-center justify-center rounded-full">
            <PhoneIcon className="size-4" aria-hidden="true" />
          </span>
          {siteConfig.contact.phoneDisplay}
        </a>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Prefer to book instantly?{" "}
          <a
            href={siteConfig.zocdocHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground font-medium underline underline-offset-4"
          >
            Use Zocdoc
          </a>
        </p>
      </div>
    </div>
  )
}

function ReviewSummary({
  values,
  onEdit,
}: {
  values: RegistrationValues
  onEdit: (index: number) => void
}) {
  const rows: Array<{ label: string; value: string; step: number }> = [
    { label: "Preferred time", value: getAppointmentLabel(values) || "—", step: 0 },
    { label: "Name", value: values.fullName || "—", step: 1 },
    { label: "Phone", value: values.phone || "—", step: 2 },
    { label: "Email", value: values.email || "Not provided", step: 3 },
    {
      label: "Contact me by",
      value: contactMethodLabels[values.preferredContact] ?? values.preferredContact,
      step: 4,
    },
    {
      label: "Reason",
      value: visitReasonLabels[values.visitReason] ?? values.visitReason,
      step: 5,
    },
    { label: "Notes", value: values.notes || "Not provided", step: 6 },
  ]

  return (
    <dl className="border-border divide-y divide-border rounded-3xl border bg-card shadow-xs">
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex min-w-0 items-center gap-4 px-5 py-4 sm:px-6"
        >
          <div className="min-w-0 flex-1">
            <dt className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              {row.label}
            </dt>
            <dd className="mt-1 text-base font-medium break-words">{row.value}</dd>
          </div>
          <button
            type="button"
            onClick={() => onEdit(row.step)}
            className="text-primary hover:bg-primary/10 focus-visible:ring-ring/50 shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            Edit
          </button>
        </div>
      ))}
    </dl>
  )
}

function RegistrationForm() {
  const [values, setValues] = React.useState<RegistrationValues>(initialValues)
  const [stepIndex, setStepIndex] = React.useState(0)
  const [touched, setTouched] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)
  const [submitting, setSubmitting] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")
  const [website, setWebsite] = React.useState("")

  const selectableDates = React.useMemo(() => getSelectableDates(), [])
  const headingRef = React.useRef<HTMLHeadingElement | null>(null)
  const successHeadingRef = React.useRef<HTMLHeadingElement | null>(null)
  const advanceTimer = React.useRef<number | null>(null)
  const returnToReview = React.useRef(false)

  const currentStep = steps[stepIndex]
  const isAppointmentStep = currentStep.id === "appointment"
  const isReviewStep = currentStep.id === "review"
  const currentValue = isAppointmentStep || isReviewStep
    ? ""
    : values[currentStep.id as keyof RegistrationValues]
  const error = touched ? getError(currentStep, values) : ""
  const progress = ((stepIndex + 1) / steps.length) * 100
  const StepIcon = currentStep.icon

  React.useEffect(() => {
    headingRef.current?.focus()
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }
  }, [stepIndex])

  React.useEffect(() => {
    if (submitted) successHeadingRef.current?.focus()
  }, [submitted])

  function updateValue(id: keyof RegistrationValues, value: string) {
    setValues((current) => ({ ...current, [id]: value }))
  }

  function goToStep(index: number, opts?: { fromReview?: boolean }) {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    returnToReview.current = opts?.fromReview ?? false
    setStepIndex(Math.max(0, Math.min(index, steps.length - 1)))
    setTouched(false)
    setSubmitError("")
  }

  async function submitRequest() {
    if (submitting) return
    setSubmitting(true)
    setSubmitError("")

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company_website: website }),
      })
      if (!response.ok) {
        let message = "Something went wrong sending your request. Please try again."
        try {
          const data = (await response.json()) as { error?: string }
          if (data.error) message = data.error
        } catch {
          if (response.status === 503) {
            message = "Email service is unavailable right now. Please call (707) 539-8762."
          }
        }
        setSubmitError(message)
        return
      }
      setSubmitted(true)
      recordAppointmentFormLead()
    } catch {
      setSubmitError(
        "Something went wrong sending your request. Please try again or call (707) 539-8762."
      )
    } finally {
      setSubmitting(false)
    }
  }

  function goNext() {
    const nextError = getError(currentStep, values)
    setTouched(true)
    if (nextError) return

    if (currentStep.id === "review") {
      void submitRequest()
      return
    }
    if (returnToReview.current) {
      returnToReview.current = false
      goToStep(steps.length - 1)
      return
    }
    goToStep(stepIndex + 1)
  }

  function goBack() {
    goToStep(stepIndex - 1)
  }

  function selectOption(id: keyof RegistrationValues, value: string) {
    const nextValues = { ...values, [id]: value }
    updateValue(id, value)
    setTouched(false)
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    // Validate against the explicit next values — the scheduled callback
    // would otherwise close over stale state and never advance first picks.
    advanceTimer.current = window.setTimeout(() => {
      if (getError(currentStep, nextValues)) {
        setTouched(true)
        return
      }
      if (returnToReview.current) {
        returnToReview.current = false
        goToStep(steps.length - 1)
        return
      }
      goToStep(stepIndex + 1)
    }, 280)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    goNext()
  }

  function resetFlow() {
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    setValues(initialValues)
    setStepIndex(0)
    setTouched(false)
    setSubmitted(false)
    setSubmitError("")
    setWebsite("")
  }

  if (submitted) {
    const appointmentLabel = getAppointmentLabel(values)
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <span className="bg-primary/10 text-primary flex size-20 items-center justify-center rounded-full">
          <CheckCircle2Icon className="size-10" aria-hidden="true" />
        </span>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="font-display mt-8 text-3xl font-semibold tracking-tight text-balance focus:outline-none sm:text-4xl"
        >
          Request received{values.fullName.trim() ? `, ${values.fullName.trim().split(" ")[0]}` : ""}.
        </h2>
        <p className="text-foreground/75 mt-4 max-w-md text-base leading-relaxed">
          {appointmentLabel
            ? `We’ll review your request for ${appointmentLabel} and confirm with you personally.`
            : "We’ll review your request and confirm with you personally."}
        </p>
        <div className="border-border mt-8 grid w-full gap-3 rounded-3xl border bg-card p-6 text-left shadow-xs sm:p-8">
          <div className="flex items-center gap-3 text-sm">
            <CalendarCheckIcon className="text-primary size-5 shrink-0" aria-hidden="true" />
            <span className="font-medium">{appointmentLabel || "Preferred time saved"}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MessagesSquareIcon className="text-primary size-5 shrink-0" aria-hidden="true" />
            <span className="font-medium">
              We’ll follow up by {contactMethodLabels[values.preferredContact] ?? "your preferred method"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <PhoneIcon className="text-primary size-5 shrink-0" aria-hidden="true" />
            <span>
              Need us sooner?{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-semibold underline underline-offset-4"
              >
                {siteConfig.contact.phoneDisplay}
              </a>
            </span>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="min-h-12">
            <Link href="/">Back to home</Link>
          </Button>
          <Button size="lg" variant="outline" className="min-h-12" onClick={resetFlow}>
            Start another request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:px-8">
      <aside className="hidden lg:block" aria-label="Booking progress">
        <div className="sticky top-24 rounded-[2rem] border bg-card p-8 shadow-xs">
          <FlowRail
            stepIndex={stepIndex}
            values={values}
            onEditStep={(index) => goToStep(index, { fromReview: isReviewStep })}
          />
        </div>
      </aside>

      <div className="min-w-0">
        <div className="mb-8 lg:hidden">
          <div className="flex items-center justify-between gap-3 text-sm">
            <span className="text-muted-foreground font-medium">
              Step {stepIndex + 1} of {steps.length}
            </span>
            <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
              <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
              Private intake
            </span>
          </div>
          <div
            className="bg-muted mt-3 h-1.5 overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={stepIndex + 1}
            aria-valuemin={0}
            aria-valuemax={steps.length}
            aria-label="Booking progress"
          >
            <div
              className="bg-primary h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-4 text-center text-sm">
            Stuck?{" "}
            <a
              href={siteConfig.contact.phoneHref}
              className="font-semibold underline underline-offset-4"
            >
              Call {siteConfig.contact.phoneDisplay}
            </a>
          </p>
        </div>

        <div className="hidden items-center justify-between gap-3 lg:flex" aria-hidden="true">
          <span className="text-muted-foreground text-sm font-medium">
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium">
            <ShieldCheckIcon className="size-3.5" />
            Private intake
          </span>
        </div>
        <div
          className="bg-muted mt-3 hidden h-1.5 overflow-hidden rounded-full lg:block"
          aria-hidden="true"
        >
          <div
            className="bg-primary h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="sr-only" aria-live="polite">
          Booking progress: step {stepIndex + 1} of {steps.length}: {stepShortLabels[currentStep.id]}
        </div>

        <div className="mt-8 flex items-center gap-4 sm:mt-10 sm:gap-5">
          <span
            key={currentStep.id}
            className="bg-primary/10 text-primary flex size-13 shrink-0 items-center justify-center rounded-2xl sm:size-15"
          >
            <StepIcon className="size-6 sm:size-7" aria-hidden="true" />
          </span>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-3xl font-semibold tracking-tight text-balance focus:outline-none sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
          >
            {currentStep.title}
          </h2>
        </div>
        <p className="text-foreground/75 mt-3 max-w-lg text-base leading-relaxed sm:text-lg">
          {currentStep.description}
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-6 sm:mt-10">
          <div className="hidden" aria-hidden="true">
            <label htmlFor="registration-website">
              Leave this field blank
              <input
                id="registration-website"
                name="company_website"
                autoComplete="off"
                tabIndex={-1}
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </label>
          </div>

          {isAppointmentStep ? (
            <Field data-invalid={!!error}>
              <AppointmentPicker
                dates={selectableDates}
                selectedDate={values.appointmentDate}
                selectedTime={values.appointmentTime}
                onDateSelect={(date) => {
                  updateValue("appointmentDate", date)
                  updateValue("appointmentTime", "")
                  setTouched(false)
                }}
                onTimeSelect={(time) => {
                  updateValue("appointmentTime", time)
                  setTouched(false)
                }}
              />
              {error ? <FieldError id="appointment-error">{error}</FieldError> : null}
            </Field>
          ) : isReviewStep ? (
            <ReviewSummary values={values} onEdit={(index) => goToStep(index, { fromReview: true })} />
          ) : currentStep.options ? (
            <Field data-invalid={!!error}>
              <OptionList
                label={currentStep.title}
                options={currentStep.options}
                selectedValue={currentValue}
                onSelect={(value) => selectOption(currentStep.id as keyof RegistrationValues, value)}
              />
              {error ? <FieldError id={`${currentStep.id}-error`}>{error}</FieldError> : null}
            </Field>
          ) : currentStep.multiline ? (
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor={currentStep.id} className="sr-only">
                {currentStep.title}
              </FieldLabel>
              <Textarea
                id={currentStep.id}
                name={currentStep.id}
                value={currentValue}
                onChange={(event) =>
                  updateValue(currentStep.id as keyof RegistrationValues, event.target.value)
                }
                placeholder={currentStep.placeholder}
                rows={5}
                className="min-h-36 rounded-2xl border bg-card p-5 text-base shadow-xs"
                aria-invalid={!!error}
                aria-describedby={
                  error ? `${currentStep.id}-error ${currentStep.id}-hint` : `${currentStep.id}-hint`
                }
              />
              {error ? (
                <FieldError id={`${currentStep.id}-error`}>{error}</FieldError>
              ) : (
                <FieldDescription id={`${currentStep.id}-hint`}>
                  Optional — you can skip this.
                </FieldDescription>
              )}
            </Field>
          ) : (
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor={currentStep.id} className="sr-only">
                {currentStep.title}
              </FieldLabel>
              <Input
                id={currentStep.id}
                name={currentStep.id}
                type={currentStep.type ?? "text"}
                value={currentValue}
                onChange={(event) =>
                  updateValue(currentStep.id as keyof RegistrationValues, event.target.value)
                }
                placeholder={currentStep.placeholder}
                autoComplete={currentStep.autoComplete}
                inputMode={currentStep.inputMode}
                required={currentStep.required}
                className="h-15 rounded-2xl border bg-card px-5 text-lg shadow-xs"
                aria-invalid={!!error}
                aria-describedby={
                  error ? `${currentStep.id}-error ${currentStep.id}-hint` : `${currentStep.id}-hint`
                }
              />
              {error ? (
                <FieldError id={`${currentStep.id}-error`}>{error}</FieldError>
              ) : (
                <FieldDescription id={`${currentStep.id}-hint`}>
                  {currentStep.required ? "Required" : "Optional — you can skip this."}
                </FieldDescription>
              )}
            </Field>
          )}

          {submitError ? (
            <p role="alert" className="text-sm text-destructive">
              {submitError}{" "}
              <a
                href={siteConfig.contact.phoneHref}
                className="font-medium underline underline-offset-4"
              >
                Call {siteConfig.contact.phoneDisplay}
              </a>
            </p>
          ) : null}

          <div className="sticky bottom-0 -mx-4 flex flex-col-reverse gap-3 border-t bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80 sm:static sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
            <Button
              type="button"
              variant="ghost"
              onClick={goBack}
              disabled={stepIndex === 0 || submitting}
              className="min-h-12"
            >
              <ArrowLeftIcon data-icon="inline-start" />
              Back
            </Button>
            <Button type="submit" size="lg" disabled={submitting} className="min-h-13 px-8">
              {isReviewStep ? (
                submitting ? (
                  <>
                    <LoaderCircleIcon data-icon="inline-start" className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <CalendarCheckIcon data-icon="inline-start" />
                    Send request
                  </>
                )
              ) : (
                <>
                  Continue
                  <ArrowRightIcon data-icon="inline-end" />
                </>
              )}
            </Button>
          </div>

          {isReviewStep ? (
            <p className="text-muted-foreground flex items-center justify-center gap-1.5 text-center text-xs">
              <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
              Nothing is booked until we confirm with you.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  )
}

export { RegistrationForm }
