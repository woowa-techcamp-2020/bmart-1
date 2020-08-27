import React, { useEffect, useRef, useState } from 'react'
import { search } from 'src/apis'
import ProductContainer from 'src/components/ProductContainer'
import { useSigned } from 'src/utils/hooks'
import SearchInputContainer from './SearchInputContainer'
import SearchTerms from './SearchTerms'
import './style.scss'

export type SearchProps = {
  topMargin?: string
}

function saveSearchTerm(term) {
  if (!term.trim()) return

  let previousTerms = getRecentTerms()

  if (!previousTerms) {
    previousTerms = []
  } else {
    previousTerms = previousTerms.filter(
      (previousTerm) => previousTerm !== term
    )
  }

  const updatedTerms = [term, ...previousTerms].slice(0, 5)

  localStorage.setItem('recentTerms', JSON.stringify(updatedTerms))
}

function getRecentTerms() {
  const recentTerms = localStorage.getItem('recentTerms')

  return JSON.parse(recentTerms) ?? []
}

let lastSearchTerm = ''
let page = 0
let timer = null

const Search: React.FC<SearchProps> = ({ topMargin = '20px' }) => {
  const [foundProducts, setFoundProducts] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [recentTerms, setRecentTerms] = useState(getRecentTerms())
  const [isKeywordsOn, setIsKeywordsOn] = useState(true)
  const { isSigned } = useSigned()

  const self = useRef<HTMLDivElement>()

  function toTop() {
    self.current.closest('.container').scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!isSigned) {
      setRecentTerms(getRecentTerms())
      setInputValue('')
      setFoundProducts([])
    }
  }, [isSigned])

  useEffect(() => {
    if (!inputValue) {
      const loadedRecentTerms = getRecentTerms()

      clearTimeout(timer)
      timer = null

      setRecentTerms(loadedRecentTerms)
      setIsKeywordsOn(true)
    } else {
      setIsKeywordsOn(false)
    }
  }, [inputValue])

  function onInputChange(value) {
    setIsLoading(true)
    setInputValue(value)
    debounce(value)
  }

  function debounce(term) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      onSearch(term)
    }, 300)
  }

  async function onSearch(term) {
    clearTimeout(timer)
    timer = null

    if (!term.trim()) return

    if (term === lastSearchTerm) {
      setIsLoading(false)
      const copiedProducts = foundProducts.slice()

      setFoundProducts(copiedProducts)

      return
    }

    page = 0

    setIsLoading(true)
    const searchResults = await search({ term, page })

    setIsLoading(false)

    setFoundProducts(searchResults)
    saveSearchTerm(term)
    lastSearchTerm = term
    page += 1
  }

  async function onLoadMore() {
    console.log('더 불러온다')
  }

  return (
    <div
      className="search"
      style={{ height: `calc(85vh - ${topMargin})` }}
      ref={self}
    >
      <SearchInputContainer
        inputValue={inputValue}
        onInputChange={onInputChange}
        onSearch={onSearch}
      />

      {isKeywordsOn ? (
        <SearchTerms
          terms={recentTerms}
          onSearchTermClick={(term) => {
            onInputChange(term)
            onSearch(term)
          }}
        />
      ) : (
        <ProductContainer
          isEmpty={!isLoading && !foundProducts.length}
          isSkeletonOn={isLoading}
          products={foundProducts}
          onLoadMore={onLoadMore}
          onClickToTop={toTop}
        />
      )}
    </div>
  )
}

export default Search
