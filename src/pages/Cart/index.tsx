import React, { createContext, useState } from 'react'
import ResizableCartIcon from 'src/components/ResizableCartIcon'
import { addCommaToPrice } from 'src/utils'
import CartItem, { CartItemProps } from './CartItem'
import './style.scss'

export type CartProps = {
  products: CartItemProps[]
}

export const CartContext = createContext(
  {} as {
    totalAmount: number
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>
  }
)

function getTotalAmount(products: CartItemProps[]) {
  const totalAmount = products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

  return totalAmount
}

const Cart: React.FC<CartProps> = ({ products }) => {
  const [totalAmount, setTotalAmount] = useState(getTotalAmount(products))

  return (
    <div className="cart">
      <CartContext.Provider
        value={{
          totalAmount,
          setTotalAmount,
        }}
      >
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
          <div className="cart-footer-total-price">
            {addCommaToPrice(getTotalAmount(products))}원
          </div>
          <div className="cart-footer-confirm-button">결제하기</div>
        </div>
      </CartContext.Provider>
    </div>
  )
}

export default Cart
