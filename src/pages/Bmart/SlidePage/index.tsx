import React from 'react'
import './style.scss'

export type SlidePageProps = unknown

const SlidePage: React.FC<SlidePageProps> = ({ children }) => {
  return <div className="slide-page">{children}</div>
}

export default SlidePage
