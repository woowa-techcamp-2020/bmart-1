import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import ProductItem, { ProductItemProps } from '../components/ProductItem'

export default {
  title: 'ProductItem',
  component: ProductItem,
} as Meta

const Template: Story<ProductItemProps> = (args) => <ProductItem {...args} />

export const ProductItemTest = Template.bind({})
