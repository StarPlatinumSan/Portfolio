import { useEffect, useState } from 'react'
import { MenuIcon } from './Icons'

export default function Header({ copy, language, onLanguageChange }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    ['#work', copy.navigation.work],
    ['#studio', copy.navigation.studio],
    ['#experience', copy.navigation.experience],
    ['#about', copy.navigation.about],
    ['#contact', copy.navigation.contact],
  ]

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header" data-header-reveal>
      <a className="brand" href="#top" aria-label="Andrei Bituleanu, home">
        <span className="brand__monogram" aria-hidden="true">
          <img src="/Mask.png" alt="" />
        </span>
        <span className="brand__name">
          Andrei Bituleanu
          <small>Creative developer</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([href, label]) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button
          className="language-toggle"
          type="button"
          aria-label={`${copy.languageName}. Switch language`}
          onClick={onLanguageChange}
        >
          <span>{language === 'en' ? 'EN' : 'FR'}</span>
          <span aria-hidden="true">/{language === 'en' ? 'FR' : 'EN'}</span>
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      <div
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <p>Montreal / Canada</p>
      </div>
    </header>
  )
}
