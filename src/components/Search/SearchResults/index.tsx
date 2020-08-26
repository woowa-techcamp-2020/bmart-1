import { Product } from '@prisma/client'
import React, { useEffect, useRef, useState } from 'react'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import { getItemNumbersInRow, getRowNumber } from 'src/utils'
import './style.scss'

export type SearchResultsProps = {
  isSkeletonOn: boolean
  results: (Product | ProductWithJjimmed)[]
  onLoadMore: () => void
}

let previousIntersectingStatus

const SearchResults: React.FC<SearchResultsProps> = ({
  isSkeletonOn,
  results,
  onLoadMore,
}) => {
  const gridRef = useRef<HTMLDivElement>()
  const [itemNumsInRow, setItemNumbersInRow] = useState<number>()

  const sentinel = useRef<HTMLDivElement>()

  useEffect(() => {
    setItemNumbersInRow(getItemNumbersInRow(gridRef.current))
  }, [])

  useEffect(() => {
    if (isSkeletonOn) {
      previousIntersectingStatus = true

      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!previousIntersectingStatus && entry.isIntersecting) {
          onLoadMore()
        }

        previousIntersectingStatus = entry.isIntersecting
      })
    })

    observer.observe(sentinel.current)
  }, [isSkeletonOn])

  return (
    <div className="search-results" ref={gridRef}>
      {isSkeletonOn
        ? Array(8)
            .fill(undefined)
            .map((_, idx) => (
              <div key={idx} className="search-results-result">
                <ProductItem isSkeleton={true} />
              </div>
            ))
        : results.map((result, idx) => (
            <div
              key={result.id}
              className="search-results-result"
              style={{
                animationDelay: `${getRowNumber(idx, itemNumsInRow) * 200}ms`,
              }}
            >
              <ProductItem {...result} />
            </div>
          ))}
      <div className="sentinel" ref={sentinel}></div>
    </div>
  )
}

export default SearchResults