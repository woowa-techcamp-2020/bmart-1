import React from 'react'
import './style.scss'

export type HomeProps = unknown

const Home: React.FC<HomeProps> = (props) => {
  return (
    <>
      <div className="home">
        <h1 className="title">Hello World</h1>
      </div>
    </>
  )
}

export default Home
