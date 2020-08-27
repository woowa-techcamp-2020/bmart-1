import React from 'react'
import './style.scss'

export type EmptyProps = {
  size?: string
}

const Empty: React.FC<EmptyProps> = ({ size = '150px' }) => {
  return (
    <div className="empty" style={{ fontSize: `${size}` }}>
      텅
    </div>
  )
}

export default Empty
