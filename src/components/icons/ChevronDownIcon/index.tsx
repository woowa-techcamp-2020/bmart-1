import React from 'react'

export type ChevronDownIconProps = {
  width?: string
  color?: string
  rotation?: number
}

const ChevronDownIcon: React.FC<ChevronDownIconProps> = ({
  color = 'black',
  width = '17px',
}) => {
  return (
    <svg
      className="icon chevron-down-icon"
      width="18"
      height="10"
      viewBox="0 0 18 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <path
        d="M9.10498 9.73682C9.34912 9.73682 9.59326 9.63916 9.75928 9.45361L17.3179 1.70947C17.4839 1.54346 17.5815 1.32861 17.5815 1.08447C17.5815 0.57666 17.2007 0.186035 16.6929 0.186035C16.4487 0.186035 16.2241 0.283691 16.0581 0.439941L9.10498 7.54932L2.14209 0.439941C1.98584 0.283691 1.76123 0.186035 1.50732 0.186035C0.999512 0.186035 0.618652 0.57666 0.618652 1.08447C0.618652 1.32861 0.716309 1.54346 0.882324 1.71924L8.44092 9.45361C8.62646 9.63916 8.85107 9.73682 9.10498 9.73682Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronDownIcon
