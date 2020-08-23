import React, { useState } from 'react'
import './style.scss'

export type SearchInputContainerProps = unknown

function onInputBlur({ currentTarget }) {
  const button = currentTarget
    .closest('.search-input-container')
    .querySelector('.search-input-button')

  button.classList.remove('active')
}

function onInputFocus({ currentTarget }) {
  const button = currentTarget
    .closest('.search-input-container')
    .querySelector('.search-input-button')

  button.classList.add('active')
}

const SearchInputContainer: React.FC<SearchInputContainerProps> = () => {
  const [inputValue, setInputValue] = useState('')

  function onInputChange({ target: { value } }) {
    setInputValue(value)
  }

  function onButtonClick(e) {
    e.stopPropagation()
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
      ></input>
      <div className="search-input-button" onMouseDown={onButtonClick}>
        완료
      </div>
    </div>
  )
}

export default SearchInputContainer
