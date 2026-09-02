import { useEffect, useRef, useState, type TouchEvent } from "react"

export function DraggableScrollTop() {
  const [show, setShow] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number; posX: number; posY: number }>({
    x: 0,
    y: 0,
    posX: 0,
    posY: 0,
  })
  const hasMovedRef = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 250)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  function handleTouchStart(e: TouchEvent<HTMLDivElement>) {
    const touch = e.touches[0]
    if (!touch) return
    hasMovedRef.current = false
    setIsDragging(true)

    const rect = e.currentTarget.getBoundingClientRect()
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      posX: position ? position.x : rect.left,
      posY: position ? position.y : rect.top,
    }
  }

  function handleTouchMove(e: TouchEvent<HTMLDivElement>) {
    if (!isDragging) return
    const touch = e.touches[0]
    if (!touch) return

    const deltaX = touch.clientX - dragStartRef.current.x
    const deltaY = touch.clientY - dragStartRef.current.y

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      hasMovedRef.current = true
    }

    const newX = Math.min(window.innerWidth - 60, Math.max(10, dragStartRef.current.posX + deltaX))
    const newY = Math.min(window.innerHeight - 80, Math.max(60, dragStartRef.current.posY + deltaY))

    setPosition({ x: newX, y: newY })
  }

  function handleTouchEnd() {
    setIsDragging(false)
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!show) return null

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={scrollToTop}
      className={
        "fixed z-40 transition-transform duration-300 lg:hidden " +
        (isDragging ? "scale-110 opacity-90 cursor-grabbing" : "opacity-100 cursor-grab")
      }
      style={
        position
          ? { left: `${position.x}px`, top: `${position.y}px` }
          : { bottom: "5.5rem", right: "1rem" }
      }
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          scrollToTop()
        }}
        aria-label="Scroll to top"
        className="liquid-morph-btn-white flex h-12 w-12 items-center justify-center text-brand shadow-[0_10px_28px_rgba(239,127,26,0.35)] transition-all hover:scale-110 active:scale-95"
      >
        <svg
          className="relative z-10 h-5 w-5 text-brand"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}
