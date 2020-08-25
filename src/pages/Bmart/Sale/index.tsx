import React, { useEffect, useRef } from 'react'
import Lightning from 'src/assets/images/thunder/lightning.png'
import { $sel } from 'src/utils'
import './style.scss'

const timeouts: number[] = []

function thunder(reset = false) {
  const lightning = $sel('.lightning')
  const flash = $sel('.flash')

  if (reset) {
    timeouts.forEach((timeout) => window.clearTimeout(timeout))

    while (timeouts.length) {
      timeouts.pop()
    }

    lightning.removeAttribute('style')
    flash.classList.remove('on', 'off', 'spread')

    return
  }

  timeouts.push(
    window.setTimeout(() => {
      lightning.style.opacity = '1'
      lightning.style.filter = 'brightness(3.5)'
      flash.classList.add('on')
      timeouts.push(
        window.setTimeout(() => {
          flash.classList.remove('on')
          flash.classList.add('off')
          lightning.style.transition = 'filter 1s ease'
          lightning.style.filter = 'brightness(0.5)'
          timeouts.push(
            window.setTimeout(() => {
              lightning.style.transition =
                'filter 200ms ease, opacity 200ms ease'
              lightning.style.filter = 'brightness(13)'
              lightning.style.opacity = '0'
              flash.classList.add('spread')
              timeouts.push(
                window.setTimeout(() => {
                  flash.classList.remove('spread')
                  flash.classList.add('off')
                }, 400)
              )
            }, 700)
          )
        }, 20)
      )
    }, 500)
  )
}

export type SaleProps = unknown

const Sale: React.FC<SaleProps> = (props) => {
  const lightningSentinelRef = useRef<HTMLDivElement>()

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          thunder()
        } else {
          thunder(true)
        }
      }
    })

    observer.observe(lightningSentinelRef.current)
  }, [])

  return (
    <div className="sale-page">
      <div className="flash" />
      <img src={Lightning} className="lightning" alt="lightning" />
      <div className="lightning-sentinel" ref={lightningSentinelRef} />
    </div>
  )
}

export default Sale
