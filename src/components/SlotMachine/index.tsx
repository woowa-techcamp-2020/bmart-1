import React, { useEffect, useRef } from 'react'
import './style.scss'

export type SlotMachineProps = {
  itemList?: string[]
}
const NO_CHANGE = 'NO_CHANGE' as const
const NO_ACTION = 'NO_ACTION' as const
const PULLING = 'PUULING' as const
const RELEASING = 'RELEASING' as const
const WAITING = 'WAITING' as const
const RESETING = 'RESETING' as const

type ActionType =
  | typeof NO_CHANGE
  | typeof NO_ACTION
  | typeof PULLING
  | typeof RELEASING
  | typeof WAITING
  | typeof RESETING

const MIN_PULL_LENGTH = 100
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
  type?: ActionType
  y?: number
  startAt?: number
  done?: boolean
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  itemList = ITEM_LIST,
  children,
}) => {
  let action: ActionType = NO_ACTION
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

  function translate(offset) {
    slot.current.style.transform = `translateY(${offset - height}px)`
    content.current.style.transform = `translateY(${offset}px)`
  }

  function moveSlotDown(offset) {
    let duration = null

    if (action === RELEASING) {
      duration = `${RELEASING_DURATION / 1000}s`
    } else if (action === RESETING) {
      duration = `${RESETING_DURATION / 1000}s`
    }

    slot.current.style.transitionDuration = duration
    content.current.style.transitionDuration = duration
    translate(offset)
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

  function animateSlotMenu(y, height) {
    const NN = height,
      N = height / 2
    const offset = ((y + N) % NN) - N

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
            if (action !== NO_ACTION) break

            action = PULLING
            startY = currentY
            break

          case WAITING:
            action = WAITING
            requestAction({ type: RESETING, startAt: t + WAITING_DURATION })
            break

          case NO_ACTION:
            action = NO_ACTION
            moveSlotDown(0) // TODO: REMOVE THIS
            break

          case RESETING:
            action = RESETING
            requestAction({ type: NO_ACTION, startAt: t + RESETING_DURATION })
            moveSlotDown(0) // TODO: REMOVE THIS
            break

          case RELEASING:
            if (action !== PULLING) break

            if (Math.abs(currentY - startY) < MIN_PULL_LENGTH) {
              requestAction({ type: RESETING })
              break
            }

            action = RELEASING
            requestAction({ type: WAITING, startAt: t + RELEASING_DURATION })
            moveSlotDown(height) // TODO: REMOVE THIS
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
      const y = getComputedTranslateY(slot.current)
      const newIdx = Math.floor((y + height / 2) / height)

      if (slotIdx === null || newIdx !== slotIdx) {
        menu.current.innerText = pickRandomItem()
        slotIdx = newIdx
      }

      animateSlotMenu(y, height)
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

function getComputedTranslateY(elem: HTMLDivElement) {
  const matrix = getComputedStyle(elem).transform

  if (!matrix) return 0

  return parseFloat(/\.*matrix\(.*,.*,.*,.*,.*,(.*)\)/i.exec(matrix)[1])
}

export default SlotMachine
