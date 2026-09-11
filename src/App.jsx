import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import FloorProgress from './components/FloorProgress'
import ProjectFloor from './components/ProjectFloor'
import {
  CollectionFloor,
  ContactSection,
  CoursesSection,
  EchoesSection,
  EducationSection,
  ExperienceSection,
  LucidSection,
  ShortFilmSection,
  SkillsSection,
  StudioSection,
} from './components/Sections'
import { floorIds, getFloors } from './data/floors'
import {
  gameTools,
  getEducation,
  getEchoesFeature,
  getExperience,
  getProjectGroups,
  getProjects,
  getRelevantCourses,
  getStudioFeature,
  siteCopy,
  webTools,
} from './data/portfolio'
import { useFloorNavigation } from './hooks/useFloorNavigation'
import { useSiteMotion } from './hooks/useSiteMotion'
import './App.css'

function App() {
  const [language, setLanguage] = useState('fr')
  const appRef = useRef(null)
  const copy = siteCopy[language]
  const studioCopy = {
    ...copy.studio,
    technologiesLabel: copy.projectSection.technologiesLabel,
  }
  const floors = useMemo(() => getFloors(copy), [copy])
  const projects = getProjects(language)
  const projectGroups = getProjectGroups(language)
  const echoesFeature = getEchoesFeature(language)
  const studioFeature = getStudioFeature(language)
  const experience = getExperience(language)
  const education = getEducation(language)
  const relevantCourses = getRelevantCourses(language)
  const projectById = Object.fromEntries(
    projects.map((project) => [project.id, project]),
  )
  const groupById = Object.fromEntries(
    projectGroups.map((group) => [group.id, group]),
  )
  const { activeIndex, progress } = useFloorNavigation(floorIds)
  const activeFloorId = floorIds[activeIndex]

  useSiteMotion(appRef, activeFloorId)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <div className="portfolio" ref={appRef}>
      <a className="skip-link" href="#main-content">
        {copy.navigation.skipToContent}
      </a>
      <Header
        copy={copy}
        floors={floors}
        activeFloorId={activeFloorId}
        language={language}
        onLanguageChange={() =>
          setLanguage((current) => (current === 'en' ? 'fr' : 'en'))
        }
      />
      <FloorProgress
        floors={floors}
        activeIndex={activeIndex}
        progress={progress}
        copy={copy.floorNavigation}
      />

      <main id="main-content" tabIndex="-1">
        <Hero copy={copy} />
        <EchoesSection feature={echoesFeature} />
        <StudioSection
          copy={studioCopy}
          feature={studioFeature}
        />
        <LucidSection
          copy={studioCopy}
          feature={studioFeature}
          project={projectById['the-lucid']}
        />
        <ShortFilmSection copy={copy.shortFilm} />
        <ProjectFloor
          project={projectById['visual-story-writing']}
          copy={copy.projectSection}
          layout="visual-right"
        />
        <ProjectFloor
          project={projectById['je-suis-quark']}
          copy={copy.projectSection}
          layout="visual-left"
        />
        <ProjectFloor
          project={projectById.maville}
          copy={copy.projectSection}
          layout="visual-right"
        />
        <ProjectFloor
          project={projectById['prop-hunt']}
          copy={copy.projectSection}
          layout="poster"
          workInProgress
        />
        <ExperienceSection copy={copy.experience} items={experience} />
        <CollectionFloor
          groups={[
            groupById['dnd-web-tools'],
            groupById['other-projects'],
          ]}
          copy={copy.projectSection}
        />
        <SkillsSection
          copy={copy.about}
          webTools={webTools}
          gameTools={gameTools}
        />
        <EducationSection copy={copy.educationSection} items={education} />
        <CoursesSection copy={copy.relevantCourses} items={relevantCourses} />
        <ContactSection copy={copy.contact} footerCopy={copy.footer} />
      </main>
    </div>
  )
}

export default App
