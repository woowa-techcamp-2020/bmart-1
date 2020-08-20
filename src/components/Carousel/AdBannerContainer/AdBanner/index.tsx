import classNames from 'classnames'
import React, { useContext, useEffect, useRef } from 'react'
import { CarouselContext } from '../..'
import './style.scss'

export type AdBannerProps = {
  color: 'violet' | 'purple' | 'sky' | 'orange' | 'mint' | 'grass' | 'dark' | 'blue'
  index: number
}

const AdBanner: React.FC<AdBannerProps> = ({ color, index }) => {
  const { setCurrentIndex } = useContext(CarouselContext)

  const sentinel = useRef<HTMLDivElement>()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setCurrentIndex(index)
        }
      }
    })

    observer.observe(sentinel.current)
  }, [])

  return (
    <div className={classNames('ad-banner', color)}>
      <div className="text">
        <h2 className="subtitle">주문하면 바로 배달 오는</h2>
        <h1 className="title">
          누구나
          <br />
          4천원 할인
        </h1>
      </div>
      <div className="sentinel" ref={sentinel} />
    </div>
  )
}

export default AdBanner
