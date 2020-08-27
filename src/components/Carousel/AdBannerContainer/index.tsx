import React, { useContext, useEffect, useRef } from 'react'
import getState, { $sel, sanitizeNan } from 'src/utils'
import { CarouselContext } from '..'
import AdBanner, { AdBannerProps } from './AdBanner'
import Coupons from './banner-graphics/Coupons'
import Motorcycle from './banner-graphics/Motorcycle'
import Motorcycle2 from './banner-graphics/Motorcycle2'
import Motorcycle3 from './banner-graphics/Motorcycle3'
import Rain from './banner-graphics/Rain'
import './style.scss'

const colors = [
  'violet',
  'purple',
  'sky',
  'orange',
  'mint',
  'grass',
  'dark',
  'blue',
] as AdBannerProps['color'][]

const graphics = [
  Motorcycle,
  Coupons,
  Rain,
  Motorcycle2,
  Motorcycle3,
  Motorcycle,
  Motorcycle,
  Motorcycle,
]

const bannerInfo = [
  {
    subtitle: '주문하면 바로 배달 오는',
    titleFirstLine: '누구나',
    titleSecondLine: '<span>4천원</span> 할인',
  },
  {
    subtitle: '친구를 초대하면',
    titleFirstLine: '친구도 나도',
    titleSecondLine: '<span>5천원</span> 할인',
  },
  {
    subtitle: '지금 밖에 비와요!🌧',
    titleFirstLine: '우산은',
    titleSecondLine: '챙겼나요?',
  },
  {
    subtitle: '주문하면 바로 배달 오는',
    titleFirstLine: '누구나',
    titleSecondLine: '<span>4천원</span> 할인',
  },
  {
    subtitle: '언제든지',
    titleFirstLine: '당일배송으로',
    titleSecondLine: '달려갑니다',
  },
  {
    subtitle: '배민페이로 주문하면',
    titleFirstLine: '바로',
    titleSecondLine: '<span>3천원</span> 할인',
  },
  {
    subtitle: '반려동물 용품 할인 중!',
    titleFirstLine: '집사야 간식이',
    titleSecondLine: '먹고싶다옹',
  },
  {
    subtitle: '이불 밖은 위험해',
    titleFirstLine: '비 오는 날',
    titleSecondLine: '배달팁 0원!',
  },
]

function moveBannerTo(index: number, isAfterSwipe = false, max = 8) {
  const bannerContainer = $sel('.banner-container')

  if (isAfterSwipe) {
    bannerContainer.style.transition = 'transform 250ms ease-out'
  } else {
    bannerContainer.style.transition = ''
  }

  bannerContainer.style.transform = `translateX(${(index + 1) * -100}%)`

  if (index + 1 <= 0) {
    bannerContainer.parentElement.style.pointerEvents = 'none'

    setTimeout(() => {
      bannerContainer.style.transition = 'none'
      bannerContainer.style.transform = `translateX(${max * -100}%)`

      bannerContainer.parentElement.style.pointerEvents = ''
    }, 400)
  } else if (index + 1 > max) {
    bannerContainer.parentElement.style.pointerEvents = 'none'

    setTimeout(() => {
      bannerContainer.style.transition = 'none'
      bannerContainer.style.transform = `translateX(-100%)`

      bannerContainer.parentElement.style.pointerEvents = ''
    }, 400)
  }
}

export type AdBannerContainerProps = unknown

