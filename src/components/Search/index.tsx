import React, { useState } from 'react'
import ProductItem from 'src/components/ProductItem'
import './style.scss'

export type SearchProps = unknown

const Search: React.FC<SearchProps> = () => {
  const [foundProducts, setFoundProducts] = useState([])

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <div className="search-input-icon"></div>
        <input className="search-input" type="text" placeholder="검색"></input>
      </div>

      <div className="search-results">
        {foundProducts.map((product) => (
          <div key={product.id} className="search-results-result">
            <ProductItem {...product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
