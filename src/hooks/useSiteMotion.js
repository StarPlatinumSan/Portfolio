import { useLayoutEffect } from 'react'
import gsap from 'gsap'

export function useSiteMotion(scope, activeFloorId) {
  useLayoutEffect(() => {
    if (!scope.current || !activeFloorId) return undefined

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    const floor = document.getElementById(activeFloorId)
    if (!floor) return undefined

    if (reducedMotionQuery.matches) return undefined

    const context = gsap.context(() => {
      gsap.set(floor, { opacity: 1 })

      const timeline = gsap.timeline({
        delay: activeFloorId === 'top' ? 0 : 0.16,
        defaults: { ease: 'power3.out' },
      })
      const content = floor.querySelectorAll('[data-floor-animate]')
      const media = floor.querySelectorAll('[data-floor-media]')
      const afterMedia = floor.querySelectorAll('[data-floor-after-media]')

      if (activeFloorId === 'top') {
        timeline
          .fromTo(
            '[data-header-reveal]',
            { y: -22, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.68,
              clearProps: 'transform,opacity',
            },
          )
          .fromTo(
            '[data-hero-kicker]',
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              clearProps: 'transform,opacity',
            },
            '-=0.36',
          )
          .fromTo(
            '[data-hero-line]',
            { yPercent: 108, rotate: 1.2 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 0.82,
              stagger: 0.09,
              clearProps: 'transform',
            },
            '-=0.24',
          )
          .fromTo(
            '[data-hero-fade], [data-hero-focus]',
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              stagger: 0.07,
              clearProps: 'transform,opacity',
            },
            '-=0.46',
          )
          .fromTo(
            '[data-hero-visual]',
            { y: 30, scale: 0.97, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.92,
              clearProps: 'transform,opacity,clipPath',
            },
            '-=0.72',
          )
          .fromTo(
            '[data-hero-status], [data-hero-scroll]',
            { y: 14, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.06,
              clearProps: 'transform,opacity',
            },
            '-=0.38',
          )

        return
      }

      if (media.length) {
        timeline.fromTo(
          media,
          { y: 34, scale: 0.985, opacity: 0, clipPath: 'inset(7% 0 7% 0)' },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            clipPath: 'inset(0% 0 0% 0)',
            duration: 0.82,
            stagger: 0.08,
            clearProps: 'transform,opacity,clipPath',
          },
        )
      }

      if (content.length) {
        timeline.fromTo(
          content,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.62,
            stagger: 0.065,
            clearProps: 'transform,opacity',
          },
          media.length ? '-=0.56' : 0,
        )
      }

      if (afterMedia.length) {
        timeline.to(
          afterMedia,
          {
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          '+=0.04',
        )
      }
    }, scope)

    const stopMotion = (event) => {
      if (event.matches) context.revert()
    }

    reducedMotionQuery.addEventListener('change', stopMotion)

    return () => {
      reducedMotionQuery.removeEventListener('change', stopMotion)
      context.revert()
    }
  }, [scope, activeFloorId])
}
