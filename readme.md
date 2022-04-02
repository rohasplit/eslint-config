# Usage

1. Install peer dependencies

```sh
# yarn
yarn add -D eslint@^8.12.0 prettier@^2.6.1

# npm
npm install eslint@^8.12.0 prettier@^2.6.1 --save-dev
```

2. Create a `.eslintrc.js` file in your project's directory with the following content:

```js
require('@rohasplit/eslint-config/patch');

module.exports = {
  extends: [require.resolve('@rohasplit/eslint-config')],
};
```
