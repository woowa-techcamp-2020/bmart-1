import React, { useEffect, useRef } from 'react'
import { $sel } from 'src/utils'
import './style.scss'

export type SlidePageProps = {
  pageName: 'home' | 'sale' | 'me'
}

const SlidePage: React.FC<SlidePageProps> = ({ children }) => {
  const slidePageRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const header = $sel('.header')

    const logoWrapper = $sel('.logo-wrapper')

    slidePageRef.current.addEventListener('scroll', () => {
      header.style.transition = ''
      header.style.transform = `translateY(${-Math.max(
        Math.min(slidePageRef.current.scrollTop, logoWrapper.clientHeight),
        0
      )}px)`
    })
  }, [])

  return (
    <div className="slide-page" ref={slidePageRef}>
      {children}
    </div>
  )
}

export default SlidePage
