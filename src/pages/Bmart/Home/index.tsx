import React from 'react'
import Carousel from 'src/components/Carousel'
import './style.scss'

export type HomeProps = unknown

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <Carousel></Carousel>
    </div>
  )
}

export default Home
