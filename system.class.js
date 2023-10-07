/**
 *  __  __                    _
 * |  \/  |                  | |
 * | \  / | _   _  ___   ___ | |  ___
 * | |\/| || | | |/ __| / __|| | / - \
 * | |  | || |_| |\__ \( (__ | |(  __/
 * |_|  |_| \__,_||___/ \___||_| \___|
 *
 * Mock-up of the System class from VMware Aria Automation.
 * This is a general set of functions and it is always available in the
 * JavaScript scripting environment.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.2.8
 *
 * Hint: This mock-up works only with the Mozilla Rhino JavaScript
 * engine.
 *
 * Checked with Rhino engines version 1.7R4 and 1.7.14
 */

/**
 * URL class,
 * mock-up of VMware Aria automation URL class, only attributes.
 */
function URL() {
  // this.contentType = "application/x-www-form-urlencoded";
  this.contentType = "text/plain";
  this.datas = null;
  this.host = "localhost";
  this.port = 443;
  this.requestType = "GET";
  this.result = "This is a mock-up of URL";
  this.url = "https://localhost/";
}

/**
 * Workflow class,
 * mock-up of VMware Aria automation Workflow class, only attributes.
 */
function Workflow() {
  this.attributes = {};
  this.description = "This is a mock-up";
  this.executions = {};
  this.firstItem = {};
  this.id = "";
  this.inParameters = {};
  this.items = {};
  this.logEvents = {};
  this.name = "Mock-up of Workflow class";
  this.numberOfItems = 0;
  this.outParameters = {};
  this.parameterInfos = {};
  this.version = "1.0.0.0";
  this.versionHistoryItems = {};
  this.workflowCategory = {};
}

/**
 * WorkflowItemInfo class,
 * mock-up of VMware Aria automation WorkflowItemInfo class.
 */
function WorkflowItemInfo(name, displayName) {
  this._displayName = displayName;
  this._name = name;
  this.getDisplayName = function() {
    return this._displayName;
  };
  this.getName = function() {
    return this._name;
  };
}

// System class

var _context = new org.mozilla.javascript.Context();
var _logMarker = null;

var _SystemNS = function() {

};

