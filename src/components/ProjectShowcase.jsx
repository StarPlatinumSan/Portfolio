import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MediaFrame from './MediaFrame'
import { ArrowDown, ArrowUpRight } from './Icons'

gsap.registerPlugin(ScrollTrigger)

function ProjectMeta({ project }) {
  return (
    <dl className="project-meta">
      <div>
        <dt>Category</dt>
        <dd>{project.category}</dd>
      </div>
      <div>
        <dt>Role</dt>
        <dd>{project.role}</dd>
      </div>
      <div>
        <dt>Year</dt>
        <dd>{project.year}</dd>
      </div>
    </dl>
  )
}

function ProjectLink({ project, label, unavailableLabel, tabIndex }) {
  if (!project.href) {
    return (
      <span
        className="project-link project-link--disabled"
        aria-disabled="true"
      >
        <span>{unavailableLabel}</span>
      </span>
    )
  }

  return (
    <a
      className="project-link"
      href={project.href}
      target="_blank"
      rel="noreferrer"
      tabIndex={tabIndex}
    >
      <span>{label}</span>
      <ArrowUpRight className="project-link__icon" />
    </a>
  )
}

function DesktopScene({
  project,
  index,
  active,
  linkLabel,
  unavailableLabel,
}) {
  return (
    <article
      className={`project-scene ${project.images[0].aspectRatio === '1 / 1' ? 'project-scene--square' : ''} ${active ? 'is-active' : ''}`}
      style={{ '--project-accent': project.accent }}
      aria-hidden={!active}
    >
      <div className="project-scene__wash" aria-hidden="true" />
      <p className="project-scene__word" aria-hidden="true">
        {project.decorative}
      </p>

      <div
        className="project-scene__media project-scene__media--left"
        style={{ '--media-ratio': project.images[1].aspectRatio }}
      >
        <MediaFrame
          image={project.images[1]}
          accent={project.accent}
          fit="contain"
        />
      </div>
      <div
        className="project-scene__media project-scene__media--main"
        style={{ '--media-ratio': project.images[0].aspectRatio }}
      >
        <MediaFrame
          image={project.images[0]}
          accent={project.accent}
          eager={index === 0}
          fit="contain"
        />
      </div>
      <div
        className="project-scene__media project-scene__media--right"
        style={{ '--media-ratio': project.images[2].aspectRatio }}
      >
        <MediaFrame
          image={project.images[2]}
          accent={project.accent}
          fit="contain"
        />
      </div>

      <div className="project-scene__copy">
        <p className="project-scene__category">{project.category}</p>
        <div className="project-scene__title-mask">
          <h3 className="project-scene__title-inner">
            {project.shortTitle ?? project.title}
          </h3>
        </div>
        <p className="project-scene__description">{project.description}</p>
        <ProjectLink
          project={project}
          label={linkLabel}
          unavailableLabel={unavailableLabel}
          tabIndex={active ? 0 : -1}
        />
      </div>

      <div className="project-scene__meta">
        <ProjectMeta project={project} />
      </div>
    </article>
  )
}

function MobileProject({ project, index, total, copy }) {
  return (
    <article
      className="mobile-project"
      style={{ '--project-accent': project.accent }}
      data-reveal
    >
      <div className="mobile-project__topline">
        <span>
          {String(index + 1).padStart(2, '0')} /{' '}
          {String(total).padStart(2, '0')}
        </span>
        <span>{project.year}</span>
      </div>
      <MediaFrame
        image={project.images[0]}
        accent={project.accent}
        fit="contain"
      />
      <div className="mobile-project__body">
        <p className="mobile-project__category">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <ul aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <ProjectLink
          project={project}
          label={copy.viewProject}
          unavailableLabel={copy.comingSoon}
        />
      </div>
    </article>
  )
}

