import { Address } from '@prisma/client'
import $ from 'classnames'
import React, { useEffect, useState } from 'react'
import { getProductsInCart, getUser } from 'src/apis'
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
  const [isAddressEmpty, setAddressEmpty] = useState(false)
  const [address, setAddress] = useState<Address>()

  async function loadProductsInCart() {
    let productsInCart

    setEmpty(false)

    if (!isSigned) {
      productsInCart = getCartLS()
    } else {
      productsInCart = (await getProductsInCart()) as ProductInCart[]
    }

    setLoading(false)
    setProductsInCart(productsInCart)
    console.log(productsInCart)

    if (productsInCart.length == 0) {
      setEmpty(true)
    }

    setTotalAmount(getTotalAmount(productsInCart))
  }

  async function loadDefaultAddress() {
    const user = await getUser()

    setAddress(user.defaultAddress)

    if (!user.defaultAddress) setAddressEmpty(true)
  }

  useEffect(() => {
    loadProductsInCart()
    loadDefaultAddress()
  }, [isSigned])

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
          <div className="default-address">
            <div className="address-box">
              <h1 className="title">기본 배송지</h1>
              {isAddressEmpty ? (
                <div className="address">기본 주소가 없습니다</div>
              ) : address ? (
                <div className="address">
                  {address.address1}
                  <br />
                  {address.address2}
                </div>
              ) : (
                <div>로딩 중</div>
              )}
            </div>
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
