import React from 'react'
import DriverTop from 'src/assets/images/banners/driver-top.png'
import Track from 'src/assets/images/banners/track.png'
import './style.scss'

export type Motorcycle3Props = unknown

const Motorcycle3: React.FC<Motorcycle3Props> = () => {
  return (
    <div className="banner-graphic-motorcycle3">
      <img src={DriverTop} className="driver-top" />
      <img src={Track} className="track" />
    </div>
  )
}

export default Motorcycle3
