
/**
 *
 * @module de.stschnell
 *
 * @version 0.1.0
 *
 * @param {Any} command
 * @param {number} timeOut
 *
 * @outputType Any
 *
 * @example
 * var command = [ "echo", "Hello World" ];
 * var output = System.getModule("de.stschnell").executeCommand(command).output;
 * System.log(output);
 */

/**
 * Set in the VMware Control Center the system property
 * com.vmware.scripting.javascript.allow-native-object to true.
 *
 * Checked with Rhino 1.7.14 and 1.7R4,
 * with Bellsoft JDK 21.0.1, 17.0.9 and 11.0.21,
 * on Windows 10 and Ubuntu Linux 22.04.3 and
 * with VMware Aria Automation 8.12.0 and 8.14.1.
 */

/**
 * Executes an operating system command.
 * The Advantage of this approach are ...
 * 1. that in addition to stdout, stderr is also output.
 * 2. that a timeout parameter exists so that the process is aborted
 *    when it exceeds.
 * 3. that setting the system property com.vmware.js.allow-local-process
 *    is not necessary, compared to the Command object.
 *
 * Hint: Command can be string or array of strings. If string value
 * is provided command arguments are extracted by splitting the string
 * using whitespace as separator.
 *
 * @function executeCommand
 * @param {string|string[]} command - The command to execute.
 * @param {number} timeOut - The maximum time to wait in milliseconds.
 * @returns {Object}
 *
 * @example
 * // Delivers on Windows:
 * // Microsoft Windows [Version 10.0.10586]
 * var command = [ "cmd", "/c", "ver" ];
 * System.log(executeCommand(command).output);
 *
 * @example
 * // Delivers on VMware Aria Automation 8.12.0:
 * // NAME="VMware Photon OS"
 * // VERSION="3.0"
 * // ...
 * var command = [ "cat", "/etc/os-release" ];
 * System.log(executeCommand(command).output);
 *
 * @example
 * // Delivers on VMware Aria Automation:
 * // Exit value: 2
 * // ls: cannot access 'bambi': No such file or directory
 * var command = [ "ls", "bambi" ];
 * System.log(executeCommand(command).output);
 */

if (
  typeof command === "undefined" ||
  command === null ||
  arguments.length === 0
) {
  throw new Error("command argument can not be undefined or null");
}

var _command;

if (Array.isArray(command)) {
  _command = command;
} else if (typeof command === "string") {
  _command = command.split(" ");
} else {
  throw new Error("command argument must be string or array of string");
}

var _timeOut;

if (
  typeof timeOut === "undefined" ||
  timeOut === null ||
  timeOut <= 1 ||
  isNaN(timeOut)
) {
  _timeOut = -1;
} else {
  _timeOut = timeOut;
}

var output = "";
var exitValue = -1;
var bufferedProcessInputStream;
var bufferedProcessErrorStream;

try {

  var process = java.lang.Runtime.getRuntime().exec(_command);
  if (_timeOut === -1) {
    process.waitFor(); // Infinity
  } else {
    process.waitFor(
      java.lang.Long(_timeOut),
      java.util.concurrent.TimeUnit.MILLISECONDS
    );
  }
  exitValue = process.exitValue();
  if (exitValue !== 0) {
    System.error("Exit value: " + exitValue);
  }

  var processInputStream = java.io.InputStreamReader(process.getInputStream());
  bufferedProcessInputStream = java.io.BufferedReader(processInputStream);

  var processErrorStream = java.io.InputStreamReader(process.getErrorStream());
  bufferedProcessErrorStream = java.io.BufferedReader(processErrorStream);

  var line = "";

  while ((line = bufferedProcessInputStream.readLine()) !== null) {
    output += line + "\n";
  }

  while ((line = bufferedProcessErrorStream.readLine()) !== null) {
    output += line + "\n";
  }

} catch (exception) {
  System.error(exception);
} finally {
  if (bufferedProcessInputStream != null) {
    bufferedProcessInputStream.close();
  }
  if (bufferedProcessErrorStream != null) {
    bufferedProcessErrorStream.close();
  }
}

return { "output": output, "exitValue": exitValue };
