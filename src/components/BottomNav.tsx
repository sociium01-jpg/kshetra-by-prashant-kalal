import { useEffect, useRef, useState } from "react"
import { contact } from "../content/home"

const navTabs = [
  {
    href: "#home",
    label: "Home",
    icon: (
      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "#why",
    label: "Why",
    icon: (
      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    href: "#founder",
    label: "About",
    icon: (
      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: "#what-we-do",
    label: "Expertise",
    icon: (
      <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
]

export function BottomNav() {
  const [activeHash, setActiveHash] = useState("#home")
  const [isDialOpen, setIsDialOpen] = useState(false)
  const dockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = [...navTabs.map((tab) => tab.href.slice(1)), "contact"]
      let current = "#home"

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250 && rect.bottom >= 200) {
            current = `#${sectionId}`
            break
          }
        }
      }

      setActiveHash(current)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsDialOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const whatsappHref = "https://wa.me/919730183066"

  return (
    <div ref={dockRef} className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-sm -translate-x-1/2 lg:hidden">
      <div
        className={
          "mb-3 flex flex-col items-center gap-2 transition-all duration-300 " +
          (isDialOpen
            ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
            : "translate-y-4 opacity-0 pointer-events-none scale-95")
        }
      >
        <div className="flex w-full flex-col gap-2 rounded-2xl border border-white/20 bg-charcoal/95 p-3 text-white shadow-[0_16px_36px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <p className="text-center text-[0.68rem] font-bold tracking-[0.14em] text-brand uppercase">
            Quick Connect
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            <a
              href={contact.phoneHref}
              className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 p-2.5 transition-colors hover:bg-brand"
              onClick={() => setIsDialOpen(false)}
            >
              <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-[0.68rem] font-medium">Call</span>
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 p-2.5 transition-colors hover:bg-brand"
              onClick={() => setIsDialOpen(false)}
            >
              <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              <span className="text-[0.68rem] font-medium">WhatsApp</span>
            </a>

            <a
              href={contact.emailHref}
              className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 p-2.5 transition-colors hover:bg-brand"
              onClick={() => setIsDialOpen(false)}
            >
              <svg className="h-5 w-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-[0.68rem] font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>

      <nav
        aria-label="Mobile Navigation Dock"
        className="flex items-center justify-around rounded-full border border-white/20 bg-charcoal/95 px-2 py-1.5 text-white shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl">
        {navTabs.map((tab) => {
          const isActive = activeHash === tab.href
          return (
            <a
              key={tab.href}
              href={tab.href}
              onClick={() => setIsDialOpen(false)}
              className={"flex flex-col items-center gap-0.5 px-2 py-1 text-[0.66rem] font-semibold tracking-wider transition-all duration-300 " +
                (isActive ? "scale-105 text-brand" : "text-white/70 hover:text-white")
              }
            >
              <div className={"transition-transform duration-300 " + (isActive ? "scale-110 text-brand" : "")}>
                {tab.icon}
              </div>
              <span>{tab.label}</span>
            </a>
          )
        })}

        <button
          type="button"
          onClick={() => setIsDialOpen(!isDialOpen)}
          className={"flex flex-col items-center gap-0.5 px-2 py-1 text-[0.66rem] font-semibold tracking-wider transition-all duration-300 " +
            (isDialOpen || activeHash === "#contact" ? "scale-105 text-brand" : "text-white/70 hover:text-white")
          }
        >
          <div className="relative flex h-5 w-5 items-center justify-center">
            {isDialOpen ? (
              <svg className="h-4.5 w-4.5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
          ) : (
              <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
          )}
          </div>
          <span>Connect</span>
        </button>
      </nav>
    </div>
  )
}
