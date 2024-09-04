// Begin ---------------------------------------------------------------

/**
 * Invokes TypeScript code which is stored in an action.
 *
 * @function invokeTypeScript
 *
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the TypeScript code
 * @param {string} in_parameters - Parameters as JSON string
 * @param {boolean} in_showOutput - Flag whether output should be displayed
 * @returns {Any} result - Result of TypeScript code execution
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.7.0
 *
 * @example
 * var in_moduleName = "de.stschnell";
 * var in_actionName = "testTypeScript";
 * var in_params = "{\"in_name\": \"\\\"Stefan\\\"\", \"in_age\": 42}";
 * var in_showOutput = false;
 *
 * Set com.vmware.scripting.javascript.allow-native-object in the
 * system properties to true.
 *
 * Checked with Aria Automation 8.16.0 and 8.18.0
 */

var _invokeTypeScriptNS = {

  main : function(moduleName, actionName, parameters, showOutput) {

    if (typeof parameters !== "string") {
      parameters = "";
    }

    if (typeof showOutput !== "boolean") {
      showOutput = false;
    }

    // var cx = org.mozilla.javascript.ContextFactory.getGlobal().enterContext();
    var cx = org.mozilla.javascript.Context.enter();

    try {

      // Reads the TypeScript source
      var typescriptSource = System.getModule("de.stschnell")
        .getActionAsText(moduleName, actionName);
      if (showOutput) {
        System.log(typescriptSource);
      }

      var transpileResult = System.getModule("de.stschnell.typescript")
        .transpileTypeScriptToJavaScript(typescriptSource, actionName);

      // Executes the JavaScript
      var scope = cx.initStandardObjects();
      var sourceName = "export";
      var lineNumber = 1;
      var securityDomain = null;

      var result = cx.evaluateString(
        scope,
        javascriptSource,
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

if (
  String(in_moduleName).trim() !== "" &&
  String(in_actionName).trim() !== ""
) {
  return _invokeTypeScriptNS.main(
    in_moduleName,
    in_actionName,
    in_parameters,
    in_showOutput
  );
} else {
  throw new Error("in_moduleName or in_actionName argument can not be null");
}

// End -----------------------------------------------------------------
