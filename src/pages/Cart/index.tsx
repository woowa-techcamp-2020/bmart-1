import React, { createContext, useEffect, useState } from 'react'
import { getProductsInCart } from 'src/apis'
import ResizableCartIcon from 'src/components/ResizableCartIcon'
import { ProductsInCart } from 'src/types/api'
import { addCommaToPrice } from 'src/utils'
import CartItem from './CartItem'
import './style.scss'

export type CartProps = unknown

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

// TODO: 장바구니에 상품이 없을 때 핸들링

const Cart: React.FC<CartProps> = (props) => {
  const [productsInCart, setProductsInCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)

  async function loadProductsInCart() {
    const productsInCart = await getProductsInCart()

    setProductsInCart(productsInCart)
    setTotalAmount(getTotalAmount(productsInCart))
  }

  useEffect(() => {
    loadProductsInCart()
  }, [])

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
          {productsInCart.map((product) => (
            <CartItem
              key={product.productId}
              productInCart={product}
              onDelete={loadProductsInCart}
            />
          ))}
        </div>
        <div className="cart-footer">
          <div className="cart-footer-total-price">{addCommaToPrice(totalAmount)}원</div>
          <div className="cart-footer-confirm-button">결제하기</div>
        </div>
      </CartContext.Provider>
    </div>
  )
}

export default Cart
