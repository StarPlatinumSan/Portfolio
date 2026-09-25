import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

export function useSiteMotion(scope, pathKey) {
  const revealed = useRef(new WeakSet())

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity,clipPath' } })
        timeline
          .fromTo('[data-header-reveal]', { y: -16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
          .fromTo('[data-hero-kicker]', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.15)
          .fromTo('[data-hero-line]', { yPercent: 108 }, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.25)
          .fromTo('[data-hero-fade], [data-hero-focus]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.55)
          .fromTo('[data-hero-visual]', { clipPath: 'inset(0 0 100% 0)', y: 24, opacity: 0 }, { clipPath: 'inset(0 0 0% 0)', y: 0, opacity: 1, duration: 1 }, 0.3)
          .fromTo('[data-hero-status], [data-hero-scroll]', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.95)
      }, scope)
      return () => context.revert()
    })
    return () => media.revert()
  }, [scope])

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, scope)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return
          observer.unobserve(target)
          revealed.current.add(target)
          context.add(() => {
            const timeline = gsap.timeline({ defaults: { ease: 'power3.out', clearProps: 'transform,opacity,clipPath' } })
            const content = target.querySelectorAll('[data-reveal]')
            const visuals = target.querySelectorAll('[data-reveal-media]')
            if (content.length) timeline.fromTo(content, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.06 }, 0.08)
            if (visuals.length) timeline.fromTo(visuals, { y: 30, clipPath: 'inset(6% 0 6% 0)', opacity: 0 },
              { y: 0, clipPath: 'inset(0% 0 0% 0)', opacity: 1, duration: 1, stagger: 0.12 }, 0)
            if (target.id === 'choose') {
              timeline.fromTo('.choice-panel--creative', { x: -38, opacity: 0, clipPath: 'inset(0 12% 0 0)' },
                { x: 0, opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.1 }, 0.18)
              timeline.fromTo('.choice-panel--studio', { x: 38, opacity: 0, clipPath: 'inset(0 0 0 12%)' },
                { x: 0, opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.1 }, 0.3)
            }
          })
        })
      }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })
      scope.current.querySelectorAll('main section:not(#top)').forEach((section) => {
        if (!section.closest('[hidden]') && !revealed.current.has(section)) observer.observe(section)
      })
      return () => { observer.disconnect(); context.revert() }
    })
    return () => media.revert()
  }, [scope, pathKey])
}
