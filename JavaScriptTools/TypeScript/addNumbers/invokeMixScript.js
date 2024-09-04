// Begin ---------------------------------------------------------------

/**
 * Invokes TypeScript code mixed with Aria Automation objects.
 *
 * @function invokeMixScript
 *
 * @param {string} in_userName - Name of the user
 * @param {SecureString} in_password - Password of the user
 * @param {string} in_moduleName - Name of the module which contains the action
 * @param {string} in_actionName - Name of the action
 * @param {Array.<{name:string, type:string, value:{objectType:{value:Any}}}>} in_parameters - Parameters as JSON
 * @param {string} in_outputType - Type of the return value
 * @returns {Properties}
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.7.0
 *
 * Set com.vmware.scripting.javascript.allow-native-object in the
 * system properties to true.
 *
 * Checked with Aria Automation 8.16.0
 */

var _actionActivities = function() {

  this._url = null;
  var fqdn = this.getFQDN();
  if (fqdn !== null) {
    this._url = "https://" + fqdn;
  } else {
    throw new Error("Error at FQDN detection");
  }

  this._httpRestHost = null;
  if (this._url !== null) {
    this._httpRestHost = RESTHostManager.createTransientHostFrom(
      RESTHostManager.createHost("dynamicRequest")
    );
    this._httpRestHost.operationTimeout = 60;
    this._httpRestHost.connectionTimeout = 30;
    this._httpRestHost.hostVerification = false;
    this._httpRestHost.url = this._url;
  } 

  this.bearerToken = null;

};

_actionActivities.prototype = {

  /**
   * Detects the Full Qualified Domain Name (FQDN)
   *
   * @function getFQDN
   *
   * @returns {string} FQDN
   */
  getFQDN : function() {
    var fqdn = "";
    var jvmOpts = java.lang.System.getenv("JVM_OPTS");
    if (jvmOpts !== null) {
      var options = jvmOpts.split(" ");
      options.forEach( function(option) {
        if (option.substring(0, 19) === "-Dvco.app.hostname=") {
          fqdn = option.substring(19, option.length);
        }
      });
    }
    if (fqdn !== "") {
      return fqdn;
    } else {
      return null;
    }
  },

  /**
   * Retrieves Bearer token
   *
   * @function retrieveBearerToken
   *
   * @param {string} username - Name of the user
   * @param {string} password - Password of the user
   */
   retrieveBearerToken : function(username, password) {

    if (this._url === null) {
      return;
    }

    var httpRestHost = this._httpRestHost.clone();

    var jsonLogin = {
      "username": username,
      "password": password
    };
    var login = JSON.stringify(jsonLogin);

    var request = httpRestHost.createRequest(
      "POST",
      "/csp/gateway/am/api/login?access_token",
      login
    );
    request.contentType = "application/json";

    var response = request.execute();
    if (response.statusCode === 200) {
      var oRefreshToken = JSON.parse(response.contentAsString);
      var refreshToken = "{\"refreshToken\":\"" +
        oRefreshToken.refresh_token + "\"}";
      request = httpRestHost.createRequest(
        "POST",
        "/iaas/api/login",
        refreshToken
      );
      request.contentType = "application/json";

      response = request.execute();
      if (response.statusCode === 200) {
        var oBearerToken = JSON.parse(response.contentAsString);
        this.bearerToken = oBearerToken.token;
      } else {
        System.error("Error at retrieving bearer token");
      }
    }

  },

  /**
   * Creates a new action
   *
   * @function createAction
   *
   * @param {string} moduleName - Module name that should contain the action
   * @param {string} actionName - Name of the action to be created
   * @param {string} code - Source code in the action
   * @param {Array.<{name:string, type:string, value:{objectType:{value:Any}}}>} in_parameters - Parameters as JSON
   * @param {string} outputType - Type of return value
   * @returns {string} actionId
   */
  createAction : function(
    moduleName,
    actionName,
    code,
    parameters,
    outputType
  ) {

    var _parameters = [];

    if (parameters instanceof Array) {
      _parameters = JSON.parse(JSON.stringify(parameters));
    }

    if (typeof outputType !== "string") {
      outputType = "string";
    }

    var httpRestHost = this._httpRestHost.clone();

    // Deletes value column from parameters array
    if (_parameters.length > 0) {
      _parameters.forEach( function(parameter) {
        delete parameter.value;
      });
    }

    var jsonScript = {
      "name": actionName,
      "module": moduleName,
      "version": "0.1.0",
      "description": "Test",
      "script": code,
      "input-parameters": _parameters,
      "output-type": outputType
    };
    var script = JSON.stringify(jsonScript);

    // API Documentation > Orchestrator > Actions Service
    var request = httpRestHost.createRequest(
      "POST",
      "/vco/api/actions?uniqueName=false",
      script
    );

    request.contentType = "application/json";
    request.setHeader("Accept", "application/json");
    request.setHeader("Authorization", "Bearer " + this.bearerToken);

    var response = request.execute();
    if (response.statusCode === 201) {
      var jsonResponse = JSON.parse(response.contentAsString);
      return jsonResponse.id;
    } else {
      System.error("Error creating action");
      throw new Error("Error creating action");
    }

  },

  /**
   * Runs an action
   *
   * @function executeAction
   *
   * @param {string} actionId
   * @param {Array.<{name:string, type:string, value:{objectType:{value:Any}}}>} in_parameters - Parameters as JSON
   * @returns {string} executionId
   */
  executeAction : function(actionId, parameters) {

    if (!Array.isArray(parameters)) {
      parameters = [];
    }

    var httpRestHost = this._httpRestHost.clone();

    var jsonBody = {
      "parameters": parameters,
      "async-execution": false
    };
    var body = JSON.stringify(jsonBody);

    // API Documentation > Orchestrator > Actions Service
    var request = httpRestHost.createRequest(
      "POST",
      "/vco/api/actions/" + actionId + "/executions",
      body
    );
    request.contentType = "application/json";
    request.setHeader("Accept", "application/json");
    request.setHeader("Authorization", "Bearer " + this.bearerToken);

    var response = request.execute();
    if (response.statusCode === 200) {
      var jsonResponse = JSON.parse(response.contentAsString);
      return jsonResponse;
    } else {
      System.log("Error at execution\n" + response.contentAsString);
    }

  },

  /**
   * Retrieves the definition of an action
   * Hint: In this case this call is used to check if the action has
   * been created.
   *
   * @function getAction
   *
   * @param {string} actionId
   * @returns {number}
   */
  getAction : function(actionId) {

    var httpRestHost = this._httpRestHost.clone();

    var request = httpRestHost.createRequest(
      "GET",
      "/vco/api/actions/" + actionId
    );
    request.setHeader("Accept", "application/json");
    request.setHeader("Authorization", "Bearer " + this.bearerToken);

    var response = request.execute();
    return response.statusCode;

  },

  /**
   * Gets the action run logs
   *
   * @function getActionLog
   *
   * @param {string} executionId
   * @returns {string} log
   */
  getActionLog : function(executionId) {

    var httpRestHost = this._httpRestHost.clone();

    var request = httpRestHost.createRequest(
      "GET",
      "/vco/api/actions/" + executionId + "/logs?maxResult=2147483647"
    );
    request.setHeader("Accept", "application/json");
    request.setHeader("Authorization", "Bearer " + this.bearerToken);

    var response = request.execute();
    if (response.statusCode === 200) {
      return response.contentAsString;
    } else {
      System.log("Error at get log");
    }

  },

  /**
   * Deletes an action
   *
   * @function deleteAction
   *
   * @param {string} actionId
   */
  deleteAction : function(actionId) {

    var httpRestHost = this._httpRestHost.clone();

    var request = httpRestHost.createRequest(
      "DELETE",
      "/vco/api/actions/" + actionId
    );
    request.setHeader("Authorization", "Bearer " + this.bearerToken);

    var response = request.execute();
    if (response.statusCode !== 200) {
      System.log("Error at deletion");
    }

  }

};

