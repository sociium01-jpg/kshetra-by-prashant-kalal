import { useEffect, useState } from "react"
import { nav } from "../content/home"
import { Logo } from "./Logo"

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
      <div className="page-shell flex items-center justify-between gap-4 py-3 md:py-4">
        <a href="#home" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <Logo compact />
        </a>

        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <nav className="hidden max-w-4xl flex-wrap items-center justify-end gap-x-4 gap-y-1 2xl:flex" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.72rem] font-medium text-ink transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`h-[2px] w-6 bg-brand transition ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span className={`h-[2px] w-6 bg-brand transition ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-[2px] w-6 bg-brand transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="max-h-[min(28rem,calc(100dvh-4.5rem))] overflow-y-auto border-t border-gray bg-white">
          <nav className="page-shell flex flex-col py-2" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-gray py-3 text-[0.88rem] leading-snug font-medium text-ink"
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
