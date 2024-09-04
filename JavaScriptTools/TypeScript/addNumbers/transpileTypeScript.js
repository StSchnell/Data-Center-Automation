// Begin ---------------------------------------------------------------

/**
 * Transpiles TypeScript code.
 *
 * @function transpileTypeScript
 *
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the TypeScript code
 * @param {boolean} in_showOutput - Flag whether output should be displayed
 * @returns {string} result - Result of TypeScript code transpilation
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.7.0
 *
 * @example
 * var in_moduleName = "de.stschnell";
 * var in_actionName = "testTypeScript";
 * var in_showOutput = false;
 *
 * Checked with Aria Automation 8.13.1, 8.16.0 and 8.18.0
 */

var _transpileTypeScriptNS = {

  main : function(moduleName, actionName, showOutput) {

    if (typeof showOutput !== "boolean") {
      showOutput = false;
    }

    try {

      var typescriptSource = System.getModule("de.stschnell")
        .getActionAsText(moduleName, actionName);
      if (showOutput) {
        System.log(typescriptSource);
      }

      var transpileResult = System.getModule("de.stschnell.typescript")
        .transpileTypeScriptToJavaScript(typescriptSource, actionName);
      if (showOutput) {
        System.log(transpileResult.javascriptSource);
      }

      System.log(transpileResult.diagnosticMessages);

      return transpileResult.javascriptSource;

    } catch (exception) {
      System.log(exception);
    }

  }

};

if (
  String(in_moduleName).trim() !== "" &&
  String(in_actionName).trim() !== ""
) {
  return _transpileTypeScriptNS.main(
    in_moduleName,
    in_actionName,
    in_showOutput
  );
} else {
  throw new Error("in_moduleName or in_actionName argument can not be null");
}

// End -----------------------------------------------------------------
