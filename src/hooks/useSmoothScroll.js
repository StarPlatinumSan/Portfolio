import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    if (reducedMotion.matches) {
      ScrollTrigger.refresh()
      return undefined
    }

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
    })

    const updateScroll = () => ScrollTrigger.update()
    const frame = (time) => lenis.raf(time * 1000)
    const refresh = () => ScrollTrigger.refresh()
    let active = true

    lenis.on('scroll', updateScroll)
    gsap.ticker.add(frame)
    gsap.ticker.lagSmoothing(0)
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(() => {
      if (active) refresh()
    })

    return () => {
      active = false
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(frame)
      lenis.off('scroll', updateScroll)
      lenis.destroy()
    }
  }, [])
}
