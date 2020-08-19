import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Cart, { CartProps } from '../pages/Cart'

export default {
  title: 'CartPage',
  component: Cart,
  args: {
    products: [
      {
        id: 1,
        name: '애호박',
        defaultPrice: 3300,
        price: 3100,
        quantity: 3,
        imgV: 'https://img-cf.kurly.com/shop/data/goods/1539841569718l0.jpg',
      },
      {
        id: 2,
        name: '가지',
        defaultPrice: 4400,
        price: 4100,
        quantity: 5,
        imgV: 'https://img-cf.kurly.com/shop/data/goods/1456402788121l0.jpg',
      },
      {
        id: 3,
        name: '가지',
        defaultPrice: 4400,
        price: 4100,
        quantity: 5,
        imgV: 'https://img-cf.kurly.com/shop/data/goods/1456402788121l0.jpg',
      },
      {
        id: 4,
        name: '가지',
        defaultPrice: 4400,
        price: 4100,
        quantity: 5,
        imgV: 'https://img-cf.kurly.com/shop/data/goods/1456402788121l0.jpg',
      },
    ],
  },
} as Meta

const Template: Story<CartProps> = (args) => <Cart {...args} />

export const CartTest = Template.bind({})
