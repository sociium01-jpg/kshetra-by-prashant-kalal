import { useEffect, useState } from "react"

const navTabs = [
  {
    href: "#home",
    label: "Home",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "#why",
    label: "Why",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    href: "#what-we-do",
    label: "Expertise",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
  {
    href: "#contact",
    label: "Contact",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
]

export function BottomNav() {
  const [activeHash, setActiveHash] = useState("#home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navTabs.map((tab) => tab.href.slice(1))
      let current = "#home"

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) {
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

  return (
    <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 lg:hidden">
      <nav
        aria-label="Mobile Dock"
        className="flex items-center justify-around rounded-full border border-white/20 bg-charcoal/90 px-3 py-2 text-white shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl"
      >
        {navTabs.map((tab) => {
          const isActive = activeHash === tab.href
          return (
            <a
              key={tab.href}
              href={tab.href}
              className={"flex flex-col items-center gap-0.5 px-2 py-1 text-[0.68rem] font-semibold tracking-wider transition-all duration-300 " +
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
      </nav>
    </div>
  )
}
