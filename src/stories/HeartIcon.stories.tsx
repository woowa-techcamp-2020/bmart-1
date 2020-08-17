import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import HeartIcon, { HeartIconProps } from '../components/HeartIcon'

export default {
  title: 'HeartIconPage',
  component: HeartIcon,
} as Meta

const Template: Story<HeartIconProps> = (args) => <HeartIcon {...args} />

export const HeartIconTest = Template.bind({})
