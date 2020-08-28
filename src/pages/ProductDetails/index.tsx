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
import GoBack from 'src/components/shortcuts/GoBack'
import { $sel } from 'src/utils'
import { Dialog } from 'src/utils/dialog'
import { useSigned } from 'src/utils/hooks'
import './style.scss'

export type ProductDetailsProps = unknown

function findFromCartLS(id) {
  const currentCartLS = getCartLS()

  if (!currentCartLS.length) return null

  const foundProduct = currentCartLS.filter(
    (elem) => elem.product.id === parseInt(id)
  )[0]

  return foundProduct && foundProduct.product
}

function pushToCartLS({ id: productId, ...rest }, quantity) {
  const productProcessed = {
    quantity,
    productId,
    product: {
      id: productId,
      productId,
      ...rest,
      quantityInCart: quantity,
    },
  }
  const currentCartLS = getCartLS()

  const idx = currentCartLS.findIndex(
    (elem) => elem.product.productId === productId
  )

  let newCartLS

  if (idx === -1) {
    newCartLS = [productProcessed, ...currentCartLS]
  } else {
    newCartLS = currentCartLS
    newCartLS.splice(idx, 1, productProcessed)
  }

  localStorage.setItem('cartTemp', JSON.stringify(newCartLS))
}

export function getCartLS() {
  const currentCartLS = localStorage.getItem('cartTemp')

  return JSON.parse(currentCartLS) ?? []
}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const [product, setProduct] = useState<Product>(null)
  const [isCartOpened, setIsCartOpened] = useState<boolean>(false)
  const [quantityInCart, setQuantityInCart] = useState<number>(0)
  const [quantityTemp, setQuantityTemp] = useState<number>(1)
  const [isJjimmed, setIsJjimmed] = useState<boolean>(false)
  const { isSigned } = useSigned()
  const { productId } = useParams()

  async function loadProductDetail() {
    let loadedProduct

    loadedProduct = await getProduct({ productId })

    if (!isSigned) {
      const productLS = findFromCartLS(productId)

      if (productLS) {
        loadedProduct = productLS
        console.log(productLS)
      }
    }

    setProduct(loadedProduct)
    setIsJjimmed(loadedProduct.isJjimmed ?? false)

    if (loadedProduct.quantityInCart) {
      setQuantityInCart(loadedProduct.quantityInCart)
      setQuantityTemp(loadedProduct.quantityInCart)
    }
  }

  useEffect(() => {
    loadProductDetail()

    return setProduct(null)
  }, [])

  function loginAlert() {
    Dialog().alert('로그인을 해주세요 😂')
  }

  function onCartClick() {
    setIsCartOpened(true)
  }

  async function onConfirm() {
    if (!isSigned) {
      pushToCartLS(product, quantityTemp)
    } else {
      await addToCart({ productId: product.id, quantity: quantityTemp })
    }

    // Animation
    const productImg = $sel('.product-details-cart-image')
    const productImgRect = productImg.getBoundingClientRect()
    const productImgClone = productImg.cloneNode(true) as HTMLElement

    productImgClone.style.position = 'fixed'
    productImgClone.style.left = productImgRect.left + 'px'
    productImgClone.style.top = productImgRect.top + 'px'
    productImgClone.style.width = productImgRect.width + 'px'
    productImgClone.style.height = productImgRect.height + 'px'
    productImgClone.style.transition =
      'transform 600ms ease, border-radius 400ms ease, width 600ms ease, height 600ms ease'
    productImgClone.style.zIndex = '9999999999'

    document.body.appendChild(productImgClone)

    const cartElmRect = $sel(
      '.product-details-info-options-cart'
    ).getBoundingClientRect()

    productImgClone.style.width = cartElmRect.width + 'px'
    productImgClone.style.height = cartElmRect.width + 'px'
    productImgClone.style.borderRadius = '9999px'
    productImgClone.style.transform = `translateX(${
      cartElmRect.left - productImgRect.left
    }px) translateY(${cartElmRect.top - productImgRect.top - 50}px)`

    setTimeout(() => {
      productImgClone.style.transformOrigin = '50% 50%'
      productImgClone.style.transition = 'transform 300ms ease'
      productImgClone.style.transform = `translateX(${
        cartElmRect.left - productImgRect.left
      }px) translateY(${cartElmRect.top - productImgRect.top}px) scale(0)`

      setTimeout(() => {
        productImgClone.remove()
      }, 300)
    }, 600)

    setQuantityInCart(quantityTemp)
    setIsCartOpened(false)
  }

  async function onToggleJjim() {
    if (!isSigned) {
      loginAlert()

      return
    }

    await toggleJjim({ productId: product.id })
    setIsJjimmed(!isJjimmed)
  }

  return (
    <div className="product-details">
      <div>
        {product && (
          <>
            <GoBack />
            <img
              className="product-details-image"
              src={product.imgH}
              alt="product"
            />
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
                  ) : isSigned ? (
                    <ColorfulHeartIcon width="75px" />
                  ) : (
                    <ColorfulHeartIcon
                      width="75px"
                      color="var(--universal-gray)"
                    />
                  )}
                </div>
                <div
                  className="product-details-info-options-cart"
                  onClick={onCartClick}
                >
                  {Boolean(quantityInCart) && (
                    <div className="product-details-info-options-cart-marker">
                      {quantityInCart}
                    </div>
                  )}
                  <ResizableCartIcon width="50px" />
                </div>
              </div>
            </div>
            <Drawer isOpened={isCartOpened} setOpened={setIsCartOpened}>
              <div className="product-details-cart">
                <img
                  className="product-details-cart-image"
                  src={product.imgV}
                  alt="product"
                ></img>
                <div className="product-details-cart-buttons">
                  <MinusPlus
                    quantity={quantityTemp}
                    onChange={setQuantityTemp}
                  />
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
    </div>
  )
}

export default ProductDetails
