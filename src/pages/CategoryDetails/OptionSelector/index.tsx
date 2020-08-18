import React, { useContext, useState } from 'react'
import { DrawerContext } from 'src/components/Drawer'
import './style.scss'

export type OptionSelectorProps = {
  options: string[]
  optionIdx?: number
  setOptionIdx?: (idx: number) => void
}

export default ({ options = [], optionIdx = 0, setOptionIdx }: OptionSelectorProps) => {
  const drawerContext = useContext(DrawerContext)
  const [toggle, setToggle] = useState(false)

  function selectItem(idx) {
    setOptionIdx && setOptionIdx(idx)
  }

  return (
    <div className="option-selector">
      {options.length === 0 && <div>표시할 옵션이 없습니다.</div>}
      <ul>
        {options.map((x, idx) => (
          <li
            key={x}
            className={idx === optionIdx ? 'active' : null}
            onPointerDown={() => setToggle(true)}
            onPointerEnter={() => toggle && selectItem(idx)}
            onPointerUp={() => {
              setToggle(false)
              drawerContext && drawerContext.setOpened(false)
            }}
          >
            {x}
          </li>
        ))}
      </ul>
    </div>
  )
}
