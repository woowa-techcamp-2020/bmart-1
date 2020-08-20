import React, { createContext, RefObject, useEffect, useRef } from 'react'
import './style.scss'

export type DrawerProps = {
  isOpened: boolean
  setOpened: (number) => void
}

export const DrawerContext = createContext<{
  close: () => void
}>(undefined)

const Drawer: React.FC<DrawerProps> = ({
  isOpened = true,
  children,
  setOpened,
}) => {
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
    moveRef(bodyRef, {
      position: isOpened ? 0 : getRefHeight(bodyRef),
      smooth: true,
    })

    backgroundRef.current.style.pointerEvents = isOpened ? 'all' : 'none'
    backgroundRef.current.style.opacity = isOpened ? '0.3' : '0'
  }, [isOpened])

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
        <div className={'body'} ref={bodyRef}>
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
          <div className="container">
            <DrawerContext.Provider value={{ close: setOpened.bind({}, null) }}>
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

  ref.current.style.bottom = `-${position}px`
  ref.current.style.transitionDuration = smooth ? '0.5s' : null
}

export default Drawer
