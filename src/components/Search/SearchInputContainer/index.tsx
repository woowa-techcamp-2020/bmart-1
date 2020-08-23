import { Product } from '@prisma/client'
import React, { useState } from 'react'
import { search } from 'src/apis'
import { ProductWithJjimmed } from 'src/types/api'
import { Dispatcher } from 'src/types/react-helper'
import './style.scss'

export type SearchInputContainerProps = {
  setFoundProducts: Dispatcher<Product[] | ProductWithJjimmed[]>
}

function onButtonClick(e) {
  e.stopPropagation()
}

function onInputKeyDown({ currentTarget, key }) {
  if (key === 'Enter') {
    currentTarget.blur()
  }
}

function onInputFocus({ currentTarget }) {
  const button = currentTarget
    .closest('.search-input-container')
    .querySelector('.search-input-button')

  button.classList.add('active')
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

  return JSON.parse(recentTerms)
}

let lastSearchTerm = ''
let page = 0
let timer = null

const SearchInputContainer: React.FC<SearchInputContainerProps> = ({
  setFoundProducts,
}) => {
  const [inputValue, setInputValue] = useState('')

  function onInputChange({ target: { value } }) {
    setInputValue(value)

    if (timer) {
      clearTimeout(timer)
      timer = null
    } else {
      timer = setTimeout(() => {
        fetchSearch(value)
        timer = null
      }, 300)
    }
  }

  function onInputBlur({ currentTarget }) {
    const button = currentTarget
      .closest('.search-input-container')
      .querySelector('.search-input-button')

    button.classList.remove('active')

    fetchSearch(currentTarget.value)
  }

  async function fetchSearch(value) {
    if (value === lastSearchTerm) return

    page = 0
    const searchResults = await search({ term: value, page })

    setFoundProducts(searchResults)

    saveSearchTerm(value)
    lastSearchTerm = value
    page += 1
  }

  return (
    <div className="search-input-container">
      <div className="search-input-icon"></div>
      <input
        value={inputValue}
        className="search-input"
        onChange={onInputChange}
        type="text"
        placeholder="검색"
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        onKeyDown={onInputKeyDown}
      ></input>
      <div className="search-input-button" onMouseDown={onButtonClick}>
        완료
      </div>
    </div>
  )
}

export default SearchInputContainer
