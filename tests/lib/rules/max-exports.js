/**
 * @fileoverview Enforces a maximum number of exports for a file.
 * @author Josh Clyde
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/max-exports");
var RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});
ruleTester.run("max-exports", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],
  invalid: [
    {
      code: `export const a = 1;
export const b = 2;`,
      options: [1],
      errors: [
        {
          message: "Only 1 export allowed. This is export number 2.",
        },
      ],
    },
    {
      code: `const a = 1;
const b = 2;
export { a, b }`,
      options: [1],
      errors: [
        {
          message: "Only 1 export allowed. This is export number 2.",
        },
      ],
    },
    {
      code: `const a = 1;
export { a }
export const b = 2;
`,
      options: [1],
      errors: [
        {
          message: "Only 1 export allowed. This is export number 2.",
        },
      ],
    },
    {
      code: `const a = 'foo';
const b = 'bar';
const c = 'baz';
export { a, b, c }`,
      options: [1],
      errors: [
        {
          message: "Only 1 export allowed. This is export number 2.",
        },
        {
          message: "Only 1 export allowed. This is export number 3.",
        },
      ],
    },
    {
      code: `const a = 'foo';
const b = 'bar';
const c = 'baz';
export { a, b, c }`,
      options: [2],
      errors: [
        {
          message: "Only 2 exports allowed. This is export number 3.",
        },
      ],
    },
  ],
});
