import React, { useState } from 'react'
import { getProductsByTopic } from 'src/apis'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import { useLazy } from 'src/utils/hooks'
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

  async function loadProducts() {
    const newProducts = (await getProductsByTopic(type)) as ProductWithJjimmed[]

    setProducts(newProducts)
    setLoading(false)
  }


  useLazy(loadProducts().then(() => {
      setTimeout(() => {
        onFinished && onFinished()
      }, 0)
    }))
  const [scrollEnd, setScrollEnd] = useState<'left' | 'right' | 'middle'>(
    'left'
  )

  return (
    <div className="topic-container">
      <div className="title">{title}</div>
      <div className="scroll-container">
        <div
          className="container"
          onScroll={(e) => {
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
