import React from 'react'
import './style.scss'
import { Link } from 'react-router-dom'

export type SlideTabsProps = unknown

const SlideTabs: React.FC<SlideTabsProps> = (props) => {
  return (
    <div className="slidetabs">
      <button>
        <Link to="/">Home</Link>
      </button>
      <button>
        <Link to="/Sale">Sale</Link>
      </button>
      <button>
        <Link to="/Me">Me</Link>
      </button>
    </div>
  )
}

export default SlideTabs
