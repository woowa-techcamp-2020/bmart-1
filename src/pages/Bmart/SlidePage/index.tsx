import React, { useEffect, useRef } from 'react'
import './style.scss'

export const spVerticalScrollSentinelClassName = 'sp-vertical-scroll-sentinel'
export const spHorizontalScrollSentinelClassName =
  'sp-horizontal-scroll-sentinel'

export type SlidePageProps = {
  pageName: 'home' | 'sale' | 'me'
}

  const spVerticalScrollSentinel = useRef<HTMLDivElement>()
  const spHorizontalScrollSentinel = useRef<HTMLDivElement>()


  useEffect(() => {
    const header = document.querySelector<HTMLElement>('.header')

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          header.style.transition = 'transform 300ms ease'
          header.style.transform = `translate3d(0, ${-header.querySelector(
            '.logo-wrapper'
          ).clientHeight}px, 0)`
        } else {
          header.style.transition = 'transform 300ms ease'
          header.style.transform = `translate3d(0, 0, 0)`
        }
      }
    })

    function observeAll() {
      observer.observe(spVerticalScrollSentinel.current)
      observer.observe(spHorizontalScrollSentinel.current)
    }

    observeAll()
  }, [])

  return (
    <div className="slide-page">
      <div
        className={spHorizontalScrollSentinelClassName}
        ref={spHorizontalScrollSentinel}
      />
      <div
        className={spVerticalScrollSentinelClassName}
        ref={spVerticalScrollSentinel}
      />
      {children}
    </div>
  )
}

export default SlidePage
