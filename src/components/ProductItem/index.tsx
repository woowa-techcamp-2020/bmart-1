import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import { toggleJjim } from 'src/apis'
import DiscountLabel from 'src/components/icons/DiscountLabel'
import HeartIcon from 'src/components/icons/HeartIcon'
import { CONSTRAINT } from 'src/constants'
import { toPriceLabel } from 'src/utils'
import ColorfulBrokenHeartIcon from '../icons/ColorfulBrokenHeartIcon'
import ColorfulHeartIcon from '../icons/ColorfulHeartIcon'
import './style.scss'

export type ProductItemProps = {
  id: number
  name: string
  defaultPrice: number
  price: number
  discount: number
  imgV: string
  isJjimmed: boolean
  size?: 'small' | 'big'
}

let timer
let isLongPress = false
const HEART_DELAY = 100

// TODO: scroll & pointermove conflict 해결
const ProductItem: React.FC<ProductItemProps> = (props) => {
  const { size = 'small' } = props
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
      style={
        {
          backgroundImage: `url(${props.imgV})`,
          '--zoom': size === 'small' ? '1' : '1.7',
        } as CSSProperties
      }
    >
      {isJjimmed && (
        <HeartIcon size={size} isBroken={false} isAttached={true} />
      )}
      {props.discount && (
        <DiscountLabel size={size} discount={props.discount} />
      )}
      <div className="product-item-info">
        <div className="product-item-info-name">{props.name}</div>
        <div className="product-item-info-price">
          {props.defaultPrice !== props.price && (
            <span className="product-item-info-price-default">
              {toPriceLabel(props.defaultPrice)}
            </span>
          )}
          <span className="product-item-info-price-current">
            {toPriceLabel(props.price)}
          </span>
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
