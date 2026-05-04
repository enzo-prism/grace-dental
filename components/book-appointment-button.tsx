import Link from "next/link"
import type * as React from "react"
import { CalendarCheckIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

type BookAppointmentButtonProps = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "className"
> & {
  label?: string
}

function BookAppointmentButton({
  variant = "default",
  size = "default",
  className,
  label = "Book Appointment",
}: BookAppointmentButtonProps) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href="/registration">
        <CalendarCheckIcon data-icon="inline-start" />
        {label}
      </Link>
    </Button>
  )
}

export { BookAppointmentButton }
