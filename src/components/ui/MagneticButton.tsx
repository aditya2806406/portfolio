import React, { useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  strength?: number
  className?: string
  asAnchor?: boolean
  href?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.28,
  className = '',
  asAnchor = false,
  href,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null)
  const [transform, setTransform] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion || !buttonRef.current) return

    // Check for fine pointer
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength

    setTransform({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setTransform({ x: 0, y: 0 })
  }

  const inlineStyle: React.CSSProperties = reducedMotion
    ? {}
    : {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: transform.x === 0 && transform.y === 0 ? 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'transform 0.1s ease-out',
      }

  if (asAnchor && href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={inlineStyle}
        className={`inline-block ${className}`}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={inlineStyle}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
