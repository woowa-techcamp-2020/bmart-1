import React, { createContext, RefObject, useEffect, useRef, useState } from 'react'
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
  const [isLocalOpened, setLocalOpened] = useState(isOpened)
  const bodyRef = useRef<HTMLDivElement>()
  const backgroundRef = useRef<HTMLDivElement>()

  useEffect(() => {
    moveRef(bodyRef, {
      position: getRefHeight(bodyRef),
    })
  }, [])

  useEffect(() => {
    const flag = setOpened ? isOpened : isLocalOpened

    if (flag) {
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

    backgroundRef.current.style.pointerEvents = flag ? 'all' : 'none'
    backgroundRef.current.style.opacity = flag ? '0.3' : '0'
  }, [isOpened, isLocalOpened])

  return (
    <>
      <div className="drawer">
        <div
          className="background"
          ref={backgroundRef}
          onClick={() => (setOpened ? setOpened(false) : setLocalOpened(false))}
        />
        <div className={'body'} ref={bodyRef}>
          <div className="holder">
            <div className="handle" />
          </div>
          <div className="container">
            <DrawerContext.Provider
              value={{ isOpened, setOpened: setOpened ? setOpened : setLocalOpened }}
            >
              {children}
            </DrawerContext.Provider>
          </div>
        </div>
      </div>
    </>
  )
}

export default Drawer
