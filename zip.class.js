/**
 * Mock-up of the ZipWriter class from VMware Aria Automation with an
 * addition of a ZipReader class.
 *
 * Hint: This approach handles only string data.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.2.0
 *
 * Hint: This mock-up works only with the Mozilla Rhino JavaScript
 * engine.
 *
 * Checked with Rhino engines version 1.7R4, 1.7.15 and 1.8.0
 */

var ZipWriter = function(file) {
  /**
   * Creates a new ZipWriter with the given file.
   *
   * @param file {string} - The file access.
   *
   * @example
   * var zipWriter = new ZipWriter("test.zip");
   * zipWriter.addContent("test.txt", "Hello World");
   * var mimeAttachment = new MimeAttachment("mimeTest.txt");
   * zipWriter.addMimeAttachment(mimeAttachment);
   * zipWriter.writeZip();
   */
  if (
    typeof file !== "undefined" &&
    file !== null &&
    String(file).trim() !== ""
  ) {
    this.filename = file;
    this.contentItems = [];
  }
};

ZipWriter.prototype = {

  /**
   * Adds a string element to the specified zip file.
   *
   * @param entryName {string} - Name of the elememt in the zip file.
   * @param content {string} - Content as a String.
   * @param encoding {string} - Encoding type, e.g. UTF-8 or whatever.
   */
  addContent : function(entryName, content, encoding) {
    if (
      entryName === "undefined" ||
      entryName === null ||
      String(entryName).trim() === ""
    ) {
      throw new Error("entryName argument can not be undefined or null");
    }
    if (
      content === "undefined" ||
      content === null ||
      String(content).trim() === ""
    ) {
      throw new Error("content argument can not be undefined or null");
    }
    this.contentItems.push(
      {
        "entryName": entryName,
        "content": content,
        "encoding": encoding
      }
    );
  },

  /**
   * Adds a mime attachement to the specified zip file.
   *
   * @param mimeAttachment {MimeAttachment} - Element to add to the zip file.
   */
  addMimeAttachment : function(mimeAttachment) {
    this.contentItems.push(
      {
        "entryName": mimeAttachment.name,
        "content": mimeAttachment.content,
        "encoding": null
      }
    );
  },

  /**
   * Reinitializes the length to 0 and sets the file-pointer in the very
   * begining of the file.
   */
  clean : function() {
    this.contentItems = [];
  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @returns {string}
   */
  getClassName : function() {
    return "ZipWriter";
  },

  /**
   * Writes the elements to the zip File.
   */
  writeZip : function() {
    try {
      var zipOutput = java.util.zip.ZipOutputStream(
        java.io.BufferedOutputStream(
          java.io.FileOutputStream(this.filename)
        )
      );
      this.contentItems.forEach( function(item) {
        var entry = java.util.zip.ZipEntry(String(item.entryName));
        zipOutput.putNextEntry(entry);
        var data;
        if (
          item.encoding === undefined ||
          item.encoding === null ||
          String(item.encoding).trim()
        ) {
          data = java.lang.String(item.content).getBytes();
        } else {
          // https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/nio/charset/Charset.html
          data = java.lang.String(item.content).getBytes(
            java.lang.String(item.encoding)
          );
        }
        zipOutput.write(data, 0, data.length);
        zipOutput.closeEntry();
      });
      zipOutput.close();
    } catch (exception) {
      throw new Error(exception);
    }
  }

};

var ZipReader = function(file) {
  /**
   * Creates a new ZipReader with the given file.
   *
   * @param file {string} - The file access.
   *
   * @example
   * var zipReader = new ZipReader("test.zip");
   * var data = zipReader.readZip("test.txt");
   * java.lang.System.out.println(data);
   */
  if (
    typeof file !== "undefined" &&
    file !== null &&
    String(file).trim() !== ""
  ) {
    this.filename = file;
    this.contentItems = [];
    try {
      if (java.io.File(this.filename).exists()) {
        var zipInput = java.util.zip.ZipInputStream(
          java.io.BufferedInputStream(
            java.io.FileInputStream(this.filename)
          )
        );
        var entry = zipInput.getNextEntry();
        while(entry !== null) {
          var data =  java.lang.String(zipInput.readAllBytes());
          this.contentItems.push(
            {
              "entryName": entry.getName(),
              "content": data,
              "encoding": null
            }
          );
          zipInput.closeEntry();
          entry = zipInput.getNextEntry();
        }
        zipInput.close();
      }
    } catch (exception) {
      throw new Error(exception);
    }
  }
};

ZipReader.prototype = {

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @returns {string}
   */
  getClassName : function() {
    return "ZipReader";
  },

  /**
   * Returns a string element to the specified zip file.
   *
   * @param entryName {string} - Name of the elememt in the zip file.
   * @returns {string}
   */
  readZip : function(entryName) {
    var retValue = "";
    this.contentItems.forEach( function(item) {
      if (entryName === String(item.entryName)) {
        retValue = String(item.content);
      }
    });
    return retValue;
  }

};
