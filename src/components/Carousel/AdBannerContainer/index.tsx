import React, { useContext, useEffect, useRef } from 'react'
import { CarouselContext } from '..'
import AdBanner, { AdBannerProps } from './AdBanner'
import './style.scss'

const colors = [
  'violet',
  'purple',
  'orange',
  'mint',
  'grass',
  'dark',
  'sky',
  'blue',
] as AdBannerProps['color'][]

export type AdBannerContainerProps = unknown

const AdBannerContainer: React.FC<AdBannerContainerProps> = (props) => {
  const { totalNumber, setCurrentIndex } = useContext(CarouselContext)
  const isAutoTransitioning = useRef(false)
  const intervalTimeout = useRef<number>(null)

  const container = useRef<HTMLDivElement>()

  useEffect(() => {
    const loop = () => {
      setCurrentIndex((currentIndex) => {
        const firstAdBanner = container.current.querySelector<HTMLDivElement>(
          '.ad-banner'
        )
        const nextAdBanner =
          container.current.querySelectorAll<HTMLDivElement>('.ad-banner')[
            currentIndex + 1
          ] || firstAdBanner

        isAutoTransitioning.current = true

        container.current.scrollTo({
          left: nextAdBanner.offsetLeft - firstAdBanner.offsetLeft,
          behavior: 'smooth',
        })

        setTimeout(() => {
          isAutoTransitioning.current = false
        }, 500)

        return currentIndex
      })
    }

    const interval = 2000

    intervalTimeout.current = window.setInterval(loop, interval)

    const revertInterval = () => {
      if (!intervalTimeout.current) {
        loop()

        intervalTimeout.current = window.setInterval(loop, interval)
      }
    }

    const resetInterval = (e: MouseEvent | TouchEvent) => {
      if (isAutoTransitioning.current) {
        e.preventDefault()
      }

      clearInterval(intervalTimeout.current)
      intervalTimeout.current = null
    }

    container.current.addEventListener('mouseenter', resetInterval)

    container.current.addEventListener('touchstart', resetInterval)

    container.current.addEventListener('mouseleave', revertInterval)

    let isScrolling = null

    container.current.addEventListener(
      'scroll',
      () => {
        window.clearTimeout(isScrolling)

        isScrolling = setTimeout(() => {
          revertInterval()
        }, 1000)
      },
      false
    )
  }, [])

  return (
    <div className="ad-banner-container-scroll-wrapper">
      <div className="ad-banner-container" ref={container}>
        {Array(totalNumber)
          .fill(undefined)
          .map((_, i) => (
            <AdBanner key={i} index={i} color={colors[i]} />
          ))}
      </div>
    </div>
  )
}

export default AdBannerContainer
