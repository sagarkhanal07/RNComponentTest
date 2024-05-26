module.exports = {
  env: {
    'jest/globals': true,
  },
  root: true,
  extends: '@react-native',
  plugins: ['jest', 'simple-import-sort'],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'react-native/no-inline-styles': 0,
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'react/default-props-match-prop-types': ['error'],
    'react/sort-prop-types': ['error'],
    //if we want to group imports can use below.
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react'], ['^@?\\w'], ['@/(.*)'], ['^[./]']],
      },
    ],
  },
  settings: {
    'import/resolver': {
      'babel-module': {},
    },
  },
};
