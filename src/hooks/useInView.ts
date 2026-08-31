import { useEffect, useRef, useState } from "react"

export function useInView<T extends HTMLElement = HTMLDivElement>(once = true) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) io.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [once])

  return { ref, visible }
}
