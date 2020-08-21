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
  const { isOpened, closeDrawer, setFocusPosition } =
    useContext(DrawerContext) ?? {}

  useEffect(() => {
    const idx = options.indexOf(option)

    if (idx !== -1) {
      setOptionIdx(idx)
      setFocusPosition(selectRef.current.clientHeight * idx)
    }
  }, [option, isOpened])

  useEffect(() => {
    const top = selectRef.current.clientHeight * optionIdx

    selectRef.current.style.transform = `translatey(${top}px)`
  }, [optionIdx])

  function selectOption() {
    setOption(options[optionIdx])
    closeDrawer && closeDrawer()
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
