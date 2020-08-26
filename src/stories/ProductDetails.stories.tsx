import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import ProductDetails, { ProductDetailsProps } from 'src/pages/ProductDetails'

export default {
  title: 'ProductDetail',
  args: {
    id: 9529,
    name: '[KF365] 애호박 1개',
    description: '믿고 먹을 수 있는 상품을 합리적인 가격에, KF365',
    defaultPrice: 4580,
    price: 4000,
    discount: 10,
    category: '채소',
    imgV: 'https://img-cf.kurly.com/shop/data/goods/1539841569718l0.jpg',
    imgH: 'https://img-cf.kurly.com/shop/data/goods/1539841569419z0.jpg',
    createdAt: '2020-08-15T08:57:41.000Z',
    subcategory: '기본채소',
  },
  component: ProductDetails,
} as Meta

const Template: Story<ProductDetailsProps> = (args) => (
  <ProductDetails {...args} />
)

export const ProductDetailsTest = Template.bind({})
