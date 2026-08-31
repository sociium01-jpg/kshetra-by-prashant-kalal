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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8 md:py-4">
        <a href="#home" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <Logo compact />
        </a>

        <div className="flex min-w-0 items-center gap-5 lg:gap-8">
          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[0.68rem] font-medium tracking-[0.22em] text-ink uppercase transition-colors hover:text-brand"
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
        <div className="border-t border-gray bg-white">
          <nav className="flex flex-col px-4 py-2 sm:px-6" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="border-b border-gray py-3 text-[0.8rem] font-medium tracking-[0.22em] text-ink uppercase"
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
