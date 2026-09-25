import { useEffect, useRef, useState } from 'react'
import MediaFrame from './MediaFrame'
import { ArrowUpRight } from './Icons'
import { ProjectAction, TechnologyList } from './ProjectSection'
import { resolvePublicAsset } from '../data/assets'
import './Echoes.css'

function SectionHeading({ eyebrow, title, id, introduction }) {
  return (
    <header className="section-heading">
      <p className="eyebrow" data-reveal>
        <span />
        {eyebrow}
      </p>
      <h2 id={id} tabIndex="-1" data-reveal>
        {title}
      </h2>
      {introduction && <p data-reveal>{introduction}</p>}
    </header>
  )
}

export function EchoesSection({ feature }) {
  const previewRef = useRef(null)
  const closeOnBackdrop = (event) => {
    if (event.target !== event.currentTarget) return
    const bounds = event.currentTarget.getBoundingClientRect()
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      previewRef.current.close()
    }
  }

  return (
    <section
      className="page-section echoes-section"
      id="echoes"
      aria-labelledby="echoes-title"
    >
      <div className="echoes-layout section-shell">
        <header className="echoes-intro">
          <p className="eyebrow" data-reveal>
            {feature.format}
          </p>
          <h2 id="echoes-title" tabIndex="-1" data-reveal>
            {feature.title}
          </h2>
          <p className="echoes-tagline" data-reveal>{feature.presentation.tagline}</p>
          <p className="echoes-summary" data-reveal>{feature.summary}</p>
          <div className="echoes-entry" data-reveal>
            <a className="echoes-entry-link" href={feature.primaryHref} target="_blank" rel="noopener noreferrer"
              aria-describedby="echoes-link-note">
              {feature.linksTitle}
              <ArrowUpRight />
            </a>
            <p id="echoes-link-note">{feature.presentation.newTab}</p>
          </div>
        </header>

        <figure className="echoes-atlas" data-reveal-media>
          <div className="echoes-atlas-heading">
            <span>{feature.presentation.atlas}</span>
            <span>{feature.status}</span>
          </div>
          <div className="echoes-map">
            <a className="echoes-map-link" href={feature.primaryHref} target="_blank" rel="noopener noreferrer"
              aria-label={`${feature.presentation.exploreMap}. ${feature.presentation.newTab}`}>
              <img src={resolvePublicAsset(feature.primaryImage.src)} alt={feature.primaryImage.alt}
                width="861" height="645" loading="lazy" decoding="async" />
            </a>
            <button className="echoes-expand" type="button" onClick={() => previewRef.current.showModal()}
              aria-haspopup="dialog" aria-controls="echoes-preview">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" />
              </svg>
              {feature.presentation.expand}
            </button>
          </div>
          <figcaption className="echoes-atlas-caption">
            <span>{feature.presentation.preview}</span>
            <a href={feature.primaryHref} target="_blank" rel="noopener noreferrer"
              aria-describedby="echoes-link-note">
              {feature.presentation.exploreMap}<ArrowUpRight />
            </a>
          </figcaption>
        </figure>

        <div className="echoes-transmedia" data-reveal>
          <div>
            <h3>{feature.presentation.transmediaTitle}</h3>
            <p>{feature.transmedia}</p>
          </div>
          <ul aria-label={feature.presentation.transmediaTitle}>
            {feature.presentation.mediums.map((medium) => <li key={medium}>{medium}</li>)}
          </ul>
        </div>
      </div>

      <dialog ref={previewRef} className="echoes-dialog" id="echoes-preview"
        aria-labelledby="echoes-preview-title" onClick={closeOnBackdrop}>
        <div className="echoes-dialog-heading">
          <h3 id="echoes-preview-title">{feature.presentation.atlas}</h3>
          <button type="button" onClick={() => previewRef.current.close()} aria-label={feature.presentation.close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
        <img className="echoes-dialog-map" src={resolvePublicAsset(feature.primaryImage.src)} alt={feature.primaryImage.alt}
          width="861" height="645" loading="lazy" decoding="async" />
        <div className="echoes-atlas-caption">
          <span>{feature.presentation.preview}</span>
          <a href={feature.primaryHref} target="_blank" rel="noopener noreferrer"
            aria-label={`${feature.presentation.exploreMap}. ${feature.presentation.newTab}`}>
            {feature.presentation.exploreMap}<ArrowUpRight />
          </a>
        </div>
      </dialog>
    </section>
  )
}

