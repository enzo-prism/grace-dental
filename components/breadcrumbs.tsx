import * as React from "react"
import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

export type BreadcrumbItemData = {
  title: string
  href?: string
}

function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItemData[]
  className?: string
}) {
  const normalized = items.filter((item) => item.title)
  const lastIndex = normalized.length - 1

  return (
    <Breadcrumb className={cn(className)}>
      <BreadcrumbList>
        {normalized.map((item, index) => {
          const isLast = index === lastIndex
          const key = `${index}-${item.href ?? item.title}`

          return (
            <React.Fragment key={key}>
              <BreadcrumbItem>
                {item.href && !isLast ? (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {!isLast ? <BreadcrumbSeparator /> : null}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export { Breadcrumbs }

