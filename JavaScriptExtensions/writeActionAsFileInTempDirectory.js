/**
 * @function writeActionAsFileInTempDirectory
 *
 * @param {string} in_moduleName - Module name which contains the action
 * @param {string} in_actionName - Action name which contains the text
 * @param {string} in_fileName - Name of the file
 * @param {boolean} in_base64Encoded - If action contains base64 encoded content true, otherwise false
 * @param {string} in_mimeType - Media type (Multipurpose Internet Mail Extensions) indicates the format of a file
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.1.0
 *
 * @example
 * var in_moduleName = "de.stschnell";
 * var in_actionName = "helloWorld";
 * var in_fileName = "helloWorld.jar";
 * var in_base64Encoded = true;
 * var in_mimeType = "application/java-archive";
 *
 * @example
 * // Result is that file exists in /data/vco/usr/lib/vco/app-server/temp
 * var in_moduleName = "com.vmware.basic";
 * var in_actionName = "createDirectory";
 * var in_fileName = "createDirectory.js";
 *
 * Checked with Aria Automation 8.12.0 and 8.14.0
 */

var _writeActionAsFileInTempDirectory = {

  main : function(moduleName, actionName, fileName, base64Encoded, mimeType) {

    try {

      var actionContent = System.getModule("de.stschnell")
        .getActionAsText(moduleName, actionName);

      var file = new File(System.getTempDirectory() + "/" + fileName);
      if (file.exists) {
        file.deleteFile();
      }

      if (base64Encoded === true) {

        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
        var mediaType = "application/octet-stream";

        if (
          typeof mimeType !== "undefined" &&
          mimeType !== null &&
          String(mimeType).trim() !== ""
        ) {
          mediaType = mimeType;
        }

        var byteBuffer = new ByteBuffer(actionContent);

        var mime = new MimeAttachment();
        mime.name = fileName;
        mime.mimeType = mediaType;
        mime.buffer = byteBuffer;
        mime.write(System.getTempDirectory(), null);

      } else {
        file.write(actionContent);
      }

    } catch (exception) {
      System.log(exception)
    }

  }

}

if (
  String(in_moduleName).trim() !== "" &&
  String(in_actionName).trim() !== "" &&
  String(in_fileName).trim() !== ""
) {
  return _writeActionAsFileInTempDirectory.main(
    in_moduleName,
    in_actionName,
    in_fileName,
    in_base64Encoded,
    in_mimeType
  );
} else {
  throw new Error(
    "in_moduleName or in_actionName or in_fileName argument can not be null"
  );
}
