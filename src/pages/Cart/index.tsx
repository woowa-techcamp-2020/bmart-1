import React, { createContext, useState } from 'react'
import ResizableCartIcon from 'src/components/ResizableCartIcon'
import { ProductsInCart } from 'src/types/api'
import { addCommaToPrice } from 'src/utils'
import CartItem from './CartItem'
import './style.scss'

export type CartProps = {
  productsInCart: ProductsInCart
}

export const CartContext = createContext(
  {} as {
    totalAmount: number
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>
  }
)

function getTotalAmount(products: ProductsInCart) {
  const totalAmount = products.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)

  return totalAmount
}

const Cart: React.FC<CartProps> = ({ productsInCart: products }) => {
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
            <CartItem key={product.productId} productInCart={product} />
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
