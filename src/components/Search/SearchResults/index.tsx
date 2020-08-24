import { Product } from '@prisma/client'
import React from 'react'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import './style.scss'

export type SearchResultsProps = {
  isSkeletonOn: boolean
  results: (Product | ProductWithJjimmed)[]
}

const SearchResults: React.FC<SearchResultsProps> = ({
  isSkeletonOn,
  results,
}) => {
  console.log(results)

  return (
    <div className="search-results">
      {isSkeletonOn
        ? Array(4) // TODO: skeleton item 개수 동적 결정
            .fill(undefined)
            .map((_, idx) => (
              <div key={idx} className="search-results-result">
                <ProductItem isSkeleton={true} />
              </div>
            ))
        : results.map((result) => (
            <div key={result.id} className="search-results-result">
              <ProductItem {...result} />
            </div>
          ))}
    </div>
  )
}

export default SearchResults
