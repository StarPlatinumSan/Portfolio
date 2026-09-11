import { useEffect, useRef, useState } from 'react'
import MediaFrame from './MediaFrame'
import { ArrowUpRight } from './Icons'
import { ProjectAction, TechnologyList } from './ProjectFloor'
import { resolvePublicAsset } from '../data/assets'

function SectionHeading({ eyebrow, title, id, introduction }) {
  return (
    <header className="floor-heading">
      <p className="eyebrow" data-floor-animate>
        <span />
        {eyebrow}
      </p>
      <h2 id={id} tabIndex="-1" data-floor-animate>
        {title}
      </h2>
      {introduction && <p data-floor-animate>{introduction}</p>}
    </header>
  )
}

export function EchoesSection({ feature }) {
  return (
    <section
      className="floor echoes-floor"
      id="echoes"
      data-floor-id="echoes"
      aria-labelledby="echoes-title"
    >
      <div className="floor-grid" aria-hidden="true" />
      <a
        className="echoes-world section-shell"
        href={feature.primaryHref}
        target="_blank"
        rel="noreferrer"
        aria-label={feature.links[0]?.label ?? feature.title}
        data-floor-media
      >
        <MediaFrame
          image={feature.primaryImage}
          accent="#e82bb7"
          fit="cover"
        />
        <span className="echoes-world-overlay" aria-hidden="true" />
        <span className="echoes-world-status" data-floor-animate>
          {feature.status}
        </span>

        <div className="echoes-world-copy">
          <p className="eyebrow" data-floor-animate>
            <span />
            {feature.format}
          </p>
          <h2 id="echoes-title" tabIndex="-1" data-floor-animate>
            {feature.title}
          </h2>
          <p data-floor-animate>{feature.summary}</p>
          <strong data-floor-animate>{feature.transmedia}</strong>
        </div>

        <span className="echoes-world-action" data-floor-animate>
          {feature.links[0]?.label}
          <ArrowUpRight />
        </span>
      </a>
    </section>
  )
}

export function StudioSection({ copy, feature }) {
  const logoSource = resolvePublicAsset(feature.logo.src)

  return (
    <section
      className="floor studio-floor"
      id="studio"
      data-floor-id="studio"
      aria-labelledby="studio-title"
    >
      <div className="floor-grid" aria-hidden="true" />
      <div className="studio-overview section-shell">
        <div className="studio-overview-mark" data-floor-media>
          {logoSource ? (
            <img src={logoSource} alt={feature.logo.alt} loading="lazy" />
          ) : (
            <span>FI</span>
          )}
        </div>

        <div className="studio-overview-copy">
          <p className="eyebrow" data-floor-animate>
            <span />
            {copy.eyebrow}
          </p>
          <h2 id="studio-title" tabIndex="-1" data-floor-animate>
            {copy.title}
          </h2>
          <p data-floor-animate>{copy.description}</p>
          <a
            className="level-button"
            href="#the-lucid"
            aria-label={`${copy.discoverProject}: ${feature.title}`}
            data-floor-animate
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
      className="floor lucid-floor"
      id="the-lucid"
      data-floor-id="the-lucid"
      aria-labelledby="the-lucid-title"
      style={{ '--project-accent': project.accent }}
    >
      <div className="floor-grid" aria-hidden="true" />
      <span className="lucid-floor-word" aria-hidden="true">
        Lucid
      </span>

      <div className="lucid-floor-inner section-shell">
        <div className="lucid-floor-copy">
          <p className="eyebrow" data-floor-animate>
            <span />
            {copy.featuredProject}
          </p>
          <h2 id="the-lucid-title" tabIndex="-1" data-floor-animate>
            {feature.title}
          </h2>
          <p className="lucid-floor-description" data-floor-animate>
            {feature.summary}
          </p>
          <TechnologyList
            technologies={project.technologies}
            label={copy.technologiesLabel}
          />

          <dl className="lucid-floor-meta" data-floor-animate>
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

        <div className="lucid-floor-visual" data-floor-media>
          <span className="lucid-floor-halo" aria-hidden="true" />
          <MediaFrame
            image={feature.primaryImage}
            className="lucid-floor-art"
            accent={project.accent}
            fit="contain"
          />
          <span className="lucid-floor-status">{feature.status}</span>
        </div>
      </div>
    </section>
  )
}

