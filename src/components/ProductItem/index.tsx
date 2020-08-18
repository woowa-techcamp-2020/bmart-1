import React from 'react'
import DiscountLabel from 'src/components/DiscountLabel'
import HeartIcon from 'src/components/HeartIcon'
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
  id: 1,
  name: '[KF365] 애호박 1개',
  defaultPrice: 4800,
  price: 4580,
  discount: 5,
  imgV: 'https://img-cf.kurly.com/shop/data/goods/1539841569718l0.jpg',
  isJjimmed: true,
}

const ProductItem: React.FC<ProductItemProps> = (props) => {
  return (
    <div
      className="product-item"
      style={{
        backgroundImage: `url(${mockData.imgV})`,
      }}
    >
      {mockData.isJjimmed ? <HeartIcon size="small" isBroken={false} isAttached={true} /> : ''}
      {mockData.discount ? <DiscountLabel size="small" discount={mockData.discount} /> : ''}
      <div className="product-item-info">
        <span className="product-item-info-name">{mockData.name}</span>
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
