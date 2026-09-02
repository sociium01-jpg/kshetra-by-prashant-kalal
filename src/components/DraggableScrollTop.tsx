import { useEffect, useRef, useState, type TouchEvent } from "react"

export function DraggableScrollTop() {
  const [show, setShow] = useState(false)
  const [isScrollingDown, setIsScrollingDown] = useState(false)
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
    let lastY = window.scrollY
    let pauseTimer: number

    const onScroll = () => {
      const curY = window.scrollY
      setShow(curY > 250)

      if (curY > lastY + 5) {
        setIsScrollingDown(true)
      } else if (curY < lastY - 5) {
        setIsScrollingDown(false)
      }
      lastY = curY

      window.clearTimeout(pauseTimer)
      pauseTimer = window.setTimeout(() => {
        setIsScrollingDown(false)
      }, 1000)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.clearTimeout(pauseTimer)
    }
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

  function handleClick() {
    if (!hasMovedRef.current) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!show) return null

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
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
        aria-label="Scroll to top"
        className="liquid-morph-btn-white flex h-12 w-12 items-center justify-center text-brand shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-transform active:scale-95"
      >
        <svg
          className="relative z-10 h-5 w-5 transition-transform duration-400 ease-out"
          style={{
            transform: isScrollingDown ? "rotate(180deg)" : "rotate(0deg)",
          }}
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
