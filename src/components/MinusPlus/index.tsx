import React from 'react'
import MinusIcon from '../icons/MinusIcon'
import PlusIcon from '../icons/PlusIcon'
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
      <div
        className="icon-wrapper"
        onClick={() => changeQuantity(quantity - 1)}
      >
        <MinusIcon></MinusIcon>
      </div>
      <div className="quantity">{quantity}</div>
      <div
        className="icon-wrapper"
        onClick={() => changeQuantity(quantity + 1)}
      >
        <PlusIcon></PlusIcon>
      </div>
    </div>
  )
}

export default MinusPlus
