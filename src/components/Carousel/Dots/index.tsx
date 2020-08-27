import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import { CarouselContext } from '..'
import { moveBannerTo } from '../AdBannerContainer'
import './style.scss'

export type DotsProps = unknown

const Dots: React.FC<DotsProps> = () => {
  const { totalNumber, currentIndex, setCurrentIndex } = useContext(
    CarouselContext
  )

  const [isTraveling, setIsTraveling] = useState(false)

  return (
    <div className="carousel-dots">
      <div
        className={classNames('dots-container', {
          traveling: isTraveling,
        })}
        onPointerEnter={() => {
          setIsTraveling(true)
        }}
        onPointerLeave={() => {
          setIsTraveling(false)
        }}
      >
        {Array(totalNumber)
          .fill(undefined)
          .map((_, i) => (
            <div
              className="dot-wrapper"
              key={i}
              onPointerEnter={() => {
                moveBannerTo(i)
                setCurrentIndex(i)
              }}
            >
              <div
                className={classNames('dot', {
                  current: i === currentIndex,
                })}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Dots
