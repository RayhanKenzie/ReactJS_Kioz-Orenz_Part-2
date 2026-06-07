import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Daftar Kios', path: '/kios' },
    { name: 'Waiting List', path: '/waiting-list' },
    { name: 'Kontak', path: '/kontak' }
  ]

  return (
    <header className="sticky top-0 z-50 glassmorphism shadow-md border-b border-orange-100/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-4xl flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              {/* House/Kiosk Icon */}
              <img src="/kioz-orenz-logo.PNG" alt="logo Kioz Orenz" />
            </div>
            <div>
              <span className="font-bold text-xl tracking-tight text-gray-900 hover:text-orange-600 transition-colors duration-300">
                Kioz <span className="text-orange-600 hover:text-gray-900 transition-colors duration-300">Orenz</span>
              </span>
              <span className="block text-[10px] text-gray-550 font-medium -mt-1 tracking-wider uppercase">Sewa Kios Depok</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 ${
                    isActive
                      ? 'text-orange-600 font-bold'
                      : 'text-gray-600 hover:text-orange-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-600 rounded-full animate-fade-in-up" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center">
            <Link
              to="/waiting-list"
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-4.5 py-2.5 rounded-lg shadow-sm hover:shadow-md hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
            >
              Gabung Waiting List
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-orange-500 hover:bg-orange-50/50 transition-all duration-300 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-lg px-4 py-6 flex flex-col gap-4 animate-fade-in-up">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-base font-medium py-2 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-orange-50 text-orange-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="border-t border-gray-100 pt-4 mt-2">
            <Link
              to="/waiting-list"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg shadow-sm transition-all"
            >
              Gabung Waiting List
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar