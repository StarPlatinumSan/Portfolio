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
    <dl className="project-floor-meta" data-floor-animate>
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

export default function ProjectFloor({
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
      className={`floor project-floor project-floor--${layout} ${
        workInProgress ? 'project-floor--wip' : ''
      }`}
      id={project.id}
      data-floor-id={project.id}
      style={{ '--project-accent': project.accent }}
      aria-labelledby={`${project.id}-title`}
    >
      <div className="floor-grid" aria-hidden="true" />
      <span
        className="project-floor-backdrop"
        data-floor-after-media
        aria-hidden="true"
      />
      <span className="project-floor-word" aria-hidden="true">
        {project.decorative}
      </span>

      <div className="project-floor-inner section-shell">
        <div className="project-floor-copy">
          <p className="eyebrow" data-floor-animate>
            <span />
            {workInProgress ? copy.workInProgress : project.category}
          </p>
          <h2 id={`${project.id}-title`} tabIndex="-1" data-floor-animate>
            {project.shortTitle ?? project.title}
          </h2>
          <p className="project-floor-description" data-floor-animate>
            {project.description}
          </p>
          <TechnologyList
            technologies={project.technologies}
            label={copy.technologiesLabel}
          />
          <div data-floor-animate>
            <ProjectAction project={project} copy={copy} />
          </div>
        </div>

        <div className="project-floor-visual" data-floor-media>
          <div
            className="project-floor-main"
            style={{ '--media-ratio': project.images[0].aspectRatio }}
          >
            <MediaFrame
              image={project.images[0]}
              accent={project.accent}
              fit="contain"
            />
          </div>
          <span
            className="project-floor-glow"
            data-floor-after-media
            aria-hidden="true"
          />

          {secondaryImages.map((image, index) => (
            <div
              className={`project-floor-detail project-floor-detail--${
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
