import React from 'react'
import './style.scss'

export type DiscountLabelProps = {
  size: string
  discountPercentage: number
}

const DiscountLabel: React.FC<DiscountLabelProps> = ({ size, discountPercentage }) => {
  return (
    <div className={`discount-label ${size}`}>
      <span className="discount-percentage">{discountPercentage}%</span>
    </div>
  )
}

export default DiscountLabel
