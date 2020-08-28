import React, { useEffect, useRef, useState } from 'react'
import { getProductsByTopic } from 'src/apis'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import { cacheProducts, loadProductsFromCache } from 'src/utils/cache-products'
import { memoScroll, restoreScroll } from 'src/utils/scroll-manager'
import './style.scss'

export type TopicContainerProps = {
  title: string
  type: 'new' | 'now'
  onFinished?: () => void
}

const TopicContainer: React.FC<TopicContainerProps> = ({
  title = '',
  type = 'new',
  onFinished,
}) => {
  const [products, setProducts] = useState<ProductWithJjimmed[]>([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    cacheProducts('topic-' + type, products)
  }, [products])

  async function loadProducts() {
    // ⚠️ Bug!! Previous Page is not really previous page
    const previousPage = window.localStorage.getItem('currentPage')

    if (
      previousPage &&
      typeof previousPage === 'string' &&
      (previousPage.startsWith('/products') ||
        previousPage.startsWith('/category'))
    ) {
      const cached = loadProductsFromCache('topic-' + type)

      setProducts(cached.products)
      setLoading(false)

      onFinished && onFinished()

      restoreScroll('topic-' + type, containerRef.current)

      return
    }

    const newProducts = (await getProductsByTopic(type)) as ProductWithJjimmed[]

    setProducts(newProducts)
    setLoading(false)
  }

  function initLoadProducts() {
    loadProducts().then(() => {
      setTimeout(() => {
        onFinished && onFinished()
      }, 0)
    })
  }

  useEffect(() => {
    initLoadProducts()
  }, [])

  // useLazy(initLoadProducts)

  const [scrollEnd, setScrollEnd] = useState<'left' | 'right' | 'middle'>(
    'left'
  )

  const containerRef = useRef<HTMLDivElement>()

  return (
    <div className="topic-container">
      <div className="title">{title}</div>
      <div className="scroll-container">
        <div
          ref={containerRef}
          className="container"
          onScroll={(e) => {
            memoScroll('topic-' + type, e.currentTarget.scrollLeft, 'left')

            if (
              e.currentTarget.scrollLeft + e.currentTarget.clientWidth >=
              e.currentTarget.scrollWidth
            ) {
              setScrollEnd('right')
            } else if (e.currentTarget.scrollLeft === 0) {
              setScrollEnd('left')
            } else {
              setScrollEnd('middle')
            }
          }}
        >
          {isLoading
            ? new Array(12)
                .fill(undefined)
                .map((x, i) => (
                  <ProductItem isSkeleton={true} key={`s${i}`}></ProductItem>
                ))
            : products.map((x, i) => (
                <ProductItem key={i} {...x}></ProductItem>
              ))}
          <div className="dummy" />
        </div>

        {scrollEnd !== 'left' && <div className="shadow left" />}
        {scrollEnd !== 'right' && <div className="shadow right" />}
      </div>
    </div>
  )
}

export default TopicContainer
