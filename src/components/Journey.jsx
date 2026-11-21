import { ArrowUpRight } from './Icons'

export function JourneyTransitions() {
  return (
    <div className="scene-transition" aria-hidden="true">
      <span className="scene-transition-rule" />
      <span className="scene-transition-marker" />
    </div>
  )
}
export function JourneyChoice({ copy, paths }) {
  return (
    <section className="journey-choice" id="choose" aria-labelledby="choice-title" data-scroll-align="viewport">
      <div className="choice-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="journey-choice-inner section-shell">
      <header className="choice-heading">
        <p className="eyebrow" data-reveal>{copy.eyebrow}</p>
        <h2 id="choice-title" tabIndex="-1" data-reveal>{copy.title}</h2>
        <p data-reveal>{copy.introduction}</p>
      </header>
      <div className="choice-panels">
        {['creative', 'studio'].map((id) => (
          <a className={`choice-panel choice-panel--${id}`} href={`#${id}`} key={id}
            aria-labelledby={`choice-${id}-title`} aria-describedby={`choice-${id}-details`}>
            <div className="choice-panel-top">
              <span>{paths.includes(id) ? copy.opened : copy[id].kicker}</span>
              <ArrowUpRight />
            </div>
            <div className="choice-art" aria-hidden="true">
              <img src={id === 'studio' ? '/FractureInteractive.png' : '/Andrei.jpg'} alt="" loading="lazy" />
            </div>
            <div className="choice-panel-copy">
              <h3 id={`choice-${id}-title`}>{copy[id].title}<em>{copy[id].accent}</em></h3>
              <p>{copy[id].description}</p>
            </div>
            <div className="choice-panel-bottom">
              <p id={`choice-${id}-details`}>{copy[id].details}</p>
              <span className="choice-action">{copy[id].action}</span>
            </div>
          </a>
        ))}
      </div>
      <p className="choice-note" data-reveal>{copy.note}</p>
      </div>
    </section>
  )
}
export function CreativeIntroduction({ copy }) {
  return (
    <section className="creative-introduction section-shell" id="creative" aria-labelledby="creative-title">
      <div>
        <p className="eyebrow" data-reveal>{copy.eyebrow}</p>
        <h2 id="creative-title" tabIndex="-1" data-reveal>{copy.title}<em>{copy.accent}</em></h2>
        <ul className="creative-disciplines">
          {copy.disciplines.map((discipline) => (
            <li key={discipline} data-reveal>{discipline}</li>
          ))}
        </ul>
      </div>
      <div className="creative-introduction-copy" data-reveal>
        <p>{copy.description}</p>
        <p>{copy.detail}</p>
      </div>
    </section>
  )
}
