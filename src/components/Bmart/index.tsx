import React from 'react'
import './style.scss'
import Home from '../Home'
import Sale from '../Sale'
import Me from '../Me'

export type BmartProps = unknown

const Bmart: React.FC<BmartProps> = (props) => {
  return (
    <div className="bmart">
      <Home />
      <Sale />
      <Me />
    </div>
  )
}

export default Bmart
