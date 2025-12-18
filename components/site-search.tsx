"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import type { SearchGroup, SearchItem } from "@/lib/search"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon, XIcon } from "lucide-react"

type ScoredItem = SearchItem & { score: number }

const groupOrder: SearchGroup[] = [
  "Pages",
  "Services",
  "Team",
  "Forms",
  "Insurance",
]

function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

function isTextInput(target: EventTarget | null) {
  const element = target as HTMLElement | null
  if (!element) return false
  if (element.isContentEditable) return true
  const tag = element.tagName
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT"
}

function scoreItem(item: SearchItem, query: string): number {
  const q = normalizeText(query)
  if (!q) return 0

  const title = normalizeText(item.title)
  const href = normalizeText(item.href)
  const description = normalizeText(item.description ?? "")
  const keywords = (item.keywords ?? []).map(normalizeText)

  let score = 0

  if (title === q) score += 1200
  if (title.startsWith(q)) score += 900
  if (title.includes(q)) score += 700

  if (keywords.some((kw) => kw === q)) score += 650
  if (keywords.some((kw) => kw.startsWith(q))) score += 500
  if (keywords.some((kw) => kw.includes(q))) score += 350

  if (description.includes(q)) score += 250
  if (href.includes(q)) score += 120

  const tokens = q.split(/\s+/).filter(Boolean)
  if (tokens.length > 1) {
    for (const token of tokens) {
      if (title === token) score += 180
      if (title.startsWith(token)) score += 140
      if (title.includes(token)) score += 110
      if (keywords.some((kw) => kw.includes(token))) score += 90
      if (description.includes(token)) score += 60
    }
  }

  if (typeof item.rank === "number") {
    score += Math.max(0, 200 - item.rank) / 40
  }

  return score
}

function getDefaultResults(items: SearchItem[]) {
  const pages = items
    .filter((item) => item.group === "Pages")
    .sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999))
    .slice(0, 5)

  const services = items
    .filter((item) => item.group === "Services")
    .sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999))
    .slice(0, 8)

  const forms = items
    .filter((item) => item.group === "Forms")
    .sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999))
    .slice(0, 2)

  const insurance = items
    .filter((item) => item.group === "Insurance")
    .slice(0, 1)

  const team = items
    .filter((item) => item.group === "Team")
    .sort((a, b) => (a.rank ?? 9999) - (b.rank ?? 9999))
    .slice(0, 3)

  return [...pages, ...services, ...team, ...forms, ...insurance]
}

