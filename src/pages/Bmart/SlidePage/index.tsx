import React, { useEffect, useRef } from 'react'
import './style.scss'

export type SlidePageProps = unknown

const SlidePage: React.FC<SlidePageProps> = ({ children }) => {
  const spSentinel = useRef<HTMLDivElement>()

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

    observer.observe(spSentinel.current)
  }, [])

  return (
    <div className="slide-page">
      <div className="sp-sentinel" ref={spSentinel} />
      {children}
    </div>
  )
}

export default SlidePage
