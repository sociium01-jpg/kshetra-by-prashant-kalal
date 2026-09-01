import { useState, type FormEvent } from "react"
import { contactCopy } from "../content/home"
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

    if (import.meta.env.DEV) {
      form.reset()
      setStatus("success")
      return
    }

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "enquiry",
          name: String(data.get("name") ?? ""),
          phone: String(data.get("phone") ?? ""),
          message: String(data.get("message") ?? ""),
          "bot-field": String(data.get("bot-field") ?? ""),
        }),
      })
      if (!res.ok) throw new Error("Submit failed")
      form.reset()
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="section-band peach-wash-tl overflow-x-hidden">
      <div className="page-shell grid items-stretch gap-8 md:gap-10 lg:grid-cols-2 lg:gap-12">
        <Reveal className="flex min-h-0 flex-col">
          <h2 className="text-[1.3rem] leading-tight font-medium text-balance text-ink sm:text-[1.45rem] md:text-[2.2rem]">
            {contactCopy.heading}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-body">{contactCopy.body}</p>
          <div className="contact-line-art mt-8 flex flex-1 items-center">
            <img
              src="/contact-banner.png"
              alt=""
              width={1024}
              height={819}
            />
          </div>
        </Reveal>

        <div className="min-w-0">
          {status === "success" ? (
            <p className="bg-white px-8 py-12 text-body">Thank you.</p>
          ) : (
            <form
              name="enquiry"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="glass flex h-full min-w-0 flex-col space-y-5 p-5 sm:p-6 md:p-8"
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
              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-shine bg-brand px-8 py-3 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-brand-dark disabled:opacity-60"
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
