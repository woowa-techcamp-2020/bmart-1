import React, { useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { $$sel, $sel, sanitizeNan } from 'src/utils'
import { useSigned } from 'src/utils/hooks'
import Header from './Header'
import Home from './Home'
import Me from './Me'
import Sale from './Sale'
import SlidePage from './SlidePage'
import './style.scss'

export function pathToIndex(path: string): number {
  return path === '' ? 0 : path === 'sale' ? 1 : path === 'me' ? 2 : 0
}

export function indexToPath(index: number): string {
  return index === 0 ? '' : index === 1 ? 'sale' : index === 2 ? 'me' : ''
}

export const navigateSlidePageTo = (
  index: number,
  time = '400ms',
  cubicBezier = 'cubic-bezier(0.59, 0.04, 0.31, 1)',
  pushState = true
): void => {
  const slidePagesScrollWrapper = $sel('.slide-pages-scroll-wrapper')
  const slidePages = $$sel('.slide-page')
  const slideTabs = $$sel('.slide-tabs .tab-button')
  const indicator = $sel('.indicator')
  const header = $sel('.header')
  const logoWrapper = $sel('.logo-wrapper')

  slidePages.forEach((slidePage) => {
    slidePage.style.transition = `transform ${time} ${cubicBezier}`
  })

  const correctIndex = Math.min(Math.max(index, 0), slidePages.length - 1)

  indicator.style.transition = `width ${time} ${cubicBezier}, left ${time} ${cubicBezier}`
  indicator.style.left = `${slideTabs[correctIndex].offsetLeft - 15}px`
  indicator.style.width = `${slideTabs[correctIndex].clientWidth + 30}px`
  indicator.classList.add('ready')

  slidePages.forEach((slidePage, i) => {
    slidePage.style.transform =
      i - correctIndex === 0 ? '' : `translateX(${(i - correctIndex) * 100}%)`
  })

  header.style.transition = `transform ${time} ${cubicBezier}`
  header.style.transform = `translateY(${-Math.min(
    slidePages[correctIndex].scrollTop,
    logoWrapper.clientHeight
  )}px)`

  slidePagesScrollWrapper.setAttribute(
    'data-current-page-index',
    correctIndex.toString()
  )

  // const currentPath = window.location.pathname.replace('/', '')
  // const newPath = indexToPath(index)

  // if (pushState && currentPath !== newPath) {
  //   window.history.pushState(null, null, `/${newPath}`)
  // }
}

export function interpolate(
  prev: number,
  next: number,
  scrollLeft: number,
  singlePageWidth: number,
  index: number,
  extra = 0
): number {
  return prev + scrollLeft * ((next - prev) / singlePageWidth) + extra
}

export type BmartProps = {
  path?: 'home' | 'sale' | 'me'
}

const Bmart: React.FC<BmartProps> = ({ path }) => {
  const slidePagesWrapper = useRef<HTMLDivElement>()
  const location = useLocation()
  const history = useHistory()
  const { signIn } = useSigned()

  useEffect(() => {
    const path = location.pathname.replace('/', '')

    if (path === 'verified') {
      const token = new URLSearchParams(location.search).get('token')

      signIn(token)

      // TODO: replace to lastly visited page
      history.replace('/')

      return
    }

    const index = pathToIndex(path)

    navigateSlidePageTo(index, '0', undefined, false)
  }, [location])

  useEffect(() => {
    const logoWrapper = $sel('.logo-wrapper')
    const slidePagesScrollWrapper = $sel('.slide-pages-scroll-wrapper')
    const slidePages = $$sel('.slide-page')
    const indicator = $sel('.indicator')
    const slideTabs = $$sel('.slide-tabs .tab-button')
    const header = $sel('.header')

    const bannedElementQueries = [
      '.carousel',
      '.topic-container .scroll-container',
    ]

    let initTime: number
    let initX = 0
    let initY = 0
    let diffX = 0
    let diffY = 0
    let currentPageIndex = 0
    let touchStartEvent: TouchEvent
    let isVerticalScrollLocked = false

    const onTouchStart = async (e: TouchEvent) => {
      touchStartEvent = e

      const target = e.target

      // Banned list to prevent page move
      if (!(target instanceof HTMLElement)) {
        return
      }

      for (const banned of bannedElementQueries) {
        if (target.closest(banned)) {
          return
        }
      }

      const touch = e.touches[0]

      initTime = new Date().getTime()

      initX = touch.pageX
      initY = touch.pageY

      diffX = 0
      diffY = 0

      currentPageIndex =
        parseInt(
          slidePagesScrollWrapper.getAttribute('data-current-page-index')
        ) || 0

      slidePages.forEach((slidePage) => {
        slidePage.style.transition = ''
      })

      slidePagesWrapper.current.addEventListener('touchmove', onTouchMove)

      window.addEventListener('touchend', onTouchEnd)
    }

    function onTouchMove(e: TouchEvent) {
      const touch = e.touches[0]

      const newX = touch.pageX
      const newY = touch.pageY

      diffX = newX - initX
      diffY = newY - initY

      const slope = sanitizeNan(Math.abs(diffY / diffX))

      if (slope < 1 || isVerticalScrollLocked) {
        // Horizontal scroll
        isVerticalScrollLocked = true

        const movementX =
          diffX *
          ((diffX > 0 && currentPageIndex === 0) ||
          (diffX < 0 && currentPageIndex === 2)
            ? 1 / 2
            : 1)

        slidePages.forEach((slidePage, i) => {
          slidePage.style.transform = `translateX(calc(${
            (i - currentPageIndex) * 100
          }% + ${movementX}px))`
        })

        const snapAmount = 50

        const interpolatedIndicatorWidth = interpolate(
          slideTabs[currentPageIndex].clientWidth,
          movementX < 0
            ? currentPageIndex === slidePages.length - 1
              ? slideTabs[slideTabs.length - 1].clientWidth - snapAmount
              : slideTabs[currentPageIndex + 1].clientWidth
            : currentPageIndex === 0
            ? slideTabs[0].clientWidth - snapAmount
            : slideTabs[currentPageIndex - 1].clientWidth,
          Math.abs(movementX),
          slidePagesWrapper.current.clientWidth,
          currentPageIndex,
          30
        )

        const interpolatedIndicatorLeft = interpolate(
          slideTabs[currentPageIndex].offsetLeft,
          movementX < 0
            ? currentPageIndex === slidePages.length - 1
              ? slideTabs[slidePages.length - 1].offsetLeft + snapAmount
              : slideTabs[currentPageIndex + 1].offsetLeft
            : currentPageIndex === 0
            ? slideTabs[0].offsetLeft
            : slideTabs[currentPageIndex - 1].offsetLeft,
          Math.abs(movementX),
          slidePagesWrapper.current.clientWidth,
          currentPageIndex,
          -15
        )

        indicator.style.cssText = `left: ${interpolatedIndicatorLeft}px; width: ${interpolatedIndicatorWidth}px;`

        const interpolcatedHeaderTransformY = interpolate(
          Math.min(
            slidePages[currentPageIndex].scrollTop,
            logoWrapper.clientHeight
          ),
          movementX < 0
            ? currentPageIndex === slidePages.length - 1 // move to right
              ? Math.min(
                  slidePages[currentPageIndex].scrollTop,
                  logoWrapper.clientHeight
                ) // from last page to right
              : Math.min(
                  slidePages[currentPageIndex + 1].scrollTop,
                  logoWrapper.clientHeight
                )
            : currentPageIndex === 0 // move to left
            ? Math.min(
                slidePages[currentPageIndex].scrollTop,
                logoWrapper.clientHeight
              ) // from the first page to left
            : Math.min(
                slidePages[currentPageIndex - 1].scrollTop,
                logoWrapper.clientHeight
              ),
          Math.abs(movementX),
          slidePagesWrapper.current.clientWidth,
          currentPageIndex
        )

        header.style.transition = ''
        header.style.transform = `translateY(${-interpolcatedHeaderTransformY}px)`

        touchStartEvent.preventDefault()
        e.preventDefault()

        return
      } else {
        // Vertical scroll
        slidePagesWrapper.current.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)
      }
    }

    async function onTouchEnd() {
      const diffTime = new Date().getTime() - initTime

      const velocity = Math.abs(diffX / diffTime)

      slidePagesWrapper.current.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', this)

      const transitionTime = Math.max(Math.min(150 / velocity, 800), 200)

      const newIndex =
        diffX < 0
          ? Math.min(currentPageIndex + 1, 2)
          : diffX > 0
          ? Math.max(currentPageIndex - 1, 0)
          : currentPageIndex

      navigateSlidePageTo(
        newIndex,
        `${transitionTime}ms`,
        'cubic-bezier(0, 0.05, 0.38, 1)'
      )
      history.push(indexToPath(newIndex))
    }

    slidePagesWrapper.current.addEventListener('touchstart', onTouchStart)

    return () => {
      window.removeEventListener('touchend', onTouchEnd)
      slidePagesWrapper.current.removeEventListener('touchstart', onTouchStart)
      slidePagesWrapper.current.removeEventListener('touchmove', onTouchMove)
      slidePagesWrapper.current.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  useEffect(() => {
    const onResize = () => {
      const path = window.location.pathname.replace('/', '')

      navigateSlidePageTo(pathToIndex(path))
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="bmart">
      <Header />
      <div className="slide-pages-scroll-wrapper" ref={slidePagesWrapper}>
        <SlidePage pageName="home">
          <Home />
        </SlidePage>
        <SlidePage pageName="sale">
          <Sale />
        </SlidePage>
        <SlidePage pageName="me">
          <Me />
        </SlidePage>
      </div>
    </div>
  )
}

export default Bmart
