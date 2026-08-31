import { quotes } from "../content/home"
import { useEffect, useRef, useState } from "react"

function QuoteLines({ lines, animate }: { lines: string[]; animate: boolean }) {
  return (
    <>
      {lines.map((line, lineIndex) => {
        const words = line.split(" ")
        return (
          <span key={`${line}-${lineIndex}`} className="block">
            {words.map((word, wordIndex) => {
              const emphasized = /^[A-Z]{2,}/.test(word)
              return (
                <span
                  key={`${word}-${wordIndex}`}
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
                  {wordIndex < words.length - 1 ? "\u00a0" : ""}
                </span>
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
    const id = window.setInterval(() => goTo(indexRef.current + 1, 1), 5200)
    return () => window.clearInterval(id)
  }, [paused])

  const quote = quotes[index]
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
      <div className="relative mx-auto w-full max-w-2xl px-8 py-10 text-center sm:px-12 sm:py-14">
        <span
          className="quote-mark pointer-events-none absolute top-4 left-[8%] text-[clamp(5rem,14vw,9rem)] leading-none"
          aria-hidden="true"
        >
          “
        </span>
        <div className="relative z-10 min-h-[8.5rem] overflow-hidden sm:min-h-[11.5rem] md:min-h-[12.5rem]">
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
                className={`absolute inset-0 flex flex-col justify-center text-[clamp(1.15rem,3.2vw,1.85rem)] leading-[1.5] font-normal text-ink ${slide}`}
              >
                <QuoteLines key={active ? `on-${i}` : `off-${i}`} lines={item.lines} animate={active} />
              </blockquote>
            )
          })}
        </div>
        <span
          className="quote-mark pointer-events-none absolute right-[10%] bottom-4 text-[clamp(5rem,14vw,9rem)] leading-none"
          aria-hidden="true"
        >
          ”
        </span>
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
