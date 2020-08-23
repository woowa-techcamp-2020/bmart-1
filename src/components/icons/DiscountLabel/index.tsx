import React from 'react'
import './style.scss'

export type DiscountLabelPropsSize = 'small' | 'big'

export type DiscountLabelProps = {
  size: DiscountLabelPropsSize
  discount: number
}

const DiscountLabel: React.FC<DiscountLabelProps> = ({
  size = 'small',
  discount = 0,
}) => {
  return (
    <div className={`discount-label ${size}`}>
      <span className="discount-percentage">{discount}%</span>
    </div>
  )
}

export default DiscountLabel
