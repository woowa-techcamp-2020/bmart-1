import React from 'react'
import { addCommaToPrice } from 'src/utils'
import './style.scss'

export type CartItemProps = {
  id: number
  name: string
  defaultPrice: number
  price: number
  quantity: number
  imgV: string
}

const CartItem: React.FC<CartItemProps> = ({ id, name, defaultPrice, price, quantity, imgV }) => {
  return (
    <div className="cart-item" key={id}>
      <div className="cart-item-name">{name}</div>
      <div className="cart-item-info">
        <div className="cart-item-info-left" style={{ backgroundImage: `url(${imgV})` }}></div>
        <div className="cart-item-info-right">
          <div className="minus-plus">MinusPlus</div>
          <div className="price">{addCommaToPrice(price)}</div>
          <div className="delete">
            <div className="delete-icon"></div>
            <span className="delete-description">삭제</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
