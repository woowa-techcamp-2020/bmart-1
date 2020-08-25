import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Carousel from 'src/components/Carousel'

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta

const Template: Story = (args) => (
  <div className="parent" {...args}>
    <Carousel />
  </div>
)

export const TestCarousel = Template.bind({})