function CollectionProject({ project, copy }) {
  return (
    <article
      className="collection-project"
      style={{ '--project-accent': project.accent }}
      data-reveal
    >
      <MediaFrame
        image={project.images[0]}
        accent={project.accent}
        fit="contain"
      />
      <div className="collection-project__body">
        <div className="collection-project__meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <ul aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <ProjectLink
          project={project}
          label={copy.viewProject}
          unavailableLabel={copy.comingSoon}
        />
      </div>
    </article>
  )
}

function ProjectCollection({ group, copy, index }) {
  return (
    <section
      className={`project-collection project-collection--${group.id}`}
      aria-labelledby={`project-group-${group.id}`}
    >
      <header className="project-collection__header" data-reveal>
        <span>0{index + 1}</span>
        <div>
          <h3 id={`project-group-${group.id}`}>{group.title}</h3>
          <p>{group.description}</p>
        </div>
      </header>
      <div className="project-collection__grid">
        {group.projects.map((project) => (
          <CollectionProject key={project.id} project={project} copy={copy} />
        ))}
      </div>
    </section>
  )
}

export function ProjectCollections({ groups, copy }) {
  return (
    <div className="project-collections section-shell" id="project-collections">
      {groups.map((group, index) => (
        <ProjectCollection
          key={group.id}
          group={group}
          copy={copy}
          index={index}
        />
      ))}
    </div>
  )
}

