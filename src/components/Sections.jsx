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

export function EchoesSection({ feature }) {
  return (
    <section
      className="echoes-section section-shell"
      id="echoes"
      aria-labelledby="echoes-title"
    >
      <div className="echoes-section__intro">
        <header data-reveal>
          <p className="eyebrow">
            <span />
            {feature.format}
          </p>
          <h2 id="echoes-title">{feature.title}</h2>
        </header>
        <p data-reveal>{feature.summary}</p>
      </div>

      <a
        className="echoes-feature"
        href={feature.primaryHref}
        target="_blank"
        rel="noreferrer"
        aria-label={feature.links[0]?.label ?? feature.title}
        data-reveal
      >
        <MediaFrame
          image={feature.primaryImage}
          accent="#e82bb7"
          fit="cover"
        />
        <span
          className="image-light-sweep"
          data-scroll-light
          aria-hidden="true"
        />
        <span className="echoes-feature__label">{feature.status}</span>
        <span className="echoes-feature__action">
          <span>{feature.links[0]?.label}</span>
          <ArrowUpRight />
        </span>
      </a>
    </section>
  )
}

export function StudioSection({ copy, feature }) {
  const imageSource = resolvePublicAsset(feature.primaryImage.src)
  const logoSource = resolvePublicAsset(feature.logo.src)

  return (
    <section
      className="studio-section section-shell"
      id="studio"
      aria-labelledby="studio-title"
    >
      <header className="studio-masthead">
        <div className="studio-masthead__identity" data-reveal>
          <div className="studio-masthead__logo">
            {logoSource ? (
              <img src={logoSource} alt={feature.logo.alt} />
            ) : (
              <span>FI</span>
            )}
          </div>
          <div>
            <p>{copy.eyebrow}</p>
            <h2 id="studio-title">{copy.title}</h2>
          </div>
        </div>

        <div className="studio-masthead__statement" data-reveal>
          <span aria-hidden="true" />
          <p data-reveal>{copy.description}</p>
        </div>

        <span className="studio-masthead__index" aria-hidden="true">
          FI — 01
        </span>
      </header>

      <article className="studio-project" data-reveal>
        <div className="studio-project__art">
          <img
            src={imageSource}
            alt={feature.primaryImage.alt}
            loading="lazy"
            decoding="async"
          />
          <span
            className="image-light-sweep"
            data-scroll-light
            aria-hidden="true"
          />
          <span className="studio-project__shade" aria-hidden="true" />

          <div className="studio-project__topline">
            <span>{copy.featuredProject}</span>
            <span className="studio-project__status">
              <i aria-hidden="true" />
              {copy.productionStatus}
            </span>
          </div>

          <div className="studio-project__content">
            <p className="studio-project__presenter">
              {copy.title} / {feature.format}
            </p>
            <h3>{feature.title}</h3>

            <div className="studio-project__details">
              <p>{feature.summary}</p>
              <dl>
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
          </div>

          <div className="studio-project__coordinates" aria-hidden="true">
            <span>FI.P01</span>
            <span>45°30&apos;N / 73°34&apos;W</span>
          </div>

          <span className="studio-project__corner studio-project__corner--top" aria-hidden="true" />
          <span className="studio-project__corner studio-project__corner--bottom" aria-hidden="true" />
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
