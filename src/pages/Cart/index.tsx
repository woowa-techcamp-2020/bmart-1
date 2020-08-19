import React from 'react'
import ResizableCartIcon from 'src/components/ResizableCartIcon'
import { addCommaToPrice } from 'src/utils'
import CartItem, { CartItemProps } from './CartItem'
import './style.scss'

export type CartProps = {
  products: CartItemProps[]
}

function getTotalAmount(products: CartItemProps[]) {
  const totalAmount = products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

  return totalAmount
}

// TODO: 장바구니 아이템 컴포넌트화 + 수량 상태 관리(?)
const Cart: React.FC<CartProps> = ({ products }) => {
  return (
    <div className="cart">
      <div className="cart-header">
        <div className="cart-header-icon">{<ResizableCartIcon />}</div>
        <div className="cart-header-title">장바구니</div>
      </div>
      <div className="cart-items">
        {products.map((product) => (
          <CartItem key={product.id} {...product} />
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-footer-total-price">{addCommaToPrice(getTotalAmount(products))}원</div>
        <div className="cart-footer-confirm-button">결제하기</div>
      </div>
    </div>
  )
}

export default Cart
