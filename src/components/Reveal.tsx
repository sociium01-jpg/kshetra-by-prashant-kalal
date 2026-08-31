import type { ReactNode } from "react"
import { useInView } from "../hooks/useInView"

type Tag = "div" | "li" | "article"

export function Reveal({
  children,
  className = "",
  delay = 0,
  as: TagName = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: Tag
}) {
  const { ref, visible } = useInView()
  return (
    <TagName
      ref={ref as never}
      className={`reveal ${visible ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </TagName>
  )
}
