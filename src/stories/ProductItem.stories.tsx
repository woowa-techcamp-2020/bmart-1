import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import ProductItem, { ProductItemProps } from '../components/ProductItem'

export default {
  title: 'ProductItem',
  component: ProductItem,
  args: {
    id: 9529,
    name: '[KF365] 애호박 1개',
    defaultPrice: 4800,
    price: 4580,
    discount: 5,
    imgV: 'https://img-cf.kurly.com/shop/data/goods/1539841569718l0.jpg',
    isJjimmed: true,
  },
} as Meta

const Template: Story<ProductItemProps> = (args) => <ProductItem {...args} />

export const ProductItemTest = Template.bind({})
