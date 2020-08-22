import React, { useEffect, useRef } from 'react'
import { deleteFromCart } from 'src/apis'
import { ProductInCart } from 'src/types/api'
import './style.scss'

export type CartItemProps = {
  productInCart: ProductInCart
  onChange: () => void
}

// TODO: 넓은 화면일 때 이동 핸들링
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
  onChange,
}) => {
  const cartItemDelete = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: cartItemDeleteElem } = cartItemDelete

    cartItemDeleteElem.addEventListener('click', (e) => {
      const selectedItem = (e.target as HTMLElement).closest(
        '.cart-item'
      ) as HTMLElement

      selectedItem.addEventListener('transitionend', async () => {
        await deleteFromCart({ productIds: [id] })
        onChange()
      })
      shrinkCartItem(selectedItem)
    })
  }, [])

  return (
    <div className="cart-item" key={id}>
      <div className="cart-item-name">{name}</div>
      <div className="cart-item-info">
        <div
          className="cart-item-info-left"
          style={{ backgroundImage: `url(${imgV})` }}
        ></div>
        <div className="cart-item-info-right">
          <div className="minus-plus">MinusPlus</div>
          <div className="price">
            <div className="price-detail">
              {defaultPrice !== price ? (
                <span className="price-detail-default">
                  {defaultPrice.toLocaleString()}원
                </span>
              ) : (
                ''
              )}
              <span className="price-detail-current">
                {price.toLocaleString()}원{' '}
              </span>
              <span className="price-detail-quantity">x {quantity}</span>
            </div>
            <div className="price-total">
              {(price * quantity).toLocaleString()}원
            </div>
          </div>
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
