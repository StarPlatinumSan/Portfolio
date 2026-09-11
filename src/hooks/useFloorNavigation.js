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

const shouldUseNativeScroll = (
  currentIndex,
  direction,
  continuousStartIndex,
) =>
  continuousStartIndex >= 0 &&
  (currentIndex >= continuousStartIndex ||
    (currentIndex === continuousStartIndex - 1 && direction > 0))

const setContinuousScrollMode = (enabled) => {
  document.documentElement.classList.toggle(
    'continuous-scroll-active',
    enabled,
  )
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

const focusSectionHeading = (section) => {
  const visibleHeading = Array.from(
    section.querySelectorAll('h1, h2, h3'),
  ).find(
    (heading) =>
      !heading.closest('[inert], [aria-hidden="true"]') &&
      heading.getClientRects().length > 0,
  )

  visibleHeading?.focus({ preventScroll: true })
}

export function useFloorNavigation(floorIds, { floorCount } = {}) {
  const floorKey = floorIds.join('|')
  const stableFloorIds = useMemo(
    () => (floorKey ? floorKey.split('|') : []),
    [floorKey],
  )
  const managedFloorCount = clamp(
    Number.isFinite(floorCount)
      ? Math.trunc(floorCount)
      : stableFloorIds.length,
    0,
    stableFloorIds.length,
  )
  const continuousStartIndex =
    managedFloorCount < stableFloorIds.length ? managedFloorCount : -1
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
  const continuousTargetRef = useRef(null)
  const continuousScrollTargetRef = useRef(null)
  const continuousScrollFrameRef = useRef(null)
  const continuousScrollTimeRef = useRef(null)

  const updateActiveIndex = useCallback((index) => {
    activeIndexRef.current = index
    setActiveIndex((current) => (current === index ? current : index))
  }, [])

  const cancelContinuousSlide = useCallback(() => {
    if (continuousScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(continuousScrollFrameRef.current)
    }

    continuousScrollFrameRef.current = null
    continuousScrollTargetRef.current = null
    continuousScrollTimeRef.current = null
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
      const isContinuousTarget =
        continuousStartIndex >= 0 && index >= continuousStartIndex

      cancelContinuousSlide()

      if (isContinuousTarget) {
        window.clearTimeout(releaseRef.current)
        transitionRef.current = { lockedUntil: 0, target: null }
        continuousTargetRef.current = index
        wheelIntentRef.current = 0
        wheelArmedRef.current = true
        setContinuousScrollMode(true)
        updateActiveIndex(index)

        section.scrollIntoView({
          behavior: shouldMoveImmediately ? 'instant' : 'smooth',
          block: 'start',
        })

        if (updateHash) {
          writeFloorHash(stableFloorIds, index, 'push')
        } else if (replaceHash) {
          writeFloorHash(stableFloorIds, index, 'replace')
        }

        if (focusHeading) focusSectionHeading(section)

        return true
      }

      continuousTargetRef.current = null
      setContinuousScrollMode(false)
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

      if (focusHeading) focusSectionHeading(section)

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
    [
      cancelContinuousSlide,
      continuousStartIndex,
      stableFloorIds,
      updateActiveIndex,
    ],
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

      const continuousTargetIndex = continuousTargetRef.current
      if (continuousTargetIndex !== null) {
        const targetSection = sections.find(
          ({ index }) => index === continuousTargetIndex,
        )?.element
        if (!containsViewportCenter(targetSection)) return

        continuousTargetRef.current = null
        updateActiveIndex(continuousTargetIndex)
        if (replaceHash) {
          writeFloorHash(
            stableFloorIds,
            continuousTargetIndex,
            'replace',
          )
        }
        return
      }

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

      if (continuousStartIndex >= 0) {
        if (closestIndex >= continuousStartIndex) {
          setContinuousScrollMode(true)
        } else if (closestIndex < continuousStartIndex - 1) {
          setContinuousScrollMode(false)
        }
      }

      if (replaceHash) {
        writeFloorHash(stableFloorIds, closestIndex, 'replace')
      }
    }

    const requestScrollSync = () => {
      if (scrollFrame !== null) return
      scrollFrame = window.requestAnimationFrame(syncFromScroll)
    }

    const animateContinuousSlide = (timestamp) => {
      const target = continuousScrollTargetRef.current
      if (target === null) {
        continuousScrollFrameRef.current = null
        continuousScrollTimeRef.current = null
        return
      }

      const distance = target - window.scrollY
      if (Math.abs(distance) <= 0.75) {
        window.scrollTo({ top: target, behavior: 'instant' })
        continuousScrollTargetRef.current = null
        continuousScrollFrameRef.current = null
        continuousScrollTimeRef.current = null
        return
      }

      const previousTimestamp = continuousScrollTimeRef.current ?? timestamp
      const frameScale = clamp((timestamp - previousTimestamp) / 16.667, 0.5, 2)
      const easing = 1 - Math.pow(1 - 0.11, frameScale)
      continuousScrollTimeRef.current = timestamp

      window.scrollTo({
        top: window.scrollY + distance * easing,
        behavior: 'instant',
      })
      continuousScrollFrameRef.current = window.requestAnimationFrame(
        animateContinuousSlide,
      )
    }

    const queueContinuousSlide = (distance) => {
      const maximumScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      const currentScroll = window.scrollY
      const currentTarget =
        continuousScrollTargetRef.current ?? currentScroll
      const maximumLead = window.innerHeight * 0.9
      const nextTarget = clamp(
        currentTarget + distance * 1.15,
        currentScroll - maximumLead,
        currentScroll + maximumLead,
      )

      continuousScrollTargetRef.current = clamp(
        nextTarget,
        0,
        maximumScroll,
      )

      if (continuousScrollFrameRef.current === null) {
        continuousScrollTimeRef.current = null
        continuousScrollFrameRef.current = window.requestAnimationFrame(
          animateContinuousSlide,
        )
      }
    }

    const releaseFloorControl = () => {
      window.clearTimeout(releaseRef.current)
      transitionRef.current = { lockedUntil: 0, target: null }
      continuousTargetRef.current = null
    }

    const handleWheel = (event) => {
      if (event.ctrlKey) return
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

      const deltaMultiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 18
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1
      const normalizedWheelDelta = event.deltaY * deltaMultiplier
      const wheelDirection = Math.sign(normalizedWheelDelta)

      if (!wheelDirection) return

      if (
        shouldUseNativeScroll(
          activeIndexRef.current,
          wheelDirection,
          continuousStartIndex,
        )
      ) {
        setContinuousScrollMode(true)
        releaseFloorControl()

        if (reducedMotionQuery.matches) return

        event.preventDefault()
        wheelIntentRef.current = 0
        wheelArmedRef.current = true
        queueContinuousSlide(normalizedWheelDelta)
        return
      }

      if (
        reducedMotionQuery.matches ||
        !desktopQuery.matches ||
        !precisePointerQuery.matches
      ) {
        return
      }

      cancelContinuousSlide()
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

      wheelIntentRef.current += normalizedWheelDelta

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
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        isInteractiveTarget(event.target)
      ) {
        return
      }

      const commands = {
        ArrowDown: 1,
        PageDown: 1,
        ArrowUp: -1,
        PageUp: -1,
      }

      if (event.key in commands) {
        const direction = commands[event.key]
        if (
          shouldUseNativeScroll(
            activeIndexRef.current,
            direction,
            continuousStartIndex,
          )
        ) {
          setContinuousScrollMode(true)
          releaseFloorControl()
          if (reducedMotionQuery.matches) return

          event.preventDefault()
          queueContinuousSlide(
            direction *
              (event.key.startsWith('Page') ? window.innerHeight * 0.82 : 110),
          )
          return
        }

        if (!desktopQuery.matches) return
        cancelContinuousSlide()
        if (performance.now() < transitionRef.current.lockedUntil) return
        event.preventDefault()
        navigateByKeyboard(activeIndexRef.current + direction)
        return
      }

      if (event.key === ' ' || event.code === 'Space') {
        const direction = event.shiftKey ? -1 : 1
        if (
          shouldUseNativeScroll(
            activeIndexRef.current,
            direction,
            continuousStartIndex,
          )
        ) {
          setContinuousScrollMode(true)
          releaseFloorControl()
          if (reducedMotionQuery.matches) return

          event.preventDefault()
          queueContinuousSlide(direction * window.innerHeight * 0.82)
          return
        }

        if (!desktopQuery.matches) return
        cancelContinuousSlide()
        if (performance.now() < transitionRef.current.lockedUntil) return
        event.preventDefault()
        navigateByKeyboard(activeIndexRef.current + direction)
        return
      }

      if (!desktopQuery.matches) return
      if (performance.now() < transitionRef.current.lockedUntil) return

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

      const continuousTargetIndex = continuousTargetRef.current
      if (continuousTargetIndex !== null) {
        const targetSection = sections.find(
          ({ index }) => index === continuousTargetIndex,
        )?.element
        if (!containsViewportCenter(targetSection)) return

        continuousTargetRef.current = null
        updateActiveIndex(continuousTargetIndex)
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
        if (
          continuousStartIndex >= 0 &&
          initialIndex >= continuousStartIndex
        ) {
          setContinuousScrollMode(true)
          initialSection.scrollIntoView({
            behavior: 'instant',
            block: 'start',
          })
        } else {
          setContinuousScrollMode(false)
          window.scrollTo({ top: initialSection.offsetTop, behavior: 'auto' })
        }
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
      continuousTargetRef.current = null
      wheelIntentRef.current = 0
      wheelArmedRef.current = true
      cancelContinuousSlide()
      setContinuousScrollMode(false)
    }
  }, [
    cancelContinuousSlide,
    continuousStartIndex,
    navigateTo,
    stableFloorIds,
    updateActiveIndex,
  ])

  const lastManagedFloorIndex = Math.max(managedFloorCount - 1, 0)

  return {
    activeIndex,
    isContinuousSection:
      continuousStartIndex >= 0 && activeIndex >= continuousStartIndex,
    navigateTo,
    progress:
      managedFloorCount > 1
        ? Math.min(activeIndex, lastManagedFloorIndex) /
          lastManagedFloorIndex
        : 1,
  }
}
