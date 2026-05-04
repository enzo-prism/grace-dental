"use client"

import * as React from "react"
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarCheckIcon,
  CheckCircle2Icon,
  ShieldCheckIcon,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

type StepId = keyof RegistrationValues | "appointment"

type Step = {
  id: StepId
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

const steps: Step[] = [
  {
    id: "appointment",
    title: "Choose a preferred time",
    description: "Pick a date and time. We’ll review and confirm with you.",
    required: true,
  },
  {
    id: "fullName",
    title: "Your name?",
    description: "The name we should use for your visit.",
    required: true,
    placeholder: "Jane Doe",
    autoComplete: "name",
  },
  {
    id: "phone",
    title: "Phone number?",
    description: "We’ll use this to confirm details.",
    required: true,
    placeholder: "(707) 555-0123",
    inputMode: "tel",
    autoComplete: "tel",
    type: "tel",
  },
  {
    id: "email",
    title: "Email?",
    description: "Optional, but helpful.",
    placeholder: "jane@example.com",
    inputMode: "email",
    autoComplete: "email",
    type: "email",
  },
  {
    id: "preferredContact",
    title: "Best way to reach you?",
    description: "Choose one.",
    required: true,
    options: [
      { value: "phone", label: "Phone call" },
      { value: "text", label: "Text message" },
      { value: "email", label: "Email" },
    ],
  },
  {
    id: "visitReason",
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
    title: "Anything else?",
    description: "Optional.",
    placeholder: "Mornings are best. I am interested in whitening...",
    multiline: true,
  },
]

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

  const value = values[step.id]
  if (step.required && !value.trim()) {
    return "This helps us book your appointment."
  }

  if (step.id === "email" && value.trim() && !/^\S+@\S+\.\S+$/.test(value)) {
    return "Enter a valid email address or leave this blank."
  }

  return ""
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
    <div className="grid gap-5">
      <div className="rounded-2xl border bg-muted/30 p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm font-medium">Preferred date</div>
          <Badge variant="secondary">Mon–Thu</Badge>
        </div>
        <div
          className="grid grid-cols-3 gap-2 sm:grid-cols-4"
          role="radiogroup"
          aria-label="Preferred appointment date"
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
                  "rounded-xl border bg-background p-3 text-center shadow-xs transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                  selected && "border-primary bg-primary/10 text-primary"
                )}
                onClick={() => onDateSelect(dateKey)}
              >
                <span className="block text-xs text-muted-foreground">
                  {weekdayFormatter.format(date)}
                </span>
                <span className="block text-lg font-semibold">
                  {dayFormatter.format(date)}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/30 p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm font-medium">Preferred time</div>
          {selectedDateLabel ? (
            <span className="text-muted-foreground text-xs">{selectedDateLabel}</span>
          ) : null}
        </div>
        <div
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
          role="radiogroup"
          aria-label="Preferred appointment time"
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
                  "rounded-xl border bg-background px-3 py-2.5 text-sm font-medium shadow-xs transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-xs",
                  selected && "border-primary bg-primary/10 text-primary"
                )}
                onClick={() => onTimeSelect(time)}
              >
                {time}
              </button>
            )
          })}
        </div>
      </div>

      {selectedDate && selectedTime ? (
        <div className="rounded-xl bg-primary/10 px-3 py-2 text-sm text-primary">
          Requesting {selectedDateLabel} at {selectedTime}. The team will confirm
          availability.
        </div>
      ) : null}
    </div>
  )
}

