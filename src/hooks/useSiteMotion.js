import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useSiteMotion(scope, dependency) {
  useLayoutEffect(() => {
    if (!scope.current) return undefined

    const media = gsap.matchMedia()
    const context = gsap.context(() => {
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const entrance = gsap.timeline({
          delay: 0.08,
          defaults: { ease: 'power3.out' },
        })

        entrance
          .fromTo(
            '[data-header-reveal]',
            { y: -26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.82,
              clearProps: 'transform,opacity',
            },
          )
          .fromTo(
            '[data-hero-kicker]',
            { y: 18, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              clearProps: 'transform,opacity',
            },
            '-=0.48',
          )
          .fromTo(
            '[data-hero-line]',
            { yPercent: 112, rotate: 1.5 },
            {
              yPercent: 0,
              rotate: 0,
              duration: 0.92,
              stagger: 0.1,
              clearProps: 'transform',
            },
            '-=0.32',
          )
          .fromTo(
            '[data-hero-fade]',
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              stagger: 0.1,
              clearProps: 'transform,opacity',
            },
            '-=0.52',
          )
          .fromTo(
            '[data-hero-visual]',
            {
              y: 36,
              scale: 0.96,
              opacity: 0,
              clipPath: 'inset(0 0 100% 0)',
            },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              clipPath: 'inset(0% 0 0% 0)',
              duration: 1.05,
              clearProps: 'transform,opacity,clipPath',
            },
            '-=0.86',
          )
          .fromTo(
            '[data-hero-visual] img, [data-hero-visual] .media-placeholder',
            { scale: 1.1 },
            { scale: 1, duration: 1.15, clearProps: 'transform' },
            '<',
          )
          .fromTo(
            '[data-hero-focus], [data-hero-status], [data-hero-scroll]',
            { y: 16, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              stagger: 0.08,
              clearProps: 'transform,opacity',
            },
            '-=0.48',
          )

        ScrollTrigger.batch('[data-reveal]', {
          start: 'top 88%',
          once: true,
          onEnter: (elements) =>
            gsap.fromTo(
              elements,
              { y: 34, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.08,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              },
            ),
        })

        gsap.utils.toArray('[data-scroll-light]').forEach((light) => {
          const frame = light.parentElement
          const playSweep = () => {
            gsap.killTweensOf(light)

            gsap.fromTo(
              light,
              {
                xPercent: 0,
                x: () => -light.offsetWidth * 1.4,
              },
              {
                xPercent: 0,
                x: () => frame.clientWidth + light.offsetWidth * 0.4,
                duration: 1.45,
                ease: 'power2.inOut',
                overwrite: true,
              },
            )
          }

          ScrollTrigger.create({
            trigger: frame,
            start: 'top 88%',
            end: 'bottom 18%',
            onEnter: playSweep,
            onEnterBack: playSweep,
            invalidateOnRefresh: true,
          })
        })

        return () => entrance.kill()
      })
    }, scope)

    const refreshFrame = window.requestAnimationFrame(() =>
      ScrollTrigger.refresh(),
    )

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      media.revert()
      context.revert()
    }
  }, [scope, dependency])
}
