"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PrinterIcon } from "lucide-react"

function PrintButton({ className }: { className?: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn("no-print", className)}
      onClick={() => window.print()}
    >
      <PrinterIcon data-icon="inline-start" />
      Print
    </Button>
  )
}

export { PrintButton }
