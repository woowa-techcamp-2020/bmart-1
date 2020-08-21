import $ from 'classnames'
import React, {
  createContext,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Dispatcher } from 'src/types/react-helper'
import './style.scss'

export type DrawerProps = {
  isOpened: boolean
  setOpened: (number) => void
}

export const DrawerContext = createContext<{
  isOpened: boolean
  closeDrawer: () => void
  setFocusPosition: Dispatcher<number>
}>(undefined)

const Drawer: React.FC<DrawerProps> = ({
  isOpened = true,
  children,
  setOpened,
}) => {
  const bodyRef = useRef<HTMLDivElement>()
  const containerRef = useRef<HTMLDivElement>()
  const backgroundRef = useRef<HTMLDivElement>()

  const isHolding = useRef<boolean>(false)
  const startY = useRef<number>(0)
  const [focusPosition, setFocusPosition] = useState<number>(0)
  const needInit = useRef<boolean>(false)

  useEffect(() => {
    moveRef(bodyRef, {
      position: getRefHeight(bodyRef),
    })
  }, [])

  useEffect(() => {
    moveRef(bodyRef, {
      position: isOpened ? 0 : getRefHeight(bodyRef),
      smooth: true,
    })
    focus()

    if (isOpened) {
      needInit.current = true
    }

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

  function handleCursorUp(y) {
    if (!isHolding.current) return

    if (onCursorUp(y, isHolding, startY, getRefHeight(bodyRef))) {
      moveRef(bodyRef, {
        position: 0,
        smooth: true,
      })

      return
    }

    setOpened(false)
  }

  function closeDrawer() {
    setOpened(false)
  }

  return (
    <>
      <div
        className="drawer"
        onMouseMove={({ clientY }) =>
          onCursorMove(clientY, isHolding, startY, bodyRef)
        }
        onTouchMove={(event) =>
          onCursorMove(getFirstTouchY(event), isHolding, startY, bodyRef)
        }
        onMouseUp={({ clientY }) => handleCursorUp(clientY)}
        onTouchEnd={(event) => handleCursorUp(getFirstTouchY(event))}
      >
        <div
          className="background"
          ref={backgroundRef}
          onClick={() => setOpened(false)}
        />
        <div className={$('body', { active: isOpened })} ref={bodyRef}>
          <div
            className="holder"
            onTouchStart={(event) =>
              onCursorDown(getFirstTouchY(event), isHolding, startY)
            }
            onMouseDown={({ clientY }) =>
              onCursorDown(clientY, isHolding, startY)
            }
          >
            <div className="handle" />
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

function onCursorMove(y, isHolding, startY, bodyRef) {
  if (!isHolding.current) return

  moveRef(bodyRef, {
    position: Math.max(y - startY.current, 0),
  })
}

function onCursorUp(y, isHolding, startY, height) {
  isHolding.current = false

  if (y - startY.current < height / 2) {
    return true
  }

  return false
}

function onCursorDown(y, isHolding, startY) {
  startY.current = y
  isHolding.current = true
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

  ref.current.style.transform = `translateY(${position}px)`
  ref.current.style.transition = smooth ? `transform 500ms ease` : ``
  // ref.current.style.transitionDuration = smooth ? '0.5s' : null
}

export default Drawer
