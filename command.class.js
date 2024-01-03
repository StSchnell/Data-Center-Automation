
// Begin ---------------------------------------------------------------

/**
 * Mock-up of the Command class from VMware Aria Automation.
 * Builds a process object with the command to execute.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.3.0
 *
 * Hint: This mock-up works only with the Mozilla Rhino JavaScript
 * engine.
 *
 * Checked with Windows 10 and RHEL 9.2, with the Rhino engines 1.7R4
 * and 1.7.14, with Bellsoft JDK 11.0.20, Oracle OpenJDK 20.0.2 and
 * Bellsoft JDK 21.0.1.
 */

/**
 * Method                         |   Type  |Documented|Implemented|Mock-Up
 * -------------------------------+-- ------+----------+-----------+-------
 * Command                        |         |     X    |     X     |       
 * execute                        | function|     X    |     X     |       
 * executeAndLog                  | function|     X    |     X     |       
 * input                          |attribute|     X    |     X     |       
 * output                         |attribute|     X    |     X     |       
 * result                         |attribute|     X    |     X     |       
 */

/**
 * Executes a command in the host operating system.
 * Commands are dependent on the host operating system default shell.
 *
 * Hint: Command can be created using string or array. If string value
 * is provided command arguments are extracted by splitting the string
 * using whitespace as separator.
 *
 * @param {string|string[]} command - The command to execute.
 * @param {string} input - Input for the process of the command to execute.
 * @returns {string} output - Standard output from the command.
 * @returns {number} result - Return code from the command.
 *
 * @example
 * var command = new Command("cmd /c dir");
 * // var command = new Command("ls -l");
 * command.execute(true);
 * System.log("Return Code: " + String(command.result));
 * System.log("Output: " + command.output);
 *
 * @example
 * var command = new Command(["cmd", "/c", "dir", "/b"]);
 * // var command = new Command(["ls", "-l", "-s"]);
 * command.execute(true);
 * System.log("Return Code: " + String(command.result));
 * System.log("Output: " + command.output);
 *
 * @example
 * var command = new Command("cmd");
 * command.input = "dir /d\n"; // \n for enter.
 * // var command = new Command("bash");
 * // command.input = "ls -l -s\n";
 * command.execute(true);
 * System.log("Return Code: " + String(command.result));
 * System.log("Output: " + command.output);
 */
var Command = function(command) {

  if (
    typeof command === "undefined" ||
    command === null ||
    arguments.length === 0
  ) {
    throw new Error("command argument can not be undefined or null");
  }

  if (Array.isArray(command)) {
    this._command = command;
  } else {
    if (arguments.length === 1) {
      this._command = command.split(" ");
    } else {
      this._command = new Array(arguments.length);
      for (var key = 0; key < arguments.length; key++) {
        this._command[key] = arguments[key];
      }
    }
  }

  this.input;
  this.output;
  this.result;
};

Command.prototype = {

  /**
   * Executes the command.
   *
   * @function execute
   * @param {boolean} wait - Wait for execution end.
   * @returns {number}
   *
   * @example
   * var command = new Command("notepad.exe");
   * // var command = new Command("gedit");
   * command.execute();
   * System.log("Return Code: " + String(command.result));
   */
  execute : function(wait) {

    try {

      var process = java.lang.Runtime.getRuntime().exec(this._command);

      // Sends data to the process.
      if (this.input != null) {
        var input = new java.lang.String(String(this.input));
        process.getOutputStream().write(input.getBytes());
        process.getOutputStream().flush();
      }
      process.getOutputStream().close();

      if (wait === true) {
        // Get data of stdout from the process.
        var output = new java.lang.String(
          process.getInputStream().readAllBytes(),
          java.nio.charset.StandardCharsets.ISO_8859_1
        );
        process.getInputStream().close();

        // Get data of stderr from the process.
        output += new java.lang.String(
          process.getErrorStream().readAllBytes(),
          java.nio.charset.StandardCharsets.ISO_8859_1
        );
        process.getErrorStream().close();

        this.output = String(output);

        process.waitFor();

        this.result = process.exitValue();

      } else {
        process.getInputStream().close();
        process.getErrorStream().close();
        this.result = 0;
      }
      return this.result;

    } catch (exception) {
      throw new Error("\nError at Command.execute\n" +
        exception.message + "\n");
    }

  },

  /**
   * Executes the command and logs the standard output to a file.
   *
   * @function executeAndLog
   * @param {string} filename - The file where the output is redirected.
   * @returns {number}
   *
   * @example
   * var command = new Command("cmd", "/c", "dir", "/b");
   * command.executeAndLog("C:\\Users\\Public\\dirTest.txt");
   * // var command = new Command("ls", "-l" , "-s");
   * // command.executeAndLog("/home/stefan/dirTest.txt");
   */
  executeAndLog : function(filename) {

    if (
      typeof filename === "undefined" ||
      filename === null ||
      String(filename).trim() === ""
    ) {
      throw new Error("filename argument can not be undefined or null");
    }

    this.execute(true);

    var file;
    try {
      file = new java.io.FileWriter(filename);
      file.write(this.output);
    } catch (exception) {
      throw new Error("\nError at Command.executeAndLog\n" +
        exception.message + "\n");
    } finally {
      if (typeof file !== "undefined") {
        file.close();
      }
    }

    return this.result;

  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @function getClassName
   * @returns {string}
   */
  getClassName: function() {
    return "Command";
  }

};

// End -----------------------------------------------------------------
