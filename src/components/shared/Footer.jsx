import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-16 py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
        <Logo />
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
          <a href="tel:9286286080" className="hover:text-teal-400 transition-colors">928.628.6080</a>
          <a href="mailto:wylie@aipeakbiz.com" className="hover:text-teal-400 transition-colors">wylie@aipeakbiz.com</a>
          <span>Kingman, Arizona</span>
        </div>
        <div className="text-gray-600">
          &copy; {new Date().getFullYear()}{' '}
          <a href="https://aipeakbiz.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors">
            AI Peak Biz
          </a>
        </div>
      </div>
    </footer>
  )
}
