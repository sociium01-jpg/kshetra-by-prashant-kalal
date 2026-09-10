import { useEffect, useState, type FormEvent } from "react"
import { useSite } from "../context/SiteContext"
import { type LegalType } from "./LegalModal"
import { Magnetic } from "./Magnetic"

interface PopUpModalProps {
  onOpenLegal?: (type: LegalType) => void
}

export function PopUpModal({ onOpenLegal }: PopUpModalProps) {
  const { content, addLead } = useSite()
  const contactCopy = content.contactCopy
  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  useEffect(() => {
    const hasClosed = sessionStorage.getItem("kpk_modal_closed")
    if (hasClosed) return

    const timer = window.setTimeout(() => {
      setIsOpen(true)
    }, 8000)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal()
      }
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  function closeModal() {
    setIsOpen(false)
    sessionStorage.setItem("kpk_modal_closed", "true")
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get("name") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const userEmail = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    // 1. Capture lead in Admin Dashboard
    addLead({
      name,
      phone,
      email: userEmail,
      message,
      source: "Popup Modal Form",
    })

    // 2. INSTANT IMMEDIATE FEEDBACK TO THE USER (Zero waiting delay)
    setStatus("success")
    form.reset()

    window.setTimeout(() => {
      closeModal()
    }, 2500)

    // 2. Background Dispatches (Non-blocking)
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "5bf5367b-14d2-4e8a-b8fb-4d4375b42d13",
        email: "kshetrabyprashantkalal@gmail.com",
        replyto: userEmail || undefined,
        name,
        phone,
        client_email: userEmail || "Not provided",
        message,
        bcc: "sociium01@gmail.com",
        subject: `New Lead: ${name} (${phone}) - Popup Form`,
        from_name: "Kshetra By Prashant Kalal Website",
      }),
    }).catch(() => {})

    fetch("https://formsubmit.co/ajax/kshetrabyprashantkalal@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email: userEmail || "Not provided",
        message,
        _replyto: userEmail || undefined,
        _cc: "sociium01@gmail.com",
        _subject: `New Lead: ${name} (${phone}) - Popup Form`,
        _template: "table",
        _captcha: "false",
      }),
    }).catch(() => {})
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop blur */}
      <div
        className="fixed inset-0 bg-charcoal/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
      />

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/40 bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.35)] transition-all duration-300 sm:p-8">
        {/* Close Button */}
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close form"
          className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-gray text-ink transition-colors hover:bg-brand hover:text-white"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-[1.25rem] font-bold leading-tight text-ink sm:text-[1.45rem]">
          {contactCopy.heading}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-body sm:text-sm">{contactCopy.body}</p>

        {status === "success" ? (
          <p className="mt-6 rounded-xl bg-brand/10 p-4 text-center text-sm font-semibold text-brand">
            Thank you. Your message has been received!
          </p>
        ) : (
          <form className="mt-5 space-y-4" onSubmit={onSubmit}>
            <label className="block">
              <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                Name *
              </span>
              <input
                required
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                className="mt-1 w-full border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
              />
            </label>

            <label className="block">
              <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                Phone *
              </span>
              <input
                required
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                className="mt-1 w-full border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
              />
            </label>

            <label className="block">
              <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                Email <span className="font-normal text-gray-400 lowercase">(optional)</span>
              </span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email address"
                className="mt-1 w-full border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
              />
            </label>

            <label className="block">
              <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                Message *
              </span>
              <textarea
                required
                name="message"
                rows={3}
                placeholder="Tell us about your property requirement"
                className="mt-1 w-full resize-y border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
              />
            </label>

            {/* Terms & Conditions Agreement Checkbox */}
            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="modal-terms"
                required
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-brand focus:ring-brand"
              />
              <label htmlFor="modal-terms" className="text-[0.74rem] leading-snug text-gray-400">
                I agree to Kshetra By Prashant Kalal's{" "}
                <button
                  type="button"
                  onClick={() => onOpenLegal?.("terms")}
                  className="text-gray-500 underline transition-colors hover:text-brand"
                >
                  Terms & Conditions
                </button>{" "}
                and{" "}
                <button
                  type="button"
                  onClick={() => onOpenLegal?.("privacy")}
                  className="text-gray-500 underline transition-colors hover:text-brand"
                >
                  Privacy Policy
                </button>
                , and consent to being contacted about this enquiry by phone, WhatsApp or email.
              </label>
            </div>

            {status === "error" ? (
              <p className="text-xs text-brand">Something went wrong. Please try again.</p>
            ) : null}

            <div className="pt-2">
              <Magnetic strength={0.2} className="w-full">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-shine rounded-lg bg-brand py-3 text-xs font-semibold tracking-[0.16em] text-white uppercase shadow-md transition hover:bg-brand-dark disabled:opacity-60 cursor-pointer"
                >
                  {status === "submitting" ? "Sending..." : "Submit Enquiry"}
                </button>
              </Magnetic>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
