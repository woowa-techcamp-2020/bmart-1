import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import CartItem, { CartItemProps } from 'src/pages/Cart/CartItem'

export default {
  title: 'CartItem',
  component: CartItem,
  args: {
    id: 1,
    name: '애호박',
    defaultPrice: 3300,
    price: 3100,
    quantity: 3,
    imgV: 'https://img-cf.kurly.com/shop/data/goods/1539841569718l0.jpg',
  },
} as Meta

const Template: Story<CartItemProps> = (args) => <CartItem {...args} />

export const CartItemTest = Template.bind({})
