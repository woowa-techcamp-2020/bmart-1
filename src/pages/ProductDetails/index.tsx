import { Product } from '@prisma/client'
import React, { useState } from 'react'
import Drawer from 'src/components/Drawer'
import ColorfulBrokenHeartIcon from 'src/components/icons/ColorfulBrokenHeartIcon'
import ColorfulHeartIcon from 'src/components/icons/ColorfulHeartIcon'
import DiscountLabel from 'src/components/icons/DiscountLabel'
import ResizableCartIcon from 'src/components/icons/ResizableCartIcon'
import { ProductWithJjimmed } from 'src/types/api'
import './style.scss'

export type ProductDetailsProps = Product | ProductWithJjimmed

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
          <ResizableCartIcon width="50px" />
        </div>
      </div>
      <Drawer isOpened={isCartOpened} setOpened={setIsCartOpened} />
    </div>
  )
}

export default ProductDetails
