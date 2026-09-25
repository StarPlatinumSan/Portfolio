import MediaFrame from './MediaFrame'
import { ArrowUpRight } from './Icons'

export function ProjectAction({ project, copy }) {
  if (!project.href) {
    return (
      <span className="project-action project-action--disabled" aria-disabled="true">
        {copy.comingSoon}
      </span>
    )
  }

  return (
    <a
      className="project-action"
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${copy.viewProject} — ${project.title}. ${copy.opensInNewTab}`}
    >
      <span>{copy.viewProject}</span>
      <ArrowUpRight />
    </a>
  )
}

export function TechnologyList({ technologies, label }) {
  return (
    <ul className="technology-list" aria-label={label}>
      {technologies.map((technology) => (
        <li key={technology}>{technology}</li>
      ))}
    </ul>
  )
}

function ProjectMeta({ project, copy }) {
  return (
    <dl className="project-section-meta" data-reveal>
      <div>
        <dt>{copy.categoryLabel}</dt>
        <dd>{project.category}</dd>
      </div>
      <div>
        <dt>{copy.roleLabel}</dt>
        <dd>{project.role}</dd>
      </div>
      <div>
        <dt>{project.yearLabel ?? copy.yearLabel}</dt>
        <dd>{project.year}</dd>
      </div>
    </dl>
  )
}

export default function ProjectSection({
  project,
  copy,
  layout = 'visual-right',
  workInProgress = false,
}) {
  const secondaryImages = project.images
    .slice(1)
    .filter(
      (image, index, images) =>
        image.src !== project.images[0].src &&
        images.findIndex((candidate) => candidate.src === image.src) === index,
    )

  return (
    <section
      className={`page-section project-section project-section--${layout} ${
        workInProgress ? 'project-section--wip' : ''
      }`}
      id={project.id}
      style={{ '--project-accent': project.accent }}
      aria-labelledby={`${project.id}-title`}
    >

      <div className="project-section-inner section-shell">
        <div className="project-section-copy">
          <p className="eyebrow" data-reveal>
            <span />
            {workInProgress ? copy.workInProgress : project.category}
          </p>
          <h2 id={`${project.id}-title`} tabIndex="-1" data-reveal>
            {project.shortTitle ?? project.title}
          </h2>
          <p className="project-section-description" data-reveal>
            {project.description}
          </p>
          <TechnologyList
            technologies={project.technologies}
            label={copy.technologiesLabel}
          />
          <div data-reveal>
            <ProjectAction project={project} copy={copy} />
          </div>
        </div>

        <div className="project-section-visual" data-reveal-media>
          <div
            className="project-section-main"
            style={{ '--media-ratio': project.images[0].aspectRatio }}
          >
            <MediaFrame
              image={project.images[0]}
              accent={project.accent}
              fit="contain"
            />
          </div>

          {secondaryImages.map((image, index) => (
            <div
              className={`project-section-detail project-section-detail--${
                index + 1
              }`}
              key={image.src}
              style={{ '--media-ratio': image.aspectRatio }}
            >
              <MediaFrame image={image} accent={project.accent} fit="contain" />
            </div>
          ))}

          {workInProgress && (
            <span className="wip-badge">{copy.workInProgress}</span>
          )}
        </div>

        <ProjectMeta project={project} copy={copy} />
      </div>
    </section>
  )
}
