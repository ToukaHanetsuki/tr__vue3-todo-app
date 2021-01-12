module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'indent': ['error', 2],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-extra-semi': ['error'],
    'no-multi-spaces': 'error',
    'no-multiple-empty-lines': ['error', {'max': 1}],
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error'],
    'semi-spacing': ['error', { after: false, before: false }],
    'semi-style': ['error', 'last'],
    'space-in-parens': ['error', 'never']
  }
};
