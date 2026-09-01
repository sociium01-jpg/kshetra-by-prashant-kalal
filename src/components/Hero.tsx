import { quotes } from "../content/home"
import { useEffect, useRef, useState } from "react"

/** Heavy 9-comma pair (blob on top, tail down). Opening 66 is this rotated 180°. */
const QUOTE_99 =
  "M22.5 3.2C10.2 3.2 1.6 12.4 1.6 25.2c0 12.6 9.8 23 22.4 24.4-3.2 16.4-12.6 31.2-26.6 43.2l12.4 8.8C26.2 86.2 41.4 66.4 46.2 43.6 49.4 27.6 44.8 10.8 34.2 5.2 31.4 3.8 27.2 3.2 22.5 3.2zm45.6 0C55.8 3.2 47.2 12.4 47.2 25.2c0 12.6 9.8 23 22.4 24.4-3.2 16.4-12.6 31.2-26.6 43.2l12.4 8.8C71.8 86.2 87 66.4 91.8 43.6 95 27.6 90.4 10.8 79.8 5.2 77 3.8 72.8 3.2 68.1 3.2z"

function QuoteMark({ closing = false }: { closing?: boolean }) {
  return (
    <svg
      className={`quote-mark ${closing ? "quote-mark-close" : "quote-mark-open"}`}
      viewBox="-8 -6 112 118"
      fill="currentColor"
      overflow="visible"
      aria-hidden="true"
    >
      {/* Left = 66 opening (blob bottom). Right = 99 closing (blob top). */}
      <g transform={closing ? undefined : "rotate(180 48 52)"}>
        <path d={QUOTE_99} />
      </g>
    </svg>
  )
}

function preventOrphan(line: string) {
  const i = line.lastIndexOf(" ")
  if (i < 0) return line
  return `${line.slice(0, i)}\u00a0${line.slice(i + 1)}`
}

function QuoteLines({ lines, animate }: { lines: string[]; animate: boolean }) {
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span
          key={`${line}-${lineIndex}`}
          className={`quote-hero-text block min-w-0 max-w-full ${animate ? "quote-hero-line" : ""}`}
          style={animate ? { animationDelay: `${80 + lineIndex * 120}ms` } : undefined}
        >
          {preventOrphan(line)}
        </span>
      ))}
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
      className={`${wash} section-hero relative transition-[background] duration-700`}
      aria-live="polite"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h1 className="sr-only">Kshetra by Prashant Kalal</h1>
      <div className="page-shell relative min-w-0 overflow-visible text-center">
        <QuoteMark />
        <div className="relative z-10 min-w-0 overflow-visible px-4 py-4 sm:px-10 sm:py-5 md:px-16 lg:overflow-hidden">
          <blockquote
            className="invisible min-w-0 px-1 text-[0.62rem] leading-[1.5] font-normal sm:text-[0.85rem] md:text-[1.05rem] lg:text-[1.22rem]"
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
                className={`absolute inset-0 flex min-w-0 flex-col justify-center px-1 text-[0.62rem] leading-[1.5] font-normal text-ink sm:text-[0.85rem] md:text-[1.05rem] lg:text-[1.22rem] ${slide}`}
              >
                <QuoteLines key={active ? `on-${i}` : `off-${i}`} lines={item.lines} animate={active} />
              </blockquote>
            )
          })}
        </div>
        <QuoteMark closing />
        <div className="relative z-10 mt-4 flex justify-center gap-1.5">
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
      </div>
    </section>
  )
}
