module.exports = {
  extends: ['stylelint-config-standard'],
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'no-empty-source': null,
    'value-list-comma-newline-after': null,
    'value-keyword-case': null,
    'selector-list-comma-newline-after': null,
    'declaration-colon-newline-after': null,
    'function-name-case': null,
    'value-keyword-case': null,
    indentation: null,
  },
}
