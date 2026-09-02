import { useEffect, useState } from "react"
import { nav } from "../content/home"
import { Logo } from "./Logo"

const essentialNav = [
  { href: "#home", label: "Home" },
  { href: "#why", label: "Why Kshetra" },
  { href: "#founder", label: "Meet Prashant" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const cur = window.scrollY
      setProgress(total > 0 ? Math.min(100, Math.max(0, (cur / total) * 100)) : 0)
      setScrolled(cur > 12)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white ${
        scrolled || open ? "shadow-sm" : ""
      }`}
    >
      <div
        className="h-[2px] bg-brand transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <div className="page-shell flex items-center justify-between gap-4 py-3 md:py-4">
        <a href="#home" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <Logo compact />
        </a>

        <div className="flex min-w-0 items-center gap-5 lg:gap-7">
          {/* 4 Essential Desktop Navigation Links */}
          <nav className="hidden items-center justify-end gap-x-6 md:flex" aria-label="Primary Essential">
            {essentialNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.76rem] font-semibold tracking-wider text-ink uppercase transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Menu Box Toggle Button */}
          <button
            type="button"
            className="menu-toggle flex items-center gap-2 rounded-lg border border-gray/80 bg-gray/50 px-2.5 py-1.5 transition-colors hover:bg-gray"
            aria-label={open ? "Close menu box" : "Open menu box"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="hidden text-[0.72rem] font-bold tracking-wider text-ink uppercase md:inline">
              Menu
            </span>
            <span className="flex flex-col gap-[4px]">
              <span
                className={`h-[2px] w-5 bg-brand transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span className={`h-[2px] w-5 bg-brand transition-opacity ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-[2px] w-5 bg-brand transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Expanded Menu Box */}
      {open ? (
        <div className="max-h-[min(28rem,calc(100dvh-4.5rem))] overflow-y-auto border-t border-gray bg-white shadow-lg">
          <nav className="page-shell grid gap-1 py-3 md:grid-cols-3 md:py-5" aria-label="All Sections">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-gray/60 py-3 text-[0.88rem] font-medium leading-snug text-ink transition-colors hover:text-brand md:border-b-0 md:rounded-lg md:px-3 md:py-2.5 md:hover:bg-gray/50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}
