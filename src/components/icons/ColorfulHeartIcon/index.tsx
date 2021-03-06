import React from 'react'

export type ColorfulHeartIconProps = {
  width?: string
  color?: string
}

const ColorfulHeartIcon: React.FC<ColorfulHeartIconProps> = ({
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
      style={{
        width,
        height: 'auto',
      }}
    >
      <path
        d="M34.5 54.4297C34.9102 54.4297 35.4961 54.1562 35.9258 53.9023C46.9219 46.8711 53.8945 38.6875 53.8945 30.3672C53.8945 23.4531 49.1484 18.5703 43.0156 18.5703C39.207 18.5703 36.2773 20.6797 34.5 23.9023C32.7617 20.6992 29.793 18.5703 25.9844 18.5703C19.8516 18.5703 15.1055 23.4531 15.1055 30.3672C15.1055 38.6875 22.0781 46.8711 33.0938 53.9023C33.5039 54.1562 34.0898 54.4297 34.5 54.4297Z"
        fill={color}
      />
    </svg>
  )
}

export default ColorfulHeartIcon
