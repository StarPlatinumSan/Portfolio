import { useState } from 'react'
import MediaFrame from './MediaFrame'
import { ArrowUpRight } from './Icons'
import { resolvePublicAsset } from '../data/assets'

function SectionHeading({ eyebrow, title, id }) {
  return (
    <header className="section-heading" data-reveal>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
    </header>
  )
}

function StudioDestination({ link, comingSoon }) {
  const content = (
    <>
      <span>{link.label}</span>
      <small>{link.href ? 'Open' : comingSoon}</small>
      {link.href ? <ArrowUpRight /> : null}
    </>
  )

  if (!link.href) {
    return (
      <span className="studio-destination is-disabled" aria-disabled="true">
        {content}
      </span>
    )
  }

  return (
    <a
      className="studio-destination"
      href={link.href}
      target="_blank"
      rel="noreferrer"
    >
      {content}
    </a>
  )
}

export function StudioSection({ copy, feature }) {
  const logoSource = resolvePublicAsset(feature.logo.src)

  return (
    <section
      className="studio-section section-shell"
      id="studio"
      aria-labelledby="studio-title"
    >
      <div className="studio-brand-row">
        <div className="studio-logo-lockup" data-reveal>
          {logoSource ? (
            <img src={logoSource} alt={feature.logo.alt} />
          ) : (
            <span>Fracture Interactive</span>
          )}
        </div>
        <div className="studio-intro">
          <SectionHeading
            eyebrow={copy.eyebrow}
            title={copy.title}
            id="studio-title"
          />
          <p data-reveal>{copy.description}</p>
        </div>
      </div>

      <article className="studio-feature" data-reveal>
        <div className="studio-feature__visuals">
          <div className="studio-feature__primary">
            <MediaFrame
              image={feature.primaryImage}
              accent="#e82bb7"
              fit="contain"
            />
          </div>
          <span className="studio-feature__visual-label">FI / 01</span>
        </div>

        <div className="studio-feature__content">
          <div className="studio-feature__meta">
            <span>{copy.featuredProject}</span>
            <span>{feature.status}</span>
          </div>
          <p className="studio-feature__format">{feature.format}</p>
          <h3>{feature.title}</h3>
          <p className="studio-feature__summary">{feature.summary}</p>

          <div className="studio-feature__links">
            <p>{copy.linksTitle}</p>
            <div>
              {feature.links.map((link) => (
                <StudioDestination
                  key={link.id}
                  link={link}
                  comingSoon={copy.linkComingSoon}
                />
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}

export function ExperienceSection({ copy, items }) {
  return (
    <section
      className="experience-section section-shell"
      id="experience"
      aria-labelledby="experience-title"
    >
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        id="experience-title"
      />
      <div className="experience-list">
        {items.map((item, index) => (
          <article className="experience-item" key={item.role} data-reveal>
            <span className="experience-item__number">0{index + 1}</span>
            <div className="experience-item__role">
              <p>{item.place}</p>
              <h3>{item.role}</h3>
            </div>
            <p className="experience-item__summary">{item.summary}</p>
            <span className="experience-item__period">{item.period}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

export function AboutSection({ copy, education, webTools, gameTools }) {
  const [activeTools, setActiveTools] = useState('web')
  const tools = activeTools === 'web' ? webTools : gameTools

  return (
    <section
      className="about-section section-shell"
      id="about"
      aria-labelledby="about-title"
    >
      <SectionHeading
        eyebrow={copy.eyebrow}
        title={copy.title}
        id="about-title"
      />

      <div className="about-grid">
        <div className="tool-panel" data-reveal>
          <div className="tool-tabs" role="tablist" aria-label="Tool category">
            <span
              className={`tool-tabs__indicator ${activeTools === 'game' ? 'is-game' : ''}`}
              aria-hidden="true"
            />
            <button
              type="button"
              role="tab"
              aria-selected={activeTools === 'web'}
              className={activeTools === 'web' ? 'is-active' : ''}
              onClick={() => setActiveTools('web')}
            >
              {copy.webLabel}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTools === 'game'}
              className={activeTools === 'game' ? 'is-active' : ''}
              onClick={() => setActiveTools('game')}
            >
              {copy.gameLabel}
            </button>
          </div>
          <div className="tool-cloud" role="tabpanel" key={activeTools}>
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </div>

        <div className="education-panel" data-reveal>
          <p className="education-panel__label">{copy.education}</p>
          {education.map((item) => (
            <article key={item.degree}>
              <span>{item.period}</span>
              <h3>{item.degree}</h3>
              <p>{item.institution}</p>
              <small>{item.note}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection({ copy }) {
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-section__grid" aria-hidden="true" />
      <div className="contact-section__inner section-shell">
        <p className="eyebrow" data-reveal>
          <span />
          {copy.eyebrow}
        </p>
        <h2 id="contact-title" data-reveal>
          {copy.title}
          <em>{copy.subtitle}</em>
        </h2>
        <div className="contact-links" data-reveal>
          <a href="mailto:andrei.bituleanu@umontreal.ca">
            <span>{copy.email}</span>
            <small>andrei.bituleanu@umontreal.ca</small>
            <ArrowUpRight />
          </a>
          <a
            href="https://github.com/StarPlatinumSan"
            target="_blank"
            rel="noreferrer"
          >
            <span>{copy.github}</span>
            <small>@StarPlatinumSan</small>
            <ArrowUpRight />
          </a>
          <a
            href="https://www.linkedin.com/in/andrei-bituleanu-65b1832aa/"
            target="_blank"
            rel="noreferrer"
          >
            <span>{copy.linkedin}</span>
            <small>Andrei Bituleanu</small>
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  )
}

export function Footer({ copy }) {
  return (
    <footer className="site-footer section-shell">
      <p>{copy}</p>
      <p>Montreal, QC</p>
      <a href="#top">Back to top</a>
      <span>2026</span>
    </footer>
  )
}
