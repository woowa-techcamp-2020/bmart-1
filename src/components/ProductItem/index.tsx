import $ from 'classnames'
import React, { CSSProperties, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
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

  const history = useHistory()
  const productItemCoverRef = useRef<HTMLDivElement>()

  function onPointerDown() {
    timer = setTimeout(async () => {
      isLongPress = true
      await toggleJjim({ productId: id })
      productItemCoverRef.current.classList.remove('hidden')
    }, CONSTRAINT.LONG_PRESS_DURATION)
  }

  function onPointerUp() {
    clearTimeout(timer)

    if (isLongPress) {
      isLongPress = false
    } else {
      if (isSkeleton) return

      history.push(`/products/${id}`)
    }
  }

  function onAnimationEnd() {
    productItemCoverRef.current.classList.add('hidden')
    setTimeout(() => setIsJjimmedLocal(!isJjimmedLocal), HEART_DELAY)
  }

  return (
    <div
      className={$('product-item', { skeleton: isSkeleton })}
      style={
        {
          backgroundImage: `url(${imgV})`,
          '--zoom': size === 'small' ? '1' : '1.7',
        } as CSSProperties
      }
      onPointerUp={onPointerUp}
      onPointerDown={onPointerDown}
      onAnimationEnd={onAnimationEnd}
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
      <div ref={productItemCoverRef} className="product-item-cover hidden">
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
