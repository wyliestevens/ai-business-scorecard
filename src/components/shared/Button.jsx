import { motion } from 'framer-motion'

export default function Button({ children, onClick, href, variant = 'primary', size = 'lg', className = '', type = 'button', disabled = false }) {
  const base = 'inline-flex items-center justify-center font-heading font-bold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/50'
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  }
  const variants = {
    primary: 'bg-teal-400 text-navy-900 hover:bg-teal-500 shadow-lg shadow-teal-400/25',
    secondary: 'bg-navy-600 text-white border border-gray-600 hover:border-teal-400 hover:text-teal-400',
    ghost: 'text-teal-400 hover:bg-teal-400/10',
  }

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
