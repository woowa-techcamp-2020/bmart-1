import React, { useEffect, useRef } from 'react'
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

function shrinkCartItem(item) {
  const itemHeight = getComputedStyle(item).height

  item.style.height = itemHeight

  item.getBoundingClientRect()

  item.classList.add('removed')
}

const CartItem: React.FC<CartItemProps> = ({ id, name, defaultPrice, price, quantity, imgV }) => {
  const cartItemDelete = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: cartItemDeleteElem } = cartItemDelete

    cartItemDeleteElem.addEventListener('click', (e) => {
      const selectedItem = (e.target as HTMLElement).closest('.cart-item')

      shrinkCartItem(selectedItem)
      // TODO: 총계 새로 계산
      // TODO: api call
    })
  }, [])

  return (
    <div className="cart-item" key={id}>
      <div className="cart-item-name">{name}</div>
      <div className="cart-item-info">
        <div className="cart-item-info-left" style={{ backgroundImage: `url(${imgV})` }}></div>
        <div className="cart-item-info-right">
          <div className="minus-plus">MinusPlus</div>
          <div className="price">{addCommaToPrice(price)}</div>
          <div className="delete" ref={cartItemDelete}>
            <div className="delete-icon"></div>
            <span className="delete-description">삭제</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
