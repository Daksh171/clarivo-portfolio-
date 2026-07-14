import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnet from './Magnet'

const NAV_LINKS = ['About', 'Services', 'Projects', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      e.preventDefault()
      setMobileOpen(false)
      const target = document.getElementById(link.toLowerCase())
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    },
    [],
  )

  const handleLetsTalk = useCallback(() => {
    const contact = document.getElementById('contact')
    if (contact) contact.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <motion.nav
      ref={navRef}
      className={`navbar-glass ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}>
          CLARIVO
        </a>

        {/* Desktop Nav Links */}
        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link} className="navbar-link-item">
              <Magnet padding={60} strength={5}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={`navbar-link ${activeLink === link ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link)}
                  onMouseEnter={() => setActiveLink(link)}
                  onMouseLeave={() => setActiveLink('')}
                >
                  <span className="navbar-link-dot" />
                  <span className="navbar-link-text">{link}</span>
                </a>
              </Magnet>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Magnet padding={80} strength={4}>
          <button
            className="navbar-cta"
            onClick={handleLetsTalk}
          >
            <span>LET'S TALK</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 12L12 2M12 2H4M12 2v8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </Magnet>

        {/* Mobile Hamburger */}
        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="navbar-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="navbar-mobile-link"
                onClick={(e) => handleNavClick(e, link)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {link}
              </motion.a>
            ))}
            <motion.button
              className="navbar-cta navbar-mobile-cta"
              onClick={() => { setMobileOpen(false); handleLetsTalk() }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
            >
              <span>LET'S TALK</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
