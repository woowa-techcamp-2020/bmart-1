import React from 'react'

export type ChevronRightIconProps = {
  width?: string
  color?: string
  rotation?: number
}

const ChevronRightIcon: React.FC<ChevronRightIconProps> = ({
  color = 'black',
  width = '5px',
}) => {
  return (
    <svg
      className="icon chevron-right-icon"
      width="5"
      height="9"
      viewBox="0 0 5 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <path
        d="M0.958993 8.05817C1.1197 8.05817 1.24745 8.00048 1.35871 7.89334L4.51937 4.80686C4.65948 4.66675 4.72541 4.52252 4.72953 4.34533C4.72953 4.16813 4.6636 4.01978 4.51937 3.8838L1.35871 0.793189C1.24745 0.686048 1.11558 0.628357 0.958993 0.628357C0.63757 0.628357 0.38208 0.883847 0.38208 1.20115C0.38208 1.35774 0.448013 1.50609 0.563396 1.62147L3.36555 4.34533L0.563396 7.06506C0.448013 7.18044 0.38208 7.32879 0.38208 7.48538C0.38208 7.80268 0.63757 8.05817 0.958993 8.05817Z"
        fill={color}
      />
    </svg>
  )
}

export default ChevronRightIcon
