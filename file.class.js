/**
 * Collection of an emulation of the VMware Aria Automation classes
 * File, FileReader and FileWriter.
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.1.0
 *
 * Hint: This mock-up works only with the Mozilla Rhino JavaScript
 * engine.
 *
 * Checked with Rhino engines version 1.7R4, 1.7.14 and 1.7.15
 */

/**
 * Creates a new File object with the given file.
 *
 * @param file {string} - The file to access.
 */
var File = function(file) {
  if (typeof file !== "undefined" && file !== null) {
    var f = java.io.File(file);
    this.directory = String(f.getParent());
    this.exists = f.exists();
    this.extension = f.getName().substring(
      f.getName().lastIndexOf(".") + 1
    ).toLowerCase();
    this.hostname = "localhost";
    this.isDir = f.isDirectory();
    this.isLocal = false;
    if (this.exists) {
      this.length = f.length();
    } else {
      this.length = -1;
    }
    this.name = f.getName();
    this.path = file;
  }
};

File.prototype = {

  /**
   * Can read this file.
   *
   * @returns {boolean}
   */
  canRead : function() {
    return java.io.File(this.path).canRead();
  },

  /**
   * Can write this file.
   *
   * @returns {boolean}
   */
  canWrite : function() {
    return java.io.File(this.path).canWrite();
  },

  /**
   * Copies the file.<br>
   * Hint: This method is not available in the standard.
   *
   * @param targetName {string} - The target file.
   */
  copyTo : function(targetName) {
    if (typeof targetName === "undefined" || targetName === null) {
      throw new Error("targetName argument can not be undefined or null");
    }
    java.nio.file.Files.copy(
      java.io.File(this.path).toPath(),
      java.io.File(targetName).toPath(),
      java.nio.file.StandardCopyOption.REPLACE_EXISTING,
      java.nio.file.StandardCopyOption.COPY_ATTRIBUTES,
      java.nio.file.LinkOption.NOFOLLOW_LINKS
    );
  },

  /**
   * Creates the directory structure if it does not exist.
   */
  createDirectory : function() {
    var file = java.io.File(this.path);
    if (!file.exists()) {
      if (file.mkdirs()) {
        this.isDir = file.isDirectory();
      }
    }
  },

  /**
   * Creates the file if it does not exist.
   */
  createFile : function() {
    var file = java.io.File(this.path);
    if (!file.exists()) {
      if (file.createNewFile()) {
        this.exists = file.exists();
        this.length = file.length();
      }
    }
  },

  /**
   * Deletes the file or an empty directory.
   */
  deleteFile : function() {
    var file = java.io.File(this.path);
    if (file.exists()) {
      if (file.delete()) {
        this.exists = file.exists();
        this.length = -1;
      }
    }
  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @returns {string}
   */
  getClassName : function() {
    return "File";
  },

  /**
   * List files and directories.
   *
   * @param extension {string} - The extension.
   *
   * @returns {Array.<String>}
   */
  list : function(extension) {
    var file = java.io.File(this.path);
    if (file.isDirectory()) {
      var fileList = null;
      var returnArray = [];
      fileList = file.list();
      if (typeof extension === "undefined" && extension === null) {
        fileList.forEach( function(item) {
          returnArray.push(String(item));
        });
      } else {
        fileList.forEach( function(item) {
          if (String(item).toLowerCase().endsWith(extension)) {
            returnArray.push(String(item));
          }
        });
      }
      return returnArray;
    }
  },

  /**
   * Renames the file.
   *
   * @param destPathName {string} - The new pathname for the file.
   * @returns {boolean} - True if renaming succeeded, false otherwise.
   */
  renameTo : function(destPathName) {
    if (typeof destPathName === "undefined" || destPathName === null) {
      throw new Error("destPathName argument can not be undefined or null");
    }
    var file = java.io.File(this.path);
    if (file.exists()) {
      return file.renameTo(java.io.File(destPathName));
    }
  },

  /**
   * Writes the content to the file.
   *
   * @param content {string} - The content to write.
   */
  write : function(content) {
    if (typeof content === "undefined" || content === null) {
      throw new Error("content argument can not be undefined or null");
    }
    var fileWriter = java.io.FileWriter(java.io.File(this.path));
    fileWriter.write(content);
    fileWriter.close();
    this.length = java.io.File(this.path).length();
  }

};

/**
 * Creates a new FileReader with the given file.
 *
 * @param file {string} - The file to access.
 */
var FileReader = function(file) {
  if (typeof file !== "undefined" && file !== null) {
    var f = java.io.File(file);
    this.exists = f.exists();
    this.path = file;
  }
};

FileReader.prototype = {

  /**
   * Closes a previously opened file.
   */
  close : function() {
  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @returns {string}
   */
  getClassName : function() {
    return "FileReader";
  },

  /**
   * Opens the file for reading.
   */
  open : function() {
  },

  /**
   * Reads all lines from the opened file.
   *
   * @returns {string}
   */
  readAll : function() {
    return String(
      java.nio.file.Files.readString(
        java.nio.file.Paths.get(this.path)
      )
    );
  },

  /**
   * Reads one line from the opened file, the first line.
   *
   * @returns {string}
   */
  readLine : function() {
    return String(
      java.nio.file.Files.readAllLines(
        java.nio.file.Paths.get(this.path)
      ).get(0)
    );
  }

};

/**
 * Creates a new FileWriter with the given file.
 *
 * @param file {string} - The file to access.
 */
var FileWriter = function(file) {
  if (typeof file !== "undefined" && file !== null) {
    var f = java.io.File(file);
    this.exists = f.exists();
    this.path = file;
    this._fileWriter = null;
  }
  // Type of carriage return used in writeLine.
  this._lineEndUnix = "\n";      // 0
  this._lineEndWindows = "\r\n"; // 1
  this._lineEndMac = "\r";       // 2
  this.lineEndType = 0;
};

FileWriter.prototype = {

  /**
   * Reinitializes the length to 0 and sets the file-pointer to the 
   * beginning of the file.
   */
  clean : function() {
    this.close();
    var raf = java.io.RandomAccessFile(java.io.File(this.path), "rw");
    raf.setLength(0);
    this.open();
  },

  /**
   * Closes a previously opened file.
   */
  close : function() {
    this._fileWriter.close();
    this._fileWriter = null;
  },

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @returns {string}
   */
  getClassName : function() {
    return "FileWriter";
  },

  /**
   * Opens the file for writing.
   */
  open : function() {
    this._fileWriter = java.io.FileWriter(java.io.File(this.path), true);
  },

  /**
   * Writes a string to the file.
   *
   * @param value {string} - The string to write.
   */
  write : function(value) {
    if (typeof value === "undefined" || value === null) {
      throw new Error("value argument can not be undefined or null");
    }
    this._fileWriter.write(String(value));
  },

  /**
   * Writes a line to the file.
   *
   * @param value {string} - The line to write.
   */
  writeLine : function(value) {
    if (typeof value === "undefined" || value === null) {
      throw new Error("value argument can not be undefined or null");
    }
    switch (this.lineEndType) {
      case 1 :
        this._fileWriter.write(String(value) + this._lineEndWindows);
        break;
      case 2 :
        this._fileWriter.write(String(value) + this._lineEndMac);
        break;
      default :
        this._fileWriter.write(String(value) + this._lineEndUnix);
    }
  }

};
