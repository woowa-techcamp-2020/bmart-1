import { Product } from '@prisma/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { addToCart, getProduct, toggleJjim } from 'src/apis'
import Drawer from 'src/components/Drawer'
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon'
import ColorfulBrokenHeartIcon from 'src/components/icons/ColorfulBrokenHeartIcon'
import ColorfulHeartIcon from 'src/components/icons/ColorfulHeartIcon'
import DiscountLabel from 'src/components/icons/DiscountLabel'
import ResizableCartIcon from 'src/components/icons/ResizableCartIcon'
import MinusPlus from 'src/components/MinusPlus'
import { Dialog } from 'src/utils/dialog'
import { useSigned } from 'src/utils/hooks'
import './style.scss'

export type ProductDetailsProps = unknown

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const [product, setProduct] = useState<Product>(null)
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [isJjimmed, setIsJjimmed] = useState<boolean>(false)
  const { isSigned } = useSigned()
  const { productId } = useParams()

  async function loadProductDetail() {
    const loadedProduct = await getProduct({ productId })

    setProduct(loadedProduct)
    setIsJjimmed(loadedProduct.isJjimmed ?? false)
  }

  useEffect(() => {
    loadProductDetail()

    return setProduct(null)
  }, [])

  function onCartClick() {
    if (!isSigned) {
      Dialog().alert('로그인을 해주세요😂')

      return
    }

    setIsCartOpened(true)
  }

  async function onConfirm() {
    await addToCart({ productId: product.id, quantity: quantity })
  }

  async function onToggleJjim() {
    if (!isSigned) {
      Dialog().alert('로그인을 해주세요😂')

      return
    }

    await toggleJjim({ productId: product.id })
    setIsJjimmed(!isJjimmed)
  }

  return (
    <div className="product-details">
      {product && (
        <>
          <img className="product-details-image" src={product.imgH}></img>
          <div className="product-details-info">
            <div className="product-details-info-category">
              {product.category}
              <ChevronRightIcon />
              {product.subcategory}
            </div>
            <div className="product-details-info-description">
              {product.description}
            </div>
            <div className="product-details-info-name">{product.name}</div>
            <div className="product-details-info-price-info">
              {Boolean(product.discount) && (
                <DiscountLabel size="big" discount={product.discount} />
              )}
              <div className="product-details-info-price-info-price">
                {product.defaultPrice !== product.price && (
                  <span className="product-details-info-price-info-price-default">
                    {product.defaultPrice.toLocaleString()}원
                  </span>
                )}
                <span className="product-details-info-price-info-price-current">
                  {product.price.toLocaleString()}원
                </span>
              </div>
            </div>
            <div className="product-details-info-options">
              <div
                className="product-details-info-options-jjim"
                onClick={onToggleJjim}
              >
                {isJjimmed ? (
                  <ColorfulBrokenHeartIcon width="75px" />
                ) : (
                  <ColorfulHeartIcon width="75px" />
                )}
              </div>
              <div
                className="product-details-info-options-cart"
                onClick={onCartClick}
              >
                <ResizableCartIcon width="50px" />
              </div>
            </div>
          </div>
          <Drawer isOpened={isCartOpened} setOpened={setIsCartOpened}>
            <div className="product-details-cart">
              <img
                className="product-details-cart-image"
                src={product.imgV}
              ></img>
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
        </>
      )}
    </div>
  )
}

export default ProductDetails
