import React from 'react'

export type ParcelIconProps = {
  width?: string
  color?: string
}

const ParcelIcon: React.FC<ParcelIconProps> = ({
  color = '#9A47ED',
  width = '43px',
}) => {
  return (
    <svg
      width="43"
      height="46"
      viewBox="0 0 43 46"
      style={{ width, height: 'auto' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.5211 15.2754L41.3673 10.8098C41.0543 10.4968 40.6787 10.2464 40.2196 9.996L25.4872 1.60732C24.2143 0.876965 22.9414 0.480485 21.7102 0.480485C20.4582 0.480485 19.1853 0.876965 17.9124 1.60732L13.6763 4.00707L33.5211 15.2754ZM21.7102 21.9739L30.6206 16.924L10.8592 5.63472L3.20087 9.996C2.74179 10.2464 2.36618 10.4968 2.0323 10.8098L21.7102 21.9739ZM23.1292 45.8879C23.2753 45.8461 23.4005 45.7835 23.5465 45.7001L39.8857 36.3932C41.8264 35.2872 42.8697 34.1604 42.8697 31.1346V14.879C42.8697 14.2529 42.828 13.7521 42.7028 13.293L23.1292 24.478V45.8879ZM20.2704 45.8879V24.478L0.696787 13.293C0.571583 13.7521 0.529849 14.2529 0.529849 14.879V31.1346C0.529849 34.1604 1.59408 35.2872 3.51388 36.3932L19.8739 45.7001C19.9991 45.7835 20.1243 45.8461 20.2704 45.8879Z"
        fill={color}
      />
    </svg>

    // <svg
    //   width="17"
    //   height="4"
    //   viewBox="0 0 17 4"
    //   fill="none"
    //   style={{ width, height: 'auto' }}
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     d="M1.52323 3.41958H14.9142C15.5692 3.41958 16.14 2.85811 16.14 2.175C16.14 1.50124 15.5692 0.93042 14.9142 0.93042H1.52323C0.886901 0.93042 0.297363 1.50124 0.297363 2.175C0.297363 2.85811 0.886901 3.41958 1.52323 3.41958Z"
    //     fill={color}
    //   />
    // </svg>
  )
}

export default ParcelIcon
