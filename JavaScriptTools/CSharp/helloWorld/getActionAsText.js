
// Begin ---------------------------------------------------------------

/**
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the text
 * @returns {string} actionAsText
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.1.0
 *
 * @example
 * var in_moduleName = "com.vmware.basic";
 * var in_actionName = "createDirectory";
 *
 * @example
 * var in_moduleName = "com.vmware.library.powershell.converter";
 * var in_actionName = "getConverter";
 *
 * Checked with Aria Automation 8.12.0 and 8.13.1
 */

var _getActionAsText = {

  main : function(moduleName, actionName) {

    var allActions =
      System.getModule("com.vmware.library.action").getAllActions();

    var allActionsInModule = allActions.filter( function(actionItems) {
      return actionItems.module.name === moduleName;
    });
    if (allActionsInModule.length === 0) {
      throw new Error("No actions were found in the module " +
        moduleName + ".");
    }

    var action = allActionsInModule.filter( function(actionItem) {
      return actionItem.name === actionName;
    });
    if (action.length === 0) {
      throw new Error("The action " + actionName +
        " was not found in the module " + moduleName + ".");
    } else if (action.length > 1) {
      System.warn("Too many actions, with the name " + actionName +
        ", were found in the module " + moduleName + ".");
      action.forEach( function(actionItem) {
        System.warn("ID: " + actionItem.id);
      });
      throw new Error("Too many actions, with the name " + actionName +
        ", were found in the module " + moduleName + ".");
    }

    return action[0].script;

  }

};

if (
  String(in_moduleName).trim() !== "" &&
  String(in_actionName).trim() !== ""
) {
  return _getActionAsText.main(
    in_moduleName,
    in_actionName
  );
} else {
  throw new Error(
    "in_moduleName or in_actionName argument can not be null"
  );
}

// End -----------------------------------------------------------------
