import React from 'react'

export type MinusIconProps = {
  width?: string
  color?: string
}

const MinusIcon: React.FC<MinusIconProps> = ({
  color = 'black',
  width = '17px',
}) => {
  return (
    <svg
      width="17"
      height="4"
      viewBox="0 0 17 4"
      fill="none"
      style={{ width, height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.52323 3.41958H14.9142C15.5692 3.41958 16.14 2.85811 16.14 2.175C16.14 1.50124 15.5692 0.93042 14.9142 0.93042H1.52323C0.886901 0.93042 0.297363 1.50124 0.297363 2.175C0.297363 2.85811 0.886901 3.41958 1.52323 3.41958Z"
        fill={color}
      />
    </svg>
  )
}

export default MinusIcon