export function ShortFilmSection({ copy }) {
  const temporaryImage = resolvePublicAsset('/mtl.png')

  return (
    <section
      className="floor short-film-floor"
      id="short-film"
      data-floor-id="short-film"
      aria-labelledby="short-film-title"
    >
      <div className="short-film-floor-light" aria-hidden="true" />
      <div className="short-film-floor-frame section-shell" data-floor-media>
        <div className="short-film-floor-copy">
          <p className="eyebrow" data-floor-animate>
            <span />
            {copy.eyebrow}
          </p>
          <h2 id="short-film-title" tabIndex="-1" data-floor-animate>
            {copy.title}
          </h2>
          <strong data-floor-animate>{copy.status}</strong>
          <p data-floor-animate>{copy.description}</p>
        </div>
        <div className="short-film-floor-screen">
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
      className="flow-section experience-floor"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="floor-grid" aria-hidden="true" />
      <div className="experience-floor-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="experience-title"
          introduction={copy.introduction}
        />

        <div className="experience-path">
          <span className="experience-path-line" aria-hidden="true" />
          {items.map((item, index) => (
            <article
              className={`experience-card ${
                index < 2 ? 'experience-card--featured' : ''
              }`}
              key={item.role}
              data-floor-animate
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

export function CollectionFloor({ groups = [], copy }) {
  const carouselRef = useRef(null)
  const carouselIndexRef = useRef(0)
  const carouselSyncTimerRef = useRef(null)
  const validGroups = groups.filter(Boolean)
  const projects = validGroups.flatMap((group) => group.projects)
  const floorId = validGroups.at(-1)?.id ?? 'other-projects'
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
      className="flow-section collection-floor collection-floor--carousel"
      id={floorId}
      aria-labelledby={`${floorId}-title`}
    >
      <div className="floor-grid" aria-hidden="true" />
      <div className="collection-floor-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={title}
          id={`${floorId}-title`}
          introduction={description}
        />

        <div className="collection-carousel-shell" data-floor-media>
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
            aria-labelledby={`${floorId}-title`}
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
      className="flow-section skills-floor"
      id="skills"
      aria-labelledby="skills-title"
    >
      <div className="floor-grid" aria-hidden="true" />
      <div className="skills-floor-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="skills-title"
          introduction={copy.introduction}
        />

        <div className="skills-console" data-floor-media>
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
      className="flow-section education-floor"
      id="education"
      aria-labelledby="education-title"
    >
      <div className="floor-grid" aria-hidden="true" />
      <div className="education-floor-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="education-title"
          introduction={copy.introduction}
        />

        <div className="education-path">
          <span className="education-path-line" aria-hidden="true" />
          {items.map((item, index) => (
            <article className="education-card" key={item.degree} data-floor-animate>
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
      className="flow-section courses-floor"
      id="relevant-courses"
      aria-labelledby="relevant-courses-title"
    >
      <div className="floor-grid" aria-hidden="true" />
      <div className="courses-floor-inner section-shell">
        <SectionHeading
          eyebrow={copy.eyebrow}
          title={copy.title}
          id="relevant-courses-title"
          introduction={copy.introduction}
        />

        <ul className="courses-grid">
          {items.map((item) => (
            <li key={item.code} data-floor-animate>
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
      className="flow-section contact-floor"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="floor-grid contact-floor-grid" aria-hidden="true" />
      <div className="contact-floor-inner section-shell">
        <div className="contact-floor-copy">
          <p className="eyebrow" data-floor-animate>
            <span />
            {copy.eyebrow}
          </p>
          <h2 id="contact-title" tabIndex="-1" data-floor-animate>
            {copy.title}
            <em>{copy.subtitle}</em>
          </h2>
        </div>

        <div className="contact-links" data-floor-media>
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
