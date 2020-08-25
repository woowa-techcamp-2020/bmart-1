import React, { useEffect, useState } from 'react'
import { search } from 'src/apis'
import SearchInputContainer from './SearchInputContainer'
import SearchResults from './SearchResults'
import SearchTerms from './SearchTerms'
import './style.scss'

export type SearchProps = unknown

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

const Search: React.FC<SearchProps> = () => {
  const [foundProducts, setFoundProducts] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isSkeletonOn, setIsSkeletonOn] = useState(true)
  const [recentTerms, setRecentTerms] = useState(getRecentTerms())
  const [isKeywordsOn, setIsKeywordsOn] = useState(true)

  useEffect(() => {
    if (!inputValue) {
      const loadedRecentTerms = getRecentTerms()

      setRecentTerms(loadedRecentTerms)
      setIsKeywordsOn(true)
    } else {
      setIsKeywordsOn(false)
    }
  }, [inputValue])

  function onInputChange(value) {
    setIsSkeletonOn(true)
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
      setIsSkeletonOn(false)
      const copiedProducts = foundProducts.slice()

      setFoundProducts(copiedProducts)

      return
    }

    page = 0
    const searchResults = await search({ term, page })

    setIsSkeletonOn(false)

    setFoundProducts(searchResults)

    saveSearchTerm(term)
    lastSearchTerm = term
    page += 1
  }

  return (
    <div className="search">
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
        <SearchResults isSkeletonOn={isSkeletonOn} results={foundProducts} />
      )}
    </div>
  )
}

export default Search
