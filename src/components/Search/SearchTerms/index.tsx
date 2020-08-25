import React from 'react'
import './style.scss'

export type SearchTermsProps = {
  terms: string[]
  onSearchTermClick: (term: string) => void
}

const SearchTerms: React.FC<SearchTermsProps> = ({
  terms,
  onSearchTermClick,
}) => {
  return (
    <div className="search-terms">
      <div className="search-terms-title">최근 검색어</div>
      {terms.map((term: string, idx: number) => (
        <div
          key={idx}
          className="search-terms-term"
          style={{ animationDelay: `${idx * 30}ms` }}
          onClick={() => onSearchTermClick(term)}
        >
          {term}
        </div>
      ))}
    </div>
  )
}

export default SearchTerms
