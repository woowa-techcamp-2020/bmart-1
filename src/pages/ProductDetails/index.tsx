import { Product } from '@prisma/client'
import React, { useState } from 'react'
import { addToCart } from 'src/apis'
import Drawer from 'src/components/Drawer'
import ColorfulBrokenHeartIcon from 'src/components/icons/ColorfulBrokenHeartIcon'
import ColorfulHeartIcon from 'src/components/icons/ColorfulHeartIcon'
import DiscountLabel from 'src/components/icons/DiscountLabel'
import ResizableCartIcon from 'src/components/icons/ResizableCartIcon'
import MinusPlus from 'src/components/MinusPlus'
import './style.scss'

export type ProductDetailsProps = Product & { isJjimmed?: boolean }

const ProductDetails: React.FC<ProductDetailsProps> = ({
  id,
  name,
  description,
  defaultPrice,
  price,
  discount,
  category,
  imgV,
  imgH,
  subcategory,
  isJjimmed = false,
}) => {
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)

  async function onConfirm() {
    await addToCart({ productId: id, quantity: quantity })
  }

  return (
    <div className="product-details">
      <img className="product-details-image" src={imgH}></img>
      <div className="product-details-info">
        <div className="product-details-info-category">
          {`${category} > ${subcategory}`}
        </div>
        <div className="product-details-info-description">{description}</div>
        <div className="product-details-info-name">{name}</div>
        <div className="product-details-info-price-info">
          {Boolean(discount) && (
            <DiscountLabel size="big" discount={discount} />
          )}
          <div className="product-details-info-price-info-price">
            {defaultPrice !== price && (
              <span className="product-details-info-price-info-price-default">
                {defaultPrice.toLocaleString()}원
              </span>
            )}
            <span className="product-details-info-price-info-price-current">
              {price.toLocaleString()}원
            </span>
          </div>
        </div>
        <div className="product-details-info-options">
          {isJjimmed ? (
            <ColorfulBrokenHeartIcon width="75px" />
          ) : (
            <ColorfulHeartIcon width="75px" />
          )}
          <div
            className="product-details-info-options-cart"
            onClick={() => setIsCartOpened(true)}
          >
            <ResizableCartIcon width="50px" />
          </div>
        </div>
      </div>
      <Drawer isOpened={isCartOpened} setOpened={setIsCartOpened}>
        <div className="product-details-cart">
          <img className="product-details-cart-image" src={imgV}></img>
          <div className="product-details-cart-buttons">
            <MinusPlus quantity={quantity} onChange={setQuantity} />
            <div
              className="product-details-cart-buttons-confirm"
              onClick={onConfirm}
            >
              담기
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default ProductDetails
