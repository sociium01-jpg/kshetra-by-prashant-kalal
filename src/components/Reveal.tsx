import type { ReactNode } from "react"
import { useInView } from "../hooks/useInView"

type Tag = "div" | "li" | "article" | "section" | "header"
type Variant = "fade-up" | "fade-left" | "fade-right" | "zoom-in" | "blur-in"

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
  as: TagName = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  variant?: Variant
  as?: Tag
}) {
  const { ref, visible } = useInView()
  return (
    <TagName
      ref={ref as never}
      className={`reveal reveal-${variant} ${visible ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </TagName>
  )
}