const AdBannerContainer: React.FC<AdBannerContainerProps> = () => {
  const { totalNumber, setCurrentIndex } = useContext(CarouselContext)

  const autoScrollInterval = useRef<number>(null)

  function startAutoScroll() {
    stopAutoScroll()

    autoScrollInterval.current = window.setInterval(() => {
      if (autoScrollInterval.current === null) return

      $sel('.banner-container').style.transition = ''
      setCurrentIndex((prev) => {
        const next = (prev + 1) % totalNumber

        moveBannerTo(prev + 1)

        return next
      })
    }, 3000)
  }

  function stopAutoScroll() {
    window.clearInterval(autoScrollInterval.current)
  }

  // Init the page after mounted
  useEffect(() => {
    container.current.style.transition = 'none'
    container.current.style.transform = 'translateX(-100%)'

    let isScrolling: number

    // Prevent banner auto scroll when scroll the page
    const slidePage = container.current.closest<HTMLElement>('.slide-page')

    function onScroll() {
      stopAutoScroll()

      window.clearTimeout(isScrolling)

      isScrolling = window.setTimeout(function () {
        // When scroll finished
        startAutoScroll()
      }, 66)
    }

    slidePage.addEventListener('scroll', onScroll, false)

    startAutoScroll()

    return () => {
      stopAutoScroll()
      window.clearTimeout(isScrolling)
      autoScrollInterval.current = null
      slidePage.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Clone first and last banner
  useEffect(() => {
    const firstBannerClone = container.current.firstElementChild.cloneNode(true)
    const lastBannerClone = container.current.lastElementChild.cloneNode(
      true
    ) as HTMLElement

    container.current.appendChild(firstBannerClone)
    container.current.prepend(lastBannerClone)
  }, [])

  useEffect(() => {
    const scrollWrapper = $sel('.banner-container-scroll-wrapper')
    const bannerContainer = $sel('.banner-container')

    let diffX: number
    let diffY: number
    let initX: number
    let initY: number

    let isVerticalScrollLocked: boolean

    scrollWrapper.addEventListener(
      'touchstart',
      (touchStartEvent: TouchEvent) => {
        container.current.style.transition = ''

        isVerticalScrollLocked = false

        diffX = 0
        diffY = 0

        const touch = touchStartEvent.touches[0]

        initX = touch.pageX
        initY = touch.pageY

        async function onTouchMove(e: TouchEvent) {
          const touch = e.touches[0]

          diffX = touch.pageX - initX
          diffY = touch.pageY - initY

          const slope = sanitizeNan(Math.abs(diffY / diffX))

          if (slope < 1 || isVerticalScrollLocked) {
            // Horizontal scroll
            isVerticalScrollLocked = true

            container.current.closest<HTMLElement>(
              '.slide-page'
            ).style.overflow = 'hidden'

            stopAutoScroll()

            touchStartEvent.preventDefault()

            const currentIndex = await getState(setCurrentIndex)

            bannerContainer.style.transition = 'none'
            bannerContainer.style.transform = `translateX(calc(${
              -100 * (currentIndex + 1)
            }% + ${diffX}px))`
          } else {
            // Vertical scroll
            scrollWrapper.removeEventListener('touchmove', onTouchMove)
            window.removeEventListener('touchend', onTouchEnd)
          }
        }

        function onTouchEnd() {
          if (diffX < 0) {
            setCurrentIndex((prev) => {
              moveBannerTo(prev + 1, true)

              return (prev + 1) % totalNumber
            })
          } else {
            setCurrentIndex((prev) => {
              moveBannerTo(prev - 1, true)

              return prev - 1 < 0 ? totalNumber - 1 : prev - 1
            })
          }

          container.current.closest<HTMLElement>('.slide-page').style.overflow =
            ''

          startAutoScroll()

          scrollWrapper.removeEventListener('touchmove', onTouchMove)
          window.removeEventListener('touchend', onTouchEnd)
        }

        scrollWrapper.addEventListener('touchmove', onTouchMove)
        window.addEventListener('touchend', onTouchEnd)
      }
    )
  }, [])

  const container = useRef<HTMLDivElement>()

  return (
    <div className="banner-container-scroll-wrapper">
      <div className="banner-container" ref={container}>
        {Array(totalNumber)
          .fill(undefined)
          .map((_, i) => (
            <AdBanner
              key={i}
              index={i}
              color={colors[i]}
              {...bannerInfo[i]}
              Graphic={graphics[i]}
            ></AdBanner>
          ))}
      </div>
    </div>
  )
}

export default AdBannerContainer