export default function ProjectShowcase({ projects, copy }) {
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const [activeProject, setActiveProject] = useState(0)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const stage = stageRef.current
    if (!section || !stage) return undefined

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add(
        {
          desktop: '(min-width: 1025px)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        ({ conditions }) => {
          if (!conditions.desktop || !conditions.motion) return undefined

          const scenes = gsap.utils.toArray('.project-scene', stage)
          const progressFill = stage.querySelector('.project-progress__fill')
          const setProgress = gsap.quickSetter(progressFill, 'scaleX')
          const segment = 1.75
          let currentIndex = 0

          gsap.set(scenes, { autoAlpha: 0 })
          gsap.set(scenes[0], { autoAlpha: 1 })

          const timeline = gsap.timeline({
            defaults: { ease: 'power3.out' },
          })

          scenes.forEach((scene, index) => {
            const position = index * segment
            const mainMedia = scene.querySelector(
              '.project-scene__media--main',
            )
            const mainInner = mainMedia.querySelector(
              'img, .media-placeholder',
            )

            timeline.addLabel(`project-${index}`, position)
            timeline.set(
              scene,
              { autoAlpha: 1, zIndex: index + 2 },
              position,
            )
            timeline.fromTo(
              scene.querySelector('.project-scene__word'),
              { xPercent: -8, yPercent: 7, opacity: 0 },
              { xPercent: 0, yPercent: 0, opacity: 0.15, duration: 0.62 },
              position,
            )
            timeline.fromTo(
              mainMedia,
              { yPercent: 115, rotate: 2.8, clipPath: 'inset(100% 0 0 0)' },
              {
                yPercent: 0,
                rotate: 0,
                clipPath: 'inset(0% 0 0 0)',
                duration: 0.72,
              },
              position + 0.06,
            )
            timeline.fromTo(
              mainInner,
              { scale: 1.16, yPercent: -8 },
              { scale: 1, yPercent: 0, duration: 0.9 },
              position + 0.06,
            )
            timeline.fromTo(
              scene.querySelector('.project-scene__media--left'),
              { xPercent: -115, yPercent: 28, rotate: -10, opacity: 0 },
              {
                xPercent: 0,
                yPercent: 0,
                rotate: -3.5,
                opacity: 1,
                duration: 0.82,
              },
              position + 0.16,
            )
            timeline.fromTo(
              scene.querySelector('.project-scene__media--right'),
              { xPercent: 130, yPercent: -45, rotate: 9, opacity: 0 },
              {
                xPercent: 0,
                yPercent: 0,
                rotate: 3.5,
                opacity: 1,
                duration: 0.78,
              },
              position + 0.22,
            )
            timeline.fromTo(
              scene.querySelector('.project-scene__title-inner'),
              { yPercent: 115, rotate: 1.5 },
              { yPercent: 0, rotate: 0, duration: 0.66 },
              position + 0.3,
            )
            timeline.fromTo(
              [
                scene.querySelector('.project-scene__category'),
                scene.querySelector('.project-scene__description'),
                scene.querySelector('.project-link'),
                scene.querySelector('.project-scene__meta'),
              ],
              { y: 24, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.55, stagger: 0.06 },
              position + 0.38,
            )

            if (index < scenes.length - 1) {
              timeline.to(
                scene.querySelector('.project-scene__media--left'),
                {
                  xPercent: -75,
                  yPercent: -28,
                  rotate: -7,
                  opacity: 0,
                  duration: 0.58,
                  ease: 'power2.in',
                },
                position + 1.22,
              )
              timeline.to(
                mainMedia,
                {
                  yPercent: -62,
                  rotate: -2,
                  opacity: 0,
                  duration: 0.58,
                  ease: 'power2.in',
                },
                position + 1.27,
              )
              timeline.to(
                scene.querySelector('.project-scene__media--right'),
                {
                  xPercent: 82,
                  yPercent: 48,
                  rotate: 8,
                  opacity: 0,
                  duration: 0.54,
                  ease: 'power2.in',
                },
                position + 1.18,
              )
              timeline.to(
                [
                  scene.querySelector('.project-scene__copy'),
                  scene.querySelector('.project-scene__meta'),
                  scene.querySelector('.project-scene__word'),
                ],
                {
                  y: -28,
                  opacity: 0,
                  duration: 0.42,
                  stagger: 0.03,
                  ease: 'power2.in',
                },
                position + 1.3,
              )
              timeline.set(scene, { autoAlpha: 0 }, position + 1.72)
            }
          })

          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => `+=${window.innerHeight * projects.length * 0.72}`,
            animation: timeline,
            pin: true,
            pinSpacing: true,
            scrub: 0.82,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              setProgress(self.progress)
              const timelinePosition = self.progress * timeline.duration()
              const nextIndex = Math.min(
                projects.length - 1,
                Math.floor((timelinePosition + 0.08) / segment),
              )

              if (nextIndex !== currentIndex) {
                currentIndex = nextIndex
                setActiveProject(nextIndex)
              }
            },
          })

          return () => {
            trigger.kill()
            timeline.kill()
          }
        },
      )
    }, section)

    return () => {
      media.revert()
      context.revert()
    }
  }, [projects])

  return (
    <section className="project-showcase" id="work" ref={sectionRef}>
      <header className="showcase-intro section-shell" data-reveal>
        <div>
          <p className="eyebrow">
            <span />
            {copy.eyebrow}
          </p>
          <h2>{copy.title}</h2>
        </div>
        <div className="showcase-intro__copy">
          <p>{copy.introduction}</p>
          <span>
            {copy.scrollCue}
            <ArrowDown />
          </span>
        </div>
      </header>

      <div className="project-stage" ref={stageRef}>
        <div className="project-stage__grid" aria-hidden="true" />
        {projects.map((project, index) => (
          <DesktopScene
            key={project.id}
            project={project}
            index={index}
            active={activeProject === index}
            linkLabel={copy.viewProject}
            unavailableLabel={copy.comingSoon}
          />
        ))}

        <div className="project-stage__hud">
          <div className="project-counter" aria-live="polite">
            <span>{String(activeProject + 1).padStart(2, '0')}</span>
            <i />
            <span>{String(projects.length).padStart(2, '0')}</span>
          </div>
          <div className="project-progress" aria-hidden="true">
            <span className="project-progress__fill" />
          </div>
          <span className="project-stage__scroll-label">{copy.scrollCue}</span>
        </div>
      </div>

      <div className="mobile-project-list section-shell">
        {projects.map((project, index) => (
          <MobileProject
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            copy={copy}
          />
        ))}
      </div>
    </section>
  )
}
