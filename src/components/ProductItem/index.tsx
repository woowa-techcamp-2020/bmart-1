import $ from 'classnames'
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
  id?: number
  name?: string
  defaultPrice?: number
  price?: number
  discount?: number
  imgV?: string
  isJjimmed?: boolean
  isSkeleton?: boolean
  size?: 'small' | 'big'
}

let timer
let isLongPress = false
const HEART_DELAY = 100

// TODO: scroll & pointermove conflict 해결
const ProductItem: React.FC<ProductItemProps> = ({
  id = 0,
  name = '',
  defaultPrice = 0,
  price = 0,
  discount = 0,
  imgV = '',
  isJjimmed = false,
  isSkeleton = false,
  size = 'small',
}) => {
  const [isJjimmedLocal, setIsJjimmedLocal] = useState(isJjimmed)

  const productItem = useRef<HTMLDivElement>()
  const productItemCover = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: productItemElem } = productItem
    const { current: productItemCoverElem } = productItemCover

    productItemCoverElem.addEventListener('animationend', () => {
      productItemCoverElem.classList.add('hidden')
      setTimeout(
        () =>
          setIsJjimmedLocal((previousState) => {
            return !previousState
          }),
        HEART_DELAY
      )
    })

    productItemElem.addEventListener('pointerdown', () => {
      timer = setTimeout(async () => {
        await toggleJjim({ productId: id })
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
      className={$('product-item', { skeleton: isSkeleton })}
      style={
        {
          backgroundImage: `url(${imgV})`,
          '--zoom': size === 'small' ? '1' : '1.7',
        } as CSSProperties
      }
    >
      {isJjimmedLocal && (
        <HeartIcon size={size} isBroken={false} isAttached={true} />
      )}
      {Boolean(discount) && <DiscountLabel size={size} discount={discount} />}
      <div className="product-item-info">
        <div className="product-item-info-name">{name}</div>
        <div className="product-item-info-price">
          {defaultPrice !== price ? (
            <span className="product-item-info-price-default">
              {toPriceLabel(defaultPrice)}
            </span>
          ) : (
            ''
          )}
          <span className="product-item-info-price-current">
            {toPriceLabel(price)}
          </span>
        </div>
      </div>
      <div ref={productItemCover} className="product-item-cover hidden">
        {isJjimmedLocal ? (
          <ColorfulBrokenHeartIcon color="white" width="100%" />
        ) : (
          <ColorfulHeartIcon color="white" width="100%" />
        )}
      </div>
    </div>
  )
}

export default ProductItem
