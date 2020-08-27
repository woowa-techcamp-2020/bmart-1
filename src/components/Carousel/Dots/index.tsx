import classNames from 'classnames'
import React, { useContext } from 'react'
import { CarouselContext } from '..'
import './style.scss'

export type DotsProps = unknown

const Dots: React.FC<DotsProps> = () => {
  const { totalNumber, currentIndex } = useContext(CarouselContext)

  return (
    <div className="carousel-dots">
      <div className={classNames('dots-container')}>
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
