# Usage

1. Install this package as a development dependency.

```sh
# example using yarn
yarn add -D @rohasplit/eslint-config
```

2. Install the required peer dependencies. Some package managers such as npm^7 and pnpm do this automatically.

```sh
# example using yarn
yarn add -D eslint@^8.13.0 prettier@^2.6.2
```

3. Create a `.eslintrc.js` file in your project's directory with the following content:

```js
require('@rohasplit/eslint-config/patch');

module.exports = {
  extends: [require.resolve('@rohasplit/eslint-config')],
};
```
