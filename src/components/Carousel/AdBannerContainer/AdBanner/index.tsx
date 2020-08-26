import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

export type AdBannerProps = {
  color:
    | 'violet'
    | 'purple'
    | 'sky'
    | 'orange'
    | 'mint'
    | 'grass'
    | 'dark'
    | 'blue'
  index: number
  subtitle: string
  titleFirstLine: string
  titleSecondLine: string
  Graphic: React.FC
}

const AdBanner: React.FC<AdBannerProps> = ({
  color,
  subtitle,
  titleFirstLine,
  titleSecondLine,
  Graphic,
}) => {
  const sentinel = useRef<HTMLDivElement>()
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        setIsAnimated(entry.isIntersecting)
      }
    })

    observer.observe(sentinel.current)
  }, [])

  return (
    <div className="banner-wrapper">
      <div
        className={classNames('banner', color, {
          animate: isAnimated,
        })}
      >
        <div className="text">
          <h2 className="subtitle">{subtitle}</h2>
          <h1 className="title">
            <span dangerouslySetInnerHTML={{ __html: titleFirstLine }} />
            <span dangerouslySetInnerHTML={{ __html: titleSecondLine }} />
          </h1>
        </div>
        <Graphic />
        <div className="sentinel" ref={sentinel} />
      </div>
    </div>
  )
}

export default AdBanner
