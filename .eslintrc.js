module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'prettier'],
  rules: {
    'jsx-a11y/alt-text': 'off',
    'react/display-name': 'off',
    'react/no-children-prop': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-page-custom-font': 'off',
    'lines-around-comment': 'off',
    'padding-line-between-statements': 'off',
    'newline-before-return': 'off',
    'import/newline-after-import': 'off',
    'import/order': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'import/no-anonymous-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-unresolved': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {},
    'import/resolver': {
      node: {},
      typescript: {
        project: './jsconfig.json'
      }
    }
  },
  overrides: []
}
