export default function Logo({ className = '' }) {
  return (
    <a href="https://aipeakbiz.com" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="AI Peak Biz" className="h-10 w-10 rounded-lg object-contain" />
        <div className="flex flex-col leading-tight">
          <span className="font-heading font-bold text-white text-lg tracking-tight">AI Peak Biz</span>
        </div>
      </div>
    </a>
  )
}
