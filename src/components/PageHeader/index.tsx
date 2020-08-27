import React from 'react'
import './style.scss'

export type PageHeaderProps = {
  Icon?: React.FC
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ Icon, title }) => {
  return (
    <div className="page-header">
      {Icon && (
        <div className="icon">
          <Icon></Icon>
        </div>
      )}

      <div className="title">{title}</div>
    </div>
  )
}

export default PageHeader
