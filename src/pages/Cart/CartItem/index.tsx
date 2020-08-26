import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { deleteFromCart, PatchProductQuantityInCart } from 'src/apis'
import MinusPlus from 'src/components/MinusPlus'
import { ProductInCart } from 'src/types/api'
import './style.scss'

export type CartItemProps = {
  productInCart: ProductInCart
  onChange: () => void
}

const CartItem: React.FC<CartItemProps> = ({
  productInCart: {
    quantity,
    product: { id, name, defaultPrice, price, imgV },
  },
  onChange,
}) => {
  const cartItem = useRef<HTMLDivElement>()

  // TODO: 넓은 화면일 때 이동 핸들링
  function shrinkCartItem() {
    const { current: item } = cartItem
    const itemHeight = getComputedStyle(item).height

    item.style.height = itemHeight
    item.getBoundingClientRect()

    item.classList.add('removed')
  }

  async function onQuantityChange(changedQuantity) {
    await PatchProductQuantityInCart({
      productId: id,
      quantity: changedQuantity,
    })
    onChange()
  }

  async function onDeleteTransitionEnd() {
    await deleteFromCart({ productIds: [id] })
    onChange()
  }

  return (
    <div
      className="cart-item"
      key={id}
      ref={cartItem}
      onTransitionEnd={onDeleteTransitionEnd}
    >
      <Link to={`/products/${id}`}>
        <div className="cart-item-name">{name}</div>
      </Link>
      <div className="cart-item-info">
        <Link to={`/products/${id}`}>
          <div
            className="cart-item-info-left"
            style={{ backgroundImage: `url(${imgV})` }}
          ></div>
        </Link>
        <div className="cart-item-info-right">
          <MinusPlus
            quantity={quantity}
            onChange={onQuantityChange}
          ></MinusPlus>
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
          <div className="delete" onClick={shrinkCartItem}>
            <div className="delete-icon"></div>
            <span className="delete-description">삭제</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
