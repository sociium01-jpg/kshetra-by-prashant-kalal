import { quotes } from "../content/home"
import { Fragment, useEffect, useRef, useState } from "react"

/** Decorative 66/99 commas matching the original Kshetra PDF banners. */
function QuoteMark({ closing = false }: { closing?: boolean }) {
  return (
    <svg
      className={`quote-mark ${closing ? "quote-mark-close" : "quote-mark-open"}`}
      viewBox="0 0 64 80"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.4.8C7.4.8.8 7.2.8 16.2c0 8.6 6.8 15.6 15.4 16.6-2.2 11.2-8.6 21.4-18.2 29.6l6.8 6C16.6 59.2 27 44.8 30.2 28.6 32.2 17.6 29.2 6.2 22 2.2 20.2 1.2 18.4.8 16.4.8zm31.2 0C38.6.8 32 7.2 32 16.2c0 8.6 6.8 15.6 15.4 16.6-2.2 11.2-8.6 21.4-18.2 29.6l6.8 6C47.8 59.2 58.2 44.8 61.4 28.6 63.4 17.6 60.4 6.2 53.2 2.2 51.4 1.2 49.6.8 47.6.8z" />
    </svg>
  )
}

function QuoteLines({ lines, animate }: { lines: string[]; animate: boolean }) {
  return (
    <>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ")
        return (
          <span key={`${line}-${lineIndex}`} className="block whitespace-nowrap">
            {words.map((word, wordIndex) => {
              const emphasized = /^[A-Z]{2,}/.test(word)
              return (
                <Fragment key={`${word}-${wordIndex}`}>
                  <span
                    className={`quote-hero-word inline-block ${emphasized ? "font-medium" : ""} ${
                      animate ? "quote-hero-line" : ""
                    }`}
                    style={
                      animate
                        ? { animationDelay: `${80 + lineIndex * 90 + wordIndex * 45}ms` }
                        : undefined
                    }
                  >
                    {word}
                  </span>
                  {wordIndex < words.length - 1 ? " " : ""}
                </Fragment>
              )
            })}
          </span>
        )
      })}
    </>
  )
}

export function Hero() {
  const [index, setIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const [dir, setDir] = useState(1)
  const [paused, setPaused] = useState(false)
  const indexRef = useRef(0)
  indexRef.current = index

  function goTo(next: number, direction?: number) {
    const wrapped = (next + quotes.length) % quotes.length
    if (wrapped === indexRef.current) return
    const n = quotes.length
    const cur = indexRef.current
    const distFwd = (wrapped - cur + n) % n
    const distBack = (cur - wrapped + n) % n
    const forward = direction ?? (distFwd <= distBack ? 1 : -1)
    setDir(forward)
    setPrevIndex(indexRef.current)
    setIndex(wrapped)
  }

  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => goTo(indexRef.current + 1, 1), 5000)
    return () => window.clearInterval(id)
  }, [paused])

  const quote = quotes[index] ?? quotes[0]
  const wash = quote.wash === "tr" ? "peach-wash-tr" : "peach-wash-tl"

  return (
    <section
      id="home"
      className={`${wash} relative flex min-h-[58vh] flex-col justify-center overflow-hidden pt-24 pb-14 transition-[background] duration-700 sm:min-h-[62vh] md:pt-28 md:pb-20`}
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h1 className="sr-only">Kshetra by Prashant Kalal</h1>
      <div className="relative mx-auto w-full max-w-lg px-6 py-10 text-center sm:max-w-xl sm:px-10 sm:py-12">
        <QuoteMark />
        <div className="relative z-10 overflow-hidden">
          <blockquote
            className="invisible px-1 text-[clamp(0.88rem,3.4vw,1.5rem)] leading-[1.55] font-normal"
            aria-hidden="true"
          >
            <QuoteLines lines={quote.lines} animate={false} />
          </blockquote>
          {quotes.map((item, i) => {
            const active = i === index
            const exiting = i === prevIndex && prevIndex !== index
            let slide = "quote-slide-idle"
            if (active) slide = dir >= 0 ? "quote-slide-in" : "quote-slide-in-rev"
            else if (exiting) slide = dir >= 0 ? "quote-slide-out" : "quote-slide-out-rev"

            return (
              <blockquote
                key={item.lines[0]}
                aria-hidden={!active}
                className={`absolute inset-0 flex flex-col justify-center px-1 text-[clamp(0.88rem,3.4vw,1.5rem)] leading-[1.55] font-normal text-ink ${slide}`}
              >
                <QuoteLines key={active ? `on-${i}` : `off-${i}`} lines={item.lines} animate={active} />
              </blockquote>
            )
          })}
        </div>
        <QuoteMark closing />
      </div>
      <div className="mt-2 flex justify-center gap-1.5">
        {quotes.map((item, i) => (
          <button
            key={item.lines[0]}
            type="button"
            aria-label={`Show quote ${i + 1}`}
            aria-current={i === index ? true : undefined}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === index ? "w-5 bg-muted" : "w-1.5 bg-muted/35 hover:bg-muted/60"
            }`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
