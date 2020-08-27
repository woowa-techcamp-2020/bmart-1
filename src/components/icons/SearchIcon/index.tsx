import React from 'react'

export type SearchIconProps = {
  width?: string
  color?: string
  rotation?: number
}

const SearchIcon: React.FC<SearchIconProps> = ({
  color = 'var(--distinct)',
  width = '20px',
}) => {
  return (
    <svg
      className="icon search-icon"
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <path
        d="M7.86768 15.268C9.49854 15.268 11.0024 14.7407 12.2329 13.8618L16.8618 18.4907C17.0767 18.7055 17.3599 18.813 17.6626 18.813C18.2974 18.813 18.7466 18.3247 18.7466 17.6997C18.7466 17.4067 18.6489 17.1333 18.4341 16.9184L13.8345 12.3091C14.8013 11.0395 15.3774 9.46725 15.3774 7.75827C15.3774 3.62741 11.9985 0.248505 7.86768 0.248505C3.73682 0.248505 0.35791 3.62741 0.35791 7.75827C0.35791 11.8891 3.73682 15.268 7.86768 15.268ZM7.86768 13.6469C4.64502 13.6469 1.979 10.9809 1.979 7.75827C1.979 4.53561 4.64502 1.8696 7.86768 1.8696C11.0903 1.8696 13.7563 4.53561 13.7563 7.75827C13.7563 10.9809 11.0903 13.6469 7.86768 13.6469Z"
        fill={color}
      />
    </svg>
  )
}

export default SearchIcon
