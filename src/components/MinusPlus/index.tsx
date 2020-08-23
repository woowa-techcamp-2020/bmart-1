import React from 'react'
import './style.scss'

export type MinusPlusProps = {
  quantity: number
  onChange: (quantity: number) => void
}

const MinusPlus: React.FC<MinusPlusProps> = ({ quantity = 1, onChange }) => {
  function changeQuantity(value) {
    if (value !== 0) {
      onChange(value)
    }
  }

  return (
    <div className="minus-plus">
      <div onClick={() => changeQuantity(quantity - 1)}>-</div>
      <div>{quantity}</div>
      <div onClick={() => changeQuantity(quantity + 1)}>+</div>
    </div>
  )
}

export default MinusPlus
