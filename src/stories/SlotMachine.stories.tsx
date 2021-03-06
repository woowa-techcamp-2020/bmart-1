// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import SlotMachine, { SlotMachineProps } from 'src/components/SlotMachine'

export default {
  title: 'Home/SlotMachine',
  component: SlotMachine,
} as Meta

const Template: Story<SlotMachineProps> = (args) => {
  return (
    <div>
      <SlotMachine {...args}>
        <div>hihi</div>
      </SlotMachine>
    </div>
  )
}

export const Main = Template.bind({})
