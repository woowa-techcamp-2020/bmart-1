import React, { useEffect, useRef, useState } from 'react'
import { toggleJjim } from 'src/apis'
import DiscountLabel from 'src/components/DiscountLabel'
import HeartIcon from 'src/components/HeartIcon'
import { CONSTRAINT } from 'src/constants'
import './style.scss'

export type ProductItemProps = {
  id: number
  name: string
  defaultPrice: number
  price: number
  discount: number
  imgV: string
  isJjimmed: boolean
}

const mockData = {
  id: 9529,
  name: '[KF365] 애호박 1개',
  defaultPrice: 4800,
  price: 4580,
  discount: 5,
  imgV: 'https://img-cf.kurly.com/shop/data/goods/1539841569718l0.jpg',
  isJjimmed: true,
}

let timer
let isLongPress = false

// TODO: scroll & pointermove conflict 해결
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const [isJjimmed, setIsJjimmed] = useState(mockData.isJjimmed)

  const productItem = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: productItemElem } = productItem

    productItemElem.addEventListener('pointerdown', () => {
      timer = setTimeout(async () => {
        await toggleJjim({ productId: mockData.id })
        setIsJjimmed((previousState) => {
          return !previousState
        })
        isLongPress = true
      }, CONSTRAINT.LONG_PRESS_DURATION)
    })
    productItemElem.addEventListener('pointerup', () => {
      if (isLongPress) {
        isLongPress = false
      } else {
        // TODO: 상품 디테일 페이지로
      }

      clearTimeout(timer)
    })

    return clearTimeout(timer)
  }, [])

  return (
    <div
      ref={productItem}
      className="product-item"
      style={{
        backgroundImage: `url(${mockData.imgV})`,
      }}
    >
      {isJjimmed ? <HeartIcon size="small" isBroken={false} isAttached={true} /> : ''}
      {mockData.discount ? <DiscountLabel size="small" discount={mockData.discount} /> : ''}
      <div className="product-item-info">
        <div className="product-item-info-name">{mockData.name}</div>
        <div className="product-item-info-price">
          {mockData.defaultPrice !== mockData.price ? (
            <span className="product-item-info-price-default">{mockData.defaultPrice}</span>
          ) : (
            ''
          )}
          <span className="product-item-info-price-current">{mockData.price}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
