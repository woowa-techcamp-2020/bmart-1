import React from 'react'

export type DrawerHandleProps = {
  width?: string
  color?: string
  rotation?: number
}

const DrawerHandle: React.FC<DrawerHandleProps> = ({
  color = 'var(--distinct)',
  width = '36px',
}) => {
  return (
    <svg
      className="icon drawer-handle-icon"
      width="36"
      height="3"
      viewBox="0 0 36 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <rect
        x="0.5"
        width="35"
        height="3"
        rx="1.5"
        fill={color}
        fillOpacity="0.5"
      />
    </svg>
  )
}

export default DrawerHandle
