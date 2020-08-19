import React, { createContext, useState } from 'react'
import AdBannerContainer from './AdBannerContainer'
import Dots from './Dots'
import './style.scss'

export const CarouselContext = createContext(
  {} as {
    totalNumber: number
    currentIndex: number
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  }
)

export type CarouselProps = unknown

const Carousel: React.FC<CarouselProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <div className="carousel">
      <CarouselContext.Provider
        value={{
          totalNumber: 8,
          currentIndex,
          setCurrentIndex,
        }}
      >
        <AdBannerContainer />
        <Dots />
      </CarouselContext.Provider>
    </div>
  )
}

export default Carousel
