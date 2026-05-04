"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

function ContactForm() {
  const [open, setOpen] = React.useState(false)
  const [reason, setReason] = React.useState<string | undefined>()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setOpen(true)
    event.currentTarget.reset()
    setReason(undefined)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldGroup>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contact-name">Full name</FieldLabel>
              <Input
                id="contact-name"
                name="name"
                autoComplete="name"
                placeholder="Jane Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-email">Email</FieldLabel>
              <Input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                required
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="contact-phone">Phone (optional)</FieldLabel>
              <Input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="(707) 539-8762"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-reason">Reason (optional)</FieldLabel>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger id="contact-reason" className="w-full">
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="new-patient-exam">
                      New patient exam
                    </SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic dentistry</SelectItem>
                    <SelectItem value="restorative">Restorative dentistry</SelectItem>
                    <SelectItem value="tooth-pain">Tooth pain / urgent</SelectItem>
                    <SelectItem value="insurance">Insurance question</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="contact-message">
              How can we help? (optional)
            </FieldLabel>
            <FieldDescription>
              Add only what we need to know.
            </FieldDescription>
            <Textarea
              id="contact-message"
              name="message"
              placeholder="How can we help?"
            />
          </Field>
        </FieldGroup>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FieldDescription className="text-xs">
            Appointments start with <a href="/registration">online booking</a>.
          </FieldDescription>
          <Button type="submit" className="w-full sm:w-auto sm:shrink-0">
            Send Request
          </Button>
        </div>
      </form>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Request received</AlertDialogTitle>
            <AlertDialogDescription>
              Thanks. We’ll follow up soon.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => setOpen(false)}>
              Done
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export { ContactForm }
