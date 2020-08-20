import React, { useContext, useEffect, useRef, useState } from 'react'
import { DrawerContext } from 'src/components/Drawer'
import './style.scss'

export type OptionSelectorProps = {
  options: string[]
  option?: string
  setOption: (option: string) => void
}

const OptionSelector: React.FC<OptionSelectorProps> = ({
  options = [],
  option,
  setOption,
}) => {
  const selectRef = useRef<HTMLLIElement>()
  const [optionIdx, setOptionIdx] = useState(0)
  const setOpened = useContext(DrawerContext)?.setOpened

  useEffect(() => {
    const idx = options.indexOf(option)

    if (idx !== -1) setOptionIdx(idx)
  }, [option])

  useEffect(() => {
    const height = selectRef.current.clientHeight

    selectRef.current.style.top = `${height * optionIdx}px`
  }, [optionIdx])

  function selectOption() {
    setOption(options[optionIdx])
    setOpened && setOpened(false)
  }

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
              if (idx === optionIdx) selectOption()
            }}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OptionSelector