_SystemNS.prototype = {

  /**
   * Private method to log text for debug, error, log and warn methods.
   *
   * @function _println
   * @param {string} prefix - Log level.
   * @param {string} text - Text to log.
   */
  _println : function(prefix, text) {
    var outText = null;
    if (typeof text === "undefined" || text === null) {
      outText = "";
    } else {
      var rhinoVersion = this.getRhinoVersion();
      if (this.compareVersionNumber(rhinoVersion, "1.7.5") === 1) {
        // trimRight added to release 1.7.6 of Rhino
        outText = String().trimRight();
      } else {
        outText = String().replace(/[\s]+$/g, "");
      }
    }
    if (_logMarker) {
      java.lang.System.out.println(
        prefix + " {{" + _logMarker + "}} " + outText
      );
    } else {
      java.lang.System.out.println(
        prefix + " " + outText
      );
    }
  },

  /**
   * Appends a path fragment to another.
   *
   * @function appendToPath
   * @param {string} root - Path to add to.
   * @param {string} toAdd - Part to add.
   * @returns {string}
   *
   * @example
   * // Delivers on Windows \sys\vco
   * var result = System.appendToPath("/sys/", "vco");
   * System.log(result);
   */
  appendToPath : function(root, toAdd) {
    if (
      typeof root === "undefined" ||
      root === null ||
      String(root).trim() === ""
    ) {
      throw new Error("root argument can not be undefined or null");
    }
    if (
      typeof toAdd === "undefined" ||
      toAdd === null ||
      String(toAdd).trim() === ""
    ) {
      throw new Error("toAdd argument can not be undefined or null");
    }
    return String(
      java.nio.file.Paths.get(root.toString(), toAdd.toString())
    );
  },

  /**
   * Decodes a base64 encoded string.<br>
   * Hint: This method is not available in the standard.
   *
   * @function base64ToString
   * @param {string} value - Text to decode from base64.
   * @returns {string}
   */
  base64ToString : function(value) {
    if (typeof value === "undefined" || value === null) {
      throw new Error("value argument can not be undefined or null");
    }
    return String(java.lang.String(
        java.util.Base64.getDecoder().decode(
          java.lang.String(value).getBytes()
        )
    ));
  },

  /**
   * Clones an object.<br>
   * Hint: This method is not available in the standard.
   *
   * @param {object} object - Object to clone.
   * @returns {object}
   */
  clone : function(object) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }
    if (typeof object === "object") {
      function func() {}
      func.prototype = object;
      return new func();
    }
  },

  /**
   * Compares two version numbers.<br>
   * Hint: Arguments should be string and if a one-digit number is
   * compared with a multi-digit number, leading zeros must be passed.
   *
   * @function compareVersionNumber
   * @param {string} version1 - First version.
   * @param {string} version2 - Second version.
   * @returns {number}
   * Returns 0 if they are equivalent<br>
   * Returns 1 version1 is greater than version2<br>
   * Returns -1 version2 a is greater than version1
   *
   * @example
   * // Delivers -1
   * var result = System.compareVersionNumber("1.0.0", "2.0.0");
   * System.log(result);
   */
  compareVersionNumber : function(version1, version2) {
    if (
      typeof version1 === "undefined" ||
      version1 === null ||
      String(version1).trim() === ""
    ) {
      throw new Error("version1 argument can not be undefined or null");
    }
    if (
      typeof version2 === "undefined" ||
      version2 === null ||
      String(version2).trim() === ""
    ) {
      throw new Error("version2 argument can not be undefined or null");
    }
    return version1.toString().localeCompare(version2.toString(),
      undefined, { numeric: true, sensitivity: "base" });
  },

  /**
   * Creates an empty file in the temporary directory, using the given
   * suffix to generate its name.
   *
   * @function createTempFile
   * @param {string} suffix - The suffix string to be used in generating
   *                          the file's name.
   * @returns {object.<java.io.File>}
   *
   * @example
   * // Delivers on Windows
   * // C:\Users\[name]\AppData\Local\Temp\vco-[number].tmp
   * var result = System.createTempFile(".tmp");
   * System.log(result);
   */
  createTempFile : function(suffix) {
    if (
      typeof suffix === "undefined" ||
      String(suffix).trim() === ""
    ) {
      suffix = null;
    }
    return java.io.File.createTempFile("vco-", suffix);
  },

  /**
   * Information for currently executed workflow item.
   *
   * @function currentWorkflowItem
   * @returns {object.<WorkflowItemInfo>}
   *
   * @example
   * var result = System.currentWorkflowItem();
   */
  currentWorkflowItem : function() {
    return new WorkflowItemInfo("System Class Mock-up",
      "Mock-up of System Class");
  },

  /**
   * Returns URL to generate HTTP custom event.
   *
   * @function customEventUrl
   * @param {string} eventName - Custom event name.
   * @param {boolean} secure, default false - Use https if true, http otherwise.
   * @returns {object.<URL>}
   *
   * @example
   * var result = System.customEventUrl("click", false);
   */
  customEventUrl : function(eventName, secure) {
    if (
      typeof eventName === "undefined" ||
      eventName === null ||
      String(eventName).trim() === ""
    ) {
      throw new Error("eventName argument can not be undefined or null");
    }
    var url = new URL(); // Mock-up URL object
    url.port = 8280;
    url.contentType = "application/x-www-form-urlencoded";
    return url;
  },

  /**
   * Returns URL to generate HTTP custom event.
   *
   * @function customEventUrlforServer
   * @param {string} eventName - Custom event name.
   * @param {string} host - Host to use in URL.
   * @param {string} port - Port to use in URL.
   * @param {boolean} secure - Use https if true, http otherwise.
   * @returns {object.<URL>}
   *
   * @example
   * var result =
   *   System.customEventUrlforServer("click", "localhost", "8080", false);
   */
  customEventUrlforServer : function(eventName, host, port, secure) {
    if (
      typeof eventName === "undefined" ||
      eventName === null ||
      String(eventName).trim() === ""
    ) {
      throw new Error("eventName argument can not be undefined or null");
    }
    if (
      typeof host === "undefined" ||
      host === null ||
      String(host).trim() === ""
    ) {
      throw new Error("host argument can not be undefined or null");
    }
    if (
      typeof port === "undefined" ||
      port === null ||
      String(port).trim() === ""
    ) {
      throw new Error("port argument can not be undefined or null");
    }
    var url = new URL(); // Mock-up URL object
    url.host = host.toString();
    url.port = port.toString();
    url.contentType = "application/x-www-form-urlencoded";
    return url;
  },

  /**
   * Logs a text in the system with DEBUG.
   *
   * @function debug
   * @param {string} text - Text to log.
   *
   * @example
   * System.debug("This is a test");
   */
  debug : function(text) {
    this._println("\u001B[32mDEBUG\u001B[0m", text);
  },

  /**
   * Converts decimal number to hexadecimal string.
   *
   * @function decimalToHex
   * @param {number} value - Decimal value.
   * @returns {string}
   *
   * @example
   * // Delivers 1267
   * var result = System.decimalToHex(4711);
   * System.log(result);
   */
  decimalToHex : function(value) {
    if (typeof value !== "undefined" && value !== null) {
      var newValue = parseFloat(value.toString());
      if (isNaN(newValue)) {
        return "";
      }
      return newValue.toString(16).toUpperCase();
    } else {
      return "";
    }
  },

  /**
   * Logs a text in the system with ERROR.
   *
   * @function error
   * @param {string} text - Text to log.
   *
   * @example
   * System.error("This is a test");
   */
  error : function(text) {
    this._println("\u001B[31mERROR\u001B[0m", text);
  },

  /**
   * Evaluates a JavaScript source string.<br>
   * Hint: This method is not documented in the standard.
   *
   * @function exec
   * @param {string} command
   * @returns {object.<any>}
   *
   * @example
   * // Delivers Hello World as object of type java.lang.String
   * var result =
   *   System.exec("function test() { return \"Hello World\"; } test();");
   * System.log(result);
   *
   * @example
   * // Delivers "Hello World" as string
   * var result = JSON.stringify(
   *   System.exec("function test() { return \"Hello World\"; } test();")
   * );
   * System.log(result);
   */
  exec : function(command) {
    if (
      typeof command === "undefined" ||
      command === null ||
      String(command).trim() === ""
    ) {
      throw new Error("command argument can not be undefined or null");
    }
    var result = null;
    try {
      var cx = _context.enter();
      var scope = cx.initStandardObjects();
      result = cx.evaluateString(scope, command.toString(),
        "SystemMockupScript", 1, null);
    } catch (exception) {
      result = exception;
    } finally {
      _context.exit();
    }
    return result;
  },

  /**
   * Extracts the directory part from the file path.
   *
   * @function extractDirectory
   * @param {string} fullPath - Path from which something is to be extracted.
   * @returns {string}
   *
   * @example
   * // Delivers C:/temp/
   * var result = System.extractDirectory("C:\\temp\\myfile.txt");
   * System.log(result);
   *
   * @example
   * // Delivers /home/temp/
   * var result = System.extractDirectory("/home/temp/myfile.txt");
   * System.log(result);
   */
  extractDirectory : function(fullPath) {
    if (
      typeof fullPath === "undefined" ||
      fullPath === null ||
      String(fullPath).trim() === ""
    ) {
      throw new Error("fullPath argument can not be undefined or null");
    }
    var separatorFullPath = fullPath.toString().replace(/\\/g, "/");
    return separatorFullPath.substring(
      0,
      separatorFullPath.lastIndexOf("/") + 1
    );
  },

  /**
   * Extracts the file name part from the file path.
   *
   * @function extractFileName
   * @param {string} fullPath - Path from which something is to be extracted.
   * @returns {string}
   *
   * @example
   * // Delivers myfile.txt
   * var result = System.extractFileName("C:/temp/myfile.txt");
   * System.log(result);
   */
  extractFileName : function(fullPath) {
    if (
      typeof fullPath === "undefined" ||
      fullPath === null ||
      String(fullPath).trim() === ""
    ) {
      throw new Error("fullPath argument can not be undefined or null");
    }
    var separatorFullPath = fullPath.toString().replace(/\\/g, "/");
    return separatorFullPath.substring(
      separatorFullPath.lastIndexOf("/") + 1
    );
  },

  /**
   * Extracts the extension part from the file path.
   *
   * @function extractFileNameExtension
   * @param {string} fullPath - Path from which something is to be extracted.
   * @returns {string}
   *
   * @example
   * // Delivers txt
   * var result = System.extractFileNameExtension("C:/temp/myfile.txt");
   * System.log(result);
   */
  extractFileNameExtension : function(fullPath) {
    if (
      typeof fullPath === "undefined" ||
      fullPath === null ||
      String(fullPath).trim() === ""
    ) {
      throw new Error("fullPath argument can not be undefined or null");
    }
    var fileName = this.extractFileName(fullPath);
    if (fileName.indexOf(".") !== -1) {
      return fileName.substring(fileName.lastIndexOf(".") + 1);
    } else {
      return "";
    }
  },

  /**
   * Extracts the file name part without extension from the file path.
   *
   * @function extractFileNameWithoutExtension
   * @param {string} fullPath - Path from which something is to be extracted.
   * @returns {string}
   *
   * @example
   * // Delivers C:/temp/myfile
   * var result = System.extractFileNameWithoutExtension("C:/temp/myfile.txt");
   * System.log(result);
   */
  extractFileNameWithoutExtension : function(fullPath) {
    if (
      typeof fullPath === "undefined" ||
      fullPath === null ||
      String(fullPath).trim() === ""
    ) {
      throw new Error("fullPath argument can not be undefined or null");
    }
    var fileName = this.extractFileName(fullPath.toString());
    if (fileName.indexOf(".") !== -1) {
      fileName = fileName.substring(0, fileName.lastIndexOf("."));
    }
    return this.extractDirectory(fullPath) + fileName;
  },

  /**
   * Filters non authorized objects for the current user.<br>
   * Returns null if the user is not authorized and the input object
   * if the authorization is correct.<br>
   * Hint: The argument authorized is an additional flag, to mock the
   * desired result.
   *
   * @function filterAuthorized
   * @param {object} source - Object to check.
   * @param {boolean} authorized - Flag to mock result.
   * @returns {object}
   *
   * @example
   * var obj = {"id": "Mock-up object"};
   * var result = System.filterAuthorized(obj);
   * System.log(JSON.stringify(result));
   *
   * @example
   * var obj = {"id": "Mock-up object"};
   * var result = System.filterAuthorized(obj, false);
   * if (result === null) {
   *   System.log("null");
   * }
   */
  filterAuthorized : function(source, authorized) {
    if (typeof source === "undefined" || source === null) {
      throw new Error("source argument can not be undefined or null");
    }
    if (
      typeof authorized === "undefined" ||
      authorized === null ||
      authorized === true
    ) {
      return source;
    } else {
      return null;
    }
  },

  /**
   * Formats a number in a readable size format.
   *
   * @function formatBinaryValue
   * @param {number} value - Number to format.
   * @returns {string}
   *
   * @example
   * // Delivers 2K
   * var result = System.formatBinaryValue(2048);
   * System.log(result);
   * 
   * @example
   * // Delivers 4.6005859375K
   * var result = System.formatBinaryValue(4711);
   * System.log(result);
   * 
   * @example
   * // Delivers 1M
   * var result = System.formatBinaryValue(1048576);
   * System.log(result);
   * 
   * @example
   * // Delivers 1G
   * var result = System.formatBinaryValue(1073741824);
   * System.log(result);
   * 
   * @example
   * // Delivers 1T
   * var result = System.formatBinaryValue(1099511627776);
   * System.log(result);
   */
  formatBinaryValue : function(value) {
    if (typeof value === "undefined" || value === null) {
      return null;
    }
    var newValue = parseFloat(value.toString());
    if (isNaN(newValue)) {
      return null;
    }
    if (newValue < 1024) {
      return newValue.toString();
    } else if (newValue < 1048576) {
      return (newValue / 1024 * 100) / 100 + "K";
    } else if (newValue < 1073741824) {
      return (newValue / 1048576 * 100) / 100 + "M";
    } else if (newValue < 1099511627776) {
      return (newValue / 1073741824 * 100) / 100 + "G";
    } else {
      return (newValue / 1099511627776 * 100) / 100 + "T";
    }
  },

  /**
   * Formats a date in the given format.
   *
   * @function formatDate
   * @param {Date} date - Date to format.
   * @param {string} pattern - Format pattern.
   * @returns {string}
   *
   * @example
   * // Delivers 2023.04.04 n. Chr. at 05:37:19 MESZ
   * var result = System.formatDate(new Date(), "yyyy.MM.dd G 'at' HH:mm:ss z");
   * System.log(result);
   *
   * @example
   * // Delivers 04.07.2023, 05:33:59
   * var result = System.formatDate(new Date());
   * System.log(result);
   */
  formatDate : function(date, pattern) {
    if (
      !(date instanceof Date) ||
      isNaN(date) ||
      typeof date === "undefined" ||
      date === null
    ) {
      throw new Error("date argument must be Date and can not be undefined or null");
    }
    try {
      var format = java.text.DateFormat.getDateTimeInstance();
      if (pattern != null) {
        format = new java.text.SimpleDateFormat(pattern);
      }
      return String(format.format(date));
    } catch (exception) {
      throw new Error("Unable to format date");
    }
  },

  /**
   * Formats the milliseconds in a readable format.
   *
   * @function formatDuration
   * @param {number} milliseconds - Millisecond number to format.
   * @param {boolean} showMilli - Show millisecond if true, default false.
   * @param {boolean} showZero - Show leading zero values if true,
   *                             default false.
   * @returns {string}
   * @see getCurrentTime
   *
   * @example
   * // Delivers 19452d 02h 44m 11.986s
   * var result = System.formatDuration(System.getCurrentTime(), true, true)
   * System.log(result);
   *
   * @example
   * // Delivers Wed Apr 05 2023 04:44:11 GMT+0200 (MESZ)
   * var result = new Date();
   * System.log(result);
   *
   * @example
   * // Delivers 19452d 2h 44m 11s
   * var result = System.formatDuration(System.getCurrentTime(), false, false);
   * System.log(result);
   */
  formatDuration : function(milliseconds, showMilli, showZero) {

    var showMilliseconds = false;
    var showLeadingZeros = false;
    var retValue = "";

    if (
      typeof milliseconds === "undefined" ||
      milliseconds === null ||
      typeof milliseconds !== "number"
    ) {
      throw new Error(
        "milliseconds argument must be number and can not be undefined or null"
      );
    }
    if (typeof showMilli === "boolean") {
      showMilliseconds = showMilli;
    }
    if (typeof showZero === "boolean") {
      showLeadingZeros = showZero;
    }

    if (milliseconds < 0) {
      return "N/A";
    }

    // Milliseconds
    if (showMilliseconds) {
      var milli = String(parseInt(milliseconds % 1000));
      while (milli.length < 3) {
        milli = "0" + milli;
      }
      retValue = "." + milli + "s";
    } else {
      retValue = "s";
    }

    // Seconds
    var time = milliseconds / 1000;
    var seconds = String(parseInt(time % 60));
    if (showZero && seconds < 10) {
      seconds = "0" + seconds;
    }
    retValue = seconds + retValue;

    // Subtract seconds from time
    time -= parseInt(time % 60);
    time /= 60;

    // Minutes
    var minutes = String(parseInt(time % 60));
    if (showZero  && minutes < 10) {
      minutes = "0" + minutes;
    }
    retValue = minutes + "m " + retValue;

    // Subtract minutes from time
    time -= parseInt(time % 60);
    time /= 60;

    // Hours
    var hours = String(parseInt(time % 24));
    if (showZero && hours < 10) {
      hours = "0" + hours;
    }
    retValue = hours + "h " + retValue;

    // Subtract hours from time
    time -= parseInt(time % 24);
    time /= 24;

    // Days
    var days = String(parseInt(time));
    retValue = days + "d " + retValue;

    return retValue;
  },

  /**
   * Formats a number in the given format.<br>
   * Creates a DecimalFormat using the given pattern and the symbols
   * for the default locale.
   *
   * @function formatNumber
   * @param {number} aNumber - Number to format.
   * @param {string} pattern - Format pattern.
   * @returns {string}
   *
   * @example
   * var myNumber = -1234.56;
   * // Delivers -01234,560
   * var result = System.formatNumber(myNumber, "00000.000")
   * System.log(result);
   * // Delivers -1234,6
   * var result = System.formatNumber(myNumber, "#.#");
   * System.log(result);
   * // Delivers -1.234,6
   * var result = System.formatNumber(myNumber, "#,###.#");
   * System.log(result);
   */
  formatNumber : function(aNumber, pattern) {
    if (typeof aNumber === "undefined" || aNumber === null) {
      throw new Error(
        "aNumber argument must be Number and can not be undefined or null"
      );
    }
    var format = new java.text.DecimalFormat();
    if (typeof pattern !== "undefined" || pattern !== null) {
      try {
        format = new java.text.DecimalFormat(pattern);
      } catch (exception) {
        throw new Error("Unable to create a formatter from pattern");
      }
    }
    try {
      return String(format.format(parseFloat(aNumber)));
    } catch (exception) {
      throw new Error("Unable to format aNumber with the pattern");
    }
  },

  /**
   * Returns all action modules.
   *
   * @function getAllModules
   * @returns {object[]}
   *
   * @example
   * var result = System.getAllModules();
   */
  getAllModules : function() {
    var Module = [
      {
        name: "com.vmware.basic",
        description: "",
        id: "8a7480b5796abea101796ac0e5630169",
        type: "ScriptModuleCategory"
      },
      {
        name: "com.mock-up",
        description: "",
        id: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
        type: "ScriptModuleCategory"
      }
    ];
    return Module;
  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @function getClassName
   * @returns {string}
   *
   * @example
   * var result = System.getClassName();
   * System.log(result);
   */
  getClassName : function() {
    return "System";
  },

  /**
   * Gets the context for the current workflow run.<br>
   * Hint: This method delivers not the ExecutionContext like the
   * original, it delivers the object org.mozilla.javascript.Context.
   *
   * @function getContext
   * @returns {object}
   *
   * @example
   * var cx = System.getContext();
   */
  getContext : function() {
    return _context;
  },

  /**
   * Gets the current time.<br>
   * Delivers the number of milliseconds elapsed since midnight at the
   * beginning of January 1, 1970, UTC.
   *
   * @function getCurrentTime
   * @returns {number}
   *
   * @example
   * // Delivers e.g. 1688273422309
   * var result = System.getCurrentTime();
   * System.log(result);
   */
  getCurrentTime : function() {
    return parseInt(Date.now());
  },

  /**
   * Creates a new date from the input.<br>
   * Hint: The reference date is not considered.
   *
   * @function getDate
   * @param {string} input - Input date.
   * @param {Date} refDate - Reference date, now if not set.
   * @returns {object}
   *
   * @example
   * // Delivers Tue Jan 01 2019 01:00:00 GMT+0100 (MEZ)
   * var result = System.getDate("2019-01-01");
   * System.log(result);
   *
   * @example
   * // Delivers Tue Jun 16 1964 00:00:00 GMT+0200 (MESZ)
   * var result = System.getDate("Jun 16, 1964");
   * System.log(result);
   *
   * @example
   * // Delivers Sat Dec 24 2022 12:12:00 GMT+0100 (MEZ)
   * var result = System.getDate("2022/12/24 12:12:00");
   * System.log(result);
   */
  getDate : function(input, refDate) {
    if (
      typeof input === "undefined" ||
      input === null ||
      String(input).trim() === ""
    ) {
      throw new Error("input argument can not be undefined or null");
    }
    var referenceDate = Date.now();
    if (
      typeof refDate === "object" && 
      refDate !== null &&
      Object.prototype.toString.call(refDate) === "[object Date]"
    ) {
      referenceDate = refDate;
    }
    var retDate = new Date(Date.parse(input.toString()));
    return retDate;
  },

  /**
   * Parses the given date as string to creates a date.
   * Hint: The date to be parsed must have the same format as the
   * format pattern.
   *
   * @function getDateFromFormat
   * @param {string} date - String to parse.
   * @param {string} pattern - Format pattern, default value yyyy-MM-dd HH:mm:ss.
   * @returns {object.<java.util.Date>}
   *
   * @example
   * // Delivers Tue Jun 16 15:54:00 CET 1964
   * var result = System.getDateFromFormat("1964-6-16 15:54:00");
   * System.log(result);
   *
   * @example
   * // Delivers Thu Jan 01 00:00:00 CET 1970
   * var result = System.getDateFromFormat("1970-1-1", "yyyy-MM-dd");
   * System.log(result);
   */
  getDateFromFormat : function(date, pattern) {
    if (
      typeof date === "undefined" ||
      date === null ||
      String(date).trim() === ""
    ) {
      throw new Error("date argument can not be undefined or null");
    }
    var formatPattern = "yyyy-MM-dd HH:mm:ss";
    if (typeof pattern !== "undefined" && pattern !== null) {
      formatPattern = pattern.toString();
    }
    var format;
    try {
      format = new java.text.SimpleDateFormat(formatPattern);
    } catch (exception) {
      throw new Error("Unable to create a formatter from pattern");
    }
    try {
      return format.parse(date.toString());
    } catch (exception) {
      throw new Error("Unable to parse date with pattern");
    }
  },

  /**
   * Returns an action module with the given name.
   *
   * @function getModule
   * @param {object} object - The module name.
   * @returns {object}
   *
   * @example
   * var com = {
   *   vmware : {
   *     constants : {
   *       getDefaultCompanyName : function() { return "VMware Inc."; }
   *     }
   *   }
   * }
   * // Delivers VMware Inc.
   * var result = System.getModule(com.vmware.constants).getDefaultCompanyName();
   * System.log(result);
   */
  getModule : function(object) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }

    // Creates a new JavaScript object by executing the named constructor
    // var context = new org.mozilla.javascript.Context();
    // var cx = context.enter();
    // var scope = cx.initStandardObjects();
    // var result = cx.newObject(scope, "Object", [ object ]);
    // cx.exit();
    // return result;

    if (typeof object === "object") {
      return Object.create(object);
    }
  },

  /**
   * Returns the class name of any scripting object.<br>
   * Hint: This method delivers not the exact result like the original.
   *
   * @function getObjectClassName
   * @param {object} object - Object to get the class name.
   * @returns {string}
   *
   * @example
   * // Return Date
   * var result = System.getObjectClassName(new Date());
   * System.log(result);
   *
   * @example
   * // Return String
   * var result = System.getObjectClassName("Test");
   * System.log(result);
   *
   * @example
   * // Return Boolean
   * var result = System.getObjectClassName(
   *   new java.lang.Boolean(java.lang.Boolean.TRUE)
   * );
   * System.log(result);
   *
   * @example
   * // Return Boolean
   * var result = System.getObjectClassName(true);
   * System.log(result);
   *
   * @example
   * // Return Number
   * var result = System.getObjectClassName(42);
   * System.log(result);
   *
   * @example
   * // Return Integer
   * var result = System.getObjectClassName(new java.lang.Integer(42));
   * System.log(result);
   */
  getObjectClassName : function(object) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }
    try {
      return object.constructor.name;
    } catch (exception) {
      return object.getClass().getSimpleName();
    }
  },

  /**
   * Returns the ID for the given object.<br>
   * Hint: Some objects have no IDs.
   * Hint: The argument getId is an additional flag, to mock a result.
   *
   * @function getObjectId
   * @param {object} object - Object to get the id.
   * @param {boolean} getId - Flag to mock result.
   * @returns {string}
   *
   * @example
   * // Delivers Mock-up ObjectId
   * var result = System.getObjectId({}, true);
   * System.log(result);
   */
  getObjectId : function(object, getId) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }
    var idValue = "";
    if (
      typeof getId !== "undefined" &&
      getId !== null &&
      getId === true
    ) {
      idValue = "Mock-up ObjectId";
    }
    return idValue;
  },

  /**
   * Returns the plugin name of any scripting object.
   * Hint: The argument getPluginName is an additional flag, to mock a result.
   *
   * @function getObjectPluginName
   * @param {object} object - Object to get the plugin name.
   * @param {boolean} getPluginName - Flag to mock result.
   * @returns {string}
   *
   * @example
   * // Delivers Server
   * var result = System.getObjectPluginName({}, true);
   * System.log(result);
   */
  getObjectPluginName : function(object, getPluginName) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }
    var pluginNameValue = "";
    if (
      typeof getPluginName !== "undefined" &&
      getPluginName !== null &&
      getPluginName === true
    ) {
      pluginNameValue = "Server";
    }
    return pluginNameValue;
  },

  /**
   * Returns the type for the given object.
   * Hint: The argument getType is an additional flag, to mock a result.
   *
   * @function getObjectType
   * @param {object} object - Object to get the type.
   * @param {boolean} getType - Flag to mock result.
   * @returns {string}
   *
   * @example
   * // Delivers Mock-up Type
   * var result = System.getObjectType({}, true);
   * System.log(result);
   */
  getObjectType : function(object, getType) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }
    var typeValue = "";
    if (
      typeof getType !== "undefined" &&
      getType !== null &&
      getType === true
    ) {
      typeValue = "Mock-up Type";
    }
    return typeValue;
  },

  /**
   * Returns name of the operating system.
   *
   * @function getOsName
   * @returns {string}
   *
   * @example
   * // Delivers on Windows OS Windows 10
   * var result = System.getOsName();
   * System.log(result);
   */
  getOsName : function() {
    return String(java.lang.System.getProperty("os.name"));
  },

  /**
   * Returns the implementation version of the Rhino engine.
   * Hint: This method is not available in the standard.
   *
   * @function getRhinoVersion
   * @param {boolean} fullText - Flag to get full text.
   * @returns {string}
   *
   * @example
   * // Delivers e.g. 1.7.14
   * var result = System.getRhinoVersion();
   * System.log(result);
   *
   * @example
   * // Delivers e.g. Rhino 1.7 release 4 2012 06 18
   * var result = System.getRhinoVersion(true);
   * System.log(result);
   */
  getRhinoVersion : function(fullText) {
    var full = false;
    if (
      typeof fullText !== "undefined" &&
      fullText !== null &&
      typeof fullText === "boolean"
    ) {
      full = fullText;
    }
    var currentContext = _context.getCurrentContext();
    var rhinoVersion = currentContext.getImplementationVersion();
    if (full === false) {
      rhinoVersion = rhinoVersion.replace("Rhino ", "");
      rhinoVersion = rhinoVersion.replace(" release ", ".");
      rhinoVersion = rhinoVersion.split(" ")[0];
      var rhinoRelease = String(rhinoVersion).split(".")[2];
      if (Number(rhinoRelease) < 10) {
        rhinoRelease = "0" + rhinoRelease;
        rhinoVersion = rhinoVersion.substring(
          0, rhinoVersion.lastIndexOf(".") + 1
        ) + rhinoRelease;
      }
    }
    return String(rhinoVersion);
  },

  /**
   * Returns the default temporary-file directory of Java, which is
   * specified by the system property java.io.tmpdir.<br>
   * Hint: This method is not documented in the standard.
   *
   * @function getTempDir
   * @returns {string}
   *
   * @example
   * // Delivers on Windows C:\Users\[name]\AppData\Local\Temp\
   * var result = System.getTempDir();
   * System.log(result);
   */
  getTempDir : function() {
    return String(java.lang.System.getProperty("java.io.tmpdir"));
  },

  /**
   * Returns the default temporary directory.
   *
   * @function getTempDirectory
   * @returns {string}
   *
   * @example
   * // Delivers on Windows C:\Users\[name]\AppData\Local\Temp\
   * var result = System.getTempDirectory();
   * System.log(result);
   */
  getTempDirectory : function() {
    var retValue = java.lang.System.getenv("TEMP");
    if (retValue === null) {
      retValue = java.lang.System.getenv("TMP");
      if (retValue === null) {
        retValue = java.lang.System.getProperty("temp.dir");
        if (retValue === null) {
          retValue = this.getTempDir();
          if (retValue === null) {
            return null;
          }
        }
      }
    }
    return String(retValue.replace("\\", "/"));
  },

  /**
   * Converts hexadecimal string to decimal number.
   *
   * @function hexToDecimal
   * @param {string} value - Hexadecimal value.
   * @returns {number}
   *
   * @example
   * // Delivers 65535
   * var result = System.hexToDecimal("FFFF");
   * System.log(result);
   */
  hexToDecimal : function(value) {
    if (typeof value !== "undefined" && value !== null) {
      return parseInt(value.toString(), 16);
    } else {
      return null;
    }
  },

  /**
   * Tests whether host is reachable.
   *
   * @function isHostReachable
   * @param {string} hostOrIp - Host or IP address.
   * @param {object} timeout - Timeout in milliseconds.
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var reached = System.isHostReachable("127.0.0.1");
   * System.log(reached);
   *
   * @example
   * // Delivers true
   * var reached = System.isHostReachable("localhost");
   * System.log(reached);
   */
  isHostReachable : function(hostOrIp, timeout) {
    if (
      typeof hostOrIp === "undefined" ||
      hostOrIp === null ||
      String(hostOrIp).trim() === ""
    ) {
      throw new Error("hostOrIp argument can not be undefined or null");
    }
    var value = 1000;
    if (typeof timeout !== "undefined" && timeout !== null) {
      value = parseFloat(timeout.toString());
      if (isNaN(value)) {
        value = 1000;
      }
    }
    try {
      return Boolean(java.net.InetAddress.getByName(
        hostOrIp.toString()
      ).isReachable(value));
    } catch (exception) {
      return false;
    }
  },

  /**
   * Checks if operating system is Linux.<br>
   * Hint: This method is not available in the standard.
   *
   * @function isLinux
   * @returns {boolean}
   */
  isLinux : function() {
    return String(java.lang.System.getProperty("os.name")).toLowerCase().includes("linux");
  },

  /**
   * Checks if operating system is Mac OS.<br>
   * Hint: This method is not available in the standard.
   *
   * @function isMac
   * @returns {boolean}
   */
  isMac : function() {
    return String(java.lang.System.getProperty("os.name")).toLowerCase().includes("mac");
  },
  
  /**
   * Returns true if object is not found.
   * Hint: The argument shallNotBeFound is an additional flag, to mock a result.
   *
   * @function isNotFound
   * @param {object} object - Object to check.
   * @param {boolean} shallNotBeFound - Flag to mock result.
   * @returns {boolean}
   */
  isNotFound : function(object, shallNotBeFound) {
    if (typeof object === "undefined" || object === null) {
      throw new Error("object argument can not be undefined or null");
    }
    var notFoundValue = false;
    if (
      typeof shallNotBeFound !== "undefined" &&
      shallNotBeFound !== null &&
      shallNotBeFound === true
    ) {
      notFoundValue = true;
    }
    return notFoundValue;
  },

  /**
   * Checks if operating system is Windows.<br>
   * Hint: This method is not available in the standard.
   *
   * @function isWindows
   * @returns {boolean}
   */
  isWindows : function() {
    return String(java.lang.System.getProperty("os.name")).toLowerCase().includes("windows");
  },
  
  /**
   * Logs a text in the system with INFO.
   *
   * @function log
   * @param {string} text - Text to log.
   *
   * @example
   * System.log("This is a test");
   */
  log : function(text) {
    this._println("\u001B[36mINFO\u001B[0m", text);
  },

  /**
   * Generates an unique ID.
   *
   * @function nextUUID
   * @returns {string}
   *
   * @example
   * // Delivers 943c8517-f4e3-4a7f-9d7c-5d85684d05b3
   * var result = System.nextUUID();
   * System.log(result);
   */
  nextUUID : function() {
    return String(java.util.UUID.randomUUID().toString());
  },

  /**
   * @function pojoToString
   * @param {object} any
   * @returns {string}
   */
  pojoToString : function(any) {
    if (typeof any === "undefined" || any === null) {
      throw new Error("any argument can not be undefined or null");
    }

    return "";
  },

  /**
   * Returns the IP address of the host name.
   *
   * @function resolveHostName
   * @param {string} hostName - Host name.
   * @returns {string}
   *
   * @example
   * var ipAddress = System.resolveHostName("rhino.acme.com");
   */
  resolveHostName : function(hostName) {
    if (
      typeof hostName === "undefined" ||
      hostName === null ||
      String(hostName).trim() === ""
    ) {
      throw new Error("hostName argument can not be undefined or null");
    }
    try {
      return String(java.net.InetAddress.getByName(
        hostName.toString()
      ).getHostAddress());
    } catch (exception) {
      throw new Error(
        "Cannot resolve host for name: " + hostName.toString()
      );
    }
  },

  /**
   * Returns the host name of the IP address.<br>
   * Hint: getByName checks the validity of the address format and
   * getHostName delivers, if this InetAddress was created with a host
   * name, the host name.
   *
   * @function resolveIpAddress
   * @param {string} ipAddress - The Ip address to lookup the hostname for.
   * @returns {string}
   *
   * @example
   * var hostName = System.resolveIpAddress("102.54.94.97");
   */
  resolveIpAddress : function(ipAddress) {
    if (
      typeof ipAddress === "undefined" ||
      ipAddress === null ||
      String(ipAddress).trim() === ""
    ) {
      throw new Error("ipAddress argument can not be undefined or null");
    }
    try {
      return String(java.net.InetAddress.getByName(
        ipAddress.toString()
      ).getHostName());
    } catch (exception) {
      throw new Error(
        "Cannot resolve host for address: " + ipAddress.toString()
      );
    }
  },

  /**
   * Sends a custom event.
   *
   * @function sendCustomEvent
   * @param {string} eventKey - Custom event name.
   */
  sendCustomEvent : function(eventKey) {
    if (
      typeof eventKey === "undefined" ||
      eventKey === null ||
      String(eventKey).trim() === ""
    ) {
      throw new Error("eventKey argument can not be undefined or null");
    }
    // Nothing happens here.
  },

  /**
   * Sets the context.<br>
   * Hint: This method is not available in the standard.
   *
   * @function setContext
   * @param {object} context
   */
  setContext : function(context) {
    if (typeof context === "undefined" || context === null) {
      throw new Error("context argument can not be undefined or null");
    }
    _context = context;
  },

  /**
   * Sets additional log information.
   *
   * @function setLogMarker
   * @param {string} logMarker - Log info that will appear in every log.
   */
  setLogMarker : function(logMarker) {
    if (logMarker) {
      _logMarker = logMarker;
    }
  },

  /**
   * Sleeps for a given time.
   *
   * @function sleep
   * @param {object} time - Time to sleep in miliseconds.
   * @returns {boolean}
   *
   * @example
   * System.sleep(1250);
   */
  sleep : function(time) {
    var value = 500;
    if (typeof time !== "undefined" && time !== null) {
      var val = java.lang.Double.parseDouble(time.toString());
      value = new java.lang.Long(val);
    }
    if (value < 500) {
      value = 500;
    }
    var result = true;
    try {
      java.lang.Thread.sleep(value);
    } catch (exception) {
      result = false;
    }
    return result;
  },

  /**
   * Logs a text in the standard error stream.
   *
   * @function stderr
   * @param {string} text - Test to log.
   *
   * @example
   * System.stderr("This is a test");
   */
  stderr : function(text) {
    var outText = null;
    if (typeof text === "undefined" || text === null) {
      outText = "";
    } else {
      var rhinoVersion = this.getRhinoVersion();
      if (this.compareVersionNumber(rhinoVersion, "1.7.5") === 1) {
        // trimRight added to release 1.7.6 of Rhino
        outText = text.toString().trimRight();
      } else {
        outText = text.toString().replace(/[\s]+$/g, "");
      }
    }
    java.lang.System.err.println(outText);
  },

  /**
   * Logs a text in the standard output stream. Use this for debug only.
   *
   * @function stdout
   * @param {string} text - Text to log.
   *
   * @example
   * System.stdout("This is a test");
   */
  stdout : function(text) {
    var outText = null;
    if (typeof text === "undefined" || text === null) {
      outText = "";
    } else {
      var rhinoVersion = this.getRhinoVersion();
      if (this.compareVersionNumber(rhinoVersion, "1.7.5") === 1) {
        // trimRight added to release 1.7.6 of Rhino
        outText = text.toString().trimRight();
      } else {
        outText = text.toString().replace(/[\s]+$/g, "");
      }
    }
    java.lang.System.out.println(outText);
  },

  /**
   * Encodes string to base64.<br>
   * Hint: This method is not available in the standard.
   *
   * @function stringToBase64
   * @param {string} value - Text to encode in base64.
   * @returns {string}
   */
  stringToBase64 : function(value) {
    if (typeof value === "undefined" || value === null) {
      throw new Error("value argument can not be undefined or null");
    }
    return String(
      java.util.Base64.getEncoder().encodeToString(
        java.lang.String(value).getBytes()
      )
    );
  },

  /**
   * @function stringToPojo
   * @param {string} value
   * @returns {object}
   */
  stringToPojo : function(value) {
    if (typeof value === "undefined" || value === null) {
      throw new Error("value argument can not be undefined or null");
    }

    return {};
  },

  /**
   * Calls the method getCurrentTime.
   *
   * @function time
   * @returns {number}
   */
  time : function() {
    return this.getCurrentTime();
  },

  /**
   * Waits for keypress enter.
   * Hint: This method is not available in the standard.
   *
   * @function waitEnter
   */
  waitEnter : function() {
    this.log("Press Enter to continue");
    try {
      java.lang.System.in.read();
    } catch (exception) {
    }
  },

  /**
   * Waits for an external custom event.
   *
   * @function waitCustomEventUntil
   * @param {string} id
   * @param {string} name - Custom event key.
   * @param {object} endDate - Expiration date.
   * @returns {object}
   */
  waitCustomEventUntil : function(id, name, endDate) {
    if (
      typeof id === "undefined" ||
      id === null ||
      String(id).trim() === ""
    ) {
      throw new Error("id argument can not be undefined or null");
    }
    if (
      typeof name === "undefined" ||
      name === null ||
      String(name).trim() === ""
    ) {
      throw new Error("name argument can not be undefined or null");
    }
    if (
      typeof endDate === "undefined" ||
      endDate === null ||
      !(endDate instanceof Date) ||
      isNaN(endDate)
    ) {
      throw new Error("endDate argument can not be undefined or null");
    }
    var EventCustom = {};

    return EventCustom;
  },

  /**
   * @function waitTriggerEvent
   * @param {string} id
   * @param {string} name
   * @param {object} checkPeriod - Checking delay in milliseconds.
   * @returns {object}
   */
  waitTriggerEvent : function(id, name, checkPeriod) {
    if (
      typeof id === "undefined" ||
      id === null ||
      String(id).trim() === ""
    ) {
      throw new Error("id argument can not be undefined or null");
    }
    if (
      typeof name === "undefined" ||
      name === null ||
      String(name).trim() === ""
    ) {
      throw new Error("name argument can not be undefined or null");
    }
    var wait = 500;
    if (
      typeof checkPeriod !== "undefined" ||
      checkPeriod !== null
    ) {
      wait = parseFloat(checkPeriod.toString());
      if (wait < 500 || isNaN(wait)) {
        wait = 500;
      }
    }
    var EventTrigger = {};

    return EventTrigger;
  },

  /**
   * Pauses the execution and wait for date to continue.
   *
   * @function waitUntil
   * @param {object} waitDate - Date to wait.
   * @param {object} checkPeriod - Checking delay in milliseconds.
   * @returns {boolean}
   *
   * @example
   * var newDate = new Date();
   * newDate.setSeconds(newDate.getSeconds() + 5);
   * System.waitUntil(newDate);
   */
  waitUntil : function(waitDate, checkPeriod) {
    if (
      !(waitDate instanceof Date) ||
      isNaN(waitDate) ||
      typeof waitDate === "undefined" ||
      waitDate === null
    ) {
      throw new Error("waitDate argument must be Date and can not be undefined or null");
    }
    var wait = 500;
    if (typeof checkPeriod !== "undefined" && checkPeriod !== null) {
      wait = parseFloat(checkPeriod.toString());
      if (wait < 500 || isNaN(wait)) {
        wait = 500;
      }
    }
    var result = true;
    while (new Date() <= waitDate) {
      try {
        this.sleep(wait);
      } catch (exception) {
        result = false;
      }
    }
    return result;
  },

  /**
   * Logs a text in the system with WARNING.
   *
   * @function warn
   * @param {string} text - Text to log.
   *
   * @example
   * System.warn("This is a test");
   */
  warn : function(text) {
    this._println("\u001B[33mWARNING\u001B[0m", text);
  }

};

java.lang.System.setProperty("LOCAL_SIMULATION", "true");
var System = new _SystemNS();
