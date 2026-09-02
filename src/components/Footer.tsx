import { useEffect, useState } from "react"
import { contact } from "../content/home"
import { Magnetic } from "./Magnetic"

export function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let pauseTimer: number

    const onScroll = () => {
      const curY = window.scrollY
      setShowScrollTop(curY > 250)

      if (curY > lastY + 5) {
        setIsScrollingDown(true)
      } else if (curY < lastY - 5) {
        setIsScrollingDown(false)
      }

      lastY = curY

      window.clearTimeout(pauseTimer)
      pauseTimer = window.setTimeout(() => {
        setIsScrollingDown(false)
      }, 1000)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.clearTimeout(pauseTimer)
    }
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-charcoal text-white">
      <div className="page-shell py-12">
        <div className="grid gap-8 text-center lg:grid-cols-3 lg:text-left">
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-brand uppercase">
              Prashant Kalal
            </p>
            <p className="mt-2 text-sm text-white/70">Kshetra By Prashant Kalal</p>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-white/50 uppercase">
              Contact
            </p>
            <a href={contact.phoneHref} className="mt-2 block text-sm transition-colors hover:text-brand">
              {contact.phone}
            </a>
            <a href={contact.emailHref} className="mt-1 block text-sm break-all transition-colors hover:text-brand">
              {contact.email}
            </a>
            <a
              href={contact.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-sm transition-colors hover:text-brand"
            >
              {contact.instagram}
            </a>
          </div>
          <div>
            <p className="text-[0.7rem] tracking-[0.04em] text-white/50 uppercase">
              MahaRERA
            </p>
            <p className="mt-2 text-sm text-white/80">No. {contact.rera}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Kshetra By Prashant Kalal. All rights reserved.
          </p>
        </div>
      </div>

      {/* Liquid Morphing Floating Back to Top Icon at extreme bottom right */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-400 ease-out ${
          showScrollTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-6 opacity-0 pointer-events-none"
        }`}
      >
        <Magnetic strength={0.4}>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to first section"
            className="liquid-morph-btn group flex h-13 w-13 items-center justify-center text-white shadow-[0_10px_28px_rgba(239,127,26,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_14px_36px_rgba(239,127,26,0.65)] active:scale-95"
          >
            <svg
              className="relative z-10 h-5 w-5 transition-transform duration-400 ease-out"
              style={{
                transform: isScrollingDown ? "rotate(180deg)" : "rotate(0deg)",
              }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </button>
        </Magnetic>
      </div>
    </footer>
  )
}
