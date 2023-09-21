module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'no-unused-vars': ['errors', { argsIgnorePattern: 'next' }],
    // eslint-disable-next-line quote-props
    'camelcase': 'off',
  },
};
