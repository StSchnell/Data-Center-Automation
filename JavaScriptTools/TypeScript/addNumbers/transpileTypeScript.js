// Begin ---------------------------------------------------------------

/**
 * Transpiles TypeScript code.
 *
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the TypeScript code
 * @param {boolean} in_showOutput - Flag whether output should be displayed
 * @returns {string} result - Result of TypeScript code transpilation
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.4.0
 *
 * @example
 * var in_moduleName = "de.stschnell";
 * var in_actionName = "testTypeScript";
 * var in_showOutput = false;
 */

var _transpileTypeScriptNS = {

  main : function(moduleName, actionName, showOutput) {

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

      return transpileResult.javascriptSource;

    } catch (exception) {
      System.log(exception);
    }

  }

};

if (String(in_moduleName).trim() !== "" && String(in_actionName).trim() !== "") {
  return _transpileTypeScriptNS.main(
    in_moduleName,
    in_actionName,
    in_showOutput
  );
} else {
  throw new Error("in_moduleName or in_actionName argument can not be null");
}

// End -----------------------------------------------------------------
