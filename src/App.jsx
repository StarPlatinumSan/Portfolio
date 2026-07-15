import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProjectShowcase, {
  ProjectCollections,
} from './components/ProjectShowcase'
import {
  AboutSection,
  ContactSection,
  ExperienceSection,
  Footer,
  StudioSection,
} from './components/Sections'
import {
  gameTools,
  getEducation,
  getExperience,
  getProjectGroups,
  getProjects,
  getStudioFeature,
  siteCopy,
  webTools,
} from './data/portfolio'
import { useSiteMotion } from './hooks/useSiteMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import './App.css'

function App() {
  const [language, setLanguage] = useState('fr')
  const appRef = useRef(null)
  const copy = siteCopy[language]
  const projects = getProjects(language)
  const projectGroups = getProjectGroups(language)
  const studioFeature = getStudioFeature(language)
  const experience = getExperience(language)
  const education = getEducation(language)

  useSmoothScroll()
  useSiteMotion(appRef, language)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="portfolio" ref={appRef}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header
        copy={copy}
        language={language}
        onLanguageChange={() =>
          setLanguage((current) => (current === 'en' ? 'fr' : 'en'))
        }
      />
      <main id="main-content">
        <Hero copy={copy} />
        <StudioSection copy={copy.studio} feature={studioFeature} />
        <ProjectShowcase
          projects={projects}
          copy={copy.projectSection}
        />
        <ExperienceSection copy={copy.experience} items={experience} />
        <ProjectCollections
          groups={projectGroups}
          copy={copy.projectSection}
        />
        <AboutSection
          copy={copy.about}
          education={education}
          webTools={webTools}
          gameTools={gameTools}
        />
        <ContactSection copy={copy.contact} />
      </main>
      <Footer copy={copy.footer} />
    </div>
  )
}

export default App
