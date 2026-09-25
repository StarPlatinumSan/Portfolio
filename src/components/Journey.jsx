import { ArrowDown, ArrowUpRight } from './Icons'

export function JourneyChoice({ copy, paths }) {
  return (
    <section className="journey-choice section-shell" id="choose" aria-labelledby="choice-title">
      <header className="choice-heading">
        <p className="eyebrow" data-reveal>{copy.eyebrow}</p>
        <h2 id="choice-title" tabIndex="-1" data-reveal>{copy.title}</h2>
        <p data-reveal>{copy.introduction}</p>
      </header>
      <div className="choice-panels">
        {['studio', 'creative'].map((id, index) => (
          <a className={`choice-panel choice-panel--${id}`} href={`#${id}`} key={id}
            aria-labelledby={`choice-${id}-title`} aria-describedby={`choice-${id}-details`}>
            <div className="choice-panel-top">
              <span className="choice-number">0{index + 1}</span>
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
              <span className="choice-action">{copy[id].action}<ArrowDown /></span>
            </div>
          </a>
        ))}
      </div>
      <p className="choice-note" data-reveal>{copy.note}</p>
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
          {copy.disciplines.map((discipline, index) => (
            <li key={discipline} data-reveal><span>0{index + 1}</span>{discipline}</li>
          ))}
        </ul>
      </div>
      <div className="creative-introduction-copy" data-reveal>
        <p>{copy.description}</p>
        <p>{copy.detail}</p>
        <a className="text-link" href="#visual-story-writing">{copy.action}<ArrowDown className="text-link-icon" /></a>
      </div>
    </section>
  )
}

export function JourneyBridge({ from, copy, paths }) {
  const destination = from === 'studio' ? 'creative' : 'studio'
  const next = copy[destination]
  return (
    <section className={`journey-bridge journey-bridge--${destination} section-shell`} aria-labelledby={`${from}-bridge-title`}>
      <div className="journey-bridge-copy">
        <p className="eyebrow" data-reveal>{copy.bridge.eyebrow}</p>
        <h2 id={`${from}-bridge-title`} data-reveal>{copy.bridge.title}</h2>
        <p data-reveal>{from === 'studio' ? copy.bridge.toCreative : copy.bridge.toStudio}</p>
        <a href="#contact" className="text-link" data-reveal>{copy.bridge.contact}<ArrowUpRight className="text-link-icon" /></a>
      </div>
      <a className="journey-next" href={`#${destination}`} data-reveal-media>
        <span className="journey-next-label">{next.kicker}</span>
        <strong>{next.title}<em>{next.accent}</em></strong>
        <span className="choice-action">{paths.includes(destination) ? copy.bridge.revisit : next.action}<ArrowUpRight /></span>
      </a>
    </section>
  )
}
