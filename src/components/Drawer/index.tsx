import React, { createContext, RefObject, useEffect, useRef } from 'react'
import { DispatchByType } from 'src/pages/CategoryDetails'
import './style.scss'

export type DrawerProps = {
  isOpened: boolean
  setOpened?: (number) => void
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

  ref.current.style.bottom = `-${position}px`
  ref.current.style.transitionDuration = smooth ? '0.5s' : null
}

export const DrawerContext = createContext<{
  isOpened: boolean
  setOpened: DispatchByType<boolean>
}>(undefined)

const Drawer: React.FC<DrawerProps> = ({ isOpened = true, children, setOpened }) => {
  const bodyRef = useRef<HTMLDivElement>()
  const backgroundRef = useRef<HTMLDivElement>()

  const isHolding = useRef<boolean>(false)
  const startY = useRef<number>(0)

  useEffect(() => {
    moveRef(bodyRef, {
      position: getRefHeight(bodyRef),
    })
  }, [])

  useEffect(() => {
    if (isOpened) {
      moveRef(bodyRef, {
        position: 0,
        smooth: true,
      })
    } else {
      moveRef(bodyRef, {
        position: getRefHeight(bodyRef),
        smooth: true,
      })
    }

    backgroundRef.current.style.pointerEvents = isOpened ? 'all' : 'none'
    backgroundRef.current.style.opacity = isOpened ? '0.3' : '0'
  }, [isOpened])

  function onCursorMove(y) {
    if (isHolding.current) {
      moveRef(bodyRef, {
        position: Math.max(y - startY.current, 0),
      })
    }
  }

  function onCursorUp(y) {
    const height = getRefHeight(bodyRef)

    if (y - startY.current < height / 2) {
      moveRef(bodyRef, {
        position: 0,
        smooth: true,
      })
    } else {
      setOpened(false)
    }

    isHolding.current = false
  }

  function onCursorDown(y) {
    startY.current = y
    isHolding.current = true
  }

  function getFirstTouch(event: React.TouchEvent) {
    return event.targetTouches[0] || event.changedTouches[0]
  }

  function getFirstTouchY(event: React.TouchEvent) {
    return getFirstTouch(event).clientY
  }

  return (
    <>
      <div
        className="drawer"
        onMouseMove={({ clientY }) => onCursorMove(clientY)}
        onTouchMove={(event) => onCursorMove(getFirstTouchY(event))}
        onMouseUp={({ clientY }) => onCursorUp(clientY)}
        onTouchEnd={(event) => onCursorUp(getFirstTouchY(event))}
      >
        <div
          className="background"
          ref={backgroundRef}
          onClick={() => setOpened && setOpened(false)}
        />
        <div className={'body'} ref={bodyRef}>
          <div
            className="holder"
            onTouchStart={(event) => onCursorDown(getFirstTouchY(event))}
            onMouseDown={({ clientY }) => onCursorDown(clientY)}
          >
            <div className="handle" />
          </div>
          <div className="container">
            <DrawerContext.Provider value={{ isOpened, setOpened }}>
              {children}
            </DrawerContext.Provider>
          </div>
        </div>
      </div>
    </>
  )
}

export default Drawer
