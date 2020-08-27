import React from 'react'
import './style.scss'

export type PageHeaderProps = {
  icon: React.FC
  title: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, title }) => {
  return (
    <div className="page-header">
      <div className="icon">{icon}</div>
      <div className="title">{title}</div>
    </div>
  )
}

export default PageHeader
