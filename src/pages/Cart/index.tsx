import $ from 'classnames'
import React, { useEffect, useState } from 'react'
import { getProductsInCart } from 'src/apis'
import Empty from 'src/components/Empty'
import ResizableCartIcon from 'src/components/icons/ResizableCartIcon'
import PageHeader from 'src/components/PageHeader'
import GoBack from 'src/components/shortcuts/GoBack'
import { getCartLS } from 'src/pages/ProductDetails'
import { ProductInCart, ProductsInCart } from 'src/types/api'
import { Dialog } from 'src/utils/dialog'
import { useSigned } from 'src/utils/hooks'
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

const Cart: React.FC<CartProps> = () => {
  const [productsInCart, setProductsInCart] = useState<ProductInCart[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const { isSigned } = useSigned()
  const [isEmpty, setEmpty] = useState(false)
  const [isLoading, setLoading] = useState(true)

  async function loadProductsInCart() {
    let productsInCart

    if (!isSigned) {
      productsInCart = getCartLS()
    } else {
      productsInCart = (await getProductsInCart()) as ProductInCart[]
    }

    setLoading(false)
    setProductsInCart(productsInCart)

    if (productsInCart.length == 0) {
      setEmpty(true)
    }

    setTotalAmount(getTotalAmount(productsInCart))
  }

  useEffect(() => {
    loadProductsInCart()
  }, [])

  return (
    <div className="cart">
      <GoBack />
      <PageHeader Icon={ResizableCartIcon} title="장바구니"></PageHeader>
      {!isEmpty ? (
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
            {!isLoading && (
              <div className="cart-footer-total-price">
                {totalAmount.toLocaleString()}원
              </div>
            )}
            <div
              className={$([
                'cart-footer-confirm-button',
                { disabled: isLoading },
              ])}
              onClick={() => Dialog().alert('여기까지😉')}
            >
              결제하기
            </div>
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}

export default Cart
