import React from 'react'
import './style.scss'

export type SearchResultProps = {
  isSkeletonOn: boolean
}

const SearchResult: React.FC<SearchResultProps> = ({ isSkeletonOn }) => {
  return (
    <div className="search-result">
      검색결과
      {isSkeletonOn ? <div>스켈레톤</div> : <div>스켈레톤 아님</div>}
    </div>
  )
}

export default SearchResult
