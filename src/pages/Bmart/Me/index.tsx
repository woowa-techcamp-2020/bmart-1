import React from 'react'
import './style.scss'

export type MeProps = unknown

const Me: React.FC<MeProps> = (props) => {
  return (
    <div className="me">
      <a href="/auth/login">로그인</a>
    </div>
  )
}

export default Me
