import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { getJourneyForSection } from '../data/journeys'

const readHash = () => {
  try { return decodeURIComponent(window.location.hash.slice(1)) || 'top' }
  catch { return 'top' }
}

export function useJourneyNavigation(stopScroll, enterChoice) {
  const [paths, setPaths] = useState(() => {
    const path = getJourneyForSection(readHash())
    return path ? [path] : []
  })
  const [activeSection, setActiveSection] = useState(readHash)
  const pending = useRef(null)
  const branching = useRef(false)
  const branchTimers = useRef([])

  const scrollTo = useCallback((id, immediate = false, focus = false) => {
    const section = document.getElementById(id)
    if (!section) return
    stopScroll()
    const heading = section.querySelector('h1, h2') ?? section
    if (focus) heading.focus({ preventScroll: true })
    const behavior = immediate || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
    if (section.dataset.scrollAlign === 'viewport') {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY
      const centeredTop = sectionTop - Math.max(0, (window.innerHeight - section.offsetHeight) / 2)
      window.scrollTo({ top: centeredTop, behavior })
      return
    }
    section.scrollIntoView({
      behavior,
      block: 'start',
    })
  }, [stopScroll])

  const navigate = useCallback((id, { immediate = false, focus = true } = {}) => {
    if (id === 'choose' && !immediate && enterChoice?.(focus)) return

    const path = getJourneyForSection(id)
    const shouldBranch = path === id && !immediate &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (shouldBranch && branching.current) return
    if (shouldBranch && !branching.current) {
      stopScroll()
      branching.current = true
      document.documentElement.dataset.branch = path
      document.documentElement.classList.add('is-branching')

      const revealTimer = window.setTimeout(() => {
        if (!paths.includes(path)) {
          pending.current = { id, immediate: true, focus }
          setPaths((current) => current.includes(path) ? current : [...current, path])
        } else scrollTo(id, true, focus)
      }, 680)
      const finishTimer = window.setTimeout(() => {
        document.documentElement.classList.remove('is-branching')
        delete document.documentElement.dataset.branch
        branching.current = false
      }, 1520)
      branchTimers.current = [revealTimer, finishTimer]
      return
    }

    if (path && !paths.includes(path)) {
      stopScroll()
      pending.current = { id, immediate, focus }
      setPaths((current) => current.includes(path) ? current : [...current, path])
    } else scrollTo(id, immediate, focus)
  }, [enterChoice, paths, scrollTo, stopScroll])

  useEffect(() => () => {
    branchTimers.current.forEach(window.clearTimeout)
    document.documentElement.classList.remove('is-branching')
    delete document.documentElement.dataset.branch
  }, [])

  useLayoutEffect(() => {
    if (!pending.current) return
    const { id, immediate, focus } = pending.current
    pending.current = null
    scrollTo(id, immediate, focus)
  }, [paths, scrollTo])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (window.location.hash) scrollTo(readHash(), true)
    })
    return () => cancelAnimationFrame(frame)
  }, [scrollTo])

  useEffect(() => {
    const onHistory = () => navigate(readHash(), { immediate: true })
    window.addEventListener('hashchange', onHistory)
    return () => window.removeEventListener('hashchange', onHistory)
  }, [navigate])

  useEffect(() => {
    let frame = null
    const sync = () => {
      frame = null
      const probe = window.innerHeight * 0.35
      let current = 'top'
      let closestTop = Number.NEGATIVE_INFINITY
      const sections = document.querySelectorAll('main section[id]')
      for (const section of sections) {
        if (section.closest('[hidden]')) continue
        const top = section.getBoundingClientRect().top
        if (top <= probe && top > closestTop) {
          closestTop = top
          current = section.id
        }
      }
      setActiveSection(current)
    }
    const onScroll = () => { if (frame === null) frame = requestAnimationFrame(sync) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [paths])

  const onNavigate = (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const link = event.target.closest('a[href^="#"]')
    if (!link || link.target || link.hasAttribute('download')) return
    let id
    try { id = decodeURIComponent(link.hash.slice(1)) } catch { return }
    if (!id || !document.getElementById(id)) return
    event.preventDefault()
    if (window.location.hash !== link.hash) window.history.pushState(null, '', link.hash)
    navigate(id)
  }

  return { paths, activeSection, onNavigate }
}
