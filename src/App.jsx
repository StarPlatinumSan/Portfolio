import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectSection from './components/ProjectSection'
import { CreativeIntroduction, JourneyBridge, JourneyChoice } from './components/Journey'
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
  const stopScroll = useSmoothScroll()
  const { paths, activeSection, onNavigate } = useJourneyNavigation(stopScroll)
  const pathOrder = [...paths, ...['studio', 'creative'].filter((id) => !paths.includes(id))]

  useSiteMotion(appRef, paths.join('|'))
  useEffect(() => { document.documentElement.lang = language }, [language])

  return (
    <div className="portfolio" ref={appRef} onClick={onNavigate}>
      <a className="skip-link" href="#main-content">{copy.navigation.skipToContent}</a>
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
                <EchoesSection feature={getEchoesFeature(language)} />
                <ShortFilmSection copy={copy.shortFilm} />
              </>
            ) : (
              <>
                <CreativeIntroduction copy={journey.about} />
                <ProjectSection project={projectById['visual-story-writing']} copy={copy.projectSection} />
                <ProjectSection project={projectById['je-suis-quark']} copy={copy.projectSection} layout="visual-left" />
                <ProjectSection project={projectById.maville} copy={copy.projectSection} />
                <ProjectSection project={projectById['prop-hunt']} copy={copy.projectSection} layout="poster" workInProgress />
                <div className="continuous-content">
                  <ProjectCollection groups={getProjectGroups(language)} copy={copy.projectSection} />
                  <ExperienceSection copy={copy.experience} items={getExperience(language)} />
                  <SkillsSection copy={copy.about} webTools={webTools} gameTools={gameTools} />
                  <EducationSection copy={copy.educationSection} items={getEducation(language)} />
                  <CoursesSection copy={copy.relevantCourses} items={getRelevantCourses(language)} />
                </div>
              </>
            )}
            <JourneyBridge from={id} copy={journey} paths={paths} />
          </div>
        ))}
        <ContactSection copy={copy.contact} footerCopy={copy.footer} />
      </main>
    </div>
  )
}

export default App
