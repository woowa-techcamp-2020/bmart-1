import React, { useEffect, useRef, useState } from 'react'
import { search } from 'src/apis'
import SearchInputContainer from './SearchInputContainer'
import SearchKeywords from './SearchKeywords'
import SearchResult from './SearchResult'
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

  return JSON.parse(recentTerms)
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

  const searchTermsRef = useRef<HTMLDivElement>()
  const searchResultsRef = useRef<HTMLDivElement>()

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
    } else {
      timer = setTimeout(() => {
        onSearch(term)
        timer = null
      }, 300)
    }
  }

  async function onSearch(term) {
    if (term === lastSearchTerm) return

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

      {/* <div className="search-terms hidden" ref={searchTermsRef}> */}
      {isKeywordsOn && <SearchKeywords />}
      {/* <div className="search-terms-title">최근 검색어</div> */}
      {/* {recentTerms.map((recentTerm: string, idx: number) => (
          <div key={idx} className="search-terms-term">
            {recentTerm}
          </div>
        ))} */}
      {/* </div> */}
      <SearchResult isSkeletonOn={isSkeletonOn} />
      {/* <div className="search-results hidden" ref={searchResultsRef}>
        검색결과
        {isSkeletonOn ? '스켈레톤 보인다' : '스켈레톤 안 보인다'}
        
      </div> */}
    </div>
  )
}

export default Search
