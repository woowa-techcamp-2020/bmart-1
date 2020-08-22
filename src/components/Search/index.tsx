import React, { useState } from 'react'
import { search } from 'src/apis'
import ProductItem from 'src/components/ProductItem'
import './style.scss'

export type SearchProps = unknown

function toggleClassNames(elem, classNames) {
  classNames.forEach((className) => elem.classList.toggle(className))
}

function showButton({ target }) {
  const button = target
    .closest('.search-input-wrapper')
    .querySelector('.search-input-button')

  if (button.classList.contains('active')) return

  toggleClassNames(button, ['active'])
}

function hideButton({ target }) {
  const button = target
    .closest('.search-input-wrapper')
    .querySelector('.search-input-button')

  toggleClassNames(button, ['active'])
}

function focusInput({ target }) {
  const input = target.closest('.search-input-wrapper').querySelector('input')

  input.focus()
}

const Search: React.FC<SearchProps> = () => {
  const [page, setPage] = useState(0)
  const [foundProducts, setFoundProducts] = useState([])
  const [inputValue, setInputValue] = useState('')

  async function submitSearchTerm(e) {
    e.stopPropagation()

    if (!inputValue) {
      setPage(0)
      setFoundProducts([])
    } else {
      const searchResults = await search({ term: inputValue, page: page })

      setPage(page + 1)
      setFoundProducts(searchResults)
    }
  }

  return (
    <div className="search">
      <div className="search-input-wrapper" onPointerDown={focusInput}>
        <div className="search-input-icon"></div>
        <input
          value={inputValue}
          className="search-input"
          onChange={(e) => setInputValue(e.target.value)}
          type="text"
          placeholder="검색"
          onFocus={showButton}
          onBlur={hideButton}
        ></input>
        <div className="search-input-button" onPointerDown={submitSearchTerm}>
          완료
        </div>
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
