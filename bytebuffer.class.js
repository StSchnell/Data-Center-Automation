/**
 * Mock-up of the ByteBuffer class from VMware Aria Automation.
 * Wrapper around byte array. Used for passing references to binary
 * content.
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

var ByteBuffer = function(arg) {

  /**
   * Creates an empty byte buffer, byte buffer from a base64 string or
   * from a byte buffer.
   */

  var context;
  
  try {

    var contextFactory = org.mozilla.javascript.ContextFactory();
    context = contextFactory.getGlobal().enterContext();

    if (typeof arg === "undefined" || arg === null) {

      this._byteBuffer = context.jsToJava(
        java.lang.String("").getBytes(),
        java.lang.Class.forName("[B")
      );

    } else if (typeof arg === "string") {

      this._byteBuffer = context.jsToJava(
        java.util.Base64.getDecoder().decode(
          java.lang.String(arg).getBytes()
        ),
        java.lang.Class.forName("[B")
      );

    } else if (
      typeof arg === "object" &&
      arg.getClassName() === "ByteBuffer"
    ) {

      this._byteBuffer = System.clone(arg);

    }

  } catch (exception) {
    System.log(exception);
  } finally {
    context.exit();
  }

};

ByteBuffer.prototype = {

  /**
   * Returns the class name.<br>
   * Hint: This method is a standard.
   *
   * @function getClassName
   * @returns {string}
   *
   * @example
   * var byteBuffer = new ByteBuffer();
   * var result = byteBuffer.getClassName();
   * System.log(result);
   */
  getClassName : function() {
    return "ByteBuffer";
  },

  /**
   * Gets the length of the buffer.
   *
   * @function length
   * @returns {number}
   *
   * @example
   * // Delivers 14
   * var base64 = System.stringToBase64("This is a test");
   * var byteBuffer = new ByteBuffer(base64);
   * System.log(byteBuffer.length());
   */
  length : function() {
    return this._byteBuffer.length;
  }

};
