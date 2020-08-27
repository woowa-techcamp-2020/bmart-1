import { Product } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import Empty from 'src/components/Empty'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import { getItemNumbersInRow } from 'src/utils'
import './style.scss'

export type ProductContainerProps = {
  isSkeletonOn: boolean
  isEmpty?: boolean
  onClick?: () => void
  products: (Product | ProductWithJjimmed)[]
  onLoadMore?: () => void
  onClickToTop?: () => void
}

// let previousIntersectingStatus

const ProductContainer: React.FC<ProductContainerProps> = ({
  isSkeletonOn,
  products,
  onClick,
  isEmpty,
  onLoadMore,
  onClickToTop,
}) => {
  const gridRef = useRef<HTMLDivElement>()
  const topButton = useRef<HTMLDivElement>()
  const [itemNumsInRow, setItemNumbersInRow] = useState<number>()

  const sentinel = useRef<HTMLDivElement>()
  const topSentinel = useRef<HTMLDivElement>()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          onLoadMore && onLoadMore()
        }
      }
    })

    observer.observe(sentinel.current)

    const topObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          topButton.current.classList.remove('hidden')
        } else {
          topButton.current.classList.add('hidden')
        }
      }
    })

    topObserver.observe(topSentinel.current)

    return () => {
      observer.disconnect()
      topObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (gridRef.current)
      setItemNumbersInRow(getItemNumbersInRow(gridRef.current))
  }, [gridRef.current, products])

  // useEffect(() => {
  //   if (isSkeletonOn) {
  //     previousIntersectingStatus = true

  //     return
  //   }

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (!previousIntersectingStatus && entry.isIntersecting) {
  //         onLoadMore()
  //       }

  //       previousIntersectingStatus = entry.isIntersecting
  //     })
  //   })

  //   observer.observe(sentinel.current)
  // }, [isSkeletonOn])

  return (
    <>
      {isEmpty && <Empty />}
      <div className="grid-wrapper">
        <div className="top-sentinel" ref={topSentinel}></div>
        <div
          className="to-top-button hidden"
          onClick={onClickToTop}
          ref={topButton}
        >
          TOP
        </div>
        <div className="product-container" ref={gridRef}>
          {/* {isSkeletonOn
          ? Array(Math.max(8, products.length))
              .fill(undefined)
              .map((_, idx) => (
                <div key={idx} className="product-container-product">
                  <ProductItem isSkeleton={true} />
                </div>
              ))
          : products.map((result, idx) => (
              <div
                key={idx}
                className="product-container-product"
                // style={{
                //   animationDelay: `${
                //     (getRowNumber(idx, itemNumsInRow) % 10) * 200
                //   }ms`,
                // }}
              >
                <ProductItem {...result} />
              </div>
            ))} */}

          {!isSkeletonOn &&
            products.map((result, idx) => (
              <div
                key={result.id}
                className="product-container-product"
                // style={{
                //   animationDelay: `${
                //     (getRowNumber(idx, itemNumsInRow) % 10) * 200
                //   }ms`,
                // }}
              >
                <ProductItem {...result} onClick={onClick} />
              </div>
            ))}

          <div className="sentinel" ref={sentinel}></div>
        </div>
      </div>
    </>
  )
}

export default ProductContainer
