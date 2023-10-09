/**
 * Mock-up of the MimeAttachment class from VMware Aria Automation.
 * Describe a mime attachment.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.2.0
 *
 * Hint: This mock-up works only with the Mozilla Rhino JavaScript
 * engine.
 *
 * Checked with Rhino engines version 1.7R4 and 1.7.14
 */

var MimeAttachment = function(file) {

  if (
    typeof file !== "undefined" &&
    file !== null &&
    String(file).trim() !== ""
  ) {

    this.mimeType = "";

    try {
      this.name = System.extractFileName(file);
      var path = java.nio.file.FileSystems.getDefault().getPath("", file);
      this.buffer = java.nio.file.Files.readAllBytes(path);
      this.content = String(java.lang.String(this.buffer));
    } catch (exception) {
      System.error(exception);
    }

  }

};

MimeAttachment.prototype = {

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @function getClassName
   * @returns {string}
   *
   * @example
   * var mimeAttachment = new MimeAttachment();
   * var result = mimeAttachment.getClassName();
   * System.log(result);
   */
  getClassName : function() {
    return "MimeAttachment";
  },

  /**
   * Write the content of the mime attachment to file.
   *
   * @function write
   * @param {string} directory - Directory where to store the file.
   * @param {string} filename - Optional filename (if null, use the mime attachment name).
   * @returns {File}
   */
  write : function(directory, filename) {

    try {

      if (
        typeof directory === "undefined" ||
        directory === null ||
        String(directory).trim() === ""
      ) {
        throw new Error("directory argument can not be undefined or null");
      }

      if (
        typeof filename === "undefined" ||
        filename === null ||
        String(filename).trim() === ""
      ) {
        filename = this.name;
      }

      var fullPath = System.appendToPath(String(directory), String(filename));

      var contextFactory = org.mozilla.javascript.ContextFactory();
      var context = contextFactory.getGlobal().enterContext();

      var path = java.nio.file.Paths.get(fullPath);
      java.nio.file.Files.deleteIfExists(path);
      java.nio.file.Files.createFile(path);
      var outputStream = java.nio.file.Files.newOutputStream(path);
      if (this.buffer.getClassName() === "ByteBuffer") {
        outputStream.write(this.buffer._byteBuffer);
      } else {
        outputStream.write(this.buffer);
      }
      outputStream.close();

    } catch (exception) {
      System.log(exception)
    } finally {
      context.exit();
    }

  }

};
