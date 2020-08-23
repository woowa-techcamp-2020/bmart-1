import classNames from 'classnames'
import React from 'react'
import './style.scss'

export type AdBannerProps = {
  color:
    | 'violet'
    | 'purple'
    | 'sky'
    | 'orange'
    | 'mint'
    | 'grass'
    | 'dark'
    | 'blue'
  index: number
  subtitle: string
  titleFirstLine: string
  titleSecondLine: string
}

const AdBanner: React.FC<AdBannerProps> = ({
  color,
  index,
  subtitle,
  titleFirstLine,
  titleSecondLine,
}) => {
  return (
    <div className="banner-wrapper">
      <div className={classNames('banner', color)}>
        <div className="text">
          <h2 className="subtitle">{subtitle}</h2>
          <h1 className="title">
            <span dangerouslySetInnerHTML={{ __html: titleFirstLine }} />
            <span dangerouslySetInnerHTML={{ __html: titleSecondLine }} />
          </h1>
        </div>
      </div>
    </div>
  )
}

export default AdBanner
