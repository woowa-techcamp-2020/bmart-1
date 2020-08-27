import React, { useEffect, useState } from 'react'
import { getJJims } from 'src/apis'
import HeartIcon from 'src/components/icons/HeartIcon'
import PageHeader from 'src/components/PageHeader'
import ProductContainer from 'src/components/ProductContainer'
import GoBack from 'src/components/shortcuts/GoBack'
import { ProductWithJjimmed } from 'src/types/api'
import './style.scss'

export type JjimsProps = unknown

type JjimsState = {
  products: ProductWithJjimmed[]
  isLoading: boolean
}

const Jjims: React.FC<JjimsProps> = () => {
  const [state, setState] = useState<JjimsState>({
    products: [],
    isLoading: true,
  })

  async function getJJimedProducts() {
    const products = await getJJims()

    setState({ ...state, products, isLoading: false })
  }

  useEffect(() => {
    if (state.isLoading) {
      getJJimedProducts()
    }
  }, [state.isLoading])

  return (
    <div className="jjims">
      <PageHeader
        Icon={HeartIcon.bind({}, { size: 'big' })}
        title="찜 목록"
      ></PageHeader>
      <ProductContainer
        products={state.products}
        isSkeletonOn={state.isLoading}
      ></ProductContainer>
      <GoBack />
    </div>
  )
}

export default Jjims
