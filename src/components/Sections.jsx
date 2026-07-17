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

export function StudioSection({ copy, features }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeFeature = features[activeIndex] ?? features[0]
  const logoSource = resolvePublicAsset(features[0].logo.src)

  const selectProject = (index) => {
    setActiveIndex(index)
  }

  const handleProjectKeyDown = (event, index) => {
    const lastIndex = features.length - 1
    let nextIndex = null

    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = lastIndex

    if (nextIndex === null) return

    event.preventDefault()
    setActiveIndex(nextIndex)
    const projectTabs =
      event.currentTarget.parentElement.querySelectorAll('[role="tab"]')
    projectTabs[nextIndex]?.focus()
  }

  const projectMedia = (
    <MediaFrame
      image={activeFeature.primaryImage}
      accent="#e82bb7"
      fit={activeFeature.imageFit ?? 'cover'}
    />
  )

  return (
    <section
      className="studio-section section-shell"
      id="studio"
      aria-labelledby="studio-title"
    >
      <div className="studio-brand-row">
        <div className="studio-logo-lockup" data-reveal>
          {logoSource ? (
            <img src={logoSource} alt={features[0].logo.alt} />
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

      <div className="studio-showcase" data-reveal>
        <div
          className="studio-project-switcher"
          role="tablist"
          aria-label={copy.featuredProject}
          style={{
            '--active-project': activeIndex,
            '--project-count': features.length,
          }}
        >
          {features.map((feature, index) => (
            <button
              type="button"
              role="tab"
              id={`studio-tab-${feature.id}`}
              aria-controls={`studio-panel-${feature.id}`}
              aria-selected={index === activeIndex}
              tabIndex={index === activeIndex ? 0 : -1}
              className={index === activeIndex ? 'is-active' : ''}
              onClick={() => selectProject(index)}
              onKeyDown={(event) => handleProjectKeyDown(event, index)}
              key={feature.id}
            >
              <span className="studio-project-switcher__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="studio-project-switcher__title">
                {feature.title}
              </span>
              <span className="studio-project-switcher__status">
                {feature.status}
              </span>
            </button>
          ))}
        </div>

        <article
          className="studio-feature"
          role="tabpanel"
          id={`studio-panel-${activeFeature.id}`}
          aria-labelledby={`studio-tab-${activeFeature.id}`}
          aria-live="polite"
          key={activeFeature.id}
        >
          <div className="studio-feature__visuals">
            <div className="studio-feature__primary">
              {activeFeature.primaryHref ? (
                <a
                  className="studio-feature__image-link"
                  href={activeFeature.primaryHref}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={activeFeature.links[0]?.label ?? activeFeature.title}
                >
                  {projectMedia}
                  <span className="studio-feature__image-action">
                    <span>{activeFeature.links[0]?.label}</span>
                    <ArrowUpRight />
                  </span>
                </a>
              ) : (
                projectMedia
              )}
            </div>
            <span className="studio-feature__visual-label">
              FI / {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="studio-feature__visual-count" aria-hidden="true">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
          </div>

          <div className="studio-feature__content">
            <div className="studio-feature__meta">
              <span>{copy.featuredProject}</span>
              <span>{activeFeature.status}</span>
            </div>
            <div className="studio-feature__heading">
              <p className="studio-feature__format">{activeFeature.format}</p>
              <h3>{activeFeature.title}</h3>
            </div>
            <p className="studio-feature__summary">{activeFeature.summary}</p>
          </div>
        </article>
      </div>
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
