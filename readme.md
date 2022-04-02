# Usage

1. Create a `.eslintrc.js` file in your project's directory with the following content:

```js
require('@rohasplit/eslint-config/patch');

module.exports = {
  extends: [require.resolve('@rohasplit/eslint-config')],
};
```
