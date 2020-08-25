import React from 'react'
import FullNameLogoAlt from 'src/components/icons/FullNameLogoAlt'
import { navigateSlidePageTo } from '..'
import './style.scss'

const tabTitles = ['홈', '번쩍세일', '마이 페이지']

export type SlideTabsProps = unknown

const Header: React.FC<SlideTabsProps> = () => {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <FullNameLogoAlt className="logo-img" />
      </div>
      <div className="slide-tabs">
        <div className="indicator" />

        {tabTitles.map((title, i) => (
          <button
            key={title}
            className="tab-button"
            onClick={() => navigateSlidePageTo(i)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Header
