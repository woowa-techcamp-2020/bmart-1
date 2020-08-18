import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Carousel from 'src/components/Carousel'

export default {
  title: 'Carousel',
  component: Carousel,
} as Meta

const Template: Story = (args) => (
  <div className="parent">
    <Carousel />
  </div>
)

export const TestCarousel = Template.bind({})
