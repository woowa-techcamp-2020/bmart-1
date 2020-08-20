import React, { useEffect, useRef } from 'react'
import './style.scss'

export type SlotMachineProps = {
  itemList: string[]
}
const NO_ACTION = 0
const PULLING = 1
const RELEASING = 2
const WAITING = 3
const RESETING = 4
const MAX_PULL_LENGTH = 600
const SHOW_DURATION = 800
const ITEM_LIST = [
  '김치찌개',
  '샐러드',
  '감자전',
  '돈까스',
  '삼겹살',
  '천엽',
  '엄마는외계인',
  '짬뽕',
  '고려국시',
  '오호오호호',
]

const SlotMachine: React.FC<SlotMachineProps> = ({ itemList = ITEM_LIST, children }) => {
  const action = useRef<number>(NO_ACTION)
  const height = useRef<number>(0)
  const pullable = useRef<HTMLDivElement>()
  const slot = useRef<HTMLDivElement>()
  const content = useRef<HTMLDivElement>()
  const menu = useRef<HTMLSpanElement>()
  const startY = useRef<number>(0)
  const resetAt = useRef<number>(0)
  const slotIdx = useRef<number>(0)

  useEffect(() => {
    height.current = slot.current.getBoundingClientRect().height
    slot.current.style.transform = `translatey(${-height.current}px)`
    content.current.style.marginTop = `${-height.current}px`
    menu.current.innerText = pickRandomItem()
  }, [])

  function pickRandomItem() {
    return itemList[Math.floor(itemList.length * Math.random())]
  }

  function onCursorDown(y) {
    if (pullable.current.scrollTop !== 0) return

    action.current = PULLING
    startY.current = y
    slot.current.style.transitionDuration = null
  }

  function onCursorUp(y) {
    if (action.current !== PULLING) return

    action.current = RELEASING
    moveSlotDown(height.current)
  }

  function onCursorMove(y) {
    if (action.current !== PULLING) return

    const offsetY = y - startY.current

    if (offsetY > 0) {
      pullSlotDown(offsetY)
    }
  }

  function moveSlotDown(offset) {
    let duration = null

    if (action.current === RELEASING) {
      duration = '1.5s'
    } else if (action.current === RESETING) {
      duration = '0.3s'
    }

    slot.current.style.transitionDuration = duration
    slot.current.style.marginTop = `${offset}px`
  }

  function pullSlotDown(offset) {
    let y = offset

    if (y > MAX_PULL_LENGTH) {
      y = MAX_PULL_LENGTH
    } else {
      y = MAX_PULL_LENGTH * formula(y / MAX_PULL_LENGTH)
    }

    y /= 2
    moveSlotDown(y)
  }

  function animateMenu(offset, N) {
    menu.current.style.transform = `translatey(${offset}px)`
    menu.current.style.opacity = `${offset < 0 ? (N - offset) / N : 1 - offset / N}`
  }

  function animate(t) {
    if (action.current === PULLING || action.current === RELEASING) {
      const y = parseFloat(getComputedStyle(slot.current).marginTop)
      const targetY = parseFloat(slot.current.style.marginTop)
      const NN = height.current,
        N = NN / 2
      const newIdx = Math.floor((y + N) / NN)

      if (slotIdx.current === null || newIdx !== slotIdx.current) {
        menu.current.innerText = pickRandomItem()
        slotIdx.current = newIdx
      }

      animateMenu(((y + N) % NN) - N, N)

      if (action.current === RELEASING && almostSame(y, targetY)) {
        action.current = WAITING
        resetAt.current = t + SHOW_DURATION
      }
    }

    if (action.current === WAITING && resetAt.current < t) {
      action.current = RESETING
      moveSlotDown(0)
    }

    window.requestAnimationFrame(animate)
  }

  window.requestAnimationFrame(animate)

  return (
    <div className="slot-machine">
      <div
        className="pullable"
        ref={pullable}
        onTouchStart={(event) => onCursorDown(getFirstTouchY(event))}
        onTouchEnd={(event) => onCursorUp(getFirstTouchY(event))}
        onTouchMove={(event) => onCursorMove(getFirstTouchY(event))}
        onMouseDown={({ clientY }) => onCursorDown(clientY)}
        onMouseUp={({ clientY }) => onCursorUp(clientY)}
        onMouseMove={({ clientY }) => onCursorMove(clientY)}
      >
        <div className="slot" ref={slot}>
          <span className="menu" ref={menu} />
          <span>땡겨요</span>
        </div>
        <div className="content" ref={content}>
          {children}
        </div>
      </div>
    </div>
  )
}

function getFirstTouch(touchEvent: React.TouchEvent) {
  return touchEvent.targetTouches[0] || touchEvent.changedTouches[0]
}

function getFirstTouchY(event) {
  return getFirstTouch(event).clientY
}

function formula(r) {
  return 1 - (1 - r) ** 3
}

function almostSame(a, b) {
  return Math.abs(a * 10e5 - b * 10e5) < 10
}

export default SlotMachine
