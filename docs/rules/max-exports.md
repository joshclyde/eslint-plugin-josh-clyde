# josh-clyde/max-exports

Reports when there are more exports than the allowed maximum.

## Rule Details

Examples of **incorrect** code for this rule:

```js
// 1 max
const a = 1;
const b = 2;
export { a, b } // reports

// 2 max
export const a = 1;
export const b = 2;
export const c = 3; // reports
```

Examples of **correct** code for this rule:

```js
// 1 max
const a = 1;
export { a };

// 2 max
export const a = 1;
export const b = 2;
```

## Options

`max`

The maximum number of exports a file should have.
