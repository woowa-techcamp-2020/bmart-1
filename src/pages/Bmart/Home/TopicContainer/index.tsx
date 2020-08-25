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

  return (
    <div className="topic-container">
      <div className="title">{title}</div>
      <div className="scroll-container">
        <div className="container">
          {products.map((x, i) => (
            <ProductItem key={i} {...x}></ProductItem>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopicContainer
