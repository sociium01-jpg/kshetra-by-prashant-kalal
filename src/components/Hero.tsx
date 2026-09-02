import { quotes } from "../content/home"
import { useEffect, useRef, useState } from "react"

function preventOrphan(line: string) {
  const i = line.lastIndexOf(" ")
  if (i < 0) return line
  return `${line.slice(0, i)}\u00a0${line.slice(i + 1)}`
}

function QuoteLines({
  lines,
  animate,
}: {
  lines: string[]
  animate: boolean
}) {
  return (
    <>
      {lines.map((line, lineIndex) => (
        <span
          key={`${line}-${lineIndex}`}
          className={`quote-hero-text block min-w-0 max-w-full ${animate ? "quote-hero-line" : ""}`}
          style={{
            animationDelay: animate ? `${80 + lineIndex * 120}ms` : undefined,
          }}
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
  const [isMobile, setIsMobile] = useState(false)
  const indexRef = useRef(0)
  indexRef.current = index

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

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

  // Always use Quote 0 lines for max height placeholder to keep stage height 100% constant & un-shifting
  const maxPlaceholderLines = isMobile
    ? (quotes[0].linesMobile ?? quotes[0].lines)
    : quotes[0].lines

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
        <div className="quote-hero-stage relative z-10 min-w-0 overflow-visible">
          {/* Constant Height Placeholder (Prevents Layout Shifts & Jerks) */}
          <blockquote className="quote-hero invisible min-w-0" aria-hidden="true">
            <QuoteLines lines={maxPlaceholderLines} animate={false} />
          </blockquote>

          {quotes.map((item, i) => {
            const active = i === index
            const exiting = i === prevIndex && prevIndex !== index
            let slide = "quote-slide-idle"
            if (active) slide = dir >= 0 ? "quote-slide-in" : "quote-slide-in-rev"
            else if (exiting) slide = dir >= 0 ? "quote-slide-out" : "quote-slide-out-rev"

            const itemLines = isMobile ? (item.linesMobile ?? item.lines) : item.lines

            return (
              <blockquote
                key={item.lines[0]}
                aria-hidden={!active}
                className={`quote-hero absolute inset-0 flex min-w-0 flex-col justify-center text-ink ${slide}`}
              >
                <QuoteLines
                  key={active ? `on-${i}` : `off-${i}`}
                  lines={itemLines}
                  animate={active}
                />
              </blockquote>
            )
          })}
        </div>
        <div className="relative z-10 mt-5 flex justify-center gap-1.5 md:mt-6">
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
