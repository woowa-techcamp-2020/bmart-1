// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'
import TopicContainer from 'src/pages/Bmart/Home/TopicContainer'
import { FullNameLogoAltProps } from '../components/icons/FullNameLogoAlt'

export default {
  title: 'Home/TopicContainer',
  component: TopicContainer,
} as Meta

const Template: Story<FullNameLogoAltProps> = (args) => (
  <TopicContainer type="new" title="신상이다 히히"></TopicContainer>
)

export const BaseTopic = Template.bind({})
