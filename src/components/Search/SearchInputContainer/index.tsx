import React from 'react'
import { Dispatcher } from 'src/types/react-helper'
import './style.scss'

export type SearchInputContainerProps = {
  inputValue: string
  onInputChange: Dispatcher<string>
  onSearch: (term: string) => void
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

const SearchInputContainer: React.FC<SearchInputContainerProps> = ({
  inputValue,
  onInputChange,
  onSearch,
}) => {
  function onInputBlur({ currentTarget }) {
    const button = currentTarget
      .closest('.search-input-container')
      .querySelector('.search-input-button')

    button.classList.remove('active')

    onSearch(currentTarget.value)
  }

  return (
    <div className="search-input-container">
      <div className="search-input-icon"></div>
      <input
        value={inputValue}
        className="search-input"
        onChange={({ target: { value } }) => onInputChange(value)}
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
