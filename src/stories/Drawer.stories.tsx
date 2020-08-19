// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Drawer, { DrawerProps } from 'src/components/Drawer'

export default {
  title: 'Drawer',
  component: Drawer,
  args: {
    isOpened: false,
  },
} as Meta

const Template: Story<DrawerProps> = (args) => <Drawer {...args} />

export const Main = Template.bind({})

const ScrollableTemplate: Story<DrawerProps> = (args) => {
  return (
    <Drawer {...args}>
      <div
        style={{
          height: '2000px',
          background: 'linear-gradient( to bottom, yellow, red )',
        }}
      ></div>
    </Drawer>
  )
}

export const Scrollable = ScrollableTemplate.bind({})
