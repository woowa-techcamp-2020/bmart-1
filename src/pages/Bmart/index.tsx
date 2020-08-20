import React, { useEffect, useRef } from 'react'
import Header from './Header'
import Home from './Home'
import Me from './Me'
import Sale from './Sale'
import SlidePage from './SlidePage'
import './style.scss'

export type BmartProps = unknown

const Bmart: React.FC<BmartProps> = (props) => {
  const slidePagesWrapper = useRef<HTMLDivElement>()

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

    slidePagesWrapper.current.addEventListener('scroll', processInterpolation)

    // Init
    processInterpolation()
    indicator.classList.add('ready')
  }, [])

  return (
    <div className="bmart">
      <Header />
      <div className="slide-pages" ref={slidePagesWrapper}>
        <SlidePage>
          <Home />
        </SlidePage>
        <SlidePage>
          <Sale />
        </SlidePage>
        <SlidePage>
          <Me />
        </SlidePage>
      </div>
    </div>
  )
}

export default Bmart