export function StudioSection({ copy, feature }) {
  const logoSource = resolvePublicAsset(feature.logo.src)

  return (
    <section
      className="page-section studio-section"
      id="studio"
      aria-labelledby="studio-title"
    >
      <div className="studio-overview section-shell">
        <div className="studio-overview-mark" data-reveal-media>
          {logoSource ? (
            <img src={logoSource} alt={feature.logo.alt} loading="lazy" />
          ) : (
            <span>FI</span>
          )}
        </div>

        <div className="studio-overview-copy">
          <p className="eyebrow" data-reveal>
            <span />
            {copy.eyebrow}
          </p>
          <h2 id="studio-title" tabIndex="-1" data-reveal>
            {copy.title}
          </h2>
          <p data-reveal>{copy.description}</p>
          <a
            className="section-button"
            href="#the-lucid"
            aria-label={`${copy.discoverProject}: ${feature.title}`}
            data-reveal
          >
            <span>{copy.discoverProject}</span>
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </div>
    </section>
  )
}

export function LucidSection({ copy, feature, project }) {
  return (
    <section
      className="page-section lucid-section"
      id="the-lucid"
      aria-labelledby="the-lucid-title"
      style={{ '--project-accent': project.accent }}
    >

      <div className="lucid-section-inner section-shell">
        <div className="lucid-section-copy">
          <p className="eyebrow" data-reveal>
            <span />
            {copy.featuredProject}
          </p>
          <h2 id="the-lucid-title" tabIndex="-1" data-reveal>
            {feature.title}
          </h2>
          <p className="lucid-section-description" data-reveal>
            {feature.summary}
          </p>
          <TechnologyList
            technologies={project.technologies}
            label={copy.technologiesLabel}
          />

          <dl className="lucid-section-meta" data-reveal>
            <div>
              <dt>{copy.studioLabel}</dt>
              <dd>{copy.title}</dd>
            </div>
            <div>
              <dt>{copy.formatLabel}</dt>
              <dd>{feature.format}</dd>
            </div>
            <div>
              <dt>{copy.releaseLabel}</dt>
              <dd>{feature.status}</dd>
            </div>
          </dl>
        </div>

        <div className="lucid-section-visual" data-reveal-media>
          <MediaFrame
            image={feature.primaryImage}
            className="lucid-section-art"
            accent={project.accent}
            fit="contain"
          />
          <span className="lucid-section-status">{feature.status}</span>
        </div>
      </div>
    </section>
  )
}

export function ShortFilmSection({ copy }) {
  const temporaryImage = resolvePublicAsset('/mtl.png')

  return (
    <section
      className="page-section short-film-section"
      id="short-film"
      aria-labelledby="short-film-title"
    >
      <div className="short-film-section-frame section-shell" data-reveal-media>
        <div className="short-film-section-copy">
          <p className="eyebrow" data-reveal>
            <span />
            {copy.eyebrow}
          </p>
          <h2 id="short-film-title" tabIndex="-1" data-reveal>
            {copy.title}
          </h2>
          <strong data-reveal>{copy.status}</strong>
          <p data-reveal>{copy.description}</p>
        </div>
        <div className="short-film-section-screen">
          <img
            src={temporaryImage}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  )
}

