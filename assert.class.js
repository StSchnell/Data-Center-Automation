// Begin ---------------------------------------------------------------

/**
 *                                           _                    _
 *     /\                                   | |   O              | |
 *    /  \    _ __   ___   _ __ ___    __ _ | |_  _   ___   __ _ | |
 *   / /\ \  | '__| /   \ | '_ ` _ \  /  ` || __|| | / __| /  ` || |
 *  / ____ \ | |   (  O  )| | | | | |(  O  || |_ | |( (__ (  O  || |_
 * /_/    \_\|_|    \___/ |_| |_| |_| \__,_| \__||_| \___| \__,_| \__|
 *
 * Aria Automation Assert Library
 *
 * @author Stefan Schnell <mail@stefan-schnell.de>
 * @license MIT
 * @version 0.6.0
 *
 * Checked with Aria Automation 8.5.1 and 8.12.2.
 * Checked standalone with Windows 10 and RHEL 9.2, with the Rhino
 * engines 1.7R4 and 1.7.14, with Bellsoft JDK 11.0.20 and Oracle
 * OpenJDK 20.0.2.
 */

var _assertNS = {

  // Check methods =====================================================

  /**
   * Determines whether the passed value is an array.
   *
   * @function isArray
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var array = [1, 2, 3, 4, 5];
   * System.log(assert.isArray(array));
   */
  isArray : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isArray");
    }
    return Array.isArray(value);
  },

  /**
   * Determines whether the passed value is a boolean.
   *
   * @function isBoolean
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * System.log(assert.isBoolean(false));;
   */
  isBoolean : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isBoolean");
    }
    return typeof value === "boolean";
  },

  /**
   * Determines whether the passed value is a (valid) date.
   *
   * @function isDate
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var date = new Date();
   * System.log(assert.isDate(date));
   */
  isDate : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isDate");
    }
    return this.isObject(value) && 
      value instanceof Date &&
      !isNaN(Date.parse(value));
  },

  /**
   * Determines whether the passed value is an error.
   *
   * @function isError
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var err = new Error();
   * System.log(assert.isError(err));
   */
  isError : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isError");
    }
    return this.isObject(value) && value instanceof Error;
  },

  /**
   * Determines whether the passed value is a function.
   *
   * @function isFunction
   * @param {any} value -Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var func = function() { return "Hello World"; };
   * System.log(assert.isFunction(func));
   */
  isFunction : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isFunction");
    }
    return typeof value === 'function';
  },

  /**
   * Determines whether the passed value is a instance of the given
   * constructor.
   *
   * @function isInstanceOf
   * @param {any} value - Value to be checked
   * @param {object} constructor - Constructor checked against
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * function C() {};
   * var o = new C();
   * System.log(assert.isInstanceOf(o, C));
   */
  isInstanceOf : function(value, constructor) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at isInstanceOf");
    }
    try {
      if (value instanceof constructor) {
        return true;
      } else {
        return false;
      }
    } catch (exception) {
      return false;
    }
  },

  /**
   * Determines whether the passed value is null.
   *
   * @function isNull
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var notNul = 0;
   * System.log(assert.isNull(notNul));
   */
  isNull : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isNull");
    }
    return value === null;
  },

  /**
   * Determines whether the passed value is a null or undefined.
   *
   * @function isNullOrUndefined
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * System.log(assert.isNullOrUndefined(null));
   * 
   * @example
   * // Delivers true
   * var undef;
   * System.log(assert.isNullOrUndefined(undef));
   */
  isNullOrUndefined : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isNullOrUndefined");
    }
    return this.isNull(value) || this.isUndefined(value);
  },

  /**
   * Determines whether the passed value is a number.
   *
   * @function isNumber
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var number = 42;
   * System.log(assert.isNumber(number));
   */
  isNumber : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isNumber");
    }
    return typeof value === "number";
  },

  /**
   * Determines whether the passed value is an object.
   *
   * @function isObject
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var obj = {};
   * System.log(assert.isObject(obj));
   */
  isObject : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isObject");
    }
    return typeof value === "object" && value !== null;
  },

  /**
   * Determines whether the passed value is a plain object.
   * Hint: An Object created by literal notation or new Object are known
   * as plain object (POJO). The opposite is an object created via a
   * constructor function.
   *
   * @function isPlainObject
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var plainObject = {a:1,b:2,c:3};
   * System.log(assert.isPlainObject(plainObject));
   */
  isPlainObject : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isPlainObject");
    }
    return value.constructor === Object;
  },

  /**
   * Determines whether the passed value is a regular expression.
   *
   * @function isRegExp
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var regexp = new RegExp();
   * System.log(assert.isRegExp(regexp));
   */
  isRegExp : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isRegExp");
    }
    if (value.constructor) {
      return value.constructor.name === "RegExp";
    } else {
      return false;
    }
  },

  /**
   * Determines whether the passed value is a string.
   *
   * @function isString
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var str = "Test";
   * System.log(assert.isString(str));
   */
  isString : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isString");
    }
    return typeof value === "string";
  },

  /**
   * Determines whether the passed value is a type of the given type.
   *
   * @function isTypeOf
   * @param {any} value - Value to be checked
   * @param {string} type - Type checked against
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var typeOfNumber = 42;
   * System.log(assert.isTypeOf(typeOfNumber, "number"));
   *
   * @example
   * // Delivers true
   * System.log(assert.isTypeOf(void 0, "undefined"));
   */
  isTypeOf : function(value, type) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at isTypeOf");
    }
    return typeof value === type;
  },

  /**
   * Determines whether the passed value is undefined.
   *
   * @function isUndefined
   * @param {any} value - Value to be checked
   * @returns {boolean}
   *
   * @example
   * // Delivers true
   * var undef;
   * System.log(assert.isUndefined(undef));
   *
   * @example
   * // Delivers true
   * System.log(assert.isUndefined(void 0));
   */
  isUndefined : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isUndefined");
    }
    return value === undefined;
  },

  /**
   * Determines whether the passed value is undefined or null.
   * Hint: Equivalent to isNullOrUndefined.
   *
   * @function isUndefinedOrNull
   * @param {any} value - Value to be checked
   * @returns {boolean}
   */
  isUndefinedOrNull : function(value) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at isUndefinedOrNull");
    }
    return this.isUndefined(value) || this.isNull(value);
  },

  // Assert methods ====================================================

  /**
   * Tests for deep equality between the actual and expected
   * parameters.
   *
   * @function deepEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers deepEqual({"a":{"b":1}} == {"a":{"b":1}})
   * var obj1 = { a: { b: 1, }, };
   * assert.deepEqual(obj1, obj1);
   */
  deepEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at deepEqual");
    }
    if (!this._isDeepEqual(actual, expected)) {
      if (this.isUndefined(message)) {
        this._failOut("deepEqual(" + JSON.stringify(actual) + " == " +
          JSON.stringify(expected) +
          ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("deepEqual(" + JSON.stringify(actual) + " == " +
        JSON.stringify(expected) + ")");
    }
  },

  /**
   * Wrapper for notMatch method.
   *
   * @function doesNotMatch
   * @param {string || number} actual - The actual value
   * @param {RegExp} expected - The expected value
   * @param {string} message - If provided, this error message is set
   */
  doesNotMatch : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at doesNotMatch");
    }
    this.notMatch(actual, expected, message);
  },

  /**
   * Tests equality between the actual and expected parameters with
   * the == operator.
   *
   * @function equal
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass equal(1 == 1)
   * assert.equal(1, 1);
   */
  equal : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at equal");
    }
    if (actual != expected) {
      if (this.isUndefined(message)) {
        this._failOut("equal(" + String(actual) + " == " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("equal(" + String(actual) + " == " +
        String(expected) + ")");
    }
  },

  /**
   * Throws an error with the provided error message or a default
   * error message.
   *
   * @function fail
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionFail
   * try {
   *   assert.fail();
   * } catch(exception) { }
   */
  fail : function(message) {
    if (this.isUndefined(message)) {
      this._failOut();
      throw new Error("AssertionFail");
    } else {
      this._failOut(message);
      throw new Error("AssertionFail: " + message);
    }
  },

  /**
   * Tests whether the actual parameter is greater than the expected
   * parameter.
   *
   * @function greaterThan
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass greaterThan(2 > 1)
   * assert.greaterThan(2, 1);
   */
  greaterThan : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at match");
    }
    if (actual <= expected) {
      if (this.isUndefined(message)) {
        this._failOut("greaterThan(" + String(actual) + " > " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("greaterThan(" + String(actual) + " > " +
        String(expected) + ")");
    }
  },

  /**
   * Tests whether the actual parameter is greater or equal than the
   * expected parameter.
   *
   * @function greaterThanOrEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass greaterThanOrEqual(42 >= 42)
   * assert.greaterThanOrEqual(42, 42);
   */
  greaterThanOrEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at match");
    }
    if (actual < expected) {
      if (this.isUndefined(message)) {
        this._failOut("greaterThanOrEqual(" + String(actual) +
          " >= " + String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("greaterThanOrEqual(" + String(actual) +
        " >= " + String(expected) + ")");
    }
  },

  /**
   * Tests whether the actual parameter is less than the expected
   * parameter.
   *
   * @function lessThan
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass lessThan(3 < 4)
   * assert.lessThan(3, 4);
   */
  lessThan : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at match");
    }
    if (actual >= expected) {
      if (this.isUndefined(message)) {
        this._failOut("lessThan(" + String(actual) + " < " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("lessThan(" + String(actual) + " < " +
        String(expected) + ")");
    }
  },

  /**
   * Tests whether the actual parameter is less or equal than the
   * expected parameter.
   *
   * @function equal
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass lessThanOrEqual(A <= B)
   * assert.lessThanOrEqual("A", "B");
   */
  lessThanOrEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at match");
    }
    if (actual > expected) {
      if (this.isUndefined(message)) {
        this._failOut("lessThanOrEqual(" + String(actual) + " <= " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("lessThanOrEqual(" + String(actual) + " <= " +
        String(expected) + ")");
    }
  },

  /**
   * Expects the that actual match the regular expression.
   *
   * @function match
   * @param {string || number} actual - The actual value
   * @param {RegExp} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass The input 'I will pass' match the regular
   * // expression /pass/
   * assert.match("I will pass", /pass/);
   */
  match : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at match");
    }
    if (!this.isRegExp(expected)) {
      throw new Error("expected argument must be RegExp");
    }
    if (!expected.test(actual)) {
      if (this.isUndefined(message)) {
        this._failOut("The input '" + String(actual) +
          "' did not match the regular expression " + String(expected));
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("The input '" + actual +
        "' match the regular expression " + String(expected));
    }
  },

  /**
   * Tests for any deep inequality between the actual and expected
   * parameters.
   *
   * @function notDeepEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionFail notDeepEqual({"a":{"b":1}} != {"a":{"b":1}})
   * var obj1 = { a: { b: 1, }, };
   * assert.notDeepEqual(obj1, obj1);
   */
  notDeepEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at notDeepEqual");
    }
    if (this._isDeepEqual(actual, expected)) {
      if (this.isUndefined(message)) {
        this._failOut("notDeepEqual(" + JSON.stringify(actual) +
          " != " + JSON.stringify(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("notDeepEqual(" + JSON.stringify(actual) + " != " +
        JSON.stringify(expected) + ")");
    }
  },

  /**
   * Tests inequality between the actual and expected parameters with
   * the != operator.
   *
   * @function notEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass notEqual(1 != 2)
   * assert.notEqual(1, 2);
   */
  notEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at notEqual");
    }
    if (actual == expected) {
      if (this.isUndefined(message)) {
        this._failOut("notEqual(" + String(actual) + " != " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("notEqual(" + String(actual) + " != " +
        String(expected) + ")");
    }
  },

  /**
   * Expects the that actual not match the regular expression.
   *
   * @function notMatch
   * @param {string || number} actual - The actual value
   * @param {RegExp} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass The input 'I will pass' did not match the
   * // regular expression /different/
   * assert.notMatch("I will pass", /different/);
   */
  notMatch : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at notMatch");
    }
    if (!this.isRegExp(expected)) {
      throw new Error("expected argument must be RegExp");
    }
    if (expected.test(actual)) {
      if (this.isUndefined(message)) {
        this._failOut("The input '" + String(actual) +
          "' did match the regular expression " + String(expected));
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("The input '" + String(actual) +
        "' did not match the regular expression " +
        String(expected));
    }
  },

  /**
   * Tests if value is falsy.<br>
   * Hint: All values are truthy except false, 0, -0, 0n (bigint is not
   * supported by Rhino), "", null, undefined and NaN.
   *
   * @function notOk
   * @param {any} value - The value to be tested
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass ok(false)
   * assert.notOk(false);
   */
  notOk : function(value, message) {
    if (arguments.length === 0) {
      throw new Error("Arguments missing at notOk");
    }
    if (value) {
      if (this.isUndefined(message)) {
        this._failOut("notOk(" + String(value) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("notOk(" + String(value) + ")");
    }
  },

  /**
   * Tests strict inequality between the actual and expected
   * parameters with the !== operator.
   *
   * @function notStrictEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass notStrictEqual(1 !== 2)
   * assert.notStrictEqual(1, 2);
   */
  notStrictEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at notStrictEqual");
    }
    if (actual === expected) {
      if (this.isUndefined(message)) {
        this._failOut("notStrictEqual(" + String(actual) + " !== " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("notStrictEqual(" + String(actual) + " !== " +
        String(expected) + ")");
    }
  },

  /**
   * Tests if value is truthy.<br>
   * Hint: All values are truthy except false, 0, -0, 0n, "", null,
   * undefined and NaN.
   *
   * @function ok
   * @param {any} value - The value to be tested
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass ok(true)
   * assert.ok(true);
   */
  ok : function(value, message) {
    if (arguments.length === 0) {
      throw new Error("Arguments missing at ok");
    }
    if (!value) {
      if (this.isUndefined(message)) {
        this._failOut("ok(" + String(value) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("ok(" + String(value) + ")");
    }
  },

  /**
   * Tests strict equality between the actual and expected parameters
   * with the === operator.
   *
   * @function strictEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @param {string} message - If provided, this error message is set
   *
   * @example
   * // Delivers AssertionPass strictEqual(Hello World === Hello World)
   * assert.strictEqual("Hello World", "Hello World");
   */
  strictEqual : function(actual, expected, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at strictEqual");
    }
    if (actual !== expected) {
      if (this.isUndefined(message)) {
        this._failOut("strictEqual(" + String(actual) + " === " +
          String(expected) + ")");
      } else {
        this._failOut(message);
      }
    } else {
      this._passOut("strictEqual(" + String(actual) + " === " + 
        String(expected) + ")");
    }
  },

  /**
   * Expects the function fn to throw the error expectedError.
   *
   * @function throws
   * @param {Function} fn
   * @param {string | RegExp | Error} expectedError - The expected error
   * @param {string} message - If provided, this error message is set
   * @returns {boolean}
   *
   * @example
   * // Delivers AssertionPass throws get the expected error
   * // TypeError(Wrong value)
   * var err = new TypeError("Wrong value");
   * assert.throws( function () { throw err; }, "Wrong value" );
   */
  throws : function(fn, expectedError, message) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at throws");
    }
    var thrown = false;
    if (this.isFunction(fn)) {
      var thrownError;
      try {
        fn();
      } catch (err) {
        thrown = true;
        thrownError = err;
      }
      if (thrown && expectedError) {
        thrown = this._errorMatches(thrownError, expectedError);
      }
      if (!thrown) {
        if (this.isUndefined(message)) {
          if (!(this.isUndefined(thrownError))) {
            this._failOut("throws get the unexpected error " +
              thrownError.name + "(" + thrownError.message + ")");
          } else {
            this._failOut("throws get no error");
          }
        } else {
          this._failOut(message);
        }
      } else {
        this._passOut("throws get the expected error " +
          thrownError.name + "(" + thrownError.message + ")");
      }
    }
    return thrown;
  },

  // Test grouping methods =============================================

  /**
   * Creates a block that groups several related tests.
   *
   * @function describe
   * @param {string} name - Name of the describe block
   * @param {Function} fn
   *
   * @example
   * assert.describe("Test", function() {
   *   // Your tests here
   * });
   */
  describe : function(name, fn) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at describe");
    }
    if (this.isFunction(fn)) {
      System.log("> " + String(name));
      try {
        fn();
      } catch (exception) {
        System.error(exception);
      }
      System.log("< " + String(name));
    }
  },

  /**
   * Creates a block that groups several related tests which run the
   * tests with different data.
   *
   * @function describeEach
   * @param {Array.<Array>} table - Arguments that are passed to the function
   * @param {string} name - Name of the describe block
   * @param {Function} fn
   *
   * @example
   * assert.describeEach(
   *   [
   *     [1, "A", 3.1, true],
   *     [3, "B", 1.3, false]
   *   ],
   *   "Test",
   *   function(a, b, c, d) {
   *     // Your tests here
   *   }
   * );
   */
  describeEach : function(table, name, fn) {
    if (arguments.length < 3) {
      throw new Error("Arguments missing at describeEach");
    }
    if (this.isArray(table) && this.isFunction(fn)) {
      System.log("> " + String(name));
      try {
        table.forEach( function(row) {
          fn.apply(null, row);
        });
      } catch (exception) {
        System.error(exception);
      }
      System.log("< " + String(name));
    }
  },

  /**
   * Skips a block that groups several related tests which run the
   * tests with different data.
   *
   * @function describeEachSkip
   * @param {Array.<Array>} table - Arguments that are passed to the function
   * @param {string} name - Name of the describe block
   * @param {Function} fn
   *
   * @example
   * assert.describeEachSkip(
   *   [
   *     [1, "A", 3.1, true],
   *     [3, "B", 1.3, false]
   *   ],
   *   "Test",
   *   function(a, b, c, d) {
   *     // Your tests here
   *   }
   * );
   */
  describeEachSkip : function(table, name, fn) {
    if (arguments.length < 3) {
      throw new Error("Arguments missing at describeEachSkip");
    }
    if (this.isArray(table) && this.isFunction(fn)) {
      System.log("Skipped: " + String(name));
    }
  },

  /**
   * Skips a block that groups several related tests.
   *
   * @function describeSkip
   * @param {string} name - Name of the describe block
   * @param {Function} fn
   *
   * @example
   * assert.describeSkip("Test", function() {
   *   // Your tests here
   * });
   */
  describeSkip : function(name, fn) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at describeSkip");
    }
    if (this.isFunction(fn)) {
      System.log("Skipped: " + String(name));
    }
  },

  /**
   * Creates a test block.
   *
   * @function test
   * @param {string} name - Name of the test block
   * @param {Function} fn
   *
   * @example
   * assert.test("Test", function() {
   *   // Your test here
   * });
   */
  test : function(name, fn) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at test");
    }
    if (this.isFunction(fn)) {
      System.log(String(name));
      try {
        fn();
      } catch (exception) {
        System.error(exception);
      }
    }
  },

  /**
   * Creates a test block which run the tests with different data.
   *
   * @function testEach
   * @param {Array.<Array>} table - Arguments that are passed to the function
   * @param {string} name - Name of the test block
   * @param {Function} fn
   *
   * @example
   * assert.testEach([[1, "Stefan", 3.14]], "Test", function(a, b, c) {
   *   // Your test here
   * });
   */
  testEach : function(table, name, fn) {
    if (arguments.length < 3) {
      throw new Error("Arguments missing at testEach");
    }
    if (this.isArray(table) && this.isFunction(fn)) {
      System.log("> " + String(name));
      try {
        table.forEach( function(row) {
          fn.apply(null, row);
        });
      } catch (exception) {
        System.error(exception);
      }
      System.log("< " + String(name));
    }
  },

  /**
   * Skips a test block which run the tests with different data.
   *
   * @function testEachSkip
   * @param {Array.<Array>} table - Arguments that are passed to the function
   * @param {string} name - Name of the test block
   * @param {Function} fn
   *
   * @example
   * assert.testEachSkip([[1, "Stefan", 3.14]], "Test", function(a, b, c) {
   *   // Your test here
   * });
   */
  testEachSkip : function(table, name, fn) {
    if (arguments.length < 3) {
      throw new Error("Arguments missing at testEach");
    }
    if (this.isArray(table) && this.isFunction(fn)) {
      System.log("Skipped: " + String(name));
    }
  },

  /**
   * Skips a test block.
   *
   * @function testSkip
   * @param {string} name - Name of the test block
   * @param {Function} fn
   *
   * @example
   * assert.testSkip("Test", function() {
   *   // Your test here
   * });
   */
  testSkip : function(name, fn) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at testSkip");
    }
    if (this.isFunction(fn)) {
      System.log("Skipped: " + String(name));
    }
  },

  /**
   * Outputs to know how many tests or other things are still need todo.
   *
   * @function testTodo
   * @param {string} todo - Description what is still to be done
   *
   * @example
   * assert.testTodo("A test has to be implemented here.");
   */
  testTodo : function(todo) {
    if (arguments.length < 1) {
      throw new Error("Arguments missing at testTodo");
    }
    System.log("Todo: " + String(todo));
  },

  // Private utility methods ===========================================

  /**
   * Tests that actual error match the expected.
   *
   * @function _errorMatches
   * @param {Error} actual - The actual error
   * @param {string | RegExp | Error} expected - The expected error
   * @returns {boolean}
   */
  _errorMatches : function(actual, expected) {
    if (arguments.length < 2) {
      throw new Error("Arguments missing at _errorMatches");
    }
    if (this.isError(actual)) {
      // Checks the equality of the error message
      if (this.isString(expected)) {
        return actual.message === expected;
      }
      // Checks if the error message matches the regular expression
      if (expected instanceof RegExp) {
        return expected.test(actual.message);
      }
      if (this.isError(expected)) {
        // Checks the equality of the errors
        if (actual === expected) {
          return true;
        }
      }
    }
    return false;
  },

  /**
   * Getting all keys of the object.
   *
   * @function _getObjectKeys
   * @param {object} object - Object from which the keys are to be determined
   * @returns {Array}
   */
  _getObjectKeys : function(object) {
    if (arguments.length === 0) {
      throw new Error("Argument missing at _getObjectKeys");
    }
    var keys = [];
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys;
  },

  /**
   * Tests the deep equality between the actual and expected
   * parameters.
   *
   * @function _isDeepEqual
   * @param {any} actual - The actual value
   * @param {any} expected - The expected value
   * @returns {boolean}
   */
  _isDeepEqual : function(actual, expected) {

    if (arguments.length < 2) {
      throw new Error("Arguments missing at _isDeepEqual");
    }

    if (actual === expected) {
      return true;
    }

    if (actual instanceof Date && expected instanceof Date) {
      return actual.getTime() === expected.getTime();
    }

    if (actual instanceof RegExp && expected instanceof RegExp) {
      return (
        actual.source === expected.source &&
        actual.global === expected.global &&
        actual.multiline === expected.multiline &&
        actual.lastIndex === expected.lastIndex &&
        actual.ignoreCase === expected.ignoreCase
      );
    }

    if (typeof actual !== 'object' && typeof expected !== 'object') {
      return actual == expected;
    }

    return this._objectsEqual(actual, expected);

  },

  /**
   * Tests the deep equality between the object1 and object2
   * parameters.
   *
   * @function _objectsEqual
   * @param {object} object1 - First object to compare
   * @param {object} object2 - Second object to compare
   * @returns {boolean}
   */
  _objectsEqual : function(object1, object2) {

    if (arguments.length < 2) {
      throw new Error("Arguments missing at _objectsEqual");
    }

    if (this.isNullOrUndefined(object1) || this.isNullOrUndefined(object2)) {
      return false;
    }

    // Object prototypes must be the same
    if (object1.prototype !== object2.prototype) {
      return false;
    }

    // Check number of own properties
    var object1Keys = this._getObjectKeys(object1);
    var object2Keys = this._getObjectKeys(object2);
    if (object1Keys.length !== object2Keys.length) {
      return false;
    }

    object1Keys.sort();
    object2Keys.sort();

    for (var i = 0; i < object1Keys.length; i++) {
      if (object1Keys[i] != object2Keys[i]) {
        return false;
      }
    }

    for (var j = 0; j < object1Keys.length; j++) {
      var key = object1Keys[j];
      if (!this._isDeepEqual(object1[key], object2[key])) {
        return false;
      }
    }

    return true;

  },

  /**
   * Logs an assertion pass text.
   *
   * @function _passOut
   * @param {string} text
   */
  _passOut : function(text) {
    if (this.isUndefined(text)) {
      System.log("Pass");
    } else {
      System.log("Pass: " + text);
    }
  },

  /**
   * Logs an assertion fail text.
   *
   * @function _failOut
   * @param {string} text
   */
  _failOut : function(text) {
    if (this.isUndefined(text)) {
      System.log("Fail");
    } else {
      System.log("Fail: " + text);
    }
  },

  // Classification properties =========================================

  /**
   * Runtime category to define the possible duration of the unit test.<br>
   * Duration Short: <= 1 minute
   *
   * @name runtimeCategoryShort
   * @type {string}
   */
  _runtimeCategoryShort : "Duration Short",

  getRuntimeCategoryShort : function() {
    return this._runtimeCategoryShort;
  },

  /**
   * Runtime category to define the possible duration of the unit test.<br>
   * Duration Medium: > 1 and <= 10 minutes
   *
   * @name runtimeCategoryMedium
   * @type {string}
   */
  _runtimeCategoryMedium : "Duration Medium",

  getRuntimeCategoryMedium : function() {
    return this._runtimeCategoryMedium;
  },

  /**
   * Runtime category to define the possible duration of the unit test.<br>
   * Duration Long: > 10 and <= 60 minutes
   *
   * @name runtimeCategoryLong
   * @type {string}
   */
  _runtimeCategoryLong : "Duration Long",

  getRuntimeCategoryLong : function() {
    return this._runtimeCategoryLong;
  },

  /**
   * Risk level to define the impact of the unit test on data security
   * of the system.<br>
   * Critical: Changes system settings or customizing
   *
   * @name riskLevelCritical
   * @type {string}
   */
  _riskLevelCritical : "Risk level critical",

  getRiskLevelCritical : function() {
    return this._riskLevelCritical;
  },

  /**
   * Risk level to define the impact of the unit test on data security
   * of the system.<br>
   * Dangerous: Changes persistent application data
   *
   * @name riskLevelDangerous
   * @type {string}
   */
  _riskLevelDangerous : "Risk level dangerous",

  getRiskLevelDangerous : function() {
    return this._riskLevelDangerous;
  },

  /**
   * Risk level to define the impact of the unit test on data security
   * of the system.<br>
   * Harmless: No influence on system settings or application data
   *
   * @name riskLevelHarmless
   * @type {string}
   */
  _riskLevelHarmless : "Risk level harmless",

  getRiskLevelHarmless : function() {
    return this._riskLevelHarmless;
  },

  /**
   * Standard classification of the runtimeCategory<br>
   * runtimeCategoryShort
   *
   * @name runtimeCategory
   * @type {string}
   */
  _runtimeCategory : "Duration Short",

  getRuntimeCategory : function() {
    return this._runtimeCategory;
  },

  setRuntimeCategory : function(runtimeCategory) {
    this._runtimeCategory = runtimeCategory;
  },

  /**
   * Standard classification of the riskLevel<br>
   * riskLevelHarmless
   *
   * @name riskLevel
   * @type {string}
   */
  _riskLevel : "Risk level harmless",

  getRiskLevel : function() {
    return this._riskLevel;
  },

  setRiskLevel : function(riskLevel) {
    this._riskLevel = riskLevel;
  }

};

return _assertNS;

// End -----------------------------------------------------------------
