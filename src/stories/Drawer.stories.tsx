// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React, { useEffect, useState } from 'react'
import Drawer, { DrawerProps } from 'src/components/Drawer'
import { DEFAULTS } from 'src/constants'
import OptionSelector from 'src/pages/CategoryDetails/OptionSelector'

export default {
  title: 'Drawer',
  component: Drawer,
  args: {
    isOpened: true,
  },
} as Meta

const Template: Story<DrawerProps> = (args) => {
  const [isOpened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(args.isOpened)
  }, [args.isOpened])

  return <Drawer isOpened={isOpened} setOpened={setOpened} />
}

export const Main = Template.bind({})

const ScrollableTemplate: Story<DrawerProps> = (args) => {
  const [isOpened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(args.isOpened)
  }, [args.isOpened])

  return (
    <Drawer isOpened={isOpened} setOpened={setOpened}>
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
  const [isOpened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(args.isOpened)
  }, [args.isOpened])
  const [option, setOption] = useState(null)

  return (
    <Drawer isOpened={isOpened} setOpened={setOpened}>
      <OptionSelector
        option={option}
        setOption={setOption}
        options={Array.from({ length: 30 }, (_, i) => String(i))}
      ></OptionSelector>
    </Drawer>
  )
}

export const withOptionSelectors = OptionsDrawerTemplate.bind({})

const SortOptionsDrawerTemplate: Story<DrawerProps> = (args) => {
  const [option, setOption] = useState(null)
  const [isOpened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(args.isOpened)
  }, [args.isOpened])

  return (
    <Drawer isOpened={isOpened} setOpened={setOpened}>
      <OptionSelector
        option={option}
        setOption={setOption}
        options={DEFAULTS.SORT_OPTIONS.slice()}
      ></OptionSelector>
    </Drawer>
  )
}

export const withSortOptionSelectors = SortOptionsDrawerTemplate.bind({})
