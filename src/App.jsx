import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectSection from './components/ProjectSection'
import {
  CreativeIntroduction, JourneyChoice, JourneyTransitions,
} from './components/Journey'
import {
  ProjectCollection, ContactSection, CoursesSection, EchoesSection,
  EducationSection, ExperienceSection, LucidSection, ShortFilmSection,
  SkillsSection, StudioSection,
} from './components/Sections'
import {
  gameTools, getEducation, getEchoesFeature, getExperience, getProjectGroups,
  getProjects, getRelevantCourses, getStudioFeature, siteCopy, webTools,
} from './data/portfolio'
import { journeyCopy } from './data/journeys'
import { useJourneyNavigation } from './hooks/useJourneyNavigation'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useSiteMotion } from './hooks/useSiteMotion'
import './App.css'
import './Journey.css'

function App() {
  const [language, setLanguage] = useState('fr')
  const appRef = useRef(null)
  const copy = siteCopy[language]
  const journey = journeyCopy[language]
  const studioCopy = { ...copy.studio, technologiesLabel: copy.projectSection.technologiesLabel }
  const projectById = Object.fromEntries(getProjects(language).map((project) => [project.id, project]))
  const studioFeature = getStudioFeature(language)
  const { stopScroll, enterChoice } = useSmoothScroll()
  const { paths, activeSection, onNavigate } = useJourneyNavigation(stopScroll, enterChoice)
  const pathOrder = [...paths, ...['creative', 'studio'].filter((id) => !paths.includes(id))]

  useSiteMotion(appRef, paths.join('|'))
  useEffect(() => { document.documentElement.lang = language }, [language])

  return (
    <div className="portfolio" ref={appRef} onClick={onNavigate}>
      <a className="skip-link" href="#main-content">{copy.navigation.skipToContent}</a>
      <JourneyTransitions />
      <div className="ambient-geometry" aria-hidden="true">
        <span className="ambient-shape ambient-shape--one" />
        <span className="ambient-shape ambient-shape--two" />
        <span className="ambient-shape ambient-shape--three" />
        <span className="ambient-shape ambient-shape--four" />
        <span className="ambient-shape ambient-shape--five" />
      </div>
      <Header copy={copy} journeyCopy={journey} activeSection={activeSection} language={language}
        onLanguageChange={() => setLanguage((current) => current === 'en' ? 'fr' : 'en')} />
      <main id="main-content" tabIndex="-1">
        <Hero copy={copy} />
        <JourneyChoice copy={journey} paths={paths} />
        {pathOrder.map((id) => (
          <div className={`journey-path journey-path--${id}`} key={id} hidden={!paths.includes(id)}>
            {id === 'studio' ? (
              <>
                <StudioSection copy={studioCopy} feature={studioFeature} />
                <LucidSection copy={studioCopy} feature={studioFeature} project={projectById['the-lucid']} />
                <ShortFilmSection copy={copy.shortFilm} />
                <EchoesSection feature={getEchoesFeature(language)} />
                <ProjectSection
                  project={projectById['artificial-selection']}
                  copy={copy.projectSection}
                />
                <ProjectSection
                  project={projectById.duality}
                  copy={copy.projectSection}
                  layout="visual-left"
                />
              </>
            ) : (
              <>
                <CreativeIntroduction copy={journey.about} />
                <div className="continuous-content continuous-content--profile">
                  <ExperienceSection copy={copy.experience} items={getExperience(language)} />
                  <EducationSection copy={copy.educationSection} items={getEducation(language)} />
                </div>
                <ProjectSection project={projectById['visual-story-writing']} copy={copy.projectSection} />
                <ProjectSection project={projectById['je-suis-quark']} copy={copy.projectSection} layout="visual-left" />
                <ProjectSection project={projectById.maville} copy={copy.projectSection} />
                <div className="continuous-content">
                  <ProjectCollection groups={getProjectGroups(language)} copy={copy.projectSection} />
                  <SkillsSection copy={copy.about} webTools={webTools} gameTools={gameTools} />
                  <CoursesSection copy={copy.relevantCourses} items={getRelevantCourses(language)} />
                </div>
              </>
            )}
          </div>
        ))}
        <ContactSection copy={copy.contact} footerCopy={copy.footer} />
      </main>
    </div>
  )
}

export default App
