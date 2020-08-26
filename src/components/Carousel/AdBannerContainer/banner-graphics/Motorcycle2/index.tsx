import React from 'react'
import Driver from 'src/assets/images/banners/driver.png'
import './style.scss'

export type Motorcycle2Props = unknown

const Motorcycle2: React.FC<Motorcycle2Props> = () => {
  return (
    <div className="banner-graphic-motorcycle2">
      <img src={Driver} className="driver" alt="driver" />
    </div>
  )
}

export default Motorcycle2
