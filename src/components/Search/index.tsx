import React, { useEffect, useRef, useState } from 'react'
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

function saveSearchTerm(term) {
  let previousTerms = getRecentTerms()

  if (!previousTerms) previousTerms = []

  const updatedTerms = [term, ...previousTerms].slice(0, 5)

  localStorage.setItem('recentTerms', JSON.stringify(updatedTerms))
}

function getRecentTerms() {
  const recentTerms = localStorage.getItem('recentTerms')

  return JSON.parse(recentTerms)
}

let page = 0

// TODO: 같은 단어 검색을 방지할까? 최근 검색어에는 중복 방지 처리할까?
const Search: React.FC<SearchProps> = () => {
  const [foundProducts, setFoundProducts] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [recentTerms, setRecentTerms] = useState(getRecentTerms())

  const searchTermsRef = useRef<HTMLDivElement>()
  const searchResultsRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const { current: searchTermsDiv } = searchTermsRef
    const { current: searchResultsDiv } = searchResultsRef

    if (!inputValue) {
      const loadedRecentTerms = getRecentTerms()

      setRecentTerms(loadedRecentTerms)
      searchTermsDiv.classList.remove('hidden')
      searchResultsDiv.classList.add('hidden')
    } else {
      searchTermsDiv.classList.add('hidden')
    }
  }, [inputValue])

  async function searchProducts() {
    const { current: searchResultsDiv } = searchResultsRef

    if (!inputValue) {
      page = 0
      setFoundProducts([])
    } else {
      const searchResults = await search({ term: inputValue, page: page })

      page += 1
      setFoundProducts(searchResults)
      searchResultsDiv.classList.remove('hidden')
    }
  }

  function onPointerDownOnButton(e) {
    e.stopPropagation()
    saveSearchTerm(inputValue)
    searchProducts()
  }

  function onKeyDownOnInput({ key }) {
    if (key === 'Enter') {
      const input = document.querySelector('.search').querySelector('input')

      input.blur()
      saveSearchTerm(inputValue)
      searchProducts()
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
          onKeyDown={onKeyDownOnInput}
        ></input>
        <div
          className="search-input-button"
          onPointerDown={onPointerDownOnButton}
        >
          완료
        </div>
      </div>

      <div className="search-terms hidden" ref={searchTermsRef}>
        <div className="search-terms-title">최근 검색어</div>
        {recentTerms.map((recentTerm: string, idx: number) => (
          <div key={idx} className="search-terms-term">
            {recentTerm}
          </div>
        ))}
      </div>
      <div className="search-results hidden" ref={searchResultsRef}>
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