function SiteSearch({ items }: { items: SearchItem[] }) {
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(0)

  const normalizedQuery = normalizeText(query)

  const close = React.useCallback(() => {
    setOpen(false)
    setQuery("")
    setActiveIndex(0)
  }, [])

  const results: SearchItem[] = React.useMemo(() => {
    if (!normalizedQuery) {
      return getDefaultResults(items)
    }

    const scored = items
      .map<ScoredItem>((item) => ({
        ...item,
        score: scoreItem(item, normalizedQuery),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score
        if ((a.rank ?? 9999) !== (b.rank ?? 9999)) {
          return (a.rank ?? 9999) - (b.rank ?? 9999)
        }
        return a.title.localeCompare(b.title)
      })

    return scored.slice(0, 32)
  }, [items, normalizedQuery])

  const grouped = React.useMemo(() => {
    const map = new Map<SearchGroup, SearchItem[]>()
    for (const group of groupOrder) map.set(group, [])

    for (const result of results) {
      map.get(result.group)?.push(result)
    }

    return map
  }, [results])

  const renderGroups = React.useMemo(() => {
    let index = 0
    return groupOrder
      .map((group) => {
        const groupItems = grouped.get(group) ?? []
        const indexed = groupItems.map((item) => ({ item, index: index++ }))
        return { group, items: indexed }
      })
      .filter((group) => group.items.length > 0)
  }, [grouped])

  const flatResults = React.useMemo(
    () => renderGroups.flatMap((group) => group.items.map((entry) => entry.item)),
    [renderGroups]
  )

  React.useEffect(() => {
    if (!open) return
    setActiveIndex(0)
  }, [open, normalizedQuery])

  React.useEffect(() => {
    if (!open) return
    const active = document.querySelector<HTMLElement>(
      `[data-search-result="true"][data-index="${activeIndex}"]`
    )
    active?.scrollIntoView({ block: "nearest" })
  }, [open, activeIndex])

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return
      if (!(event.metaKey || event.ctrlKey)) return
      if (event.shiftKey || event.altKey) return
      if (event.key.toLowerCase() !== "k") return
      if (isTextInput(event.target)) return

      event.preventDefault()
      if (open) {
        close()
        return
      }
      setOpen(true)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [close, open])

  function navigateTo(item: SearchItem) {
    close()
    router.push(item.href)
  }

  function onInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) =>
        Math.min(prev + 1, Math.max(flatResults.length - 1, 0))
      )
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => Math.max(prev - 1, 0))
      return
    }

    if (event.key === "Enter") {
      if (!flatResults.length) return
      event.preventDefault()
      navigateTo(flatResults[Math.min(activeIndex, flatResults.length - 1)])
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => (nextOpen ? setOpen(true) : close())}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label="Search"
        >
          <SearchIcon className="size-4" aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="hidden md:flex gap-2">
          <SearchIcon className="size-4" aria-hidden="true" />
          Search
          <kbd className="bg-muted text-muted-foreground ml-2 hidden items-center rounded-[calc(var(--radius)-5px)] px-2 py-0.5 text-xs font-medium lg:inline-flex">
            ⌘K
          </kbd>
        </Button>
      </DialogTrigger>

      <DialogContent
        showClose={false}
        className="max-w-xl gap-0 overflow-hidden p-0"
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          inputRef.current?.focus()
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>
            Search services, pages, forms, insurance, and the Grace Dental team.
          </DialogDescription>
        </DialogHeader>

        <div className="border-b p-4">
          <InputGroup className="h-10">
            <InputGroupAddon>
              <SearchIcon className="size-4" aria-hidden="true" />
            </InputGroupAddon>
            <InputGroupInput
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={onInputKeyDown}
              placeholder="Search services, insurance, forms…"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Search"
            />
            <InputGroupAddon align="inline-end" className="gap-1">
              {query ? (
                <InputGroupButton
                  size="icon-xs"
                  variant="ghost"
                  onClick={() => {
                    setQuery("")
                    setActiveIndex(0)
                    inputRef.current?.focus()
                  }}
                  aria-label="Clear search"
                >
                  <XIcon className="size-4" aria-hidden="true" />
                </InputGroupButton>
              ) : null}
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={close}
                aria-label="Close search"
                className="text-muted-foreground hover:text-foreground"
              >
                <XIcon className="size-4" aria-hidden="true" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2">
          {renderGroups.length ? (
            <div className="grid gap-3">
              {renderGroups.map((group) => (
                <section key={group.group} className="grid gap-1">
                  <div className="text-muted-foreground px-2 pt-1 text-xs font-medium">
                    {group.group}
                  </div>
                  <div className="grid gap-1">
                    {group.items.map(({ item, index }) => {
                      const isActive = index === activeIndex
                      return (
                        <Button
                          key={item.id}
                          type="button"
                          variant="ghost"
                          className={cn(
                            "h-auto w-full justify-start px-2 py-2 text-left",
                            isActive && "bg-muted"
                          )}
                          data-search-result="true"
                          data-index={index}
                          onMouseEnter={() => setActiveIndex(index)}
                          onClick={() => navigateTo(item)}
                        >
                          <span className="grid gap-0.5">
                            <span className="font-medium leading-snug">
                              {item.title}
                            </span>
                            {item.description ? (
                              <span className="text-muted-foreground text-xs leading-snug">
                                {item.description}
                              </span>
                            ) : null}
                          </span>
                        </Button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-muted-foreground grid gap-1 p-6 text-sm">
              <div className="font-medium text-foreground">No results</div>
              <div>
                Try <span className="text-foreground">“implants”</span>,{" "}
                <span className="text-foreground">“insurance”</span>, or{" "}
                <span className="text-foreground">“new patient form”</span>.
              </div>
            </div>
          )}
        </div>

        <div className="text-muted-foreground flex items-center justify-between gap-3 border-t px-4 py-3 text-xs">
          <div className="flex items-center gap-2">
            <kbd className="bg-muted rounded-[calc(var(--radius)-5px)] px-1.5 py-0.5 font-medium">
              ↑
            </kbd>
            <kbd className="bg-muted rounded-[calc(var(--radius)-5px)] px-1.5 py-0.5 font-medium">
              ↓
            </kbd>
            <span>to navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="bg-muted rounded-[calc(var(--radius)-5px)] px-1.5 py-0.5 font-medium">
              Enter
            </kbd>
            <span>to open</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { SiteSearch }

