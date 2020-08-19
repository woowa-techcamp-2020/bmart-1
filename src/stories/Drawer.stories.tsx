// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useState } from 'react'
import Drawer, { DrawerProps } from 'src/components/Drawer'
import { SORT_BY_TYPES } from 'src/constants'
import OptionSelector from 'src/pages/CategoryDetails/OptionSelector'

export default {
  title: 'Drawer',
  component: Drawer,
  args: {
    isOpened: true,
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

const OptionsDrawerTemplate: Story<DrawerProps> = (args) => {
  const [optionIdx, setOptionIdx] = useState(0)

  return (
    <Drawer {...args}>
      <OptionSelector
        optionIdx={optionIdx}
        setOptionIdx={setOptionIdx}
        options={Array.from({ length: 30 }, (_, i) => String(i))}
      ></OptionSelector>
    </Drawer>
  )
}

export const withOptionSelectors = OptionsDrawerTemplate.bind({})

const SortOptionsDrawerTemplate: Story<DrawerProps> = (args) => {
  const [optionIdx, setOptionIdx] = useState(0)

  return (
    <Drawer {...args}>
      <OptionSelector
        optionIdx={optionIdx}
        setOptionIdx={setOptionIdx}
        options={SORT_BY_TYPES.slice()}
      ></OptionSelector>
    </Drawer>
  )
}

export const withSortOptionSelectors = SortOptionsDrawerTemplate.bind({})
