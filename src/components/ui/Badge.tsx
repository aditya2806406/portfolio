import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'cyan' | 'purple' | 'subtle'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'cyan',
  className = '',
}) => {
  const variantStyles = {
    cyan: 'bg-[#65E5FF]/10 text-[#65E5FF] border-[#65E5FF]/30',
    purple: 'bg-[#8175FF]/10 text-[#8175FF] border-[#8175FF]/30',
    subtle: 'bg-[#151B2A] text-[#A4ADBF] border-[#2A364F]',
  }[variant]

  return (
    <span
      className={`inline-flex items-center text-xs font-mono font-medium px-2.5 py-1 rounded-full border tracking-wide uppercase ${variantStyles} ${className}`}
    >
      {children}
    </span>
  )
}
