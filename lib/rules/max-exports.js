/**
 * @fileoverview Enforces a maximum number of exports for a file.
 * @author Josh Clyde
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce maximum number of exports.",
      recommended: true,
    },
    fixable: null,
    schema: [
      {
        type: "integer",
      },
    ],
  },
  create: function (context) {
    const exportsMax = context.options[0] || 1;
    let exportsCount = 0;
    const makeErrorMessage = () =>
      `Only ${exportsMax} export${
        exportsMax > 1 ? "s" : ""
      } allowed. This is export number ${exportsCount}.`;
    return {
      ExportSpecifier(node) {
        exportsCount++;
        if (exportsCount > exportsMax) {
          context.report({
            node,
            message: makeErrorMessage(),
          });
        }
      },
      ExportNamedDeclaration(node) {
        if (node.declaration) {
          exportsCount++;
          if (exportsCount > exportsMax) {
            context.report({
              node,
              message: makeErrorMessage(),
            });
          }
        }
      },
    };
  },
};
