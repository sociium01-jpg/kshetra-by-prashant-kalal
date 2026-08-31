import { quotes } from "../content/home"
import { useEffect, useState } from "react"

export function QuoteStrip() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % quotes.length)
    }, 5500)
    return () => window.clearInterval(id)
  }, [])

  const quote = quotes[index]
  const wash = quote.wash === "tr" ? "peach-wash-tr" : "peach-wash-tl"

  return (
    <section className={`${wash} relative overflow-hidden py-16 md:py-20`} aria-live="polite">
      <div className="glass relative mx-auto max-w-3xl px-6 py-12 text-center md:px-12">
        <span
          className="quote-mark absolute top-2 left-[6%] text-[7rem] md:text-[9rem]"
          aria-hidden="true"
        >
          “
        </span>
        <blockquote
          key={quote.lines[0]}
          className="hero-fade relative z-10 text-[1.25rem] leading-snug font-normal text-ink md:text-[1.65rem]"
        >
          {quote.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>
        <span
          className="quote-mark absolute right-[8%] bottom-[-0.5rem] text-[7rem] md:text-[9rem]"
          aria-hidden="true"
        >
          ”
        </span>
      </div>
      <div className="mt-10 flex justify-center gap-2">
        {quotes.map((item, i) => (
          <button
            key={item.lines[0]}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            className={`h-2 w-2 rounded-full transition ${
              i === index ? "bg-brand" : "bg-muted/40"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
