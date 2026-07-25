import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
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

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!mobileOpen) return
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside, true)
    document.addEventListener('touchstart', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
      document.removeEventListener('touchstart', handleClickOutside, true)
    }
  }, [mobileOpen])

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
      e.preventDefault()
      e.stopPropagation()
      setMobileOpen(false)
      const target = document.getElementById(link.toLowerCase())
      if (target) {
        // Small delay to let the menu close animation start, then scroll
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    },
    [],
  )

  const handleLetsTalk = useCallback(() => {
    setMobileOpen(false)
    const contact = document.getElementById('contact')
    if (contact) {
      setTimeout(() => {
        contact.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [])

  const toggleMobile = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setMobileOpen((prev) => !prev)
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
              <Magnet padding={40} strength={5}>
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
          className={`navbar-hamburger ${mobileOpen ? 'active' : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          type="button"
        >
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu — uses CSS transitions instead of Framer Motion */}
      <div className={`navbar-mobile-menu ${mobileOpen ? 'navbar-mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="navbar-mobile-link"
            onClick={(e) => handleNavClick(e, link)}
          >
            {link}
          </a>
        ))}
        <button
          className="navbar-cta navbar-mobile-cta"
          onClick={handleLetsTalk}
          type="button"
        >
          <span>LET'S TALK</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </motion.nav>
  )
}
