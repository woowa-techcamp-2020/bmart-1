import React from 'react'
import './style.scss'

export type HeartIconPropsSize = 'small' | 'big'

export type HeartIconProps = {
  size?: HeartIconPropsSize
  isBroken?: boolean
  isAttached?: boolean
}

const HeartIcon: React.FC<HeartIconProps> = ({
  size = 'small',
  isBroken = false,
  isAttached = true,
}) => {
  return (
    <div
      className={`heart-icon ${size} ${isBroken ? 'broken' : ''} ${isAttached ? 'attached' : ''}`}
    ></div>
  )
}

export default HeartIcon
