import { useCallback, useEffect, useRef } from 'react'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const interactive = 'a, button, input, textarea, select, summary, dialog, [contenteditable], [role="dialog"], [role="tablist"]'

export function useSmoothScroll() {
  const cancelRef = useRef(() => {})
  const enterRef = useRef(() => false)
  const stopScroll = useCallback(() => cancelRef.current(), [])
  const enterChoice = useCallback((focus = false) => enterRef.current(focus), [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = window.matchMedia('(pointer: fine)')
    const hero = document.getElementById('top')
    const choice = document.getElementById('choose')
    let introUsed = Boolean(location.hash && location.hash !== '#top')
    let frame = null
    let target = null
    let previousTime = null
    let lastScroll = null
    let intro = null
    let touchStart = null

    const cancel = () => {
      cancelAnimationFrame(frame)
      frame = null
      target = null
      previousTime = null
      lastScroll = null
      intro = null
      document.documentElement.classList.remove('is-transitioning-choice')
    }
    cancelRef.current = cancel

    const choiceTop = () => Math.max(0, choice.getBoundingClientRect().top + window.scrollY)
    const canEnter = () => !introUsed && !reduced.matches &&
      window.scrollY < choiceTop() - 8 &&
      // A tall mobile hero can be read normally before its exit transition.
      hero.getBoundingClientRect().bottom <= window.innerHeight + 24

    const tick = (time) => {
      if (intro) {
        const progress = Math.min(1, (time - intro.time) / 1150)
        if (!intro.swapped && progress >= 0.46) {
          intro.swapped = true
          window.scrollTo({ top: choiceTop(), behavior: 'instant' })
        }
        if (progress === 1) {
          const focus = intro.focus
          cancel()
          if (focus) document.getElementById('choice-title')?.focus({ preventScroll: true })
          return
        }
      } else if (target !== null) {
        const distance = target - window.scrollY
        // Browsers round scroll positions; stop before subpixel rounding can stall.
        if (Math.abs(distance) < 1.5) {
          window.scrollTo({ top: target, behavior: 'instant' })
          return cancel()
        }
        const scale = clamp((time - (previousTime ?? time - 16.667)) / 16.667, 0.5, 2)
        window.scrollTo({ top: window.scrollY + distance * (1 - 0.89 ** scale), behavior: 'instant' })
      } else return
      lastScroll = window.scrollY
      previousTime = time
      frame = requestAnimationFrame(tick)
    }

    const beginChoice = (focus = false) => {
      if (!canEnter()) return false
      cancel()
      introUsed = true
      intro = { time: performance.now(), focus, swapped: false }
      document.documentElement.classList.add('is-transitioning-choice')
      frame = requestAnimationFrame(tick)
      return true
    }
    enterRef.current = beginChoice

    const nestedScroll = (element, delta) => {
      for (let node = element; node instanceof HTMLElement && node !== document.body; node = node.parentElement) {
        if (node.matches('dialog, [role="dialog"], textarea, select, [contenteditable]')) return true
        if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) &&
            node.scrollHeight > node.clientHeight &&
            (delta < 0 ? node.scrollTop > 0 : node.scrollTop + node.clientHeight < node.scrollHeight - 1)) return true
      }
      return false
    }

    const onWheel = (event) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || reduced.matches ||
          Math.abs(event.deltaX) > Math.abs(event.deltaY) || !event.deltaY || nestedScroll(event.target, event.deltaY)) return
      if (intro) {
        event.preventDefault()
        return
      }
      if (event.deltaY > 0 && canEnter()) {
        event.preventDefault()
        beginChoice()
        return
      }
      if (!pointer.matches) return
      const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1
      const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
      const next = clamp((target ?? window.scrollY) + event.deltaY * multiplier * 1.15,
        window.scrollY - window.innerHeight * 0.9, window.scrollY + window.innerHeight * 0.9)
      event.preventDefault()
      target = clamp(next, 0, maximum)
      if (frame === null) frame = requestAnimationFrame(tick)
    }

    const onKey = (event) => {
      if (event.defaultPrevented || event.ctrlKey || event.altKey || event.metaKey || event.target.closest(interactive)) return
      if (['ArrowDown', 'PageDown', ' '].includes(event.key) && !event.shiftKey && (intro || canEnter())) {
        event.preventDefault()
        if (!intro) beginChoice(true)
      } else if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Escape'].includes(event.key)) {
        cancel()
        if (event.key === 'End') introUsed = true
      }
    }
    const onTouchStart = (event) => {
      cancel()
      touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null
    }
    const onTouchMove = (event) => {
      if (!touchStart || event.touches.length !== 1 || reduced.matches) return
      const delta = touchStart.y - event.touches[0].clientY
      if (Math.abs(touchStart.x - event.touches[0].clientX) > Math.abs(delta) || nestedScroll(event.target, delta)) return
      if (intro) {
        if (event.cancelable) event.preventDefault()
      } else if (delta > 35 && canEnter()) {
        if (event.cancelable) event.preventDefault()
        beginChoice()
      }
    }
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      if (link.hash === '#choose' && canEnter()) return
      cancel()
      introUsed = true
    }
    const onScroll = () => {
      if (target !== null && lastScroll !== null && Math.abs(window.scrollY - lastScroll) > 2) cancel()
      if (!introUsed && window.scrollY >= choiceTop() - 8) introUsed = true
    }
    const onMotionChange = () => { cancel(); if (reduced.matches) introUsed = true }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('pointerdown', cancel, { passive: true })
    window.addEventListener('resize', cancel)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('click', onClick, true)
    reduced.addEventListener('change', onMotionChange)
    return () => {
      cancel()
      cancelRef.current = () => {}
      enterRef.current = () => false
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('pointerdown', cancel)
      window.removeEventListener('resize', cancel)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick, true)
      reduced.removeEventListener('change', onMotionChange)
    }
  }, [])

  return { stopScroll, enterChoice }
}
