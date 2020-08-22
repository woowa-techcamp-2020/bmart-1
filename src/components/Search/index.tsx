import React, { useState } from 'react'
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
  console.log('focus input')
  const input = target.closest('.search-input-wrapper').querySelector('input')

  input.focus()
}

const Search: React.FC<SearchProps> = () => {
  const [foundProducts, setFoundProducts] = useState([])
  const [inputValue, setInputValue] = useState('')

  function submitSearchTerm(e) {
    e.stopPropagation()
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
