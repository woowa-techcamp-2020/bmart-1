import React, { useEffect, useRef } from 'react'
import SlideTabs from 'src/pages/Bmart/SlideTabs'
import Home from './Home'
import Me from './Me'
import Sale from './Sale'
import SlidePage from './SlidePage'
import './style.scss'

export type BmartProps = unknown

const Bmart: React.FC<BmartProps> = (props) => {
  const slidePages = useRef<HTMLDivElement>()

  useEffect(() => {
    const indicator = document.querySelector<HTMLElement>('.indicator')

    const tabButtonLeftsAndWidths = Array.from(
      document.querySelectorAll<HTMLElement>('.tab-button')
    ).map((tabButton) => ({
      left: tabButton.offsetLeft,
      width: tabButton.clientWidth,
    }))

    function interpolate(
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

      const interpolatedLeft =
        leftsAndWidths[index].left +
        (scrollLeft - singlePageWidth * index) *
          ((leftsAndWidths[index + 1].left - leftsAndWidths[index].left) /
            singlePageWidth) -
        15

      const interpolatedWidth =
        leftsAndWidths[index].width +
        (scrollLeft - singlePageWidth * index) *
          ((leftsAndWidths[index + 1].width - leftsAndWidths[index].width) /
            singlePageWidth) +
        30

      return {
        left: interpolatedLeft,
        width: interpolatedWidth,
      }
    }

    function processInterpolation() {
      const interpolated = interpolate(
        3,
        tabButtonLeftsAndWidths,
        slidePages.current.scrollWidth,
        slidePages.current.scrollLeft
      )

      indicator.style.left = `${interpolated.left}px`
      indicator.style.width = `${interpolated.width}px`
    }

    function onScroll() {
      processInterpolation()
    }

    slidePages.current.addEventListener('scroll', onScroll)

    // Init
    processInterpolation()
  }, [])

  return (
    <div className="bmart">
      <SlideTabs />
      <div className="slide-pages" ref={slidePages}>
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
