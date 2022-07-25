const path = require('path');
const cwd = process.cwd();
const package = require(path.resolve(cwd, 'package.json'));

const isDependency = (/** @type {string} */ dependency) =>
  dependency in package.dependencies || dependency in package.devDependencies;

const isAnyOneADependency = (/** @type {Array<string>} */ dependencies) =>
  dependencies.some((dependency) => isDependency(dependency));

const parser = () => {
  if (isDependency('typescript')) {
    return '@typescript-eslint/parser';
  }

  return '@babel/eslint-parser';
};

const sourceType = () => {
  const isModule = isAnyOneADependency(['esm', 'typescript', 'next', 'react-dom']);

  if (isModule) {
    return 'module';
  }

  return 'script';
};

const config = {
  env: {
    node: true,
    es6: true,
    es2017: true,
    es2020: true,

    ...(isDependency('react-dom') && {
      browser: true,
    }),
  },

  parser: parser(),

  parserOptions: {
    sourceType: sourceType(),
    ecmaVersion: 2020,

    ...(parser() === '@babel/eslint-parser' && {
      requireConfigFile: false,

      ...(isAnyOneADependency(['react-dom', 'next']) && {
        babelOptions: {
          presets: [
            //
            isDependency('react-dom') && '@babel/preset-react',
            isDependency('next') && 'next/babel',
          ].filter(Boolean),
        },
      }),
    }),
  },

  plugins: [
    //
    isDependency('typescript') && '@typescript-eslint',
    'prettier',
  ].filter(Boolean),

  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    isDependency('typescript') && 'plugin:@typescript-eslint/recommended',
    isDependency('typescript') && 'plugin:import/typescript',
    isDependency('next') && 'plugin:@next/next/recommended',
    isDependency('next') && 'next/core-web-vitals',
    'prettier',
  ].filter(Boolean),

  settings: {
    ...(isDependency('typescript') && {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
    }),

    'import/resolver': {
      node: {},
      ...(isDependency('typescript') && {
        typescript: {},
      }),
    },
  },

  rules: {
    'no-console': 1,
    'no-unused-vars': 1,
    'prettier/prettier': 1,

    'import/no-extraneous-dependencies': [1],
    'import/order': [
      1,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: 'classnames/bind',
            group: 'sibling',
          },
        ],
      },
    ],

    ...(isDependency('typescript') && {
      '@typescript-eslint/no-var-requires': 1,
    }),

    ...(isDependency('next') && {
      '@next/next/no-img-element': 1,
    }),
  },
};

// console.log('+++ Start of Generated ESLint Config');
// console.log(JSON.stringify(config, null, 2));
// console.log('+++ End of Generated ESLint Config');

module.exports = config;
