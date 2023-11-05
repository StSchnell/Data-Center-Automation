// Begin ---------------------------------------------------------------

/**
 * Invokes TypeScript code.
 *
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the TypeScript code
 * @param {boolean} in_showOutput - Flag whether output should be displayed
 * @returns {string} result - Result of TypeScript code execution
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

var _invokeTypeScriptNS = {

  main : function(moduleName, actionName, showOutput) {

    var cx = org.mozilla.javascript.Context.enter();

    try {

      var typescriptSource = System.getModule("de.stschnell")
        .getActionAsText(moduleName, actionName);
      if (showOutput) {
        System.log(typescriptSource);
      }

      var transpileResult = System.getModule("de.stschnell.typescript")
        .transpileTypeScriptToJavaScript(typescriptSource, actionName);

      var scope = cx.initStandardObjects();
      var sourceName = "export";
      var lineNumber = 0;
      var securityDomain = null;

      var result = cx.evaluateString(
        scope,
        transpileResult.javascriptSource,
        sourceName,
        lineNumber,
        securityDomain
      );
      if (showOutput) {
        System.log(String(result));
      }

      return String(result);

    } catch (exception) {
      System.log(exception);
    } finally {
      cx.exit();
    }

  }

};

if (String(in_moduleName).trim() !== "" && String(in_actionName).trim() !== "") {
  return _invokeTypeScriptNS.main(
    in_moduleName,
    in_actionName,
    in_showOutput
  );
} else {
  throw new Error("in_moduleName or in_actionName argument can not be null");
}

// End -----------------------------------------------------------------
