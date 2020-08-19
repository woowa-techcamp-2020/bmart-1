import React, { useContext, useEffect, useRef } from 'react'
import { DrawerContext } from 'src/components/Drawer'
import './style.scss'

export type OptionSelectorProps = {
  options: string[]
  optionIdx?: number
  setOptionIdx?: (idx: number) => void
}

export default ({ options = [], optionIdx = 0, setOptionIdx }: OptionSelectorProps) => {
  const setOpened = useContext(DrawerContext)?.setOpened
  const selectRef = useRef<HTMLLIElement>()

  useEffect(() => {
    const height = selectRef.current.getBoundingClientRect().height

    selectRef.current.style.top = `${height * optionIdx}px`
  }, [optionIdx])

  return (
    <div className="option-selector">
      {options.length === 0 && <div>표시할 옵션이 없습니다.</div>}
      <ul>
        <li ref={selectRef} className="select"></li>
        {options.map((x, idx) => (
          <li
            key={x}
            className={idx === optionIdx ? 'active' : null}
            onPointerDown={() => {
              setOptionIdx && setOptionIdx(idx)
            }}
            onPointerUp={() => {
              if (idx === optionIdx) setOpened && setOpened(false)
            }}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}
