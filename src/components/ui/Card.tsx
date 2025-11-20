import { motion } from 'framer-motion'
import { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  animate?: boolean
}

export default function Card({ children, className = '', animate = true, ...props }: CardProps) {
  const baseStyles = 'bg-white rounded-2xl shadow-lg p-6'

  if (!animate) {
    return (
      <div className={`${baseStyles} ${className}`} {...props}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${baseStyles} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
}
