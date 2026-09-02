import { useEffect, useRef, useState } from "react"
import { contact } from "../content/home"
import { Magnetic } from "./Magnetic"

export function ActionHub() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false)
  const phoneMenuRef = useRef<HTMLDivElement>(null)

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

  // Close phone menu when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (phoneMenuRef.current && !phoneMenuRef.current.contains(e.target as Node)) {
        setIsPhoneMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const whatsappHref = `https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`

  return (
    <>
      {/* 1. Phone Expandable Speed Dial Hub (bottom right) */}
      <div
        ref={phoneMenuRef}
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
      >
        {/* Speed Dial Options */}
        <div
          className={`flex flex-col items-end gap-3 transition-all duration-300 ${
            isPhoneMenuOpen
              ? "translate-y-0 opacity-100 pointer-events-auto scale-100"
              : "translate-y-4 opacity-0 pointer-events-none scale-95"
          }`}
        >
          {/* Call Prashant */}
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-charcoal/90 px-2.5 py-1 text-[0.72rem] font-semibold text-white shadow-md backdrop-blur-md">
              Call {contact.phone}
            </span>
            <Magnetic strength={0.3}>
              <a
                href={contact.phoneHref}
                aria-label="Call Prashant Kalal"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-md transition-all duration-300 hover:scale-110 hover:bg-brand hover:text-white hover:shadow-[0_8px_20px_rgba(239,127,26,0.4)]"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-charcoal/90 px-2.5 py-1 text-[0.72rem] font-semibold text-white shadow-md backdrop-blur-md">
              WhatsApp Chat
            </span>
            <Magnetic strength={0.3}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-md transition-all duration-300 hover:scale-110 hover:bg-brand hover:text-white hover:shadow-[0_8px_20px_rgba(239,127,26,0.4)]"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </Magnetic>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2.5">
            <span className="rounded-md bg-charcoal/90 px-2.5 py-1 text-[0.72rem] font-semibold text-white shadow-md backdrop-blur-md">
              Email Inquiry
            </span>
            <Magnetic strength={0.3}>
              <a
                href={contact.emailHref}
                aria-label="Email Prashant Kalal"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/30 bg-white text-brand shadow-md transition-all duration-300 hover:scale-110 hover:bg-brand hover:text-white hover:shadow-[0_8px_20px_rgba(239,127,26,0.4)]"
              >
                <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Main Phone Speed Dial Button: Liquid Morph & 360 Rim Sheen */}
        <Magnetic strength={0.4}>
          <button
            type="button"
            onClick={() => setIsPhoneMenuOpen(!isPhoneMenuOpen)}
            aria-label="Contact Options"
            aria-expanded={isPhoneMenuOpen}
            className="liquid-morph-btn group flex h-13 w-13 items-center justify-center text-white shadow-[0_10px_28px_rgba(239,127,26,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_14px_36px_rgba(239,127,26,0.65)] active:scale-95"
          >
            {isPhoneMenuOpen ? (
              <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            )}
          </button>
        </Magnetic>
      </div>

      {/* 2. Separate Floating Back to Top Button */}
      <div
        className={`fixed bottom-6 right-22 z-40 transition-all duration-400 ease-out ${
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
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-white text-brand shadow-[0_8px_24px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-brand hover:bg-brand hover:text-white hover:shadow-[0_12px_28px_rgba(239,127,26,0.5)] active:scale-95"
          >
            <svg
              className="h-5 w-5 transition-transform duration-400 ease-out"
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
    </>
  )
}
