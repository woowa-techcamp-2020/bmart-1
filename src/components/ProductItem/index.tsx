import React, { useEffect, useRef, useState } from 'react'
import { toggleJjim } from 'src/apis'
import DiscountLabel from 'src/components/DiscountLabel'
import HeartIcon from 'src/components/HeartIcon'
import { CONSTRAINT } from 'src/constants'
import ColorfulBrokenHeartIcon from '../ColorfulBrokenHeartIcon'
import ColorfulHeartIcon from '../ColorfulHeartIcon'
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

let timer
let isLongPress = false
const HEART_DELAY = 100

// TODO: scroll & pointermove conflict 해결
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const [isJjimmed, setIsJjimmed] = useState(props.isJjimmed)

  const productItem = useRef<HTMLDivElement>()
  const productItemCover = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: productItemElem } = productItem
    const { current: productItemCoverElem } = productItemCover

    productItemCoverElem.addEventListener('animationend', () => {
      productItemCoverElem.classList.add('hidden')
      setTimeout(
        () =>
          setIsJjimmed((previousState) => {
            return !previousState
          }),
        HEART_DELAY
      )
    })

    productItemElem.addEventListener('pointerdown', () => {
      timer = setTimeout(async () => {
        await toggleJjim({ productId: props.id })
        productItemCoverElem.classList.remove('hidden')

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
        backgroundImage: `url(${props.imgV})`,
      }}
    >
      {isJjimmed ? <HeartIcon size="small" isBroken={false} isAttached={true} /> : ''}
      {props.discount ? <DiscountLabel size="small" discount={props.discount} /> : ''}
      <div className="product-item-info">
        <div className="product-item-info-name">{props.name}</div>
        <div className="product-item-info-price">
          {props.defaultPrice !== props.price ? (
            <span className="product-item-info-price-default">{props.defaultPrice}</span>
          ) : (
            ''
          )}
          <span className="product-item-info-price-current">{props.price}</span>
        </div>
      </div>
      <div ref={productItemCover} className="product-item-cover hidden">
        {isJjimmed ? (
          <ColorfulBrokenHeartIcon color="white" width="100%" />
        ) : (
          <ColorfulHeartIcon color="white" width="100%" />
        )}
      </div>
    </div>
  )
}

export default ProductItem
