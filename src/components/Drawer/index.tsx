import React, { RefObject, useEffect, useRef } from 'react'
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

const Drawer: React.FC<DrawerProps> = ({ isOpened = true, children, setOpened }) => {
  const bodyRef = useRef<HTMLDivElement>()
  const backgroundRef = useRef<HTMLDivElement>()

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

  return (
    <>
      <div className="drawer">
        <div
          className="background"
          ref={backgroundRef}
          onClick={() => setOpened && setOpened(false)}
        />
        <div className={'body'} ref={bodyRef}>
          <div className="holder">
            <div className="handle" />
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Drawer
