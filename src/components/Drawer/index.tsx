import React, { RefObject, useEffect, useRef, useState } from 'react'
import './style.scss'

export type DrawerProps = {
  isOpened: boolean
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

  console.log(options)
  const { position, smooth = false } = options

  ref.current.style.bottom = `-${position}px`
  ref.current.style.transitionDuration = smooth ? '0.5s' : null
}

const Drawer: React.FC<DrawerProps> = ({ isOpened: initialOpened = false, children }) => {
  const [isOpened, setOpened] = useState(initialOpened)
  const bodyRef = useRef<HTMLDivElement>()

  useEffect(() => {
    moveRef(bodyRef, {
      position: getRefHeight(bodyRef),
    })
  }, [])

  useEffect(() => {
    setOpened(initialOpened)
  }, [initialOpened])

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
  }, [isOpened])

  return (
    <>
      <div className="drawer">
        <div className="background" onClick={() => setOpened(!isOpened)} />
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
