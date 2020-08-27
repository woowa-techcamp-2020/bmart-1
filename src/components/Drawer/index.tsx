import $ from 'classnames'
import React, {
  createContext,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Dispatcher } from 'src/types/react-helper'
import DrawerHandle from '../icons/DrawerHandleIcon'
import './style.scss'

export type DrawerProps = {
  isOpened: boolean
  setOpened: (number) => void
  maxHeight?: string
}

export const DrawerContext = createContext<{
  closeDrawer: () => void
  isOpened: boolean
  setFocusPosition: Dispatcher<number>
}>(undefined)

type DrawerStateType = {
  isHolding: boolean
  startY: number
  startAt: number
}

const Drawer: React.FC<DrawerProps> = ({
  isOpened = true,
  children,
  setOpened,
  maxHeight = '70vh',
}) => {
  const state = useRef<DrawerStateType>({
    isHolding: false,
    startY: 0,
    startAt: 0,
  })
  const bodyRef = useRef<HTMLDivElement>()
  const containerRef = useRef<HTMLDivElement>()
  const backgroundRef = useRef<HTMLDivElement>()

  const [focusPosition, setFocusPosition] = useState<number>(0)

  useEffect(() => {
    moveRef(bodyRef, {
      position: getRefHeight(bodyRef),
    })
    containerRef.current.style.maxHeight = `calc(${maxHeight} - var(--holder-height) - 15px)`
  }, [])

  // Init background oapcity to 0 without transition
  useEffect(() => {
    backgroundRef.current.style.transition = 'none'
    backgroundRef.current.style.opacity = '0'

    setTimeout(() => {
      backgroundRef.current.style.transition = ''
    }, 0)
  }, [])

  useEffect(() => {
    moveRef(bodyRef, {
      position: isOpened ? 0 : getRefHeight(bodyRef),
      smooth: true,
    })
    focus()

    backgroundRef.current.style.pointerEvents = isOpened ? 'all' : 'none'
    backgroundRef.current.style.opacity = isOpened ? '0.3' : '0'
  }, [isOpened])

  useEffect(() => {
    focus()
  }, [focusPosition])

  function focus() {
    if (focusPosition === 0) return

    containerRef.current.scrollTo({
      top: focusPosition,
      behavior: 'smooth',
    })
  }

  function handleCursorUp(state: RefObject<DrawerStateType>, y) {
    if (!state.current.isHolding) return

    if (onCursorUp(state, y, getRefHeight(bodyRef))) {
      moveRef(bodyRef, {
        position: 0,
        smooth: true,
      })

      return
    }

    setOpened(false)
  }

  function onCursorMove(state: RefObject<DrawerStateType>, y, bodyRef) {
    const { isHolding, startY, startAt } = state.current

    if (!isHolding) return

    const velocity = ((y - startY) / (+new Date() - startAt)) * 1000

    if (velocity > 400) {
      state.current.isHolding = false
      setOpened(false)

      return
    }

    moveRef(bodyRef, {
      position: Math.max(y - startY, 0),
    })
  }

  function closeDrawer() {
    setOpened(false)
  }

  return (
    <>
      <div
        className="drawer"
        onMouseMove={({ clientY }) => onCursorMove(state, clientY, bodyRef)}
        onTouchMove={(event) =>
          onCursorMove(state, getFirstTouchY(event), bodyRef)
        }
        onMouseUp={({ clientY }) => handleCursorUp(state, clientY)}
        onTouchEnd={(event) => handleCursorUp(state, getFirstTouchY(event))}
      >
        <div
          className="background"
          ref={backgroundRef}
          onClick={() => setOpened(false)}
        />
        <div className={$('body', { active: isOpened })} ref={bodyRef}>
          <div
            className="holder"
            onTouchStart={(event) => onCursorDown(state, getFirstTouchY(event))}
            onMouseDown={({ clientY }) => onCursorDown(state, clientY)}
          >
            <DrawerHandle />
          </div>
          <div className="container" ref={containerRef}>
            <DrawerContext.Provider
              value={{ isOpened, closeDrawer, setFocusPosition }}
            >
              {children}
            </DrawerContext.Provider>
          </div>
        </div>
      </div>
    </>
  )
}

function onCursorUp(state: RefObject<DrawerStateType>, y, height) {
  state.current.isHolding = false

  if (y - state.current.startY < height / 2) {
    return true
  }

  return false
}

function onCursorDown(state: RefObject<DrawerStateType>, y) {
  if (state.current.isHolding) return

  state.current.startY = y
  state.current.startAt = +new Date()
  state.current.isHolding = true
}

function getFirstTouch(event: React.TouchEvent) {
  return event.targetTouches[0] || event.changedTouches[0]
}

function getFirstTouchY(event: React.TouchEvent) {
  return getFirstTouch(event).clientY
}

function getRefHeight(ref: RefObject<HTMLDivElement>): number {
  if (!ref?.current) return 0

  return ref.current.getBoundingClientRect().height
}

function moveRef(
  ref: RefObject<HTMLDivElement>,
  options: { position: number; smooth?: boolean }
): void {
  if (!ref?.current) return

  const { position, smooth = false } = options

  ref.current.style.transform = `translateX(-50%) translateY(${position}px)`
  ref.current.style.transition = smooth ? `transform 500ms ease` : ``
}

export default Drawer
