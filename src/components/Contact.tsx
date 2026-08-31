import { useState, type FormEvent } from "react"
import { intents } from "../content/home"
import { Reveal } from "./Reveal"

type Status = "idle" | "submitting" | "success" | "error"

function encode(data: Record<string, string>) {
  return new URLSearchParams(data).toString()
}

export function Contact() {
  const [status, setStatus] = useState<Status>("idle")
  const [intent, setIntent] = useState<string>(intents[0])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus("submitting")

    if (import.meta.env.DEV) {
      form.reset()
      setIntent(intents[0])
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
          intent: String(data.get("intent") ?? intent),
          message: String(data.get("message") ?? ""),
          "bot-field": String(data.get("bot-field") ?? ""),
        }),
      })
      if (!res.ok) throw new Error("Submit failed")
      form.reset()
      setIntent(intents[0])
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="peach-wash-tl py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <h2 className="text-[1.7rem] leading-tight font-medium text-ink md:text-[2.2rem]">
            Thinking About Your Next Property Decision?
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-body">
            Tell me a little about what you are considering. I will get back to
            you personally — no inventory blast, no call centre.
          </p>
        </Reveal>

        {status === "success" ? (
          <p className="bg-white px-8 py-12 text-body">
            Thank you. I have your note and will be in touch shortly.
          </p>
        ) : (
          <form
            name="enquiry"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="glass space-y-5 p-6 md:p-8"
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
            <fieldset>
              <legend className="text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
                I am looking at
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {intents.map((item) => (
                  <label
                    key={item}
                    className={`cursor-pointer px-3 py-1.5 text-[0.7rem] tracking-[0.08em] uppercase ${
                      intent === item
                        ? "bg-brand text-white"
                        : "bg-gray text-body hover:bg-peach-soft"
                    }`}
                  >
                    <input
                      type="radio"
                      name="intent"
                      value={item}
                      checked={intent === item}
                      className="sr-only"
                      onChange={() => setIntent(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>
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
            {status === "error" ? (
              <p className="text-sm text-brand">
                Something went wrong. Please call or email me directly, or try
                again.
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === "submitting"}
            className="btn-shine bg-brand px-8 py-3 text-[0.72rem] font-semibold tracking-[0.16em] text-white uppercase transition hover:bg-brand-dark disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Start a Conversation"}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
