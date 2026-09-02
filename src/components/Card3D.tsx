import { useState, type MouseEvent, type ReactNode } from "react"

export function Card3D({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = -((y - centerY) / centerY) * 8
    const rotateY = ((x - centerX) / centerX) * 8
    setRot({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    })
  }

  function handleMouseEnter() {
    setIsHovered(true)
  }

  function handleMouseLeave() {
    setIsHovered(false)
    setRot({ x: 0, y: 0 })
    setGlare((g) => ({ ...g, opacity: 0 }))
  }

  return (
    <div
      className={"relative overflow-hidden rounded-xl border border-white/70 bg-white/90 shadow-sm transition-all duration-300 ease-out " + className}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        transform: isHovered
          ? `perspective(1000px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(10px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)",
        boxShadow: isHovered
          ? "0 20px 40px -10px rgba(239, 127, 26, 0.25), 0 8px 20px -5px rgba(0, 0, 0, 0.08)"
          : "0 4px 18px rgba(0, 0, 0, 0.04)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 70%)`,
          opacity: glare.opacity,
        }}
      />
      <div
        style={{
          transform: isHovered ? "translateZ(20px)" : "translateZ(0px)",
          transition: "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  )
}
