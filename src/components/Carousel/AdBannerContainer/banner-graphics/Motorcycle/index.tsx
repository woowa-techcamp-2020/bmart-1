import React from 'react'
import MotorcycleLightImage from 'src/assets/images/banners/motorcycle-light.png'
import MotorcycleImage from 'src/assets/images/banners/motorcycle.png'
import './style.scss'

export type MotorcycleProps = unknown

const Motorcycle: React.FC<MotorcycleProps> = () => {
  return (
    <div className="banner-motorcycle">
      <img src={MotorcycleImage} className="body" alt="body" />
      <img src={MotorcycleLightImage} className="light" alt="light" />
    </div>
  )
}

export default Motorcycle
