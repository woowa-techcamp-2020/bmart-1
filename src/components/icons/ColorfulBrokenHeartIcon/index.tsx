import React from 'react'

export type ColorfulBrokenHeartIconProps = {
  width?: string
  color?: string
}

const ColorfulBrokenHeartIcon: React.FC<ColorfulBrokenHeartIconProps> = ({
  color = '#FF2171',
  width = '69px',
}) => {
  return (
    <svg
      width="69"
      height="69"
      viewBox="0 0 69 69"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width, height: 'auto' }}
    >
      <path
        d="M48.5291 53.3844C49.115 53.9704 50.0916 53.9704 50.658 53.3844C51.2244 52.7985 51.2439 51.8415 50.658 51.2555L15.9119 16.529C15.3259 15.943 14.3494 15.943 13.7634 16.529C13.1775 17.0954 13.1775 18.0915 13.7634 18.6579L48.5291 53.3844ZM53.9001 30.3766C53.9001 23.4626 49.1541 18.5798 43.0212 18.5798C39.2126 18.5798 36.283 20.6891 34.5056 23.9118C32.7673 20.7087 29.7986 18.5798 25.99 18.5798C24.5837 18.5798 23.2556 18.8337 22.0447 19.3415L47.2986 44.6344C51.4978 40.0641 53.9001 35.2594 53.9001 30.3766ZM34.5056 54.4391C34.9158 54.4391 35.5017 54.1657 35.9314 53.9118C37.9626 52.6032 39.8767 51.236 41.6345 49.8493L16.4001 24.6149C15.5798 26.2751 15.1111 28.2282 15.1111 30.3766C15.1111 38.6969 22.0837 46.8805 33.0994 53.9118C33.5095 54.1657 34.0955 54.4391 34.5056 54.4391Z"
        fill={color}
      />
    </svg>
  )
}

export default ColorfulBrokenHeartIcon