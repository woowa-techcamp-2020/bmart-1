import React from 'react'

export type PlusIconProps = {
  width?: string
  color?: string
}

const PlusIcon: React.FC<PlusIconProps> = ({
  color = 'var(--distinct)',
  width = '17px',
}) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      style={{ width, height: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.9291 16.204C8.61221 16.204 9.17368 15.6238 9.17368 14.9875V9.41964H14.6292C15.2843 9.41964 15.8551 8.85817 15.8551 8.17506C15.8551 7.5013 15.2843 6.93048 14.6292 6.93048H9.17368V1.36262C9.17368 0.707583 8.61221 0.146118 7.9291 0.146118C7.25534 0.146118 6.69388 0.707583 6.69388 1.36262V6.93048H1.23832C0.601989 6.93048 0.0124512 7.5013 0.0124512 8.17506C0.0124512 8.85817 0.601989 9.41964 1.23832 9.41964H6.69388V14.9875C6.69388 15.6238 7.25534 16.204 7.9291 16.204Z"
        fill={color}
      />
    </svg>
  )
}

export default PlusIcon
