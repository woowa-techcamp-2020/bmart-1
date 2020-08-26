import $ from 'classnames'
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
      className={$(
        'heart-icon',
        size,
        { broken: isBroken },
        { attached: isAttached }
      )}
    ></div>
  )
}

export default HeartIcon
