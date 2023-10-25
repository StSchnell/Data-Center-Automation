
// Begin ---------------------------------------------------------------

/**
 * Invokes C# code.
 *
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the C# code
 * @param {boolean} in_showOutput - Flag whether output should be displayed
 * @returns {string} result - Result of C# code execution
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.1.0
 *
 * @example
 * var in_moduleName = "de.stschnell";
 * var in_actionName = "testCSharp";
 * var in_showOutput = false;
 *
 * Checked with Aria Automation 8.12.0
 */

var _invokeCSharpNS = {

  main : function(moduleName, actionName, showOutput) {

    try {

      var csharpSource = System.getModule("de.stschnell")
        .getActionAsText(moduleName, actionName);
      if (showOutput) {
        System.log(csharpSource);
      }

      var csharpExecute = System.getModule("de.stschnell")
        .executeCSharp(csharpSource);
      if (showOutput) {
        System.log(String(csharpExecute.result));
      }

      return String(csharpExecute.result);

    } catch (exception) {
      System.log(exception);
    }

  }

}

if (String(in_moduleName).trim() !== "" && String(in_actionName).trim() !== "") {
  return _invokeCSharpNS.main(
    in_moduleName,
    in_actionName,
    in_showOutput
  );
} else {
  throw new Error("in_moduleName or in_actionName argument can not be null");
}

// End -----------------------------------------------------------------
