import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), maximum)

const containsViewportCenter = (element) => {
  if (!element || typeof window === 'undefined') return false

  const rect = element.getBoundingClientRect()
  const viewportProbe = window.innerHeight * 0.5 + 1

  return rect.top <= viewportProbe && rect.bottom > viewportProbe
}

const isInteractiveTarget = (target) =>
  target instanceof Element &&
  Boolean(
    target.closest(
      'a, button, input, textarea, select, summary, [contenteditable="true"], [role="dialog"]',
    ),
  )

const getLocationFloorIndex = (floorIds) => {
  if (typeof window === 'undefined') return 0

  const rawId = window.location.hash.slice(1)
  if (!rawId) return 0

  try {
    return floorIds.indexOf(decodeURIComponent(rawId))
  } catch {
    return floorIds.indexOf(rawId)
  }
}

const writeFloorHash = (floorIds, index, mode) => {
  const id = floorIds[index]
  if (!id) return

  const nextHash = `#${id}`
  if (window.location.hash === nextHash) return

  window.history[mode === 'push' ? 'pushState' : 'replaceState'](
    window.history.state,
    '',
    nextHash,
  )
}

export function useFloorNavigation(floorIds) {
  const floorKey = floorIds.join('|')
  const stableFloorIds = useMemo(
    () => (floorKey ? floorKey.split('|') : []),
    [floorKey],
  )
  const [activeIndex, setActiveIndex] = useState(() => {
    const locationIndex = getLocationFloorIndex(stableFloorIds)
    return locationIndex >= 0 ? locationIndex : 0
  })
  const activeIndexRef = useRef(activeIndex)
  const transitionRef = useRef({ lockedUntil: 0, target: null })
  const wheelIntentRef = useRef(0)
  const wheelArmedRef = useRef(true)
  const wheelResetRef = useRef(null)
  const releaseRef = useRef(null)

  const updateActiveIndex = useCallback((index) => {
    activeIndexRef.current = index
    setActiveIndex((current) => (current === index ? current : index))
  }, [])

  const navigateTo = useCallback(
    (
      requestedIndex,
      {
        updateHash = false,
        replaceHash = false,
        immediate = false,
        focusHeading = false,
      } = {},
    ) => {
      if (!stableFloorIds.length) return false

      const index = clamp(requestedIndex, 0, stableFloorIds.length - 1)
      const section = document.getElementById(stableFloorIds[index])
      if (!section) return false

      const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const shouldMoveImmediately = immediate || reducedMotion
      const floorDistance = Math.abs(index - activeIndexRef.current)
      const transitionDuration = shouldMoveImmediately
        ? 80
        : clamp(780 + floorDistance * 110, 900, 1800)

      window.clearTimeout(releaseRef.current)
      transitionRef.current = {
        lockedUntil: performance.now() + transitionDuration,
        target: index,
      }
      updateActiveIndex(index)

      window.scrollTo({
        top: section.offsetTop,
        behavior: shouldMoveImmediately ? 'auto' : 'smooth',
      })

      if (updateHash) {
        writeFloorHash(stableFloorIds, index, 'push')
      } else if (replaceHash) {
        writeFloorHash(stableFloorIds, index, 'replace')
      }

      if (focusHeading) {
        const visibleHeading = Array.from(
          section.querySelectorAll('h1, h2, h3'),
        ).find(
          (heading) =>
            !heading.closest('[inert], [aria-hidden="true"]') &&
            heading.getClientRects().length > 0,
        )

        visibleHeading?.focus({ preventScroll: true })
      }

      releaseRef.current = window.setTimeout(() => {
        if (transitionRef.current.target !== index) return

        if (!containsViewportCenter(section)) {
          window.scrollTo({
            top: section.offsetTop,
            behavior: 'instant',
          })
        }

        transitionRef.current = { lockedUntil: 0, target: null }
        updateActiveIndex(index)

        if (updateHash || replaceHash) {
          writeFloorHash(stableFloorIds, index, 'replace')
        }
      }, transitionDuration)

      return true
    },
    [stableFloorIds, updateActiveIndex],
  )

  useLayoutEffect(() => {
    const desktopQuery = window.matchMedia(
      '(min-width: 1025px) and (min-height: 740px)',
    )
    const precisePointerQuery = window.matchMedia('(pointer: fine)')
    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    let scrollFrame = null
    let historyFrame = null

    const sections = stableFloorIds
      .map((id, index) => ({
        element: document.getElementById(id),
        index,
      }))
      .filter(({ element }) => element)

    const syncFromScroll = ({ replaceHash = true } = {}) => {
      scrollFrame = null
      if (!sections.length) return

      const transition = transitionRef.current
      if (transition.target !== null) return

      const viewportCenter = window.innerHeight * 0.5
      const sectionAtCenter = sections.find(({ element }) =>
        containsViewportCenter(element),
      )
      let closestIndex = sectionAtCenter?.index ?? sections[0].index
      let closestDistance = Number.POSITIVE_INFINITY

      if (!sectionAtCenter) {
        sections.forEach(({ element, index }) => {
          const rect = element.getBoundingClientRect()
          const distance = Math.min(
            Math.abs(rect.top - viewportCenter),
            Math.abs(rect.bottom - viewportCenter),
          )

          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        })
      }

      if (closestIndex !== activeIndexRef.current) {
        updateActiveIndex(closestIndex)
      }

      if (replaceHash) {
        writeFloorHash(stableFloorIds, closestIndex, 'replace')
      }
    }

    const requestScrollSync = () => {
      if (scrollFrame !== null) return
      scrollFrame = window.requestAnimationFrame(syncFromScroll)
    }

    const handleWheel = (event) => {
      if (
        !desktopQuery.matches ||
        !precisePointerQuery.matches ||
        reducedMotionQuery.matches ||
        event.ctrlKey
      ) {
        return
      }

      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

      event.preventDefault()

      window.clearTimeout(wheelResetRef.current)
      wheelResetRef.current = window.setTimeout(() => {
        wheelIntentRef.current = 0
        const remainingLock = Math.max(
          0,
          transitionRef.current.lockedUntil - performance.now(),
        )

        window.clearTimeout(wheelResetRef.current)
        wheelResetRef.current = window.setTimeout(() => {
          wheelArmedRef.current = true
        }, remainingLock + 24)
      }, 210)

      if (
        performance.now() < transitionRef.current.lockedUntil ||
        !wheelArmedRef.current
      ) {
        return
      }

      const deltaMultiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1

      wheelIntentRef.current += event.deltaY * deltaMultiplier

      if (Math.abs(wheelIntentRef.current) < 54) return

      const direction = wheelIntentRef.current > 0 ? 1 : -1
      const nextIndex = activeIndexRef.current + direction
      wheelIntentRef.current = 0

      if (nextIndex < 0 || nextIndex >= stableFloorIds.length) return

      wheelArmedRef.current = false
      navigateTo(nextIndex, { replaceHash: true })
    }

    const navigateByKeyboard = (requestedIndex) => {
      const index = clamp(requestedIndex, 0, stableFloorIds.length - 1)
      if (index === activeIndexRef.current) return

      navigateTo(index, { replaceHash: true, focusHeading: true })
    }

    const handleKeyDown = (event) => {
      if (
        !desktopQuery.matches ||
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isInteractiveTarget(event.target)
      ) {
        return
      }

      if (performance.now() < transitionRef.current.lockedUntil) return

      const commands = {
        ArrowDown: 1,
        PageDown: 1,
        ArrowUp: -1,
        PageUp: -1,
      }

      if (event.key in commands) {
        event.preventDefault()
        navigateByKeyboard(activeIndexRef.current + commands[event.key])
        return
      }

      if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault()
        navigateByKeyboard(activeIndexRef.current + (event.shiftKey ? -1 : 1))
        return
      }

      if (event.key === 'Home') {
        event.preventDefault()
        navigateByKeyboard(0)
        return
      }

      if (event.key === 'End') {
        event.preventDefault()
        navigateByKeyboard(stableFloorIds.length - 1)
      }
    }

    const handleAnchorClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return
      }

      const anchor = event.target.closest('a[href^="#"]')
      if (
        !anchor ||
        anchor.hasAttribute('download') ||
        (anchor.target && anchor.target !== '_self')
      ) {
        return
      }

      const rawId = anchor.getAttribute('href')?.slice(1)
      let id = rawId

      try {
        id = decodeURIComponent(rawId)
      } catch {
        // Keep the literal fragment when it is not valid URI syntax.
      }

      const index = stableFloorIds.indexOf(id)
      if (index < 0) return

      event.preventDefault()
      navigateTo(index, { updateHash: true, focusHeading: true })
    }

    const navigateFromLocation = () => {
      historyFrame = null
      const index = getLocationFloorIndex(stableFloorIds)
      if (index < 0) return

      navigateTo(index, { immediate: reducedMotionQuery.matches })
    }

    const requestHistoryNavigation = () => {
      if (historyFrame !== null) return
      historyFrame = window.requestAnimationFrame(navigateFromLocation)
    }

    const releaseSettledNavigation = (event) => {
      if (
        event.target !== document &&
        event.target !== window &&
        event.target !== document.documentElement
      ) {
        return
      }

      const targetIndex = transitionRef.current.target
      if (targetIndex === null) return

      const targetSection = sections.find(
        ({ index }) => index === targetIndex,
      )?.element
      if (!containsViewportCenter(targetSection)) return

      window.clearTimeout(releaseRef.current)
      transitionRef.current = { lockedUntil: 0, target: null }
      updateActiveIndex(targetIndex)
    }

    window.addEventListener('scroll', requestScrollSync, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('popstate', requestHistoryNavigation)
    window.addEventListener('hashchange', requestHistoryNavigation)
    window.addEventListener('scrollend', releaseSettledNavigation)
    document.addEventListener('click', handleAnchorClick)

    const initialIndex = getLocationFloorIndex(stableFloorIds)
    if (initialIndex >= 0) {
      const initialSection = document.getElementById(stableFloorIds[initialIndex])
      if (initialSection) {
        window.scrollTo({ top: initialSection.offsetTop, behavior: 'auto' })
      }
    }

    return () => {
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame)
      if (historyFrame !== null) window.cancelAnimationFrame(historyFrame)
      window.clearTimeout(wheelResetRef.current)
      window.clearTimeout(releaseRef.current)
      window.removeEventListener('scroll', requestScrollSync)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('popstate', requestHistoryNavigation)
      window.removeEventListener('hashchange', requestHistoryNavigation)
      window.removeEventListener('scrollend', releaseSettledNavigation)
      document.removeEventListener('click', handleAnchorClick)

      transitionRef.current = { lockedUntil: 0, target: null }
      wheelIntentRef.current = 0
      wheelArmedRef.current = true
    }
  }, [navigateTo, stableFloorIds, updateActiveIndex])

  return {
    activeIndex,
    navigateTo,
    progress:
      stableFloorIds.length > 1
        ? activeIndex / (stableFloorIds.length - 1)
        : 1,
  }
}
