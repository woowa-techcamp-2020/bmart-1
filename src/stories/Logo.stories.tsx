import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import Logo, { LogoProps } from '../components/Logo'

export default {
  title: 'Example/Logo',
  component: Logo,
} as Meta

const Template: Story<LogoProps> = (args) => <Logo {...args} />

export const BaseLogo = Template.bind({})
