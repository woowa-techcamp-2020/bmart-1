import React from 'react'
import './style.scss'

export type OptionSelectorProps = {
  options: string[]
  optionIdx?: number
  setOptionIdx?: (idx: number) => void
}

export default ({ options = [], optionIdx = 0, setOptionIdx }: OptionSelectorProps) => {
  return (
    <div className="option-selector">
      {options.length === 0 && <div>표시할 옵션이 없습니다.</div>}
      <ul>
        {options.map((x, idx) => (
          <li
            className={idx === optionIdx ? 'active' : null}
            onClick={() => setOptionIdx && setOptionIdx(idx)}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}
