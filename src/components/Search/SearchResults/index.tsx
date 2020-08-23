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
        ? '스켈레톤'
        : results.map((result) => (
            <div key={result.id} className="search-results-result">
              <ProductItem {...result} />
            </div>
          ))}
    </div>
  )
}

export default SearchResults
