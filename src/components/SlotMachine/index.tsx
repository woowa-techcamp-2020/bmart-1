import React, { useEffect, useRef } from 'react'
import './style.scss'

export type SlotMachineProps = {
  itemList?: string[]
}
const NO_CHANGE = -1
const NO_ACTION = 0
const PULLING = 1
const RELEASING = 2
const WAITING = 3
const RESETING = 4
const MIN_PULL_LENGTH = 50
const MAX_PULL_LENGTH = 600
const RELEASING_DURATION = 1500
const RESETING_DURATION = 300
const WAITING_DURATION = 800
const ITEM_LIST = [
  '김치찌개',
  '샐러드',
  '감자전',
  '돈까스',
  '삼겹살',
  '천엽',
  '엄마는외계인',
  '살려주세요',
  '짬뽕',
  '고려국시',
  '살짝만 땡기면 바로 돌아감',
  '오호오호호',
  '아직 아무것도 못했음',
]

type ActionRequestType = {
  type?: number
  y?: number
  startAt?: number
  done?: boolean
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  itemList = ITEM_LIST,
  children,
}) => {
  let action = NO_ACTION
  let requestedActions: ActionRequestType[] = []
  let height = 0
  let startY,
    currentY = 0
  let slotIdx = 0
  const pullable = useRef<HTMLDivElement>()
  const slot = useRef<HTMLDivElement>()
  const content = useRef<HTMLDivElement>()
  const menu = useRef<HTMLSpanElement>()
  const animateRef = useRef<number>(null)

  useEffect(() => {
    height = slot.current.getBoundingClientRect().height
    slot.current.style.transform = `translatey(${-height}px)`
    content.current.style.marginTop = `${-height}px`
    menu.current.innerText = pickRandomItem()
    animateRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animateRef.current)
    }
  }, [])

  function pickRandomItem() {
    return itemList[Math.floor(itemList.length * Math.random())]
  }

  function requestAction({
    type = NO_CHANGE,
    y = 0,
    startAt = 0,
    done = false,
  }: ActionRequestType) {
    if (type !== NO_CHANGE) {
      requestedActions.push({ type, y, startAt, done })
    }

    currentY = y
  }

  function moveSlotDown(offset) {
    let duration = null

    if (action === RELEASING) {
      duration = `${RELEASING_DURATION / 1000}s`
    } else if (action === RESETING) {
      duration = `${RESETING_DURATION / 1000}s`
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
    menu.current.style.opacity = `${
      offset < 0 ? (N - offset) / N : 1 - offset / N
    }`
  }

  function animate(t) {
    requestedActions
      .filter((x) => x.startAt == 0 || x.startAt < t)
      .map((requestedAction) => {
        switch (requestedAction.type) {
          case PULLING:
            action = PULLING
            startY = currentY
            slot.current.style.transitionDuration = null
            break

          case WAITING:
            action = WAITING
            requestAction({ type: NO_ACTION, startAt: t + WAITING_DURATION })
            break

          case NO_ACTION:
            action = NO_ACTION
            moveSlotDown(0)
            break

          case RELEASING:
            if (Math.abs(currentY - startY) < MIN_PULL_LENGTH) {
              action = RESETING
              requestAction({ type: NO_ACTION, startAt: t + RESETING_DURATION })
              moveSlotDown(0)
              break
            }

            action = RELEASING
            requestAction({ type: WAITING, startAt: t + RELEASING_DURATION })
            moveSlotDown(height)
        }

        requestedAction.done = true
      })
    requestedActions = requestedActions.filter(({ done }) => done === false)

    if (action === PULLING) {
      const offsetY = currentY - startY

      if (offsetY > 0) {
        pullSlotDown(offsetY)
      }
    }

    if (action === PULLING || action === RELEASING || action === RESETING) {
      const y = parseFloat(getComputedStyle(slot.current).marginTop)
      const NN = height,
        N = NN / 2
      const newIdx = Math.floor((y + N) / NN)

      if (slotIdx === null || newIdx !== slotIdx) {
        menu.current.innerText = pickRandomItem()
        slotIdx = newIdx
      }

      animateMenu(((y + N) % NN) - N, N)
    }

    window.requestAnimationFrame(animate)
  }

  return (
    <div className="slot-machine">
      <div
        className="pullable"
        ref={pullable}
        onTouchStart={(event) =>
          requestAction({
            type: PULLING,
            y: getFirstTouchY(event),
          })
        }
        onTouchEnd={(event) =>
          requestAction({
            type: RELEASING,
            y: getFirstTouchY(event),
          })
        }
        onTouchMove={(event) =>
          requestAction({
            type: NO_CHANGE,
            y: getFirstTouchY(event),
          })
        }
        onMouseDown={({ clientY }) =>
          requestAction({
            type: PULLING,
            y: clientY,
          })
        }
        onMouseUp={({ clientY }) =>
          requestAction({
            type: RELEASING,
            y: clientY,
          })
        }
        onMouseMove={({ clientY }) =>
          requestAction({
            type: NO_CHANGE,
            y: clientY,
          })
        }
      >
        <div className="slot" ref={slot}>
          <div className="slot-body">
            <span className="menu" ref={menu} />
            <span>땡겨요</span>
          </div>
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

export default SlotMachine
