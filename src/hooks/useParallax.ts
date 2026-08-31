import { useEffect, useRef } from "react"

export function useParallax<T extends HTMLElement = HTMLImageElement>(
  factor = 0.12,
  scale = 1,
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let frame = 0
    const update = () => {
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
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [factor, scale])

  return ref
}
