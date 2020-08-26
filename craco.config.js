const eslintConfig = require('./.eslintrc.js')
module.exports = {
  eslint: {
    configure: eslintConfig,
  },
  devServer: {
    proxy: {
      '/api': 'http://localhost:13100',
      '/auth': 'http://localhost:13100',
    },
  },
}
