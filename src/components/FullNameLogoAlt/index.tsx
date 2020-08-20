import classNames from 'classnames'
import React from 'react'
import './style.scss'

export type FullNameLogoAltProps = {
  className: string
}

const FullNameLogoAlt: React.FC<FullNameLogoAltProps> = ({ className }) => {
  return (
    <svg
      width={158}
      height={68}
      viewBox="0 0 158 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classNames('full-name-logo-alt', className)}
    >
      <path
        d="M34.6508 11.2502H20.738L14.5012 43.0098H18.9149L14.5012 59.8971L28.9897 39.2677H24.0003L34.6508 11.2502Z"
        fill="url(#paint0_linear)"
      />
      <path
        d="M44.771 11.2501H38.1866L34.4135 21.0323H38.1131C42.8653 21.0323 41.8419 28.7083 37.1909 28.7083H31.4391L27.9848 37.4398H39.9735C44.4378 37.4398 43.8621 45.4996 37.9585 45.4996H28.4511L20.871 55.7663H41.8419C55.0698 55.7663 61.8706 37.9888 49.2353 32.0666C58.4371 25.4172 53.649 11.2501 44.771 11.2501Z"
        fill="var(--distinct)"
      />
      <path
        d="M68.0747 44.6093H87.8944V17.3898H68.0747V44.6093ZM99.0919 54.1932V34.2268H104.568V28.5384H99.0919V13.7714H92.1159V54.1932H99.0919ZM74.9529 39.198V22.85H81.0162V39.198H74.9529Z"
        fill="var(--distinct)"
      />
      <path
        d="M110.868 16.5097V39.5566H139.734V34.1453H117.974V30.6573H138.495V25.3275H117.974V22.0188H139.457V16.5097H110.868ZM106.826 49.9717H143.499V44.43H106.826V49.9717Z"
        fill="var(--distinct)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="24.576"
          y1="11.2502"
          x2="24.576"
          y2="59.8971"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#06C882" />
          <stop offset={1} stopColor="#76D300" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default FullNameLogoAlt
