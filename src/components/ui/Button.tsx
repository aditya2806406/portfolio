import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  asAnchor?: boolean
  href?: string
  target?: string
  rel?: string
  download?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  download,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-[#65E5FF] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  }[size]

  const variantStyles = {
    primary:
      'bg-[#65E5FF] text-[#080A10] font-semibold hover:bg-[#8eecff] shadow-[0_0_20px_rgba(101,229,255,0.25)] hover:shadow-[0_0_30px_rgba(101,229,255,0.45)] hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-[#151B2A] text-[#F4F6FC] border border-[#2A364F] hover:border-[#65E5FF]/60 hover:bg-[#1C2337] shadow-sm hover:shadow-[0_0_15px_rgba(101,229,255,0.15)] hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'bg-transparent text-[#A4ADBF] hover:text-[#F4F6FC] hover:bg-[#151B2A]/60',
  }[variant]

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`

  if (asAnchor && href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={combinedClasses}
      >
        {children}
      </a>
    )
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  )
}
