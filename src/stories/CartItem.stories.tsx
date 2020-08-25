import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import CartItem, { CartItemProps } from 'src/pages/Cart/CartItem'

export default {
  title: 'CartPage/CartItem',
  component: CartItem,
  args: {
    productInCart: {
      userId: 15,
      productId: 9566,
      quantity: 3,
      addedAt: '2020-08-20T00:02:04.000Z',
      product: {
        id: 9566,
        name: '친환경 얼갈이 & 열무 2종',
        description: '찬바람이 불 때 더 맛있는 채소 (1봉 300g)',
        defaultPrice: 1800,
        price: 1800,
        discount: 0,
        category: '채소',
        imgV: 'https://img-cf.kurly.com/shop/data/goods/1470278013934l0.jpg',
        imgH: 'https://img-cf.kurly.com/shop/data/goods/1460729715654z0.jpg',
        createdAt: '2020-08-15T08:55:00.000Z',
        subcategory: '기본채소',
      },
    },
  },
} as Meta

const Template: Story<CartItemProps> = (args) => <CartItem {...args} />

export const CartItemTest = Template.bind({})
