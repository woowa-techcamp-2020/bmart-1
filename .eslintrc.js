module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', '', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    'react-hooks/exhaustive-deps': [0],
  },
}
