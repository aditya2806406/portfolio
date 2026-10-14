import React, { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion) return

    // Enable custom cursor only on fine desktop pointers
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!media.matches) return
    setEnabled(true)

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    // Smooth trailing ring loop
    let rafId: number
    const loop = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(rafId)
    }
  }, [reducedMotion])

  if (!enabled || reducedMotion) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
    >
      {/* Central crisp cyan dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[#65E5FF] transition-opacity duration-200"
      />

      {/* Smooth trailing ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -ml-4 -mt-4 rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? 'w-10 h-10 -ml-5 -mt-5 border-[#65E5FF] bg-[#65E5FF]/10 scale-110'
            : 'w-8 h-8 border-[#65E5FF]/40 bg-transparent scale-100'
        }`}
      />
    </div>
  )
}
