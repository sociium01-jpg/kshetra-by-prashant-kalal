import { useEffect, useRef } from "react"

export function useParallax<T extends HTMLElement = HTMLImageElement>(
  factor = 0.12,
  scale = 1,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const compact = window.matchMedia("(max-width: 1023px)")

    let frame = 0
    const update = () => {
      if (reduce.matches || compact.matches) {
        el.style.transform = ""
        return
      }
      const rect = el.getBoundingClientRect()
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2
      const y = mid * factor
      const s = scale !== 1 ? ` scale(${scale})` : ""
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)${s}`
    }
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    reduce.addEventListener("change", onScroll)
    compact.addEventListener("change", onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      reduce.removeEventListener("change", onScroll)
      compact.removeEventListener("change", onScroll)
    }
  }, [factor, scale])

  return ref
}
