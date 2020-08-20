import React, { useEffect, useRef } from 'react'
import { ProductInCart } from 'src/types/api'
import { addCommaToPrice } from 'src/utils'
import './style.scss'

export type CartItemProps = {
  productInCart: ProductInCart
}

function shrinkCartItem(item: HTMLElement) {
  const itemHeight = getComputedStyle(item).height

  item.style.height = itemHeight

  item.getBoundingClientRect()

  item.classList.add('removed')
}

const CartItem: React.FC<CartItemProps> = ({
  productInCart: {
    quantity,
    product: { id, name, defaultPrice, price, imgV },
  },
}) => {
  const cartItemDelete = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: cartItemDeleteElem } = cartItemDelete

    cartItemDeleteElem.addEventListener('click', (e) => {
      const selectedItem = (e.target as HTMLElement).closest('.cart-item') as HTMLElement

      shrinkCartItem(selectedItem)
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
