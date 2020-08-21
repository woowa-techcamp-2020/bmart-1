import React from 'react'
import './style.scss'

export type SearchProps = unknown

const Search: React.FC<SearchProps> = () => {
  return (
    <div className="search">
      <div className="search-input-wrapper">
        <div className="search-input-icon"></div>
        <input className="search-input" type="text" placeholder="검색"></input>
      </div>

      <div className="search-result">검색결과</div>
    </div>
  )
}

export default Search
