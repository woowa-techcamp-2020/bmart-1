import smoothscroll from 'smoothscroll-polyfill'
import '../src/styles/base.scss'

smoothscroll.polyfill()

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  viewport: {
    defaultViewport: 'mobile1',
  },
}
