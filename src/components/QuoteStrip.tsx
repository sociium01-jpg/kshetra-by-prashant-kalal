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
    <section className={`${wash} relative overflow-hidden px-4 py-12 sm:px-5 md:py-20`} aria-live="polite">
      <div className="glass relative mx-auto max-w-3xl overflow-hidden px-8 py-10 text-center sm:px-12 md:px-12 md:py-12">
        <span
          className="quote-mark absolute top-1 left-3 text-[4rem] leading-none sm:top-2 sm:left-[6%] sm:text-[7rem] md:text-[9rem]"
          aria-hidden="true"
        >
          “
        </span>
        <blockquote
          key={quote.lines[0]}
          className="hero-fade relative z-10 px-2 text-[1.05rem] leading-snug font-normal text-balance text-ink sm:text-[1.25rem] md:text-[1.65rem]"
        >
          {quote.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>
        <span
          className="quote-mark absolute right-3 bottom-0 text-[4rem] leading-none sm:right-[8%] sm:bottom-[-0.5rem] sm:text-[7rem] md:text-[9rem]"
          aria-hidden="true"
        >
          ”
        </span>
      </div>
      <div className="mt-8 flex justify-center gap-2 md:mt-10">
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
