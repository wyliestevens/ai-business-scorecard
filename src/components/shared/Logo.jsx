export default function Logo({ className = '' }) {
  return (
    <a href="https://aipeakbiz.com" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-heading font-bold text-white text-lg tracking-tight">AI Peak Biz</span>
        </div>
      </div>
    </a>
  )
}