export function ExperienceSection({ copy, items }) {
  return (
    <section
      className="flow-section experience-section"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="experience-section-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="experience-title"
          introduction={copy.introduction}
        />

        <div className="experience-path">
          {items.map((item, index) => (
            <article
              className={`experience-card ${
                index < 2 ? 'experience-card--featured' : ''
              }`}
              key={item.role}
              data-reveal
            >
              <div className="experience-card-number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>
              <p>{item.place}</p>
              <h3>{item.role}</h3>
              <p>{item.summary}</p>
              <span>{item.period}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CollectionCard({ project, copy }) {
  return (
    <article
      className="collection-card"
      style={{ '--project-accent': project.accent }}
    >
      <MediaFrame image={project.images[0]} accent={project.accent} fit="contain" />
      <div className="collection-card-body">
        <div className="collection-card-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <TechnologyList
          technologies={project.technologies}
          label={copy.technologiesLabel}
        />
        <ProjectAction project={project} copy={copy} />
      </div>
    </article>
  )
}

export function ProjectCollection({ groups = [], copy }) {
  const carouselRef = useRef(null)
  const carouselIndexRef = useRef(0)
  const carouselSyncTimerRef = useRef(null)
  const validGroups = groups.filter(Boolean)
  const projects = validGroups.flatMap((group) => group.projects)
  const sectionId = validGroups.at(-1)?.id ?? 'other-projects'
  const title = validGroups.at(-1)?.title ?? copy.title
  const description = validGroups
    .map((group) => group.description)
    .join(' ')

  const getCarouselMetrics = () => {
    const viewport = carouselRef.current
    const firstSlide = viewport?.querySelector('.collection-carousel-slide')
    if (!viewport || !firstSlide) return null

    const track = firstSlide.parentElement
    const trackStyles = window.getComputedStyle(track)
    const gap = Number.parseFloat(trackStyles.columnGap || trackStyles.gap) || 0
    const step = firstSlide.getBoundingClientRect().width + gap
    const maximumScroll = Math.max(
      0,
      viewport.scrollWidth - viewport.clientWidth,
    )
    const maximumIndex =
      step > 0 ? Math.max(0, Math.round(maximumScroll / step)) : 0

    return { viewport, step, maximumScroll, maximumIndex }
  }

  const moveCarousel = (direction) => {
    const metrics = getCarouselMetrics()
    if (!metrics) return

    const { viewport, step, maximumScroll, maximumIndex } = metrics
    const currentIndex = Math.min(
      maximumIndex,
      Math.max(0, carouselIndexRef.current),
    )
    const nextIndex =
      (currentIndex + direction + maximumIndex + 1) % (maximumIndex + 1)
    const wrapped =
      (direction > 0 && nextIndex === 0) ||
      (direction < 0 && nextIndex === maximumIndex)
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    carouselIndexRef.current = nextIndex

    viewport.scrollTo({
      left:
        nextIndex === maximumIndex
          ? maximumScroll
          : Math.min(nextIndex * step, maximumScroll),
      behavior: wrapped || reducedMotion ? 'instant' : 'smooth',
    })
  }

  const syncCarouselIndex = () => {
    window.clearTimeout(carouselSyncTimerRef.current)
    carouselSyncTimerRef.current = window.setTimeout(() => {
      const metrics = getCarouselMetrics()
      if (!metrics || metrics.step <= 0) return

      carouselIndexRef.current = Math.min(
        metrics.maximumIndex,
        Math.max(
          0,
          Math.round(metrics.viewport.scrollLeft / metrics.step),
        ),
      )
      carouselSyncTimerRef.current = null
    }, 140)
  }

  useEffect(
    () => () => window.clearTimeout(carouselSyncTimerRef.current),
    [],
  )

  if (!projects.length) return null

  return (
    <section
      className="flow-section collection-section collection-section--carousel"
      id={sectionId}
      aria-labelledby={`${sectionId}-title`}
    >
      <div className="collection-section-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={title}
          id={`${sectionId}-title`}
          introduction={description}
        />

        <div className="collection-carousel-shell" data-reveal-media>
          <div className="collection-carousel-controls">
            <button
              type="button"
              aria-label={copy.previousProject}
              aria-controls="project-carousel-viewport"
              onClick={() => moveCarousel(-1)}
            >
              <span className="collection-carousel-arrow" aria-hidden="true">
                &lt;
              </span>
            </button>
            <button
              type="button"
              aria-label={copy.nextProject}
              aria-controls="project-carousel-viewport"
              onClick={() => moveCarousel(1)}
            >
              <span className="collection-carousel-arrow" aria-hidden="true">
                &gt;
              </span>
            </button>
          </div>

          <div
            className="collection-carousel-viewport"
            id="project-carousel-viewport"
            ref={carouselRef}
            role="region"
            aria-labelledby={`${sectionId}-title`}
            onScroll={syncCarouselIndex}
          >
            <ul className="collection-carousel-track">
              {projects.map((project) => (
                <li className="collection-carousel-slide" key={project.id}>
                  <CollectionCard project={project} copy={copy} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SkillsSection({ copy, webTools, gameTools }) {
  const [activeTools, setActiveTools] = useState('web')
  const disciplines = [
    { id: 'game', label: copy.gameLabel, tools: gameTools },
    { id: 'web', label: copy.webLabel, tools: webTools },
  ]

  const handleTabKeyDown = (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const nextTools =
      event.key === 'Home'
        ? 'game'
        : event.key === 'End'
          ? 'web'
          : activeTools === 'game'
            ? 'web'
            : 'game'

    setActiveTools(nextTools)
    window.requestAnimationFrame(() => {
      document.getElementById(`${nextTools}-tools-tab`)?.focus()
    })
  }

  return (
    <section
      className="flow-section skills-section"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="skills-section-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="skills-title"
          introduction={copy.introduction}
        />

        <div className="skills-console" data-reveal-media>
          <div
            className="tool-tabs"
            role="tablist"
            aria-orientation="horizontal"
            aria-label={copy.title}
            onKeyDown={handleTabKeyDown}
          >
            <span
              className={`tool-tabs-indicator ${
                activeTools === 'web' ? 'is-web' : ''
              }`}
              aria-hidden="true"
            />
            {disciplines.map((discipline) => (
              <button
                id={`${discipline.id}-tools-tab`}
                key={discipline.id}
                type="button"
                role="tab"
                aria-selected={activeTools === discipline.id}
                aria-controls={`${discipline.id}-tools-panel`}
                tabIndex={activeTools === discipline.id ? 0 : -1}
                className={activeTools === discipline.id ? 'is-active' : ''}
                onClick={() => setActiveTools(discipline.id)}
              >
                <span className="tool-tab-label">{discipline.label}</span>
              </button>
            ))}
          </div>

          {disciplines.map((discipline) => (
            <div
              className="tool-panel"
              id={`${discipline.id}-tools-panel`}
              key={discipline.id}
              role="tabpanel"
              tabIndex={activeTools === discipline.id ? 0 : -1}
              aria-labelledby={`${discipline.id}-tools-tab`}
              hidden={activeTools !== discipline.id}
            >
              <ul className="tool-cloud">
                {discipline.tools.map((tool) => (
                  <li key={tool}>
                    <strong>{tool}</strong>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EducationSection({ copy, items }) {
  return (
    <section
      className="flow-section education-section"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="education-section-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="education-title"
          introduction={copy.introduction}
        />

        <div className="education-path">
          {items.map((item, index) => (
            <article className="education-card" key={item.degree} data-reveal>
              <span>{item.period}</span>
              <strong aria-hidden="true">0{index + 1}</strong>
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

export function CoursesSection({ copy, items }) {
  return (
    <section
      className="flow-section courses-section"
      id="relevant-courses"
      aria-labelledby="relevant-courses-title"
    >
      <div className="courses-section-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="relevant-courses-title"
          introduction={copy.introduction}
        />

        <ul className="courses-grid">
          {items.map((item) => (
            <li key={item.code} data-reveal>
              <article className="course-card">
                <div className="course-card-heading">
                  <span>{item.code}</span>
                  <small>{item.institution}</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function ContactSection({ copy, footerCopy }) {
  return (
    <section
      className="flow-section contact-section"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-section-inner section-shell">
        <div className="contact-section-copy">
          <p className="eyebrow" data-reveal>
            <span />
            {copy.eyebrow}
          </p>
          <h2 id="contact-title" tabIndex="-1" data-reveal>
            {copy.title}
            <em>{copy.subtitle}</em>
          </h2>
        </div>

        <div className="contact-links" data-reveal-media>
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

      <footer className="site-footer section-shell">
        <p>{footerCopy}</p>
        <p>Montréal, QC</p>
        <a href="#top">{copy.backToTop}</a>
        <span>2026</span>
      </footer>
    </section>
  )
}
