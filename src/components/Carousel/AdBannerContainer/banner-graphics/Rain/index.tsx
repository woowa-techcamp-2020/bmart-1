import React from 'react'
import UmbrellaBg from 'src/assets/images/banners/umbrella-background.png'
import Umbrella from 'src/assets/images/banners/umbrella.png'
import './style.scss'

export type RainProps = unknown

const Rain: React.FC<RainProps> = () => {
  return (
    <div className="banner-graphic-rain">
      <img src={UmbrellaBg} className="umbrella-bg" />
      <img src={Umbrella} className="umbrella" />
    </div>
  )
}

export default Rain
