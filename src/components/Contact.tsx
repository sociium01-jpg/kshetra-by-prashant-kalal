import { useState, type FormEvent } from "react"
import { useSite } from "../context/SiteContext"
import { type LegalType } from "./LegalModal"
import { Magnetic } from "./Magnetic"
import { Reveal } from "./Reveal"

type Status = "idle" | "submitting" | "success" | "error"

interface ContactProps {
  onOpenLegal?: (type: LegalType) => void
}

export function Contact({ onOpenLegal }: ContactProps) {
  const { content, addLead } = useSite()
  const contactCopy = content.contactCopy
  const [status, setStatus] = useState<Status>("idle")
  const [submittedName, setSubmittedName] = useState("")

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get("name") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const userEmail = String(data.get("email") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    setSubmittedName(name)
    // 1. Capture lead locally in Admin Dashboard
    addLead({
      name,
      phone,
      email: userEmail,
      message,
      source: "Contact Page",
    })

    // 2. INSTANT IMMEDIATE FEEDBACK TO THE USER
    setStatus("success")
    form.reset()

    // 3. Secure Background Dispatch to Serverless API Route
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        email: userEmail,
        message,
        source: "Contact Page",
      }),
    }).catch(() => {})
  }

  return (
    <section id="contact" className="section-band bg-gray overflow-x-hidden">
      <div className="page-shell grid items-stretch gap-6 md:gap-8 lg:grid-cols-2 lg:gap-10">
        <Reveal className="flex min-h-0 flex-col" variant="fade-right">
          <h2 className="text-[1.3rem] leading-tight font-bold text-balance text-ink sm:text-[1.45rem] md:text-[2.2rem]">
            {contactCopy.heading}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-body">{contactCopy.body}</p>
          <div className="contact-line-art mt-5 flex flex-1 items-center">
            <img
              src="/contact-banner.png"
              alt=""
              className="img-float-gentle"
              width={1024}
              height={819}
            />
          </div>
        </Reveal>

        <Reveal className="min-w-0" variant="fade-left" delay={120}>
          {status === "success" ? (
            <div className="glass flex h-full min-h-0 flex-col items-center justify-center p-8 text-center sm:p-12">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand">
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-bold text-ink sm:text-xl">Enquiry Received!</h3>
              <p className="mt-2 text-sm leading-relaxed text-body">
                Thank you{submittedName ? `, ${submittedName}` : ""}. Prashant will get in touch with you shortly.
              </p>
            </div>
          ) : (
            <form
              name="enquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="glass flex h-full min-w-0 flex-col space-y-4 p-5 sm:p-6"
              onSubmit={onSubmit}
            >
              <input type="hidden" name="form-name" value="enquiry" />
              <p className="hidden">
                <label>
                  Don&apos;t fill this out: <input name="bot-field" />
                </label>
              </p>
              <label className="block">
                <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                  Name
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="mt-2 w-full border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
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
                  className="mt-2 w-full border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
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
                  className="mt-2 w-full border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
                />
              </label>

              <label className="block">
                <span className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                  Message *
                </span>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-y border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
                />
              </label>
              {/* Terms & Conditions Agreement Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  type="checkbox"
                  id="contact-terms"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-brand focus:ring-brand"
                />
                <label htmlFor="contact-terms" className="text-[0.74rem] leading-snug text-gray-400">
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

              {status === "error" ? <p className="text-sm text-brand">Something went wrong.</p> : null}
              <Magnetic className="self-start">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-shine bg-brand px-8 py-3 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-brand-dark disabled:opacity-60"
                >
                  Send
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
