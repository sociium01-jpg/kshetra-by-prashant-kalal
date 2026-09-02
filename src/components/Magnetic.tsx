import { useState, type MouseEvent, type ReactNode } from "react"

export function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = (clientX - (left + width / 2)) * strength
    const y = (clientY - (top + height / 2)) * strength
    setPosition({ x, y })
  }

  function handleMouseLeave() {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div
      className={"inline-block transition-transform duration-300 ease-out " + className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {children}
    </div>
  )
}
