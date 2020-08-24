import React from 'react'
import Carousel from 'src/components/Carousel'
import SlotMachine from 'src/components/SlotMachine'
import './style.scss'

export type HomeProps = unknown

const Home: React.FC<HomeProps> = () => {
  return (
    <div className="home">
      <SlotMachine>
        <Carousel></Carousel>
      </SlotMachine>
    </div>
  )
}

export default Home
