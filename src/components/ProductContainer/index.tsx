import { Product } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import Empty from 'src/components/Empty'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import { getItemNumbersInRow, getRowNumber } from 'src/utils'
import './style.scss'

export type ProductContainerProps = {
  isSkeletonOn: boolean
  products: (Product | ProductWithJjimmed)[]
  onLoadMore: () => void
}

// let previousIntersectingStatus

const ProductContainer: React.FC<ProductContainerProps> = ({
  isSkeletonOn,
  products,
  onLoadMore,
}) => {
  const gridRef = useRef<HTMLDivElement>()
  const [itemNumsInRow, setItemNumbersInRow] = useState<number>()

  // const sentinel = useRef<HTMLDivElement>()

  useEffect(() => {
    setItemNumbersInRow(getItemNumbersInRow(gridRef.current))
  }, [])

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

  return !isSkeletonOn && products.length === 0 ? (
    <Empty />
  ) : (
    <div className="product-container" ref={gridRef}>
      {isSkeletonOn
        ? Array(8)
            .fill(undefined)
            .map((_, idx) => (
              <div key={idx} className="product-container-product">
                <ProductItem isSkeleton={true} />
              </div>
            ))
        : products.map((result, idx) => (
            <div
              key={result.id}
              className="product-container-product"
              style={{
                animationDelay: `${getRowNumber(idx, itemNumsInRow) * 200}ms`,
              }}
            >
              <ProductItem {...result} />
            </div>
          ))}
      <div
        className="sentinel"
        // ref={sentinel}
      ></div>
    </div>
  )
}

export default ProductContainer
