import { getJourneyForSection } from '../data/journeys'

export default function Header({ copy, journeyCopy, activeSection, language, onLanguageChange }) {
  const activePath = getJourneyForSection(activeSection)
  const links = [
    { id: 'choose', label: journeyCopy.back, active: activeSection === 'choose' },
    { id: 'creative', label: journeyCopy.creativeNav, active: activePath === 'creative' },
    { id: 'studio', label: copy.navigation.studio, active: activePath === 'studio' },
    { id: 'contact', label: copy.navigation.contact, active: activeSection === 'contact' },
  ]
  return (
    <header className="site-header" data-header-reveal>
      <a className="brand" href="#top" aria-label={`${copy.identity.name}, ${copy.navigation.home}`}>
        <span className="brand-name">{copy.identity.name}<small>{copy.hero.eyebrow}</small></span>
      </a>
      <nav className="desktop-nav" aria-label={copy.navigation.primaryLabel}>
        {links.map((link) => <a key={link.id} href={`#${link.id}`} aria-current={link.active ? 'location' : undefined}>{link.label}</a>)}
      </nav>
      <div className="header-actions">
        <a className="mobile-journey-link" href="#choose">{journeyCopy.back}</a>
        <button className="language-toggle" type="button" aria-label={`${copy.languageName}. ${copy.navigation.switchLanguage}`} onClick={onLanguageChange}>
          <span>{language === 'en' ? 'EN' : 'FR'}</span><span aria-hidden="true">/{language === 'en' ? 'FR' : 'EN'}</span>
        </button>
      </div>
    </header>
  )
}