function main(
  userName,
  password,
  moduleName,
  actionName,
  parameters,
  outputType
) {

  if (
    String(userName).trim() !== "" &&
    String(password).trim() !== "" &&
    String(moduleName).trim() !== "" &&
    String(actionName).trim() !== ""
  ) {

    // Retrieve Bearer token
    var actionActivities = new _actionActivities();
    actionActivities.retrieveBearerToken(userName, password);
    if (actionActivities.bearerToken === null) {
      throw new Error("No Bearer token available");
    }

    var code = System.getModule("de.stschnell").getActionAsText(
      moduleName,
      actionName
    );
    if (String(code).trim() === "") {
      throw new Error("The action contains no code");
    }

    var transpiledCode = System.getModule("de.stschnell")
      .transpileTypeScriptToJavaScript(code, actionName).javascriptSource;

    // Create action with random name in temp module
    // Hint: The module temp must exist
    var tempActionName = "x" + System.nextUUID().replace(/-/g, "_");
    var actionId =
      actionActivities.createAction(
        "temp",
        tempActionName,
        transpiledCode,
        parameters,
        outputType
      );

    // Wait until action exists
    while (actionActivities.getAction(actionId) !== 200) {
      System.sleep(1000);
    }

    // Execute action
    var response = actionActivities.executeAction(
      actionId,
      parameters
    );

    var executionId = response["execution-id"];

    // Delete action
    actionActivities.deleteAction(actionId);

    System.sleep(2500);

    // Read action log
    var actionLog = actionActivities.getActionLog(executionId);

    return {
      "returnType": response["type"],
      "returnValue": JSON.stringify(response["value"]),
      "executionId": executionId,
      "actionLog": actionLog
    };

  } else {
    throw new Error(
      "userName, password, moduleName or actionName argument can not be null"
    );
  }

}

// Main
return main(
  in_userName,
  in_password,
  in_moduleName,
  in_actionName,
  in_parameters,
  in_outputType
);

// End -----------------------------------------------------------------
