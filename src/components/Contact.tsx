import { useState, type FormEvent } from "react"
import { contactCopy } from "../content/home"
import { Magnetic } from "./Magnetic"
import { Reveal } from "./Reveal"

type Status = "idle" | "submitting" | "success" | "error"

function encode(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus("submitting")

    const name = String(data.get("name") ?? "").trim()
    const phone = String(data.get("phone") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    try {
      // Direct Email Submission Pipeline (forwards to kshetrabyprashantkalal@gmail.com)
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "5bf5367b-14d2-4e8a-b8fb-4d4375b42d13",
          name,
          phone,
          message,
          subject: `New Property Enquiry from ${name}`,
          from_name: "Kshetra By Prashant Kalal Website",
        }),
      })

      // Also trigger Netlify / Vercel API fallback
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "enquiry",
          name,
          phone,
          message,
        }),
      }).catch(() => {})

      if (!res.ok) {
        // Fallback to Vercel API
        await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, phone, message }),
        }).catch(() => {})
      }

      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="section-band peach-wash-tl overflow-x-hidden">
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
            <p className="bg-white px-8 py-12 text-body">Thank you.</p>
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
                  Phone
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
                  Message
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-y border-0 border-b border-muted/40 bg-transparent py-2 text-ink outline-none focus:border-brand"
                />
              </label>
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
