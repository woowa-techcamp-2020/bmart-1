import classNames from 'classnames'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { CarouselContext } from '..'
import './style.scss'

export type DotsProps = unknown

const Dots: React.FC<DotsProps> = (props) => {
  const { totalNumber, currentIndex } = useContext(CarouselContext)

  const dotsContainer = useRef<HTMLDivElement>()
  const [isTraveling, setIsTraveling] = useState(false)

  useEffect(() => {
    dotsContainer.current.addEventListener('pointerdown', () => {
      setIsTraveling(true)
    })
  }, [])

  return (
    <div className="carousel-dots">
      <div
        ref={dotsContainer}
        className={classNames('dots-container', {
          traveling: isTraveling,
        })}
      >
        {Array(totalNumber)
          .fill(undefined)
          .map((_, i) => (
            <div
              key={i}
              className={classNames('dot', {
                current: i === currentIndex,
              })}
            ></div>
          ))}
      </div>
    </div>
  )
}

export default Dots
