import React, { useEffect, useRef } from 'react'
import { $scrollContainer } from 'src/utils'
import './style.scss'

export type SlotMachineProps = {
  itemList?: string[]
}
const NO_CHANGE = 'NO_CHANGE' as const
const NO_ACTION = 'NO_ACTION' as const
const PULLING = 'PUULING' as const
const RELEASING = 'RELEASING' as const
const WAITING = 'WAITING' as const
const QUICK_RESETING = 'QUICK_RESETING' as const
const RESETING = 'RESETING' as const

type ActionType =
  | typeof NO_CHANGE
  | typeof NO_ACTION
  | typeof PULLING
  | typeof RELEASING
  | typeof WAITING
  | typeof RESETING
  | typeof QUICK_RESETING

const MIN_PULL_LENGTH = 100
const MAX_PULL_LENGTH = 600
const RELEASING_DURATION = 1000
const RESETING_DURATION = 200
const WAITING_DURATION = 500
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
  '크로와상',
  '지코바',
  '알리오올리오',
]

type ActionRequestType = {
  type?: ActionType
  y?: number
  startAt?: number
  done?: boolean
}

type SlotMachineState = {
  action: ActionType
  requestedActions: ActionRequestType[]
  height: number
  startY: number
  currentY: number
  slotIdx: number
  needRefresh: boolean
}

const SlotMachine: React.FC<SlotMachineProps> = ({
  itemList = ITEM_LIST,
  children,
}) => {
  const state = useRef<SlotMachineState>({
    action: NO_ACTION,
    requestedActions: [],
    height: 0,
    startY: 0,
    currentY: 0,
    slotIdx: 0,
    needRefresh: false,
  })

  const pullable = useRef<HTMLDivElement>()
  const slot = useRef<HTMLDivElement>()
  const content = useRef<HTMLDivElement>()
  const menu = useRef<HTMLSpanElement>()
  const animateRef = useRef<number>(null)
  const slotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    state.current.height = slot.current.getBoundingClientRect().height
    slot.current.style.transform = `translatey(${-state.current.height}px)`
    content.current.style.marginTop = `${-state.current.height}px`
    menu.current.innerText = pickRandomItem()
    animateRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animateRef.current)
      animateRef.current = null
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
    const {
      current: { currentY, action },
    } = state

    if (type !== NO_CHANGE) {
      state.current.requestedActions.push({ type, y, startAt, done })
    }

    if (action === PULLING) {
      if (y < currentY) {
        // 새로 받은 y가 이전의 currentY보다 작다. (드래그 중 마우스를 위로 올렸을 때)
        state.current.requestedActions.push({
          type: RESETING,
          y,
          startAt,
          done,
        })
      }
    }

    if (action === RELEASING && type === PULLING) {
      state.current.requestedActions.push({ type: QUICK_RESETING })
    }

    state.current.currentY = y
  }

  function translate(offset) {
    const {
      current: { height },
    } = state

    slot.current.style.transform = `translateY(${offset - height}px)`
    content.current.style.transform = `translateY(${offset}px)`
  }

  function moveSlotDown(offset) {
    const {
      current: { action },
    } = state
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

    moveSlotDown(y / 4)
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
    if (animateRef.current === null) return

    const {
      current: {
        requestedActions,
        currentY,
        needRefresh,
        startY,
        height,
        slotIdx,
      },
    } = state

    if (state.current.action === NO_ACTION && needRefresh) {
      cancelAnimationFrame(animateRef.current)

      window.location.reload()

      return
    }

    requestedActions
      .filter((x) => x.startAt === 0 || x.startAt < t)
      .forEach((requestedAction) => {
        switch (requestedAction.type) {
          case PULLING:
            if (state.current.action !== NO_ACTION) break

            if ($scrollContainer(slotRef.current)?.scrollTop) break

            state.current.action = PULLING

            state.current.startY = currentY
            break

          case WAITING:
            state.current.action = WAITING
            requestAction({ type: RESETING, startAt: t + WAITING_DURATION })
            break

          case QUICK_RESETING:
            state.current.action = QUICK_RESETING
            moveSlotDown(0) // TODO: REMOVE THIS
            state.current.action = NO_ACTION
            break

          case NO_ACTION:
            state.current.action = NO_ACTION
            state.current.startY = 0
            moveSlotDown(0) // TODO: REMOVE THIS
            break

          case RESETING:
            state.current.action = RESETING
            requestAction({ type: NO_ACTION, startAt: t + RESETING_DURATION })
            moveSlotDown(0) // TODO: REMOVE THIS
            break

          case RELEASING:
            if (state.current.action !== PULLING) break

            if (Math.abs(currentY - startY) < MIN_PULL_LENGTH) {
              requestAction({ type: RESETING })
              break
            }

            state.current.action = RELEASING
            state.current.needRefresh = true
            requestAction({ type: WAITING, startAt: t + RELEASING_DURATION })
            moveSlotDown(height) // TODO: REMOVE THIS
        }

        requestedAction.done = true
      })
    state.current.requestedActions = requestedActions.filter(
      ({ done }) => done === false
    )

    if (state.current.action === PULLING) {
      const offsetY = state.current.currentY - state.current.startY

      if (offsetY > 0) {
        pullSlotDown(offsetY)
      }
    }

    if (
      state.current.action === PULLING ||
      state.current.action === RELEASING ||
      state.current.action === RESETING
    ) {
      const y = getComputedTranslateY(slot.current)
      const menuHeight = height * 0.8
      const newIdx = Math.floor((y + menuHeight / 2) / menuHeight)

      if (slotIdx === null || newIdx !== slotIdx) {
        menu.current.innerText = pickRandomItem()
        state.current.slotIdx = newIdx
      }

      animateSlotMenu(y, menuHeight)
    }

    if (animateRef.current) window.requestAnimationFrame(animate)
  }

  return (
    <div className="slot-machine" ref={slotRef}>
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
            <span className="pull-label">땡겨요</span>
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
  if (!elem) return

  const matrix = getComputedStyle(elem).transform

  if (!matrix) return 0

  return parseFloat(/\.*matrix\(.*,.*,.*,.*,.*,(.*)\)/i.exec(matrix)[1])
}

export default SlotMachine
