import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import Search, { SearchProps } from 'src/components/Search'

export default {
  title: 'Search',
  component: Search,
} as Meta

const Template: Story<SearchProps> = (args) => <Search {...args} />

export const SearchTest = Template.bind({})
