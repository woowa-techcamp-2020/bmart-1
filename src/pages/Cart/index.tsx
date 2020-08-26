import React, { useEffect, useState } from 'react'
import { getProductsInCart } from 'src/apis'
import Empty from 'src/components/Empty'
import ResizableCartIcon from 'src/components/icons/ResizableCartIcon'
import { ProductInCart, ProductsInCart } from 'src/types/api'
import CartItem from './CartItem'
import './style.scss'

export type CartProps = unknown

function getTotalAmount(products: ProductsInCart) {
  const totalAmount = products.reduce(
    (acc, cur) => acc + cur.product.price * cur.quantity,
    0
  )

  return totalAmount
}

const Cart: React.FC<CartProps> = (props) => {
  const [productsInCart, setProductsInCart] = useState<ProductInCart[]>([])
  const [totalAmount, setTotalAmount] = useState(0)

  async function loadProductsInCart() {
    const productsInCart = (await getProductsInCart()) as ProductInCart[]

    setProductsInCart(productsInCart)
    setTotalAmount(getTotalAmount(productsInCart))
  }

  useEffect(() => {
    loadProductsInCart()
  }, [])

  return (
    <div className="cart">
      <div className="cart-header">
        <div className="cart-header-icon">{<ResizableCartIcon />}</div>
        <div className="cart-header-title">장바구니</div>
      </div>
      {productsInCart.length > 0 ? (
        <>
          <div className="cart-items">
            {productsInCart.map((product) => (
              <CartItem
                key={product.productId}
                productInCart={product}
                onChange={loadProductsInCart}
              />
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-footer-total-price">
              {totalAmount.toLocaleString()}원
            </div>
            <div className="cart-footer-confirm-button">결제하기</div>
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default Cart
