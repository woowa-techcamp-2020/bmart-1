import React, { useEffect, useRef } from 'react'
import { $sel } from 'src/utils'
import { memoScroll } from 'src/utils/scroll-manager'
import './style.scss'

export type SlidePageProps = {
  pageName: 'home' | 'sale' | 'me'
}

const SlidePage: React.FC<SlidePageProps> = ({ children, pageName }) => {
  const slidePageRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const header = $sel('.header')

    const logoWrapper = $sel('.logo-wrapper')

    function onScroll() {
      const path = window.location.pathname.replace('/', '') || 'home'

      if (path !== pageName) {
        return
      }

      header.style.transition = ''
      header.style.transform = `translateY(${-Math.max(
        Math.min(slidePageRef.current.scrollTop, logoWrapper.clientHeight),
        0
      )}px)`
    }

    slidePageRef.current.addEventListener('scroll', onScroll)

    return () => {
      slidePageRef.current.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      className="slide-page"
      ref={slidePageRef}
      onScroll={(e) => {
        memoScroll(`/${pageName}`, e.currentTarget.scrollTop, 'top')
      }}
    >
      {children}
    </div>
  )
}

export default SlidePage
