import React, { useEffect, useRef, useState } from 'react'
import { createQuery, request } from 'src/apis'
import Lightning from 'src/assets/images/thunder/lightning.png'
import ProductItem from 'src/components/ProductItem'
import { DEFAULTS } from 'src/constants'
import { ProductWithJjimmed } from 'src/types/api'
import { $sel } from 'src/utils'
import { useLazy } from 'src/utils/hooks'
import { restoreScroll } from 'src/utils/scroll-manager'
import './style.scss'

const timeouts: number[] = []

function thunder(reset = false) {
  const lightning = $sel('.lightning')
  const flash = $sel('.flash')

  if (!lightning || !flash) {
    return
  }

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

const Sale: React.FC<SaleProps> = () => {
  const lightningSentinelRef = useRef<HTMLDivElement>()
  const [saleProducts, setSaleProducts] = useState<ProductWithJjimmed[]>([])

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

    return () => {
      observer.disconnect()
    }
  }, [])

  const salePage = useRef<HTMLDivElement>()

  async function init() {
    const allProducts = (
      await Promise.all(
        DEFAULTS.CATEGORIES.map((category) =>
          request(
            `/products-by-category${createQuery({
              category: category,
              sortBy: 'discount',
              direction: 'desc',
              amount: '1',
              page: '1',
            })}`,
            'GET'
          )
        )
      )
    ).flat()

    setSaleProducts((prev) => [...prev, ...allProducts])
    restoreScroll(
      window.location.pathname,
      salePage.current.closest('.slide-page')
    )
  }

  useLazy(init)

  return (
    <div className="sale-page" ref={salePage}>
      <div className="flash" />
      <img src={Lightning} className="lightning" alt="lightning" />
      <div className="lightning-sentinel" ref={lightningSentinelRef} />

      <div className="ment">
        지금 놓치면
        <br />
        후회할걸?
      </div>

      <div className="sale-products">
        {saleProducts.map((product) => (
          <ProductItem key={product.id} {...product} size="big" />
        ))}
      </div>
    </div>
  )
}

export default Sale
