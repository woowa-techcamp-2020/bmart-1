import React from 'react'
import ChevronRightIcon from 'src/components/icons/ChevronRightIcon'
import './style.scss'

export type GoBackProps = unknown

const GoBack: React.FC<GoBackProps> = () => {
  return (
    <button
      className="go-back"
      onClick={() => {
        window.history.back()
      }}
    >
      <div
        style={{
          transform: 'scaleX(-1)',
          display: 'flex',
          marginRight: '10px',
        }}
      >
        <ChevronRightIcon width="0.5em" />
      </div>
      <span>뒤로 가기</span>
    </button>
  )
}

export default GoBack
