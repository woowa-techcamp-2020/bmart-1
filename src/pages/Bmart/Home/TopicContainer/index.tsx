import React, { useEffect, useState } from 'react'
import { getProductsByTopic } from 'src/apis'
import ProductItem from 'src/components/ProductItem'
import { ProductWithJjimmed } from 'src/types/api'
import './style.scss'

export type TopicContainerProps = {
  title: string
  type: 'new' | 'now'
}

const TopicContainer: React.FC<TopicContainerProps> = ({
  title = '',
  type = 'new',
}) => {
  const [products, setProducts] = useState<ProductWithJjimmed[]>([])

  async function loadProducts() {
    const newProducts = (await getProductsByTopic(type)) as ProductWithJjimmed[]

    setProducts(newProducts)
  }

  useEffect(() => {
    loadProducts()
  }, [])

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
          {products.map((x, i) => (
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
