import MediaFrame from './MediaFrame'
import { ArrowDown, ArrowUpRight } from './Icons'

const profileImage = {
  src: '/Andrei.jpg',
  alt: 'Portrait of Andrei Bituleanu',
  position: 'center',
  label: 'Portrait / 01',
}

export default function Hero({ copy }) {
  return (
    <section className="hero-section" id="top" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit--two" aria-hidden="true" />

      <div className="hero-copy">
        <p className="eyebrow" data-hero-kicker>
          <span />
          {copy.hero.eyebrow}
        </p>
        <h1 id="hero-title">
          <span className="hero-title-line">
            <span data-hero-line>{copy.hero.lead}</span>
          </span>
          <span className="hero-title-line">
            <em data-hero-line>{copy.hero.accent}</em>
          </span>
        </h1>
        <p className="hero-description" data-hero-fade>
          {copy.hero.description}
        </p>
        <div className="hero-actions" data-hero-fade>
          <a className="button button--primary" href="#work">
            {copy.hero.primaryAction}
            <ArrowDown className="button__icon" />
          </a>
          <a className="text-link" href="#contact">
            {copy.hero.secondaryAction}
            <ArrowUpRight className="text-link__icon" />
          </a>
        </div>

        <aside className="hero-focus" data-hero-focus>
          <p>{copy.hero.focus}</p>
          <strong>{copy.hero.focusValue}</strong>
        </aside>
      </div>

      <div className="hero-visual" data-hero-visual>
        <div className="hero-visual__label">
          <span>01</span>
          <span>Andrei / 2026</span>
        </div>
        <MediaFrame
          image={{ ...profileImage, alt: copy.hero.profileAlt }}
          className="hero-portrait"
          accent="#e82bb7"
          eager
        />
        <div className="hero-status-card" data-hero-status>
          <span className="status-light" aria-hidden="true" />
          <p>{copy.hero.status}</p>
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true" data-hero-scroll>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  )
}
