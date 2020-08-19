import React from 'react'
import FullNameLogoAlt from 'src/components/FullNameLogoAlt'
import './style.scss'

export type SlideTabsProps = unknown

const SlideTabs: React.FC<SlideTabsProps> = (props) => {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <FullNameLogoAlt className="logo-img" />
      </div>
      <div className="slide-tabs">
        <div className="indicator"></div>

        <button className="tab-button">홈</button>
        <button className="tab-button">번쩍세일</button>
        <button className="tab-button">마이 페이지</button>
      </div>
    </div>
  )
}

export default SlideTabs
