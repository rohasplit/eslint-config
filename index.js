const path = require('path');
const cwd = process.cwd();
const package = require(path.resolve(cwd, 'package.json'));

const parser = () => {
  if (package.dependencies.typescript) {
    return '@typescript-eslint/parser';
  }

  return '@babel/eslint-parser';
};

const sourceType = () => {
  const isModule = ['esm', 'typescript', 'next', 'react-dom'].some((dependency) => {
    return Boolean(package.dependencies[dependency]);
  });

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

    ...(Boolean(package.dependencies['react-dom']) && {
      browser: true,
    }),
  },

  parser: parser(),

  parserOptions: {
    sourceType: sourceType(),
    ecmaVersion: 2020,

    ...(parser() === '@babel/eslint-parser' && {
      requireConfigFile: false,
    }),
  },

  plugins: [
    //
    Boolean(package.dependencies.typescript) && '@typescript-eslint',
    'prettier',
  ].filter(Boolean),

  extends: [
    'eslint:recommended',
    Boolean(package.dependencies.typescript) && 'plugin:@typescript-eslint/recommended',
    Boolean(package.dependencies.next) && 'plugin:@next/next/recommended',
    'prettier',
  ].filter(Boolean),

  rules: {
    'prettier/prettier': 1,
    'no-console': 1,

    ...(Boolean(package.dependencies['typescript']) && {
      '@typescript-eslint/no-var-requires': 0,
    }),
  },
};

console.log('+++ Start of Generated ESLint Config');
console.log(JSON.stringify(config, null, 2));
console.log('+++ End of Generated ESLint Config');

module.exports = config;
