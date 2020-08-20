import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import getState from 'src/utils'
import Header from './Header'
import Home from './Home'
import Me from './Me'
import Sale from './Sale'
import SlidePage, { spVerticalScrollSentinelClassName } from './SlidePage'
import './style.scss'

export type BmartProps = unknown

const Bmart: React.FC<BmartProps> = () => {
  const slidePagesWrapper = useRef<HTMLDivElement>()

  const location = useLocation()

  useEffect(() => {
    const path = location.pathname.replace('/', '')
    const index = path === '' ? 0 : path === 'sale' ? 1 : path === 'me' ? 2 : 0

    slidePagesWrapper.current.scrollTo({
      left: (slidePagesWrapper.current.scrollWidth / 3) * index,
    })
  }, [location])

  useEffect(() => {
    const indicator = document.querySelector<HTMLElement>('.indicator')
    const header = document.querySelector<HTMLElement>('.header')
    const logoWrapper = header.querySelector<HTMLElement>('.logo-wrapper')

    const slidePages = Array.from(
      document.querySelectorAll<HTMLElement>('.slide-page')
    )
    const tabButtons = Array.from(
      document.querySelectorAll<HTMLElement>('.tab-button')
    )
    const tabButtonLeftsAndWidths = tabButtons.map((tabButton) => ({
      left: tabButton.offsetLeft,
      width: tabButton.clientWidth,
    }))

    function interpolate(
      prev: number,
      next: number,
      scrollLeft: number,
      singlePageWidth: number,
      index: number,
      extra = 0
    ): number {
      return (
        prev +
        (scrollLeft - singlePageWidth * index) *
          ((next - prev) / singlePageWidth) +
        extra
      )
    }

    function interpolateLeftsAndWidths(
      pagesCount: number,
      leftsAndWidths: {
        left: number
        width: number
      }[],
      scrollWidth: number,
      scrollLeft: number
    ): {
      left: number
      width: number
    } {
      const singlePageWidth = scrollWidth / pagesCount
      const calculatedIndex = Math.floor(scrollLeft / singlePageWidth)
      const index =
        calculatedIndex < 0
          ? 0
          : calculatedIndex >= pagesCount - 1
          ? calculatedIndex - 1
          : calculatedIndex

      const interpolatedLeft = interpolate(
        leftsAndWidths[index].left,
        leftsAndWidths[index + 1].left,
        scrollLeft,
        singlePageWidth,
        index,
        -15
      )

      const interpolatedWidth = interpolate(
        leftsAndWidths[index].width,
        leftsAndWidths[index + 1].width,
        scrollLeft,
        singlePageWidth,
        index,
        30
      )

      const interpolatedHeaderY = interpolate(
        slidePages[index]
          .querySelector(`.${spVerticalScrollSentinelClassName}`)
          .getBoundingClientRect().top < 0
          ? 0
          : logoWrapper.clientHeight,
        slidePages[index + 1]
          .querySelector(`.${spVerticalScrollSentinelClassName}`)
          .getBoundingClientRect().top < 0
          ? 0
          : logoWrapper.clientHeight,
        scrollLeft,
        singlePageWidth,
        index
      )

      header.style.transition = ''
      header.style.transform = `translate3d(0, ${
        -logoWrapper.clientHeight + interpolatedHeaderY
      }px, 0)`

      return {
        left: interpolatedLeft,
        width: interpolatedWidth,
      }
    }

    function processInterpolation() {
      const interpolated = interpolateLeftsAndWidths(
        slidePages.length,
        tabButtonLeftsAndWidths,
        slidePagesWrapper.current.scrollWidth,
        slidePagesWrapper.current.scrollLeft
      )

      indicator.style.left = `${interpolated.left}px`
      indicator.style.width = `${interpolated.width}px`
    }

    // slidePagesWrapper.current.addEventListener('scroll', processInterpolation)

    // Init
    processInterpolation()
    indicator.classList.add('ready')
  }, [])

  const [currentPageIndex, setCurrentPageIndex] = useState(0)

  useEffect(() => {
    slidePagesWrapper.current.addEventListener('touchstart', async (e) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.classList.contains('slide-page')
      ) {
        return
      }

      let isVerticalScrollLocked = false

      const touch = e.touches[0]

      const initTime = new Date().getTime()

      const initX = touch.pageX
      const initY = touch.pageY

      let diffX = 0
      let diffY = 0

      const currentPageIndex = await getState(setCurrentPageIndex)

      function onTouchMove(e: TouchEvent) {
        const touch = e.touches[0]

        const newX = touch.pageX
        const newY = touch.pageY

        diffX = newX - initX
        diffY = newY - initY

        const slope = Math.abs(diffY / diffX)

        if (slope < 0.7 || isVerticalScrollLocked) {
          // Horizontal scroll
          isVerticalScrollLocked = true

          slidePagesWrapper.current.style.transition = ``
          slidePagesWrapper.current.style.transform = `translateX(calc(${
            currentPageIndex * -100
          }% + ${diffX}px))`

          e.preventDefault()

          return
        } else {
          // Vertical scroll
          slidePagesWrapper.current.removeEventListener(
            'touchmove',
            onTouchMove
          )
          window.removeEventListener('touchend', onTouchEnd)
        }
      }

      slidePagesWrapper.current.addEventListener('touchmove', onTouchMove)

      async function onTouchEnd() {
        const diffTime = new Date().getTime() - initTime

        const velocity = Math.abs(diffX / diffTime)

        slidePagesWrapper.current.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('touchend', onTouchEnd)

        const transitionTime = Math.max(Math.min(150 / velocity, 500), 200)

        slidePagesWrapper.current.style.transition = `transform ${transitionTime}ms ease-out`

        const currentPageIndex = await getState(setCurrentPageIndex)

        const newIndex =
          diffX < 0
            ? currentPageIndex + 1
            : diffX > 0
            ? currentPageIndex - 1
            : currentPageIndex

        if (newIndex < 0) {
          slidePagesWrapper.current.style.transform = `translateX(0%)`
        } else if (newIndex > 2) {
          slidePagesWrapper.current.style.transform = `translateX(-200%)`
        } else {
          setCurrentPageIndex(newIndex)
        }
      }

      window.addEventListener('touchend', onTouchEnd)
    })
  }, [])

  return (
    <div className="bmart">
      <Header />
      <div
        className="slide-pages-scroll-wrapper"
        ref={slidePagesWrapper}
        style={{
          transform: `translateX(-${100 * currentPageIndex}%)`,
        }}
      >
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