function RegistrationForm() {
  const [values, setValues] = React.useState<RegistrationValues>(initialValues)
  const [stepIndex, setStepIndex] = React.useState(0)
  const [touched, setTouched] = React.useState(false)
  const [submitted, setSubmitted] = React.useState(false)

  const selectableDates = React.useMemo(() => getSelectableDates(), [])
  const currentStep = steps[stepIndex]
  const isAppointmentStep = currentStep.id === "appointment"
  const currentValue = isAppointmentStep
    ? ""
    : values[currentStep.id as keyof RegistrationValues]
  const error = touched ? getError(currentStep, values) : ""
  const progress = ((stepIndex + 1) / steps.length) * 100
  const isLastStep = stepIndex === steps.length - 1

  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    if (isAppointmentStep) return
    if (!window.matchMedia("(pointer: fine)").matches) return
    inputRef.current?.focus()
  }, [isAppointmentStep, stepIndex])

  function updateValue(id: keyof RegistrationValues, value: string) {
    setValues((current) => ({ ...current, [id]: value }))
  }

  function goNext() {
    const nextError = getError(currentStep, values)
    setTouched(true)

    if (nextError) return

    if (isLastStep) {
      setSubmitted(true)
      return
    }

    setStepIndex((current) => current + 1)
    setTouched(false)
  }

  function goBack() {
    setStepIndex((current) => Math.max(0, current - 1))
    setTouched(false)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    goNext()
  }

  function resetFlow() {
    setValues(initialValues)
    setStepIndex(0)
    setTouched(false)
    setSubmitted(false)
  }

  return (
    <>
      <Card className="w-full rounded-3xl">
        <CardHeader className="gap-4 border-b pb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Step {stepIndex + 1} of {steps.length}
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <ShieldCheckIcon className="size-3.5" aria-hidden="true" />
              Private intake
            </div>
          </div>
          <div
            className="bg-muted h-2 overflow-hidden rounded-full"
            aria-hidden="true"
          >
            <div
              className="bg-primary h-full rounded-full transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="sr-only" aria-live="polite">
            Booking progress: step {stepIndex + 1} of {steps.length}
          </div>
          <div>
            <CardTitle className="text-2xl leading-tight tracking-tight sm:text-3xl">
              {currentStep.title}
            </CardTitle>
            <CardDescription className="mt-2 text-base leading-relaxed">
              {currentStep.description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="grid gap-6">
            <Field data-invalid={!!error}>
              <FieldLabel htmlFor={currentStep.id} className="sr-only">
                {currentStep.title}
              </FieldLabel>

              {isAppointmentStep ? (
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
              ) : currentStep.options ? (
                <div
                  className="grid gap-3"
                  role="radiogroup"
                  aria-label={currentStep.title}
                >
                  {currentStep.options.map((option) => {
                    const selected = currentValue === option.value

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={cn(
                          "border-border bg-background flex min-h-12 items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium shadow-xs transition-[background-color,border-color,box-shadow,transform,color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:shadow-md hover:shadow-primary/10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                          selected && "border-primary bg-primary/10 text-primary"
                        )}
                        onClick={() => {
                          updateValue(
                            currentStep.id as keyof RegistrationValues,
                            option.value
                          )
                          setTouched(false)
                        }}
                      >
                        <span>{option.label}</span>
                        {selected ? (
                          <CheckCircle2Icon className="size-4" aria-hidden="true" />
                        ) : null}
                      </button>
                    )
                  })}
                </div>
              ) : currentStep.multiline ? (
                <Textarea
                  ref={inputRef as React.Ref<HTMLTextAreaElement>}
                  id={currentStep.id}
                  name={currentStep.id}
                  value={currentValue}
                  onChange={(event) =>
                    updateValue(
                      currentStep.id as keyof RegistrationValues,
                      event.target.value
                    )
                  }
                  placeholder={currentStep.placeholder}
                  className="min-h-36 rounded-xl text-base"
                  aria-invalid={!!error}
                  aria-describedby={error ? `${currentStep.id}-error` : undefined}
                />
              ) : (
                <Input
                  ref={inputRef as React.Ref<HTMLInputElement>}
                  id={currentStep.id}
                  name={currentStep.id}
                  type={currentStep.type ?? "text"}
                  value={currentValue}
                  onChange={(event) =>
                    updateValue(
                      currentStep.id as keyof RegistrationValues,
                      event.target.value
                    )
                  }
                  placeholder={currentStep.placeholder}
                  autoComplete={currentStep.autoComplete}
                  inputMode={currentStep.inputMode}
                  className="h-12 rounded-xl text-base"
                  aria-invalid={!!error}
                  aria-describedby={error ? `${currentStep.id}-error` : undefined}
                />
              )}

              {error ? (
                <FieldError id={`${currentStep.id}-error`}>{error}</FieldError>
              ) : (
                <FieldDescription>
                  {currentStep.required ? "Required" : "Optional"}
                </FieldDescription>
              )}
            </Field>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                disabled={stepIndex === 0}
                className="w-full sm:w-auto"
              >
                <ArrowLeftIcon data-icon="inline-start" />
                Back
              </Button>
              <Button type="submit" size="lg" className="w-full sm:w-auto">
                {isLastStep ? (
                  <>
                    <CalendarCheckIcon data-icon="inline-start" />
                    Book Appointment
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRightIcon data-icon="inline-end" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <AlertDialog open={submitted} onOpenChange={setSubmitted}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogMedia className="bg-primary/10 text-primary">
              <CheckCircle2Icon aria-hidden="true" />
            </AlertDialogMedia>
            <AlertDialogTitle>Appointment request received</AlertDialogTitle>
            <AlertDialogDescription>
              Thanks, {values.fullName || "there"}. We’ll review{" "}
              {getAppointmentLabel(values) || "your preferred time"} and follow up
              by your preferred contact method.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={resetFlow}>Start another</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { RegistrationForm }
